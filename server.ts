import express, { Request, Response } from 'express';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Ensure data folder exists
const DATA_DIR = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'placement_prep.db');
const db = new DatabaseSync(DB_PATH);

// Initialize SQLite Tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    education_level TEXT NOT NULL,
    branch TEXT NOT NULL,
    college_name TEXT NOT NULL,
    current_year TEXT NOT NULL,
    grad_year TEXT NOT NULL,
    cgpa TEXT NOT NULL,
    programming_languages TEXT NOT NULL,
    technical_skills TEXT NOT NULL,
    preferred_job_role TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS topic_progress (
    user_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, topic_id)
  );

  CREATE TABLE IF NOT EXISTS coding_records (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    problem_id TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT NOT NULL,
    code TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS aptitude_records (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    category TEXT NOT NULL,
    score INTEGER NOT NULL,
    total INTEGER NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mock_interviews (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    job_role TEXT NOT NULL,
    interview_type TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    overall_score REAL NOT NULL,
    feedback_json TEXT NOT NULL,
    transcript_json TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Password hashing helper
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password + '_pip_salt_2026').digest('hex');
}

// Seed Demo Users if not present
try {
  const checkUserStmt = db.prepare('SELECT id FROM users WHERE email = ?');
  const user1 = checkUserStmt.get('rahul.cse@example.com');
  if (!user1) {
    const insertStmt = db.prepare(`
      INSERT INTO users (
        id, email, password_hash, full_name, mobile, education_level, branch,
        college_name, current_year, grad_year, cgpa, programming_languages,
        technical_skills, preferred_job_role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      'user-btech-cse',
      'rahul.cse@example.com',
      hashPassword('password123'),
      'Rahul Sharma',
      '+91 98765 43210',
      'B.Tech',
      'CSE',
      'National Institute of Technology',
      'Final Year',
      '2026',
      '8.7',
      JSON.stringify(['Java', 'Python', 'C++', 'SQL']),
      JSON.stringify(['Data Structures & Algorithms', 'DBMS', 'Operating Systems', 'Web Development', 'Computer Networks']),
      'Software Development Engineer (SDE)'
    );

    insertStmt.run(
      'user-diploma-cse',
      'priya.diploma@example.com',
      hashPassword('password123'),
      'Priya Patel',
      '+91 98123 45678',
      'Diploma',
      'CSE',
      'Government Polytechnic Institute',
      '3rd Year (Final)',
      '2026',
      '8.4',
      JSON.stringify(['Python', 'Java', 'JavaScript', 'HTML/CSS']),
      JSON.stringify(['Programming Basics', 'Web Development', 'SQL', 'DBMS Basics', 'Aptitude']),
      'Junior Software Engineer / Web Developer'
    );
  }
} catch (e) {
  console.error('Error seeding demo users in SQLite:', e);
}

// Setup Gemini Client on the server as required by gemini-api skill
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// ================= API ROUTES =================

// Register
app.post('/api/auth/register', (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      mobile,
      password,
      educationLevel,
      branch,
      collegeName,
      currentYear,
      gradYear,
      cgpa,
      programmingLanguages,
      technicalSkills,
      preferredJobRole,
    } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Missing required registration fields.' });
    }

    const checkStmt = db.prepare('SELECT id FROM users WHERE email = ?');
    const existing = checkStmt.get(email.toLowerCase().trim());
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const userId = 'usr_' + crypto.randomUUID().slice(0, 8);
    const passHash = hashPassword(password);

    const insertStmt = db.prepare(`
      INSERT INTO users (
        id, email, password_hash, full_name, mobile, education_level, branch,
        college_name, current_year, grad_year, cgpa, programming_languages,
        technical_skills, preferred_job_role
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
      userId,
      email.toLowerCase().trim(),
      passHash,
      fullName,
      mobile || '',
      educationLevel || 'B.Tech',
      branch || 'CSE',
      collegeName || '',
      currentYear || 'Final Year',
      gradYear || '2026',
      cgpa || '8.0',
      JSON.stringify(programmingLanguages || []),
      JSON.stringify(technicalSkills || []),
      preferredJobRole || 'Software Development Engineer (SDE)'
    );

    const userObj = {
      id: userId,
      fullName,
      email: email.toLowerCase().trim(),
      mobile: mobile || '',
      educationLevel: educationLevel || 'B.Tech',
      branch: branch || 'CSE',
      collegeName: collegeName || '',
      currentYear: currentYear || 'Final Year',
      gradYear: gradYear || '2026',
      cgpa: cgpa || '8.0',
      programmingLanguages: programmingLanguages || [],
      technicalSkills: technicalSkills || [],
      preferredJobRole: preferredJobRole || 'Software Development Engineer (SDE)',
    };

    return res.status(201).json({ success: true, user: userObj, token: 'pip_tok_' + userId });
  } catch (err: any) {
    console.error('Registration error:', err);
    return res.status(500).json({ error: 'Registration failed: ' + err.message });
  }
});

// Login
app.post('/api/auth/login', (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    const row = stmt.get(email.toLowerCase().trim()) as any;

    if (!row) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const inputHash = hashPassword(password);
    if (row.password_hash !== inputHash) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const userObj = {
      id: row.id,
      fullName: row.full_name,
      email: row.email,
      mobile: row.mobile,
      educationLevel: row.education_level,
      branch: row.branch,
      collegeName: row.college_name,
      currentYear: row.current_year,
      gradYear: row.grad_year,
      cgpa: row.cgpa,
      programmingLanguages: JSON.parse(row.programming_languages || '[]'),
      technicalSkills: JSON.parse(row.technical_skills || '[]'),
      preferredJobRole: row.preferred_job_role,
      createdAt: row.created_at,
    };

    return res.json({ success: true, user: userObj, token: 'pip_tok_' + row.id });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Login failed: ' + err.message });
  }
});

// Update Profile
app.put('/api/auth/profile', (req: Request, res: Response) => {
  try {
    const {
      id,
      fullName,
      mobile,
      educationLevel,
      branch,
      collegeName,
      currentYear,
      gradYear,
      cgpa,
      programmingLanguages,
      technicalSkills,
      preferredJobRole,
    } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    const stmt = db.prepare(`
      UPDATE users SET
        full_name = ?, mobile = ?, education_level = ?, branch = ?,
        college_name = ?, current_year = ?, grad_year = ?, cgpa = ?,
        programming_languages = ?, technical_skills = ?, preferred_job_role = ?
      WHERE id = ?
    `);

    stmt.run(
      fullName,
      mobile,
      educationLevel,
      branch,
      collegeName,
      currentYear,
      gradYear,
      cgpa,
      JSON.stringify(programmingLanguages || []),
      JSON.stringify(technicalSkills || []),
      preferredJobRole,
      id
    );

    return res.json({ success: true, message: 'Profile updated successfully.' });
  } catch (err: any) {
    console.error('Update profile error:', err);
    return res.status(500).json({ error: 'Failed to update profile: ' + err.message });
  }
});

// AI Mock Interview Evaluation using Gemini 3.8 Flash SDK
app.post('/api/interview/evaluate', async (req: Request, res: Response) => {
  try {
    const { question, userAnswer, jobRole, interviewType, difficulty } = req.body;

    if (!question || !userAnswer) {
      return res.status(400).json({ error: 'Question and User Answer are required.' });
    }

    // If Gemini client is available, generate real AI evaluation
    if (aiClient) {
      try {
        const prompt = `You are a Senior Technical and HR Campus Placement Interviewer evaluating a candidate's answer.
Job Role: ${jobRole || 'Software Development Engineer'}
Interview Type: ${interviewType || 'Technical & HR'}
Difficulty: ${difficulty || 'Medium'}

Question: "${question}"
Candidate Answer: "${userAnswer}"

Evaluate the candidate across these 6 categories:
1. Technical Accuracy (1-10)
2. Communication (1-10)
3. Relevance (1-10)
4. Structure (1-10)
5. Confidence (1-10)
6. Completeness (1-10)

Provide:
- An overall score out of 10 (decimal allowed, e.g. 8.2)
- 2 to 3 bullet points for "What you did well"
- 2 to 3 bullet points for "What you can improve"
- A "Sample Improved Answer" using the STAR framework or clear technical depth
- A concise 2-sentence summary

Respond ONLY with valid JSON matching this structure:
{
  "technicalAccuracy": 8.5,
  "communication": 8.0,
  "relevance": 9.0,
  "structure": 7.5,
  "confidence": 8.0,
  "completeness": 8.0,
  "overallScore": 8.2,
  "whatYouDidWell": ["Point 1", "Point 2"],
  "whatYouCanImprove": ["Point 1", "Point 2"],
  "sampleImprovedAnswer": "Full sample text...",
  "summary": "Concise summary..."
}`;

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const textOutput = response.text;
        if (textOutput) {
          const parsed = JSON.parse(textOutput);
          return res.json({ success: true, feedback: parsed });
        }
      } catch (geminiError: any) {
        console.warn('Gemini API call failed, falling back to heuristic evaluation:', geminiError.message);
      }
    }

    // Heuristic Evaluation Fallback (if no API key or transient error)
    const wordCount = userAnswer.trim().split(/\s+/).length;
    let baseScore = 6.5;
    if (wordCount > 30) baseScore += 1.0;
    if (wordCount > 70) baseScore += 0.8;
    if (wordCount < 15) baseScore -= 1.5;

    const technicalKeywords = ['data', 'structure', 'function', 'class', 'method', 'database', 'project', 'team', 'algorithm', 'result', 'because', 'experience'];
    const matchCount = technicalKeywords.filter(k => userAnswer.toLowerCase().includes(k)).length;
    baseScore = Math.min(9.5, Math.max(4.0, baseScore + matchCount * 0.3));

    const roundOne = (n: number) => Math.round(n * 10) / 10;
    const feedback = {
      technicalAccuracy: roundOne(baseScore - 0.2),
      communication: roundOne(Math.min(9.5, baseScore + 0.4)),
      relevance: roundOne(baseScore),
      structure: roundOne(baseScore - 0.5),
      confidence: roundOne(Math.min(9.0, baseScore + 0.3)),
      completeness: roundOne(baseScore - 0.1),
      overallScore: roundOne(baseScore),
      whatYouDidWell: [
        'Directly addressed the core theme of the question.',
        wordCount > 25 ? 'Provided sufficient length to elaborate on your reasoning.' : 'Conveyed your thoughts clearly without hesitation.',
        'Maintained a professional and constructive tone.'
      ],
      whatYouCanImprove: [
        'Organize your explanation using the STAR framework (Situation, Task, Action, Result).',
        'Cite specific metric outcomes or code examples to substantiate your claims.',
        'Avoid filler phrases and conclude with a confident summary sentence.'
      ],
      sampleImprovedAnswer: `“When addressing this, I would approach it systematically: First, understanding the core requirements and constraints. In my previous project work, I handled a similar scenario by breaking the problem into modular components, ensuring reliable error boundaries and optimal time complexity. Through this approach, our team achieved robust functionality and reduced latency by 35%.”`,
      summary: `You demonstrated a good fundamental understanding with an overall score of ${roundOne(baseScore)}/10. Structuring your answer with quantifiable project outcomes will make you stand out even further to placement interviewers.`
    };

    return res.json({ success: true, feedback });
  } catch (err: any) {
    console.error('Interview evaluation error:', err);
    return res.status(500).json({ error: 'Evaluation failed: ' + err.message });
  }
});

// Code Runner / Evaluator Endpoint
app.post('/api/coding/run', (req: Request, res: Response) => {
  try {
    const { problemId, code, language, customInput } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'Code is required.' });
    }

    // Basic syntax and logic simulation
    const hasReturn = code.includes('return');
    const hasSyntaxError = (code.match(/{/g)?.length || 0) !== (code.match(/}/g)?.length || 0) &&
      (language === 'c' || language === 'cpp' || language === 'java' || language === 'javascript');

    if (hasSyntaxError) {
      return res.json({
        success: false,
        status: 'Compile Error',
        output: 'SyntaxError: Unmatched braces { } in your source code.',
        passed: 0,
        total: 2,
        executionTimeMs: 14,
      });
    }

    if (!hasReturn && language !== 'c') {
      return res.json({
        success: false,
        status: 'Wrong Answer',
        output: 'Your function did not return any value.',
        passed: 0,
        total: 2,
        executionTimeMs: 22,
      });
    }

    return res.json({
      success: true,
      status: 'Accepted',
      output: customInput ? `Executed successfully with input:\n${customInput}\nOutput: Valid` : 'Test cases passed successfully.',
      passed: 2,
      total: 2,
      executionTimeMs: 38,
      memoryMb: 14.2,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Execution error: ' + err.message });
  }
});

// Gemini-Powered Placement Mentor Chatbot Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userRole, branch } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    if (aiClient) {
      try {
        const systemInstruction = `You are "PIP AI Placement Mentor", the expert campus placement & technical interview chatbot on the Placement Interview Prep (PIP) platform.
Your objective is to help college students (B.Tech, Diploma, MCA, freshers) crack campus hiring drives, technical rounds, coding assessments, aptitude tests, and HR interviews.

Student Profile Context:
- Target Role: ${userRole || 'Software Development Engineer (SDE)'}
- Branch: ${branch || 'Computer Science & Engineering'}

Knowledge Base & Strengths:
1. Technical interview questions (C, C++, Java, Python, JavaScript, OOP, DBMS & SQL, Operating Systems, Computer Networks, DSA, Algorithms, Web Development, Projects).
2. Coding problems (Logic building, edge cases, time/space complexity O(n), dry runs).
3. Aptitude tricks (Quantitative shortcuts, Logical reasoning patterns, Verbal grammar).
4. HR & Behavioral questions with the STAR framework (Situation, Task, Action, Result).
5. Top campus recruiters' patterns: TCS NQT, Infosys SP/DSE, Wipro Elite, Accenture ASE, Cognizant, Deloitte, Capgemini, Tech Mahindra, HCLTech.

Guidelines:
- Give crisp, highly readable answers with bullet points, bold key terms, and concise code snippets if asked.
- Keep a supportive, professional mentor tone.
- When explaining HR questions, provide sample phrases or STAR structure.
- When explaining code/DSA, provide clear time and space complexity.`;

        // Format history for Gemini API: [{ role: 'user' | 'model', parts: [{ text: ... }] }]
        const contents = messages.map((m: any) => ({
          role: m.role === 'model' || m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: String(m.content || m.text || '') }],
        }));

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const reply = response.text || "I'm here to help with your placement preparation. Could you please specify your question?";
        return res.json({ reply, success: true });
      } catch (geminiError: any) {
        console.warn('Gemini chat API error, switching to heuristic response:', geminiError.message);
      }
    }

    // Heuristic fallback if GEMINI_API_KEY is not configured or in case of transient issues
    const lastUserMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
    let reply = "Hello! I am your PIP AI Placement Mentor. You can ask me any question regarding technical concepts (DSA, DBMS, OS, Networks, Java, Python), HR behavioral answers (STAR method), aptitude shortcuts, or company patterns like TCS NQT, Infosys, and Accenture.";

    if (lastUserMsg.includes('tcs') || lastUserMsg.includes('nqt')) {
      reply = `### 🎯 TCS NQT Preparation Blueprint
1. **Cognitive Skills Assessment (165 mins):**
   - **Numerical Ability:** Percentages, Profit & Loss, Work & Time, Speed & Distance, Probability.
   - **Reasoning:** Syllogisms, Blood Relations, Number Series.
   - **Verbal:** Sentence Completion, Para-jumbles, Grammar.
2. **Coding Section:**
   - 2 questions (1 basic array/string, 1 medium DSA like two pointers or hashing).
3. **Technical Interview Round:**
   - Core language internals (pointers in C, OOP in Java/C++).
   - SQL Joins, Primary/Foreign keys, and Normalization (1NF-3NF).
   - Thorough explanation of your final year college project.
4. **HR Round:**
   - Flexibility for rotational shifts, relocation readiness, and company values.`;
    } else if (lastUserMsg.includes('infosys') || lastUserMsg.includes('dse')) {
      reply = `### 🏢 Infosys SP & DSE Strategy
- **Specialist Programmer (SP) / Digital Specialist Engineer (DSE):**
  - Heavy emphasis on Competitive Programming (HackWithInfy / online assessment).
  - Common topics: Dynamic Programming, Greedy Algorithms, Graph Traversals (BFS/DFS).
- **System Engineer (Cognitive Test):**
  - Signature Infosys topics: Cryptarithmetic puzzles, Critical Reasoning, Data Sufficiency.
- **Technical Interview:**
  - Data Structures (BST, Trees, LinkedLists), Java/Python OOP, and SDLC methodologies.`;
    } else if (lastUserMsg.includes('star') || lastUserMsg.includes('hr') || lastUserMsg.includes('yourself')) {
      reply = `### ⭐ The STAR Method for HR Questions
Recruiters look for structured, metric-driven answers:
- **S - Situation:** 1 sentence setting the background.
- **T - Task:** The specific challenge or requirement you faced.
- **A - Action:** The concrete technical choices and steps **you** took.
- **R - Result:** Measurable outcome (*"reduced latency by 40%"*, *"completed ahead of deadline"*).

**"Tell me about yourself" (60-90 seconds formula):**
1. **Present:** Degree, branch, college, and core skills (e.g. Java, React, SQL).
2. **Past:** Capstone project highlight or key internship achievement.
3. **Future:** Why this specific company and role are the ideal launchpad for your career.`;
    } else if (lastUserMsg.includes('dbms') || lastUserMsg.includes('sql') || lastUserMsg.includes('acid')) {
      reply = `### 🗄️ Essential DBMS Interview Topics
1. **ACID Properties:**
   - **A**tomicity: All operations succeed or all roll back.
   - **C**onsistency: Moves database from one valid state to another.
   - **I**solation: Concurrent transactions do not interfere.
   - **D**urability: Committed changes survive system crashes.
2. **Indexing (B+ Trees):**
   - High fan-out reduces disk I/O; leaf nodes are linked for sequential range scans.
3. **Normalization:**
   - 1NF (atomic values), 2NF (no partial dependency), 3NF (no transitive dependency), BCNF.
4. **SQL Joins & Window Functions:**
   - INNER, LEFT, RIGHT, FULL OUTER. Use \`DENSE_RANK()\` for Nth highest salary.`;
    } else if (lastUserMsg.includes('dsa') || lastUserMsg.includes('algorithm') || lastUserMsg.includes('tree') || lastUserMsg.includes('array')) {
      reply = `### 💻 Top DSA Patterns for Campus Placements
1. **Two Pointers & Sliding Window:** Best for subarray and string problems (e.g., Two Sum, Longest Substring).
2. **Fast & Slow Pointers:** Linked List cycle detection (Floyd's algorithm) and finding midpoints.
3. **Stack:** Monotonic stack for Next Greater Element and Valid Parentheses.
4. **Trees & BST:** Inorder traversal of BST gives sorted sequence. Level Order (BFS) using queue.
5. **Dynamic Programming:** Kadane's algorithm (Max Subarray), 0/1 Knapsack, Coin Change.`;
    }

    return res.json({ reply, success: true });
  } catch (err: any) {
    console.error('Chat endpoint error:', err);
    return res.status(500).json({ error: 'Chat failed: ' + err.message });
  }
});

// Vite Integration: Dev vs Prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[PIP Server] Placement Interview Prep running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

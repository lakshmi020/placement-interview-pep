import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  Volume2, 
  RotateCcw, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ThumbsUp, 
  TrendingUp, 
  ArrowRight, 
  User, 
  Bot,
  Play,
  Share2,
  Trophy
} from 'lucide-react';
import { ApiService } from '../services/api';
import { MockInterviewFeedback, MockInterviewTurn } from '../types';

export const MockInterviewPage: React.FC = () => {
  const { currentUser } = useAuth();

  // Setup state
  const [inSession, setInSession] = useState(false);
  const [jobRole, setJobRole] = useState(currentUser?.preferredJobRole || 'Software Development Engineer (SDE)');
  const [experienceLevel, setExperienceLevel] = useState('Fresher / Campus Placement');
  const [interviewType, setInterviewType] = useState('Mixed (Technical + HR)');
  const [difficulty, setDifficulty] = useState('Medium');

  // Interview state
  const [questionIdx, setQuestionIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [turns, setTurns] = useState<MockInterviewTurn[]>([]);
  const [interviewComplete, setInterviewComplete] = useState(false);

  // Voice speech synthesis & speech recognition
  const recognitionRef = useRef<any>(null);

  const questionBank = [
    {
      role: 'general',
      q: 'Tell me about yourself, your educational background, and why you are interested in this software engineering role.'
    },
    {
      role: 'technical',
      q: 'Can you explain the difference between a Process and a Thread, and how Context Switching affects CPU performance?'
    },
    {
      role: 'technical',
      q: 'Explain how indexing works in databases. Why are B+ Trees predominantly preferred over standard Binary Search Trees?'
    },
    {
      role: 'behavioral',
      q: 'Describe a challenging bug or team disagreement you faced in an academic project and how you resolved it.'
    },
    {
      role: 'company_fit',
      q: 'Where do you see your technical career progressing over the next three to five years?'
    }
  ];

  const currentQuestionText = questionBank[questionIdx]?.q || 'Do you have any final questions for our technical team?';

  // Speech Recognition Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserAnswer(prev => prev + ' ' + transcript);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser. Please type your answer.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const speakQuestion = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartInterview = () => {
    setInSession(true);
    setQuestionIdx(0);
    setUserAnswer('');
    setTurns([]);
    setInterviewComplete(false);
    speakQuestion(questionBank[0].q);
  };

  const handleSubmitAnswer = async () => {
    if (!userAnswer.trim()) return;

    if (isRecording && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    setIsEvaluating(true);
    try {
      const feedback = await ApiService.evaluateInterviewAnswer(
        currentQuestionText,
        userAnswer.trim(),
        jobRole,
        interviewType,
        difficulty
      );

      const newTurn: MockInterviewTurn = {
        id: 'turn_' + Date.now(),
        question: currentQuestionText,
        userAnswer: userAnswer.trim(),
        feedback,
        timestamp: new Date().toLocaleTimeString()
      };

      setTurns(prev => [...prev, newTurn]);
      setUserAnswer('');

      if (questionIdx + 1 >= questionBank.length) {
        setInterviewComplete(true);
      } else {
        const nextQ = questionBank[questionIdx + 1].q;
        setQuestionIdx(prev => prev + 1);
        speakQuestion(nextQ);
      }
    } finally {
      setIsEvaluating(false);
    }
  };

  // Compute final interview stats
  const averageScore = turns.length > 0 
    ? Math.round((turns.reduce((acc, t) => acc + (t.feedback?.overallScore || 7), 0) / turns.length) * 10) / 10
    : 8.2;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>AI Interview Simulator • Gemini 3.8 Powered Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Placement Mock Interview
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 max-w-xl">
            Attend live interactive technical, HR, and company-style simulated rounds with voice input and instant multi-metric feedback.
          </p>
        </div>

        {inSession && !interviewComplete && (
          <button
            onClick={() => setInSession(false)}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 self-start md:self-auto shrink-0"
          >
            End Interview
          </button>
        )}
      </div>

      {/* Screen 1: Simulator Configuration */}
      {!inSession && !interviewComplete && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Configure Your Mock Interview
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target Job Role
              </label>
              <select
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
              >
                <option value="Software Development Engineer (SDE)">Software Development Engineer (SDE)</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Full Stack Engineer">Full Stack Engineer</option>
                <option value="Data Analyst">Data Analyst</option>
                <option value="Cloud / DevOps Engineer">Cloud / DevOps Engineer</option>
                <option value="QA Engineer">QA & Automation Test Engineer</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Candidate Experience Level
              </label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
              >
                <option value="Fresher / Campus Placement">Fresher / Campus Placement</option>
                <option value="0 - 1 Year Experience">0 - 1 Year Experience</option>
                <option value="1 - 2 Years Experience">1 - 2 Years Experience</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Interview Type
              </label>
              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
              >
                <option value="Mixed (Technical + HR)">Mixed (Technical + HR)</option>
                <option value="Technical Round (DSA, OS, DBMS)">Technical Round (DSA, OS, DBMS)</option>
                <option value="HR & Behavioral Round">HR & Behavioral Round</option>
                <option value="Company Style: TCS NQT">Company Style: TCS NQT</option>
                <option value="Company Style: Infosys DSE">Company Style: Infosys DSE</option>
                <option value="Company Style: Accenture ASE">Company Style: Accenture ASE</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-medium text-slate-900 dark:text-white"
              >
                <option value="Easy">Easy (Standard Campus Basics)</option>
                <option value="Medium">Medium (Industry Standard)</option>
                <option value="Hard">Hard (Deep CS Core & Systems)</option>
              </select>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-purple-900 dark:text-purple-200">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-600" />
              <span>Voice Speech-to-Text Input</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-600" />
              <span>Scoring across 6 Key Metrics</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span>STAR Method Answer Upgrades</span>
            </div>
          </div>

          <button
            onClick={handleStartInterview}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Begin Mock Interview Session</span>
          </button>
        </div>
      )}

      {/* Screen 2: Active Live Interview Session */}
      {inSession && !interviewComplete && (
        <div className="space-y-6">
          {/* Question Box */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/60 text-purple-600 dark:text-purple-300 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-white">AI Placement Interviewer</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => speakQuestion(currentQuestionText)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs flex items-center gap-1"
                  title="Read question aloud"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="text-[11px] hidden sm:inline">Listen</span>
                </button>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                  Question {questionIdx + 1} of {questionBank.length}
                </span>
              </div>
            </div>

            <p className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
              &ldquo;{currentQuestionText}&rdquo;
            </p>
          </div>

          {/* Answer Input Area */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-indigo-500" />
                <span>Your Answer (Speak or Type)</span>
              </label>

              <button
                onClick={toggleRecording}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                  isRecording
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isRecording ? 'Listening (Click to Stop)' : 'Voice Input'}</span>
              </button>
            </div>

            <textarea
              rows={5}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Structure your answer clearly. Mention technical skills, frameworks, or project examples where relevant..."
              className="w-full p-4 rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">
                Word count: {userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0} words
              </span>

              <button
                onClick={handleSubmitAnswer}
                disabled={isEvaluating || !userAnswer.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-2 disabled:opacity-50 transition-all"
              >
                {isEvaluating ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-spin" />
                    <span>AI Evaluating Answer...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Get AI Feedback</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Feedback from Previous Turns in this session */}
          {turns.length > 0 && (
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Previous Answers Evaluation
              </h4>

              {turns.slice().reverse().map((turn) => {
                const fb = turn.feedback;
                if (!fb) return null;

                return (
                  <div
                    key={turn.id}
                    className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Question Asked</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">{turn.question}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 font-semibold">Score</span>
                        <div className="text-xl font-black text-indigo-600 dark:text-indigo-400">
                          {fb.overallScore} / 10
                        </div>
                      </div>
                    </div>

                    {/* 6 Metrics Score Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Technical</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.technicalAccuracy}/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Communication</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.communication}/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Relevance</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.relevance}/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Structure</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.structure}/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Confidence</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.confidence}/10</span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                        <span className="text-[10px] text-slate-400 block">Completeness</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{fb.completeness}/10</span>
                      </div>
                    </div>

                    {/* What you did well & What to improve */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/60 space-y-1">
                        <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5" /> What You Did Well
                        </span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                          {fb.whatYouDidWell.map((w, idx) => (
                            <li key={idx}>• {w}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 space-y-1">
                        <span className="font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" /> What You Can Improve
                        </span>
                        <ul className="space-y-1 text-slate-600 dark:text-slate-300">
                          {fb.whatYouCanImprove.map((imp, idx) => (
                            <li key={idx}>• {imp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Sample Improved Answer */}
                    <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-1 text-xs">
                      <span className="font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> Sample Improved STAR Answer
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        {fb.sampleImprovedAnswer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Screen 3: Final Completed Scorecard Report */}
      {interviewComplete && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-purple-500/25">
              <Trophy className="w-8 h-8" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Mock Interview Finished!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              You completed all questions in the <b>{interviewType}</b> for <b>{jobRole}</b>.
            </p>

            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-950/40 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 max-w-sm mx-auto">
              <span className="text-xs uppercase font-bold text-slate-400">Final Interview Rating</span>
              <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 my-1">
                {averageScore} / 10
              </div>
              <span className="text-xs font-bold text-emerald-600">Placement Ready Candidate</span>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleStartInterview}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700"
              >
                Retake Mock Interview
              </button>
              <button
                onClick={() => setInSession(false)}
                className="px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Change Interview Config
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

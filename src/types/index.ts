export type EducationLevel = 'Diploma' | 'B.Tech' | 'B.E' | 'MCA' | 'Other';

export type Branch = 'CSE' | 'ECE' | 'EEE' | 'Mechanical' | 'Civil' | 'IT' | 'Other';

export interface User {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  educationLevel: EducationLevel;
  branch: Branch;
  collegeName: string;
  currentYear: string;
  gradYear: string;
  cgpa: string;
  programmingLanguages: string[];
  technicalSkills: string[];
  preferredJobRole: string;
  createdAt?: string;
}

export interface ProgressSummary {
  overallPercentage: number;
  codingScore: number;
  aptitudeScore: number;
  technicalScore: number;
  hrScore: number;
  mockInterviewsCompleted: number;
  solvedCodingCount: number;
  totalCodingCount: number;
}

export interface WeakAreaItem {
  id: string;
  subject: string;
  status: 'critical' | 'average' | 'good';
  label: string;
  score: number;
  recommendation: string;
  actionUrl: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedHours: number;
  completed: boolean;
  resourcesCount: number;
  practiceLink?: string;
}

export interface RoadmapWeek {
  weekNumber: number;
  title: string;
  subtitle: string;
  topics: RoadmapTopic[];
}

export interface TechnicalTopic {
  id: string;
  categoryId: string;
  categoryName: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  conceptOverview: string;
  keyConcepts: string[];
  questions: TechnicalQuestion[];
}

export interface TechnicalQuestion {
  id: string;
  question: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  answer: string;
  codeSnippet?: string;
  keyPoints?: string[];
  isMastered?: boolean;
}

export interface CodingProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  acceptanceRate: string;
  solved: boolean;
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: {
    c: string;
    cpp: string;
    java: string;
    python: string;
    javascript: string;
  };
  testCases: {
    input: string;
    expected: string;
    isHidden?: boolean;
  }[];
}

export interface AptitudeQuestion {
  id: string;
  category: 'Quantitative' | 'Logical' | 'Verbal';
  subCategory: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  shortcutTip?: string;
}

export interface HRQuestion {
  id: string;
  question: string;
  category: 'Self-Introduction' | 'Behavioral' | 'Situational' | 'Company Fit' | 'Future Goals';
  intent: string;
  tips: string[];
  sampleAnswer: string;
  commonMistakes: string[];
}

export interface CompanyPrep {
  id: string;
  name: string;
  shortName: string;
  logoColor: string;
  tagline: string;
  eligibility: string;
  recruitmentProcess: {
    roundNumber: number;
    title: string;
    duration: string;
    description: string;
  }[];
  aptitudeTopics: string[];
  technicalTopics: string[];
  hrTopics: string[];
  sampleQuestions: {
    id: string;
    round: string;
    question: string;
    tip: string;
    type: 'general_practice' | 'pattern_based';
  }[];
}

export interface MockInterviewFeedback {
  technicalAccuracy: number;
  communication: number;
  relevance: number;
  structure: number;
  confidence: number;
  completeness: number;
  overallScore: number;
  whatYouDidWell: string[];
  whatYouCanImprove: string[];
  sampleImprovedAnswer: string;
  summary: string;
}

export interface MockInterviewTurn {
  id: string;
  question: string;
  userAnswer: string;
  feedback?: MockInterviewFeedback;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'recommendation' | 'milestone' | 'reminder' | 'update';
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

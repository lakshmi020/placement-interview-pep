import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Code2, 
  Brain, 
  Mic, 
  UserCheck, 
  Building2, 
  BarChart3, 
  Map, 
  ChevronRight, 
  Star, 
  Users, 
  Trophy, 
  GraduationCap,
  ShieldCheck,
  Zap,
  Bot
} from 'lucide-react';
import { COMPANY_PREPARATION_DATA } from '../data/mockData';

export const LandingPage: React.FC = () => {
  const { setActiveTab, isAuthenticated } = useAuth();

  const features = [
    {
      icon: Bot,
      color: 'from-purple-600 to-indigo-700',
      title: '24/7 AI Placement Mentor',
      desc: 'Ask placement questions, verify algorithm logic, review HR answers, and get company blueprints powered by Google Gemini.',
      badge: 'Gemini AI',
      isChatbotTrigger: true,
      tab: 'chat'
    },
    {
      icon: Target,
      color: 'from-blue-500 to-indigo-600',
      title: 'Personalized Preparation',
      desc: 'Smart roadmaps uniquely generated for your degree (Diploma, B.Tech, MCA), branch, and target role.',
      tab: 'roadmap'
    },
    {
      icon: Code2,
      color: 'from-emerald-500 to-teal-600',
      title: 'Coding Practice Arena',
      desc: 'Interactive multi-language compiler (C, C++, Java, Python, JS) with test cases and solved tracking.',
      tab: 'coding'
    },
    {
      icon: Brain,
      color: 'from-amber-500 to-orange-600',
      title: 'Aptitude Practice & Tests',
      desc: 'Quantitative, Logical Reasoning, and Verbal timed quizzes with instant step-by-step explanations.',
      tab: 'aptitude'
    },
    {
      icon: Mic,
      color: 'from-purple-500 to-pink-600',
      title: 'AI Mock Interview Simulator',
      desc: 'Voice & text interviewer powered by Gemini AI with real-time scoring across 6 key metrics.',
      badge: 'AI Powered',
      tab: 'mock-interview'
    },
    {
      icon: UserCheck,
      color: 'from-rose-500 to-red-600',
      title: 'HR Interview Preparation',
      desc: 'Curated behavioral questions, STAR method answer frameworks, recruiter intent, and common traps.',
      tab: 'hr'
    },
    {
      icon: Building2,
      color: 'from-cyan-500 to-blue-600',
      title: 'Company Specific Prep',
      desc: 'In-depth recruitment rounds, syllabus weightage, and patterns for TCS, Infosys, Wipro, Accenture, etc.',
      tab: 'companies'
    },
    {
      icon: BarChart3,
      color: 'from-violet-500 to-purple-600',
      title: 'Progress & Weak Areas',
      desc: 'Visual circular indicators, performance charts, and automated revision recommendations.',
      tab: 'progress'
    },
    {
      icon: Map,
      color: 'from-teal-500 to-emerald-600',
      title: 'Structured Career Roadmap',
      desc: 'Week-by-week actionable checklists from fundamentals to final mock rounds.',
      tab: 'roadmap'
    }
  ];

  const steps = [
    { number: '01', title: 'Register', desc: 'Set up your educational degree, branch & preferred role.' },
    { number: '02', title: 'Select Career', desc: 'Choose your target track: SDE, Frontend, Data, or Analyst.' },
    { number: '03', title: 'Learn', desc: 'Master core concepts across 14+ computer science subjects.' },
    { number: '04', title: 'Practice', desc: 'Solve coding problems and timed aptitude quizzes.' },
    { number: '05', title: 'Mock Interview', desc: 'Simulate company rounds with our live voice AI interviewer.' },
    { number: '06', title: 'Track Progress', desc: 'Analyze weak areas and boost your placement readiness score.' },
  ];

  return (
    <div className="space-y-24 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-cyan-500/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Placement Interview Prep (PIP) • 2026 Campus Hiring Ready</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Your Personal Placement <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
              Preparation Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Learn, Practice, Attend Mock Interviews and Build the confidence to crack your next placement.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab(isAuthenticated ? 'dashboard' : 'register')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
            >
              <span>{isAuthenticated ? 'Open Student Dashboard' : 'Start Preparing Free'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-pip-chatbot'));
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-bold text-sm hover:bg-purple-100 dark:hover:bg-purple-900/60 shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span>Ask AI Placement Mentor</span>
            </button>
            <a
              href="#features"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Features</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Trust Metrics Pill Strip */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Users className="w-4 h-4 text-indigo-500" />
              <span>50,000+ Students Prepared</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Code2 className="w-4 h-4 text-emerald-500" />
              <span>100+ Coding Challenges</span>
            </div>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <Building2 className="w-4 h-4 text-cyan-500" />
              <span>9 Top IT Recruiters Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Target Recruiters Logo Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400 mb-5">
            Prepare for On-Campus & Off-Campus Hiring Drives
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {COMPANY_PREPARATION_DATA.map((company) => (
              <button
                key={company.id}
                onClick={() => setActiveTab('companies', { companyId: company.id })}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 group"
              >
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${company.logoColor}`} />
                <span>{company.name}</span>
                <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Comprehensive Placement Suite
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything You Need To Get Placed
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A complete platform built specifically for Indian college students, engineering freshers, and diploma candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const IconComp = feature.icon;
            return (
              <div
                key={idx}
                onClick={() => {
                  if ((feature as any).isChatbotTrigger) {
                    window.dispatchEvent(new CustomEvent('open-pip-chatbot'));
                  } else {
                    setActiveTab(feature.tab);
                  }
                }}
                className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-700/60 hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-tr ${feature.color} text-white shadow-md shadow-indigo-500/10`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    {feature.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/80 dark:text-purple-300">
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  <span>Explore module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white relative overflow-hidden shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-bold tracking-wider text-indigo-200">
              Structured Placement Pipeline
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              How Placement Interview Prep Works
            </h2>
            <p className="text-sm text-indigo-200/80">
              Follow our proven 6-step roadmap engineered to take you from initial syllabus uncertainty to offer-ready confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs flex flex-col justify-between hover:bg-white/10 transition-colors"
              >
                <div>
                  <span className="text-2xl font-black text-indigo-400/80 tracking-tight">
                    {st.number}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2">{st.title}</h4>
                  <p className="text-xs text-indigo-200/70 mt-1 leading-relaxed">{st.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block pt-3 text-right text-indigo-400/40">
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setActiveTab(isAuthenticated ? 'dashboard' : 'register')}
              className="px-8 py-3.5 rounded-xl bg-white text-indigo-900 font-bold text-sm shadow-xl hover:bg-indigo-50 hover:scale-105 transition-all"
            >
              Start Your Placement Journey Today
            </button>
          </div>
        </div>
      </section>

      {/* Diploma vs B.Tech Personalized Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Diploma Focus */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300 font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Diploma Students Path</h3>
                <p className="text-xs text-slate-500">Government Polytechnic & Diploma Candidates</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Curated to bridge foundational concepts smoothly into junior software engineer and technical associate roles:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Programming Basics</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Python / Java OOP</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Essential Data Structures</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> DBMS & SQL Joins</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Web Development (HTML/CSS)</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Aptitude & Mock Mocks</span>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="pt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:underline"
            >
              <span>View Diploma CSE Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Card 2: B.Tech / B.E Focus */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-300 font-bold">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">B.Tech / B.E Final Year Path</h3>
                <p className="text-xs text-slate-500">Tier 1, 2 & 3 Engineering College Graduates</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Engineered for high-yield competitive coding, core computer science defense, and top recruiter assessments:
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Advanced DSA & Dynamic Prog.</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Operating Systems & Threads</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Computer Networks & TCP/IP</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> ACID & Complex SQL Queries</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Capstone Project Architecture</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> Company-Style AI Mocks</span>
            </div>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1 hover:underline"
            >
              <span>View B.Tech CSE Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

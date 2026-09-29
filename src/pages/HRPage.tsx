import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  HelpCircle, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb, 
  Mic, 
  ChevronDown, 
  ChevronUp, 
  Search,
  ArrowRight
} from 'lucide-react';
import { HR_QUESTIONS } from '../data/mockData';

export const HRPage: React.FC = () => {
  const { setActiveTab } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string>('hr-1');

  const filtered = HR_QUESTIONS.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.sampleAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-900 via-pink-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-200">
            <Sparkles className="w-4 h-4 text-rose-300" />
            <span>Behavioral & HR Interview Mastery • STAR Method Framework</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            HR Interview Preparation
          </h1>
          <p className="text-xs sm:text-sm text-rose-200/80 max-w-xl">
            Master the most critical behavioral and cultural fit questions asked in campus recruitment rounds by TCS, Infosys, Accenture, and product firms.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('mock-interview')}
          className="px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-md shadow-rose-600/25 flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
        >
          <Mic className="w-4 h-4" />
          <span>Practice HR Round in AI Mock</span>
        </button>
      </div>

      {/* STAR Framework Explainer Box */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amber-500" />
          <span>The Golden Formula: STAR Behavioral Technique</span>
        </h3>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Top corporate interviewers evaluate candidates on structured storytelling. Frame your project and behavioral answers using:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1 text-xs">
          <div className="p-3 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900">
            <span className="font-bold text-indigo-700 dark:text-indigo-300 block">S - Situation</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">Set the context and background clearly in 1-2 sentences.</span>
          </div>
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-100 dark:border-purple-900">
            <span className="font-bold text-purple-700 dark:text-purple-300 block">T - Task</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">Describe the challenge or responsibility you had to address.</span>
          </div>
          <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900">
            <span className="font-bold text-blue-700 dark:text-blue-300 block">A - Action</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">Explain the exact steps, tools, and code you contributed.</span>
          </div>
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900">
            <span className="font-bold text-emerald-700 dark:text-emerald-300 block">R - Result</span>
            <span className="text-slate-600 dark:text-slate-400 text-[11px]">Quantify outcome with metrics (e.g. 40% speed boost).</span>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search HR questions (e.g. strengths, weakness, relocate, 5 years)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
      </div>

      {/* HR Questions Accordion Cards */}
      <div className="space-y-4">
        {filtered.map((item) => {
          const isExpanded = expandedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? '' : item.id)}
                className="p-5 sm:p-6 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 select-none"
              >
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                    {item.category}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </h3>
                </div>

                <div className="p-1 rounded-lg text-slate-400 shrink-0">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-5">
                  {/* Interviewer Intent */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-indigo-500" /> Recruiter Hidden Intent (What They Look For)
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {item.intent}
                    </p>
                  </div>

                  {/* Tips */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Pro Tips & Strategy
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
                      {item.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sample Answer */}
                  <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> High-Impact Sample Answer
                    </span>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed italic">
                      {item.sampleAnswer}
                    </p>
                  </div>

                  {/* Common Mistakes */}
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-1.5">
                    <span className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500" /> Common Mistakes & Red Flags to Avoid
                    </span>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                      {item.commonMistakes.map((mistake, idx) => (
                        <li key={idx}>• {mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

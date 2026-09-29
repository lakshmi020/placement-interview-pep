import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3, 
  Trophy, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  ArrowRight, 
  TrendingUp, 
  Clock, 
  Sparkles,
  BookOpen,
  Code2,
  Brain,
  Mic
} from 'lucide-react';
import { ApiService } from '../services/api';
import { INITIAL_WEAK_AREAS } from '../data/mockData';

export const ProgressPage: React.FC = () => {
  const { currentUser, setActiveTab } = useAuth();

  const user = currentUser || {
    id: 'guest',
    fullName: 'Student',
    email: 'guest@example.com',
    mobile: '',
    educationLevel: 'B.Tech' as const,
    branch: 'CSE' as const,
    collegeName: 'Engineering College',
    currentYear: 'Final Year',
    gradYear: '2026',
    cgpa: '8.5',
    programmingLanguages: ['Java', 'Python'],
    technicalSkills: ['Data Structures', 'DBMS'],
    preferredJobRole: 'Software Development Engineer (SDE)'
  };

  const stats = ApiService.getProgressSummary(user);

  const categories = [
    { label: 'Technical Core (14 Subjects)', score: stats.technicalScore, color: 'text-blue-500', barColor: 'bg-blue-500', icon: BookOpen, action: 'technical' },
    { label: 'Coding Practice Arena', score: stats.codingScore, color: 'text-emerald-500', barColor: 'bg-emerald-500', icon: Code2, action: 'coding' },
    { label: 'Aptitude & Cognitive Reasoning', score: stats.aptitudeScore, color: 'text-amber-500', barColor: 'bg-amber-500', icon: Brain, action: 'aptitude' },
    { label: 'HR Behavioral & STAR Readiness', score: stats.hrScore, color: 'text-rose-500', barColor: 'bg-rose-500', icon: Sparkles, action: 'hr' },
    { label: 'AI Mock Interviews Evaluated', score: 82, color: 'text-purple-500', barColor: 'bg-purple-500', icon: Mic, action: 'mock-interview' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200">
            <BarChart3 className="w-4 h-4 text-indigo-400" />
            <span>Placement Readiness Metrics & Diagnostics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Performance & Weak Areas Analysis
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-xl">
            Real-time tracking of your syllabus milestones, coding accuracy, cognitive speed, and personalized improvement areas.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 shrink-0">
          {/* Circular Progress Gauge */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-white/10"
                strokeWidth="3.8"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-indigo-400"
                strokeDasharray={`${stats.overallPercentage}, 100`}
                strokeWidth="3.8"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-sm font-black text-white">{stats.overallPercentage}%</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-200 block">Readiness Rating</span>
            <span className="text-sm font-extrabold text-emerald-400">Placement Ready</span>
          </div>
        </div>
      </div>

      {/* Weak Areas Section with Diagnostic Badges */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>Diagnosed Weak Areas & Recommended Focus</span>
            </h3>
            <p className="text-xs text-slate-500">
              Based on your quiz attempts, coding errors, and mock interview transcript evaluations:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {INITIAL_WEAK_AREAS.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border space-y-2 flex flex-col justify-between ${
                item.status === 'critical'
                  ? 'border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20'
                  : item.status === 'average'
                  ? 'border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20'
                  : 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-bold text-slate-900 dark:text-white">{item.subject}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === 'critical'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : item.status === 'average'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    }`}
                  >
                    {item.label} ({item.score}%)
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {item.recommendation}
                </p>
              </div>

              <button
                onClick={() => setActiveTab(item.actionUrl)}
                className="pt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 self-start"
              >
                <span>Targeted Revision Exercise</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Breakdown across 5 Modules */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Category Progress Breakdown
        </h3>

        <div className="space-y-5">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200">
                    <IconComp className={`w-4 h-4 ${cat.color}`} />
                    <span>{cat.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-900 dark:text-white font-extrabold">{cat.score}%</span>
                    <button
                      onClick={() => setActiveTab(cat.action)}
                      className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      Practice
                    </button>
                  </div>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`${cat.barColor} h-full rounded-full transition-all duration-300`}
                    style={{ width: `${cat.score}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

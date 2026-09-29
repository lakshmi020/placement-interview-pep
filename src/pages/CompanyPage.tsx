import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  Code2, 
  Brain, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { COMPANY_PREPARATION_DATA } from '../data/mockData';

export const CompanyPage: React.FC = () => {
  const { tabParams, setActiveTab } = useAuth();
  const initialCompanyId = tabParams.companyId || 'company-tcs';

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(initialCompanyId);
  const company = COMPANY_PREPARATION_DATA.find(c => c.id === selectedCompanyId) || COMPANY_PREPARATION_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200">
            <Building2 className="w-4 h-4 text-indigo-400" />
            <span>Target Company Guides • 9 Top Tier IT Recruiters</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Company Specific Placement Preparation
          </h1>
          <p className="text-xs sm:text-sm text-indigo-200/80 max-w-xl">
            Understand specific hiring test patterns, selection criteria, rounds timeline, and domain syllabi for India’s largest campus recruiters.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('mock-interview', { interviewType: `Company Style: ${company.name}` })}
          className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/25 flex items-center gap-2 self-start md:self-auto shrink-0 transition-all"
        >
          <Sparkles className="w-4 h-4" />
          <span>Practice {company.shortName} Mock Round</span>
        </button>
      </div>

      {/* Company Selector Horizontal Bar */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-3 min-w-max">
          {COMPANY_PREPARATION_DATA.map((comp) => {
            const isSelected = comp.id === selectedCompanyId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedCompanyId(comp.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className={`w-2.5 h-2.5 rounded-full bg-gradient-to-r ${comp.logoColor}`} />
                <span>{comp.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Company Deep Dive Card */}
      <div className="space-y-8">
        {/* Company Profile & Eligibility */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {company.name} ({company.shortName})
                </h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                  Verified Pattern
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {company.tagline}
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1">
            <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Standard Academic Eligibility Criteria
            </span>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {company.eligibility}
            </p>
          </div>
        </div>

        {/* Recruitment Process & Common Rounds */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-500" />
            <span>Recruitment Process & Common Rounds</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {company.recruitmentProcess.map((round) => (
              <div
                key={round.roundNumber}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                      R{round.roundNumber}
                    </span>
                    <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {round.duration}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {round.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {round.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Pillars Breakdown: Aptitude, Technical, HR Topics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Aptitude Topics */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-sm">
              <Brain className="w-5 h-5" />
              <span>Aptitude Focus</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {company.aptitudeTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveTab('aptitude')}
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>Practice Aptitude Drills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Technical Topics */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
              <Code2 className="w-5 h-5" />
              <span>Technical Focus</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {company.technicalTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveTab('technical')}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>Explore Technical Q&As</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* HR Topics */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <Sparkles className="w-5 h-5" />
              <span>HR & Cultural Fit</span>
            </div>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {company.hrTopics.map((topic, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                  <span>{topic}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => setActiveTab('hr')}
              className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
            >
              <span>View HR STAR Answers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Practice Questions with clear labeling */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Curated Practice Questions for {company.name}
            </h3>
            <span className="text-[11px] text-slate-400 italic">
              Questions clearly labeled by syllabus pattern
            </span>
          </div>

          <div className="space-y-3">
            {company.sampleQuestions.map((sq) => (
              <div
                key={sq.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {sq.round}
                  </span>
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                    {sq.type === 'pattern_based' ? 'Company Pattern Syllabus' : 'General Practice Question'}
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  {sq.question}
                </h4>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">Tip:</span>
                  <span>{sq.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

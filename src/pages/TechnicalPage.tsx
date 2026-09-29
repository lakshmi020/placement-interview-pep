import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Code2, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Sparkles,
  Bookmark,
  Share2,
  Terminal
} from 'lucide-react';
import { TECHNICAL_CATEGORIES } from '../data/mockData';

export const TechnicalPage: React.FC = () => {
  const { tabParams, setActiveTab } = useAuth();
  const initialCategory = tabParams.category || 'c';

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<string, boolean>>({
    'c-q1': true,
    'cpp-q1': true,
    'java-q1': true,
    'py-q1': true,
    'dbms-q1': true
  });
  const [masteredQuestions, setMasteredQuestions] = useState<Set<string>>(new Set(['c-q1', 'oop-q1']));

  const currentCategory = TECHNICAL_CATEGORIES.find(c => c.categoryId === selectedCategoryId) || TECHNICAL_CATEGORIES[0];

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredQuestions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredQuestions = currentCategory.questions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200">
            <BookOpen className="w-4 h-4 text-blue-400" />
            <span>14 Core Technical Categories • Campus Interview Question Bank</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Technical Interview Preparation
          </h1>
          <p className="text-xs sm:text-sm text-blue-200/80 max-w-xl">
            Revise fundamental computer science concepts, master high-frequency campus placement questions, and practice code implementations.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('coding')}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md shadow-blue-500/25 flex items-center gap-2 self-start md:self-auto shrink-0"
        >
          <Code2 className="w-4 h-4" />
          <span>Go to Coding Practice</span>
        </button>
      </div>

      {/* Category Pills Navigation (Horizontal Scrollable) */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {TECHNICAL_CATEGORIES.map((cat) => {
            const isSelected = cat.categoryId === selectedCategoryId;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.categoryId)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 scale-105'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>{cat.categoryName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {cat.questions.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Concept Overview Card (1 col) */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 sticky top-24">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Concept Syllabus
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                {currentCategory.difficulty} Difficulty
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {currentCategory.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              {currentCategory.conceptOverview}
            </p>

            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Key Exam Themes
              </h4>
              <ul className="space-y-2">
                {currentCategory.keyConcepts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => setActiveTab('coding', { category: currentCategory.categoryName.toLowerCase() })}
              className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Practice {currentCategory.categoryName} Coding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Questions List (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search within Category */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Search ${currentCategory.categoryName} interview questions and concepts...`}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-400 text-xs">
                No questions found matching your search.
              </div>
            ) : (
              filteredQuestions.map((q) => {
                const isExpanded = !!expandedQuestions[q.id];
                const isMastered = masteredQuestions.has(q.id);

                return (
                  <div
                    key={q.id}
                    className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden transition-all"
                  >
                    {/* Question Header */}
                    <div
                      onClick={() => toggleQuestion(q.id)}
                      className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50/60 dark:hover:bg-slate-800/40 select-none"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                              q.difficulty === 'Easy'
                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                                : q.difficulty === 'Medium'
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            }`}
                          >
                            {q.difficulty}
                          </span>
                          {isMastered && (
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Mastered
                            </span>
                          )}
                        </div>
                        <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={(e) => toggleMastered(q.id, e)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors ${
                            isMastered
                              ? 'border-emerald-300 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40'
                              : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-600'
                          }`}
                          title="Bookmark / Mark as Mastered"
                        >
                          <Bookmark className={`w-4 h-4 ${isMastered ? 'fill-current' : ''}`} />
                        </button>
                        <div className="p-1 rounded-lg text-slate-400">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Question Answer & Details */}
                    {isExpanded && (
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100 dark:border-slate-800/80 space-y-4">
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                            Expected Placement Answer
                          </span>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                            {q.answer}
                          </p>
                        </div>

                        {q.codeSnippet && (
                          <div className="rounded-2xl bg-slate-950 text-slate-200 p-4 font-mono text-xs overflow-x-auto shadow-inner">
                            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400">
                              <span className="flex items-center gap-1.5">
                                <Terminal className="w-3 h-3 text-indigo-400" /> Code Demonstration
                              </span>
                            </div>
                            <pre>{q.codeSnippet}</pre>
                          </div>
                        )}

                        {q.keyPoints && (
                          <div className="p-3.5 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/60 space-y-1.5">
                            <span className="text-[11px] font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5 text-indigo-500" /> High-Yield Key Points to Mention
                            </span>
                            <ul className="space-y-1">
                              {q.keyPoints.map((kp, idx) => (
                                <li key={idx} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5">
                                  <span className="text-indigo-500 font-bold">•</span>
                                  <span>{kp}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

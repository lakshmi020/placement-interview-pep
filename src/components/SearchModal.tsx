import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Code2, BookOpen, Brain, Building2, UserCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { TECHNICAL_CATEGORIES, CODING_PROBLEMS, APTITUDE_QUESTIONS, HR_QUESTIONS, COMPANY_PREPARATION_DATA } from '../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
  type: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: any;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { setActiveTab } = useAuth();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'technical' | 'coding' | 'aptitude' | 'companies' | 'hr'>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open handled outside
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results compilation
  const results: SearchResultItem[] = [];

  if (q.length > 0) {
    // 1. Technical Topics & Questions
    if (activeFilter === 'all' || activeFilter === 'technical') {
      TECHNICAL_CATEGORIES.forEach(cat => {
        if (cat.categoryName.toLowerCase().includes(q) || cat.title.toLowerCase().includes(q)) {
          results.push({
            type: 'technical',
            title: cat.categoryName,
            subtitle: cat.title,
            badge: cat.difficulty,
            icon: BookOpen,
            action: () => {
              setActiveTab('technical', { category: cat.categoryId });
              onClose();
            }
          });
        }
        cat.questions.forEach(quest => {
          if (quest.question.toLowerCase().includes(q) || quest.answer.toLowerCase().includes(q)) {
            results.push({
              type: 'technical',
              title: quest.question,
              subtitle: `${cat.categoryName} • ${quest.difficulty}`,
              badge: 'Question',
              icon: BookOpen,
              action: () => {
                setActiveTab('technical', { category: cat.categoryId, questionId: quest.id });
                onClose();
              }
            });
          }
        });
      });
    }

    // 2. Coding Problems
    if (activeFilter === 'all' || activeFilter === 'coding') {
      CODING_PROBLEMS.forEach(prob => {
        if (prob.title.toLowerCase().includes(q) || prob.category.toLowerCase().includes(q) || prob.description.toLowerCase().includes(q)) {
          results.push({
            type: 'coding',
            title: prob.title,
            subtitle: `${prob.category} • Acceptance ${prob.acceptanceRate}`,
            badge: prob.difficulty,
            icon: Code2,
            action: () => {
              setActiveTab('coding', { problemId: prob.id });
              onClose();
            }
          });
        }
      });
    }

    // 3. Aptitude Topics & Questions
    if (activeFilter === 'all' || activeFilter === 'aptitude') {
      APTITUDE_QUESTIONS.forEach(apt => {
        if (apt.question.toLowerCase().includes(q) || apt.subCategory.toLowerCase().includes(q) || apt.category.toLowerCase().includes(q)) {
          results.push({
            type: 'aptitude',
            title: apt.question,
            subtitle: `${apt.category} • ${apt.subCategory}`,
            badge: 'Aptitude',
            icon: Brain,
            action: () => {
              setActiveTab('aptitude', { category: apt.category.toLowerCase() });
              onClose();
            }
          });
        }
      });
    }

    // 4. Companies
    if (activeFilter === 'all' || activeFilter === 'companies') {
      COMPANY_PREPARATION_DATA.forEach(comp => {
        if (comp.name.toLowerCase().includes(q) || comp.shortName.toLowerCase().includes(q) || comp.tagline.toLowerCase().includes(q)) {
          results.push({
            type: 'companies',
            title: comp.name,
            subtitle: comp.tagline,
            badge: 'Company Guide',
            icon: Building2,
            action: () => {
              setActiveTab('companies', { companyId: comp.id });
              onClose();
            }
          });
        }
      });
    }

    // 5. HR Questions
    if (activeFilter === 'all' || activeFilter === 'hr') {
      HR_QUESTIONS.forEach(hr => {
        if (hr.question.toLowerCase().includes(q) || hr.category.toLowerCase().includes(q) || hr.intent.toLowerCase().includes(q)) {
          results.push({
            type: 'hr',
            title: hr.question,
            subtitle: `HR • ${hr.category}`,
            badge: 'HR Prep',
            icon: UserCheck,
            action: () => {
              setActiveTab('hr', { questionId: hr.id });
              onClose();
            }
          });
        }
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search interview questions, coding problems, aptitude, companies..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-medium">
          {[
            { id: 'all', label: 'All Results' },
            { id: 'technical', label: 'Technical' },
            { id: 'coding', label: 'Coding' },
            { id: 'aptitude', label: 'Aptitude' },
            { id: 'companies', label: 'Companies' },
            { id: 'hr', label: 'HR Questions' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                activeFilter === tab.id
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">Type to search across the entire placement curriculum</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs text-slate-500">
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 cursor-pointer hover:text-indigo-600" onClick={() => setQuery('Two Sum')}>Two Sum</span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 cursor-pointer hover:text-indigo-600" onClick={() => setQuery('ACID')}>ACID Properties</span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 cursor-pointer hover:text-indigo-600" onClick={() => setQuery('TCS')}>TCS NQT</span>
                <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 cursor-pointer hover:text-indigo-600" onClick={() => setQuery('Tell me about yourself')}>Tell me about yourself</span>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm font-medium">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-500 mt-1">Try another keyword or change your filter category.</p>
            </div>
          ) : (
            results.slice(0, 15).map((item, index) => {
              const IconComp = item.icon;
              return (
                <div
                  key={index}
                  onClick={item.action}
                  className="flex items-center justify-between p-3 rounded-xl hover:bg-indigo-50/70 dark:hover:bg-indigo-950/30 group cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-3 min-w-0 pr-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300 shrink-0 mt-0.5 group-hover:scale-105 transition-transform">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts info */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          <span>Search questions, coding, aptitude & companies</span>
          <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> to close</span>
        </div>
      </div>
    </div>
  );
};

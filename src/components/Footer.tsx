import React from 'react';
import { Logo } from './Logo';
import { useAuth } from '../context/AuthContext';
import { Heart, ShieldCheck, Sparkles, BookOpen, Code2, Brain } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useAuth();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" showTagline={true} />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Placement Interview Prep (PIP) is a personalized campus placement preparation platform for college students, diploma holders, and freshers. Practice coding, conquer aptitude tests, master technical concepts, and build interview confidence with AI mock simulators.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> Verified Placement Patterns
              </span>
              <span>•</span>
              <span>100% Free Practice</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Prep Modules
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('roadmap')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Personalized Roadmap
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('technical')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Technical Core (14 Topics)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('coding')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Interactive Coding Arena
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('aptitude')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Aptitude Timed Tests
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('mock-interview')} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1">
                  AI Interview Simulator <Sparkles className="w-3.5 h-3.5 text-purple-500" />
                </button>
              </li>
            </ul>
          </div>

          {/* Companies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Target Recruiters
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('companies', { companyId: 'company-tcs' })} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  TCS NQT Preparation
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('companies', { companyId: 'company-infosys' })} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Infosys SP & DSE
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('companies', { companyId: 'company-wipro' })} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Wipro Elite National Hunt
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('companies', { companyId: 'company-accenture' })} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Accenture ASE Rounds
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('companies', { companyId: 'company-cognizant' })} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Cognizant GenC / Next
                </button>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Student Career
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => setActiveTab('hr')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  HR Behavioral (STAR Method)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('progress')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Weak Areas Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('register')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Student Registration
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('login')} className="hover:text-indigo-600 dark:hover:text-indigo-400">
                  Student Sign In
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Placement Interview Prep (PIP). Built to empower students and freshers.
          </p>
          <p className="text-slate-400 text-[11px] text-center sm:text-right">
            Disclaimer: Company trademarks and exam names belong to their respective owners. Practice questions represent general patterns and syllabus concepts.
          </p>
        </div>
      </div>
    </footer>
  );
};

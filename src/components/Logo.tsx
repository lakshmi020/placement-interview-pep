import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false }) => {
  const iconSizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-13 h-13 text-base'
  };

  const titleSizes = {
    sm: 'text-base font-bold',
    md: 'text-xl font-bold',
    lg: 'text-2xl font-extrabold'
  };

  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Geometric Modern PIP Emblem */}
      <div className={`relative flex items-center justify-center font-black tracking-tighter text-white rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 shadow-md shadow-indigo-500/25 group-hover:shadow-indigo-500/40 group-hover:scale-105 transition-all duration-200 ${iconSizes[size]}`}>
        <span>PIP</span>
        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-slate-900" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-tight">
          <span className={`tracking-tight text-slate-900 dark:text-white ${titleSizes[size]}`}>
            Placement Interview Prep
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
            PIP
          </span>
        </div>
        {showTagline && (
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Prepare Smart. Practice Better. Get Placement Ready.
          </span>
        )}
      </div>
    </div>
  );
};

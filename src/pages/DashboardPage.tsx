import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Trophy, 
  Code2, 
  Brain, 
  BookOpen, 
  Sparkles, 
  Mic, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Flame, 
  Play, 
  BarChart3,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ApiService } from '../services/api';
import { INITIAL_WEAK_AREAS, generatePersonalizedRoadmap } from '../data/mockData';

export const DashboardPage: React.FC = () => {
  const { currentUser, setActiveTab, completedTopics } = useAuth();

  if (!currentUser) return null;

  const stats = ApiService.getProgressSummary(currentUser);
  const roadmap = generatePersonalizedRoadmap(currentUser);

  // Find next unfinished topic
  let nextTopic = null;
  let nextWeekNum = 1;
  for (const week of roadmap) {
    for (const topic of week.topics) {
      if (!completedTopics.has(topic.id)) {
        nextTopic = topic;
        nextWeekNum = week.weekNumber;
        break;
      }
    }
    if (nextTopic) break;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-indigo-500/20 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>4-Day Active Streak • 92% On-Track</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              Welcome, {currentUser.fullName} 👋
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs text-indigo-200/90 font-medium">
              <span className="font-bold text-white px-2 py-0.5 rounded bg-indigo-800/80">
                {currentUser.educationLevel} {currentUser.branch}
              </span>
              <span>•</span>
              <span>{currentUser.currentYear}</span>
              <span>•</span>
              <span>{currentUser.collegeName}</span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold">CGPA: {currentUser.cgpa}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('mock-interview')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 flex items-center gap-2 transition-all"
            >
              <Mic className="w-4 h-4" />
              <span>Start AI Mock</span>
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-colors"
            >
              View Roadmap
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Overall Preparation */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Overall Readiness</span>
            <Trophy className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.overallPercentage}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all"
                style={{ width: `${stats.overallPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold">Placement Ready 🔥</span>
        </div>

        {/* Coding Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Coding Score</span>
            <Code2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.codingScore}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${stats.codingScore}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">{stats.solvedCodingCount}/100 Solved</span>
        </div>

        {/* Aptitude Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Aptitude Score</span>
            <Brain className="w-4 h-4 text-amber-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.aptitudeScore}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full"
                style={{ width: `${stats.aptitudeScore}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">Top 15% percentile</span>
        </div>

        {/* Technical Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Technical Score</span>
            <BookOpen className="w-4 h-4 text-blue-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.technicalScore}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full"
                style={{ width: `${stats.technicalScore}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">14 Core Topics</span>
        </div>

        {/* HR Score */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>HR Score</span>
            <Sparkles className="w-4 h-4 text-rose-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.hrScore}%
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-rose-500 h-full rounded-full"
                style={{ width: `${stats.hrScore}%` }}
              />
            </div>
          </div>
          <span className="text-[10px] text-slate-500">STAR Method Ready</span>
        </div>

        {/* Mock Interviews Completed */}
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Mocks Attended</span>
            <Mic className="w-4 h-4 text-purple-500" />
          </div>
          <div className="my-2">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {stats.mockInterviewsCompleted}
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full"
                style={{ width: '80%' }}
              />
            </div>
          </div>
          <span className="text-[10px] text-purple-600 font-semibold">Avg Score: 8.4/10</span>
        </div>
      </div>

      {/* Main Grid: Continue Prep & Weekly Progress Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Continue Preparation Card (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Next Up Topic */}
          {nextTopic ? (
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-indigo-50/80 via-white to-purple-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-slate-800 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                  Continue Preparation • Week {nextWeekNum}
                </span>
                <span className="text-xs text-slate-500">Est. {nextTopic.estimatedHours} hrs</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {nextTopic.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                {nextTopic.description}
              </p>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                    Category: {nextTopic.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                    {nextTopic.resourcesCount} Practice Modules
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab(nextTopic.practiceLink || 'roadmap')}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Practice</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="text-base font-bold text-emerald-900 dark:text-emerald-200">
                All Current Roadmap Topics Completed!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">
                Great job! Take an AI Mock Interview or solve advanced coding questions to test your readiness.
              </p>
            </div>
          )}

          {/* Progress Chart SVG Visualizer */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-indigo-500" />
                  <span>Preparation Velocity & Solved Questions</span>
                </h3>
                <p className="text-xs text-slate-500">Weekly trend across Coding, Aptitude, and Technical</p>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                +18% this week
              </span>
            </div>

            {/* Custom Responsive SVG Chart */}
            <div className="h-44 w-full pt-4">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6366f1" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
                <line x1="0" y1="70" x2="500" y2="70" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="3 3" />
                <line x1="0" y1="110" x2="500" y2="110" stroke="currentColor" className="text-slate-100 dark:text-slate-800" />

                {/* Area fill */}
                <path
                  d="M 0 95 Q 80 80, 160 55 T 320 35 T 500 15 L 500 110 L 0 110 Z"
                  fill="url(#chartGrad)"
                />
                {/* Trend line */}
                <path
                  d="M 0 95 Q 80 80, 160 55 T 320 35 T 500 15"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Data points */}
                <circle cx="0" cy="95" r="4" className="fill-indigo-600 ring-2 ring-white" />
                <circle cx="160" cy="55" r="4" className="fill-indigo-600 ring-2 ring-white" />
                <circle cx="320" cy="35" r="4" className="fill-indigo-600 ring-2 ring-white" />
                <circle cx="500" cy="15" r="5" className="fill-indigo-600 ring-4 ring-indigo-200 dark:ring-indigo-900" />
              </svg>
              <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-medium">
                <span>Week 1 (Basics)</span>
                <span>Week 2 (DSA)</span>
                <span>Week 3 (DBMS/OS)</span>
                <span>Week 4 (Mocks)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Weak Areas & Recommended Mock (1 col) */}
        <div className="space-y-6">
          {/* Weak Areas Module */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-500" />
                <span>Weak Areas & Actions</span>
              </h3>
              <button
                onClick={() => setActiveTab('progress')}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
              >
                View Details
              </button>
            </div>

            <div className="space-y-3">
              {INITIAL_WEAK_AREAS.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">{item.subject}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        item.status === 'critical'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : item.status === 'average'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                    {item.recommendation}
                  </p>
                  <button
                    onClick={() => setActiveTab(item.actionUrl)}
                    className="pt-1 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                  >
                    <span>Practice Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended AI Mock Simulator Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Recommended Mock Test
            </div>
            <h4 className="text-base font-extrabold leading-snug">
              TCS NQT Style Technical & HR Simulator
            </h4>
            <p className="text-xs text-purple-200/80 leading-relaxed">
              Experience an adaptive 15-minute mock interview with voice evaluation, instant scoring, and suggested STAR improvements.
            </p>
            <button
              onClick={() => setActiveTab('mock-interview')}
              className="w-full py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-md hover:bg-purple-50 transition-colors flex items-center justify-center gap-1.5"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Launch Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Topics & Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recommended Topics */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <span>Recommended for {currentUser.branch} Students</span>
          </h3>

          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {[
              { title: 'DBMS Normalization & BCNF', cat: 'DBMS', diff: 'Medium', tab: 'technical?category=dbms' },
              { title: 'Two Sum & Hash Table Lookups', cat: 'Coding', diff: 'Easy', tab: 'coding' },
              { title: 'OSI 7 Layers & TCP Handshake', cat: 'Networks', diff: 'Medium', tab: 'technical?category=cn' },
              { title: 'Percentages & Profit/Loss Shortcuts', cat: 'Aptitude', diff: 'Easy', tab: 'aptitude' },
            ].map((topic, i) => (
              <div
                key={i}
                onClick={() => setActiveTab(topic.tab)}
                className="py-3 flex items-center justify-between group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
              >
                <div>
                  <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {topic.title}
                  </h5>
                  <span className="text-[10px] text-slate-400">{topic.cat} • {topic.diff}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Timeline */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-500" />
            <span>Recent Placement Activity</span>
          </h3>

          <div className="space-y-3">
            {[
              { action: 'Solved Coding Problem', item: 'Two Sum (Arrays)', time: '2 hours ago', icon: Code2, color: 'text-emerald-500' },
              { action: 'Completed Aptitude Test', item: 'Quantitative Speed Test (Score: 85%)', time: 'Yesterday', icon: Brain, color: 'text-amber-500' },
              { action: 'AI Mock Interview', item: 'Software Engineer Technical Round (Score: 8.6/10)', time: '2 days ago', icon: Mic, color: 'text-purple-500' },
              { action: 'Mastered Topic', item: 'Object-Oriented Programming (Polymorphism)', time: '3 days ago', icon: CheckCircle2, color: 'text-blue-500' }
            ].map((act, i) => {
              const IconComp = act.icon;
              return (
                <div key={i} className="flex items-start gap-3 text-xs">
                  <div className={`p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 ${act.color} mt-0.5 shrink-0`}>
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800 dark:text-slate-200">{act.action}</p>
                    <p className="text-[11px] text-slate-500 truncate">{act.item}</p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{act.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

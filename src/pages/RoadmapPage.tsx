import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  BookOpen, 
  GraduationCap, 
  Sparkles, 
  Filter, 
  Compass, 
  CheckCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { generatePersonalizedRoadmap } from '../data/mockData';
import { RoadmapWeek } from '../types';

export const RoadmapPage: React.FC = () => {
  const { currentUser, setActiveTab, toggleTopic, isTopicCompleted } = useAuth();

  // If not logged in, provide a default profile preview for demonstration
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

  const roadmap = generatePersonalizedRoadmap(user);
  const [expandedWeeks, setExpandedWeeks] = useState<number[]>([1, 2, 3, 4, 5, 6]);

  const toggleWeek = (weekNum: number) => {
    setExpandedWeeks(prev => 
      prev.includes(weekNum) ? prev.filter(w => w !== weekNum) : [...prev, weekNum]
    );
  };

  // Compute stats
  const totalTopics = roadmap.reduce((acc, w) => acc + w.topics.length, 0);
  const completedCount = roadmap.reduce(
    (acc, w) => acc + w.topics.filter(t => isTopicCompleted(t.id)).length,
    0
  );
  const percentage = Math.round((completedCount / totalTopics) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-indigo-200">
              <Compass className="w-3.5 h-3.5 text-indigo-400" />
              <span>Personalized Preparation Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {user.educationLevel} {user.branch} Placement Pathway
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200/80">
              Tailored based on your degree, skills, and target role: <b>{user.preferredJobRole}</b>.
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-4 text-center shrink-0 border border-white/10">
            <span className="text-xs text-indigo-200 font-medium">Roadmap Progress</span>
            <div className="text-3xl font-black text-white">{percentage}%</div>
            <span className="text-[10px] text-indigo-300 font-semibold">{completedCount} of {totalTopics} completed</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-emerald-400 to-indigo-400 h-full rounded-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Week by Week Pipeline */}
      <div className="space-y-6">
        {roadmap.map((week) => {
          const isExpanded = expandedWeeks.includes(week.weekNumber);
          const weekCompletedCount = week.topics.filter(t => isTopicCompleted(t.id)).length;
          const isWeekAllDone = weekCompletedCount === week.topics.length;

          return (
            <div
              key={week.weekNumber}
              className={`rounded-3xl border transition-all ${
                isWeekAllDone
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-white dark:bg-slate-900 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm'
              }`}
            >
              {/* Week Header Accordion Toggle */}
              <div
                onClick={() => toggleWeek(week.weekNumber)}
                className="p-5 sm:p-6 flex items-center justify-between cursor-pointer select-none border-b border-slate-100 dark:border-slate-800/80"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 shadow-xs ${
                      isWeekAllDone
                        ? 'bg-emerald-500 text-white'
                        : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                    }`}
                  >
                    W{week.weekNumber}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {week.title}
                      </h3>
                      {isWeekAllDone && (
                        <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                          <CheckCheck className="w-3.5 h-3.5" /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {week.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
                    {weekCompletedCount}/{week.topics.length} done
                  </span>
                  <button className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Topics List */}
              {isExpanded && (
                <div className="p-4 sm:p-6 space-y-3 divide-y divide-slate-100 dark:divide-slate-800/60">
                  {week.topics.map((topic, tIdx) => {
                    const completed = isTopicCompleted(topic.id);
                    return (
                      <div
                        key={topic.id}
                        className={`pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-2xl transition-colors ${
                          completed ? 'bg-slate-50/70 dark:bg-slate-800/30' : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <button
                            onClick={() => toggleTopic(topic.id)}
                            className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-600 transition-colors"
                          >
                            {completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50 dark:fill-emerald-950" />
                            ) : (
                              <Circle className="w-5 h-5" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className={`text-sm font-bold ${completed ? 'line-through text-slate-400' : 'text-slate-900 dark:text-white'}`}>
                                {topic.title}
                              </h4>
                              <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                {topic.category}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                              {topic.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:self-center pl-8 sm:pl-0 shrink-0">
                          <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium mr-2">
                            <Clock className="w-3.5 h-3.5" /> {topic.estimatedHours}h
                          </span>

                          <button
                            onClick={() => toggleTopic(topic.id)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                              completed
                                ? 'border-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                                : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {completed ? 'Mark Incomplete' : 'Mark Done'}
                          </button>

                          {topic.practiceLink && (
                            <button
                              onClick={() => setActiveTab(topic.practiceLink!)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs flex items-center gap-1"
                            >
                              <span>Practice</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

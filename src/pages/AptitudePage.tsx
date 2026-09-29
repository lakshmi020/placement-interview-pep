import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Brain, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  HelpCircle, 
  Sparkles, 
  Trophy, 
  AlertCircle,
  Play
} from 'lucide-react';
import { APTITUDE_QUESTIONS } from '../data/mockData';
import { AptitudeQuestion } from '../types';

export const AptitudePage: React.FC = () => {
  const { tabParams } = useAuth();
  const initialCategory = tabParams.category || 'all';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes (600s)

  // Filter questions based on category
  const filteredQuestions: AptitudeQuestion[] = selectedCategory === 'all'
    ? APTITUDE_QUESTIONS
    : APTITUDE_QUESTIONS.filter(q => q.category.toLowerCase() === selectedCategory.toLowerCase());

  // Countdown Timer
  useEffect(() => {
    let timer: any = null;
    if (testStarted && !testSubmitted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && testStarted && !testSubmitted) {
      setTestSubmitted(true);
    }
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeft]);

  const handleStartTest = (cat: string) => {
    setSelectedCategory(cat);
    setUserAnswers({});
    setCurrentIdx(0);
    setTimeLeft(cat === 'all' ? 720 : 480);
    setTestSubmitted(false);
    setTestStarted(true);
  };

  const handleSelectOption = (optIdx: number) => {
    if (testSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
  };

  const handleSubmitTest = () => {
    setTestSubmitted(true);
  };

  // Compute test metrics
  const total = filteredQuestions.length;
  let correctCount = 0;
  let wrongCount = 0;
  filteredQuestions.forEach((q, idx) => {
    const selected = userAnswers[idx];
    if (selected !== undefined) {
      if (selected === q.correctIndex) correctCount++;
      else wrongCount++;
    }
  });
  const unattempted = total - (correctCount + wrongCount);
  const scorePercent = total > 0 ? Math.round((correctCount / total) * 100) : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentQ = filteredQuestions[currentIdx];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-amber-100">
            <Brain className="w-4 h-4 text-amber-200" />
            <span>Quantitative • Logical Reasoning • Verbal Ability</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Aptitude Practice & Timed Tests
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl">
            Simulate company online assessment cognitive rounds with timed questions, performance analysis, and shortcut tricks.
          </p>
        </div>

        {testStarted && !testSubmitted && (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/20 text-center shrink-0 flex items-center gap-3">
            <Clock className="w-6 h-6 text-amber-200 animate-pulse" />
            <div className="text-left">
              <span className="text-[10px] text-amber-200 uppercase font-bold tracking-wider block">Time Remaining</span>
              <span className="text-2xl font-mono font-black text-white">{formatTime(timeLeft)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Screen 1: Test Selection / Start Portal */}
      {!testStarted && (
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Choose an Aptitude Test Module
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'quantitative',
                title: 'Quantitative Aptitude',
                desc: 'Percentages, Profit & Loss, Time & Work, Speed & Distance, Probability, Ratios.',
                badge: 'High Weightage',
                time: '8 Mins • 5 Questions'
              },
              {
                id: 'logical',
                title: 'Logical Reasoning',
                desc: 'Number Series, Coding-Decoding, Blood Relations, Syllogisms, Direction Sense.',
                badge: 'Analytical',
                time: '8 Mins • 4 Questions'
              },
              {
                id: 'verbal',
                title: 'Verbal Ability',
                desc: 'Sentence Correction, Vocabulary, Grammar, Antonyms, Reading Comprehension.',
                badge: 'Communication',
                time: '6 Mins • 3 Questions'
              }
            ].map((module) => (
              <div
                key={module.id}
                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-amber-400 hover:shadow-lg transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {module.badge}
                    </span>
                    <span className="text-xs text-slate-400">{module.time}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {module.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                    {module.desc}
                  </p>
                </div>

                <button
                  onClick={() => handleStartTest(module.id)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-md shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Module Test</span>
                </button>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white shadow-lg flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold">Full Comprehensive Mock Assessment</h4>
              <p className="text-xs text-indigo-200/80 mt-1">
                Take a mixed test combining Quantitative, Logical, and Verbal questions (TCS & Infosys style).
              </p>
            </div>
            <button
              onClick={() => handleStartTest('all')}
              className="px-6 py-2.5 rounded-xl bg-white text-indigo-900 font-bold text-xs shadow-md hover:bg-indigo-50 shrink-0"
            >
              Start Full Test (12 Questions)
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Active Timed Quiz Simulator */}
      {testStarted && !testSubmitted && currentQ && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Palette Sidebar (1 col) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Question Palette
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {filteredQuestions.map((_, i) => {
                const isCurrent = i === currentIdx;
                const isAnswered = userAnswers[i] !== undefined;

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-9 rounded-xl font-bold text-xs transition-all ${
                      isCurrent
                        ? 'ring-2 ring-indigo-500 bg-indigo-50 text-indigo-600 font-black'
                        : isAnswered
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] space-y-1 text-slate-500">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-emerald-500" />
                <span>Answered ({Object.keys(userAnswers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-700" />
                <span>Unanswered ({total - Object.keys(userAnswers).length})</span>
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20 transition-colors"
            >
              Submit Test Now
            </button>
          </div>

          {/* Active Question Panel (3 cols) */}
          <div className="lg:col-span-3 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                {currentQ.category} • {currentQ.subCategory}
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                Question {currentIdx + 1} of {total}
              </span>
            </div>

            <div className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {/* Multiple Choice Options */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((option, optIdx) => {
                const isSelected = userAnswers[currentIdx] === optIdx;
                const optLabels = ['A', 'B', 'C', 'D'];

                return (
                  <div
                    key={optIdx}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`p-4 rounded-2xl border cursor-pointer select-none transition-all flex items-center gap-3.5 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 text-indigo-950 dark:text-indigo-100 shadow-xs ring-1 ring-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {optLabels[optIdx]}
                    </div>
                    <span className="text-xs sm:text-sm font-medium">{option}</span>
                  </div>
                );
              })}
            </div>

            {/* Next / Previous Buttons */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setCurrentIdx(prev => Math.max(0, prev - 1))}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentIdx === total - 1 ? (
                <button
                  onClick={handleSubmitTest}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20"
                >
                  Submit & Finish Test
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIdx(prev => Math.min(total - 1, prev + 1))}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-500/20 flex items-center gap-1.5"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Screen 3: Test Review & Detailed Explanations Scorecard */}
      {testSubmitted && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Scorecard Hero */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/25">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Test Completed!
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto py-2">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[11px] text-slate-400 font-semibold">Your Score</span>
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{scorePercent}%</div>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40">
                <span className="text-[11px] text-emerald-600 font-semibold">Correct</span>
                <div className="text-2xl font-black text-emerald-600">{correctCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40">
                <span className="text-[11px] text-rose-600 font-semibold">Incorrect</span>
                <div className="text-2xl font-black text-rose-600">{wrongCount}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60">
                <span className="text-[11px] text-slate-400 font-semibold">Skipped</span>
                <div className="text-2xl font-black text-slate-500">{unattempted}</div>
              </div>
            </div>

            <button
              onClick={() => setTestStarted(false)}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-md hover:bg-indigo-700"
            >
              Take Another Test
            </button>
          </div>

          {/* Question-by-Question Review with Explanations */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Detailed Explanations & Step-by-Step Solutions
            </h4>

            {filteredQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[idx];
              const isCorrect = selectedOpt === q.correctIndex;
              const isUnanswered = selectedOpt === undefined;

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-3xl border bg-white dark:bg-slate-900 shadow-xs space-y-4 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900/60'
                      : isUnanswered
                      ? 'border-slate-200 dark:border-slate-800'
                      : 'border-rose-200 dark:border-rose-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Question {idx + 1}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : isUnanswered
                          ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {isCorrect ? 'Correct +1' : isUnanswered ? 'Not Attempted' : 'Incorrect'}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-900 dark:text-white">{q.question}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, oIdx) => {
                      const isCorrectAnswer = oIdx === q.correctIndex;
                      const isUserChoice = oIdx === selectedOpt;

                      return (
                        <div
                          key={oIdx}
                          className={`p-3 rounded-xl border flex items-center justify-between ${
                            isCorrectAnswer
                              ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold'
                              : isUserChoice && !isCorrectAnswer
                              ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 line-through'
                              : 'border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-1" />}
                          {isUserChoice && !isCorrectAnswer && <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-1" />}
                        </div>
                      );
                    })}
                  </div>

                  {/* Step-by-Step Explanation */}
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4 text-amber-500" /> Explanation:
                    </span>
                    <p className="leading-relaxed">{q.explanation}</p>
                    {q.shortcutTip && (
                      <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Shortcut Trick: {q.shortcutTip}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

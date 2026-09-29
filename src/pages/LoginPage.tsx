import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap, 
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { Logo } from '../components/Logo';

export const LoginPage: React.FC = () => {
  const { login, setActiveTab } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Forgot password modal state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid email or password.');
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('password123');
    setIsSubmitting(true);
    try {
      await login(demoEmail, 'password123');
    } catch (err: any) {
      setErrorMsg('Login failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-3">
            <Logo size="md" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome Back!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to continue your placement preparation roadmap.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-2.5 text-rose-700 dark:text-rose-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. rahul.cse@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Password
              </label>
              <button
                type="button"
                onClick={() => setForgotModalOpen(true)}
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-semibold"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="remember" className="ml-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              Remember me on this browser
            </label>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Signing in...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Login Cards */}
        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-center text-slate-400">
            One-Click Demo Profiles
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin('rahul.cse@example.com')}
              className="p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50/50 dark:bg-indigo-950/30 text-left hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-colors"
            >
              <div className="text-xs font-bold text-indigo-900 dark:text-indigo-200 flex items-center gap-1">
                <span>Rahul Sharma</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100">B.Tech</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                B.Tech CSE • Final Year
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleDemoLogin('priya.diploma@example.com')}
              className="p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30 text-left hover:bg-emerald-100/60 dark:hover:bg-emerald-900/40 transition-colors"
            >
              <div className="text-xs font-bold text-emerald-900 dark:text-emerald-200 flex items-center gap-1">
                <span>Priya Patel</span>
                <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100">Diploma</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                Diploma CSE • Final Year
              </div>
            </button>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500 dark:text-slate-400">
          Don&apos;t have an account yet?{' '}
          <button
            onClick={() => setActiveTab('register')}
            className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
          >
            Create an Account
          </button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative space-y-4">
            <button
              onClick={() => {
                setForgotModalOpen(false);
                setResetSuccess(false);
              }}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-indigo-600">
              <Sparkles className="w-5 h-5" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Reset Password
              </h3>
            </div>

            {resetSuccess ? (
              <div className="space-y-3 py-2 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Password reset link has been dispatched to <b>{forgotEmail}</b>. Check your inbox and follow the steps.
                </p>
                <button
                  onClick={() => {
                    setForgotModalOpen(false);
                    setResetSuccess(false);
                  }}
                  className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold"
                >
                  Close
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Enter your registered college or personal email address to receive password recovery instructions.
                </p>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
                <button
                  onClick={() => {
                    if (forgotEmail.includes('@')) {
                      setResetSuccess(true);
                    }
                  }}
                  className="w-full py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                >
                  Send Recovery Link
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

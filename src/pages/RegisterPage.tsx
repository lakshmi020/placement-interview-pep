import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Eye, 
  EyeOff, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  GraduationCap, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Building, 
  Award,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { EducationLevel, Branch } from '../types';

export const RegisterPage: React.FC = () => {
  const { register, setActiveTab } = useAuth();
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 - Personal Details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Step 2 - Educational Details
  const [educationLevel, setEducationLevel] = useState<EducationLevel>('B.Tech');
  const [branch, setBranch] = useState<Branch>('CSE');
  const [collegeName, setCollegeName] = useState('');
  const [currentYear, setCurrentYear] = useState('Final Year');
  const [gradYear, setGradYear] = useState('2026');
  const [cgpa, setCgpa] = useState('8.5');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Java', 'Python']);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['Data Structures & Algorithms', 'DBMS']);
  const [preferredRole, setPreferredRole] = useState('Software Development Engineer (SDE)');

  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-slate-200' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/\d/.test(pass)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) score++;

    if (score <= 1) return { score: 20, label: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 45, label: 'Fair', color: 'bg-amber-500' };
    if (score === 3 || score === 4) return { score: 75, label: 'Good', color: 'bg-indigo-500' };
    return { score: 100, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );
  };

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleStep1Next = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !mobile.trim() || !password) {
      setErrorMsg('Please complete all required fields.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setErrorMsg('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setErrorMsg('Please accept the Terms and Conditions to proceed.');
      return;
    }

    setStep(2);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!collegeName.trim()) {
      setErrorMsg('Please enter your college/institute name.');
      return;
    }
    if (selectedLanguages.length === 0) {
      setErrorMsg('Please select at least one programming language.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim(),
        password,
        educationLevel,
        branch,
        collegeName: collegeName.trim(),
        currentYear,
        gradYear,
        cgpa,
        programmingLanguages: selectedLanguages,
        technicalSkills: selectedSkills,
        preferredJobRole: preferredRole
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const availableLanguages = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'PHP'];
  const availableSkills = [
    'Data Structures & Algorithms',
    'DBMS & SQL',
    'Operating Systems',
    'Computer Networks',
    'Web Development',
    'Object-Oriented Programming (OOP)',
    'Cloud / DevOps',
    'Machine Learning',
    'Mobile Dev (Flutter/Android)'
  ];

  const jobRoles = [
    'Software Development Engineer (SDE)',
    'Frontend Developer',
    'Full Stack Engineer',
    'Data Analyst',
    'Cloud / DevOps Engineer',
    'QA & Automation Test Engineer',
    'Systems & Network Engineer'
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
        {/* Header Progress Bar */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Student Registration
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10">
              Step {step} of 2
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {step === 1 ? 'Personal Details' : 'Educational & Technical Profile'}
          </h2>
          <p className="text-xs sm:text-sm text-indigo-200/80 mt-1">
            {step === 1
              ? 'Create your credentials to unlock personalized placement preparation.'
              : 'Tell us your academic degree and technical background for your custom roadmap.'}
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-6">
            <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-400' : 'bg-white/20'}`} />
            <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-400' : 'bg-white/20'}`} />
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="m-6 p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 flex items-center gap-3 text-rose-700 dark:text-rose-300 text-xs font-medium">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1 FORM */}
        {step === 1 && (
          <form onSubmit={handleStep1Next} className="p-6 sm:p-8 space-y-5">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" /> Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> College / Personal Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> Mobile Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" /> Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="pt-1.5 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-500">Password Strength:</span>
                    <span className="text-slate-800 dark:text-slate-200 font-bold">{strength.label}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${strength.color} transition-all duration-300`}
                      style={{ width: `${strength.score}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Confirm Password <span className="text-rose-500">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="pt-2 flex items-start gap-2.5">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="text-xs text-slate-600 dark:text-slate-400">
                I agree to the <span className="text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer">Terms & Conditions</span> and understand my profile details will be stored securely to tailor my placement preparation.
              </label>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600"
              >
                Already have an account? Sign In
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 flex items-center gap-2"
              >
                <span>Continue to Step 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2 FORM */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="p-6 sm:p-8 space-y-6">
            {/* Education Level & Branch */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Education Level <span className="text-rose-500">*</span>
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Diploma">Diploma (Polytechnic)</option>
                  <option value="B.Tech">B.Tech</option>
                  <option value="B.E">B.E</option>
                  <option value="MCA">MCA</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Branch / Department <span className="text-rose-500">*</span>
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value as Branch)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="CSE">Computer Science & Engg (CSE)</option>
                  <option value="IT">Information Technology (IT)</option>
                  <option value="ECE">Electronics & Communication (ECE)</option>
                  <option value="EEE">Electrical & Electronics (EEE)</option>
                  <option value="Mechanical">Mechanical Engineering</option>
                  <option value="Civil">Civil Engineering</option>
                  <option value="Other">Other Branch</option>
                </select>
              </div>
            </div>

            {/* College Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-slate-400" /> College / University Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                placeholder="e.g. Government Engineering College / NIT"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Current Year, Grad Year, CGPA */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Current Year / Sem
                </label>
                <select
                  value={currentYear}
                  onChange={(e) => setCurrentYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value="Final Year">Final Year (7th/8th Sem)</option>
                  <option value="3rd Year">3rd Year (5th/6th Sem)</option>
                  <option value="2nd Year">2nd Year (3rd/4th Sem)</option>
                  <option value="Passout / Fresher">Recent Passout / Fresher</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Completion Year
                </label>
                <select
                  value={gradYear}
                  onChange={(e) => setGradYear(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                >
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-slate-400" /> CGPA / %
                </label>
                <input
                  type="text"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)}
                  placeholder="e.g. 8.5 or 82%"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                />
              </div>
            </div>

            {/* Preferred Job Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Target / Preferred Job Role <span className="text-rose-500">*</span>
              </label>
              <select
                value={preferredRole}
                onChange={(e) => setPreferredRole(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-slate-900 dark:text-white"
              >
                {jobRoles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* Programming Languages Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Programming Languages Known (Select multiple)</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{selectedLanguages.length} selected</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((lang) => {
                  const isSelected = selectedLanguages.includes(lang);
                  return (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{lang}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Technical Skills Multi-Select */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                <span>Technical Skills & Core Subjects (Select multiple)</span>
                <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{selectedSkills.length} selected</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {availableSkills.map((sk) => {
                  const isSelected = selectedSkills.includes(sk);
                  return (
                    <button
                      key={sk}
                      type="button"
                      onClick={() => toggleSkill(sk)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                      <span>{sk}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Step 1</span>
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25 flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isSubmitting ? 'Creating Profile...' : 'Complete Registration'}</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  Building, 
  Award, 
  GraduationCap, 
  Code2, 
  Sparkles, 
  Check, 
  Save, 
  Plus, 
  X,
  CheckCircle2
} from 'lucide-react';
import { EducationLevel, Branch } from '../types';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  if (!currentUser) return null;

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [mobile, setMobile] = useState(currentUser.mobile);
  const [educationLevel, setEducationLevel] = useState<EducationLevel>(currentUser.educationLevel);
  const [branch, setBranch] = useState<Branch>(currentUser.branch);
  const [collegeName, setCollegeName] = useState(currentUser.collegeName);
  const [currentYear, setCurrentYear] = useState(currentUser.currentYear);
  const [gradYear, setGradYear] = useState(currentUser.gradYear);
  const [cgpa, setCgpa] = useState(currentUser.cgpa);
  const [preferredRole, setPreferredRole] = useState(currentUser.preferredJobRole);

  const [languages, setLanguages] = useState<string[]>(currentUser.programmingLanguages || []);
  const [newLang, setNewLang] = useState('');
  const [skills, setSkills] = useState<string[]>(currentUser.technicalSkills || []);
  const [newSkill, setNewSkill] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleAddLanguage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLang.trim() && !languages.includes(newLang.trim())) {
      setLanguages(prev => [...prev, newLang.trim()]);
      setNewLang('');
    }
  };

  const handleRemoveLanguage = (lang: string) => {
    setLanguages(prev => prev.filter(l => l !== lang));
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills(prev => [...prev, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...currentUser,
      fullName: fullName.trim(),
      mobile: mobile.trim(),
      educationLevel,
      branch,
      collegeName: collegeName.trim(),
      currentYear,
      gradYear,
      cgpa: cgpa.trim(),
      programmingLanguages: languages,
      technicalSkills: skills,
      preferredJobRole: preferredRole
    };
    updateProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-indigo-500/30">
            {currentUser.fullName.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              {currentUser.fullName}
            </h1>
            <p className="text-xs text-indigo-200/80">
              {currentUser.educationLevel} {currentUser.branch} • {currentUser.collegeName}
            </p>
          </div>
        </div>

        {savedSuccess && (
          <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile Saved!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" /> Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Email (Account ID)
              </label>
              <input
                type="email"
                disabled
                value={currentUser.email}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 text-xs font-medium text-slate-500 cursor-not-allowed"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" /> Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Academic Details */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Academic Background
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value as EducationLevel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
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
                Branch / Discipline
              </label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value as Branch)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              >
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Civil">Civil</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                College / Institute Name
              </label>
              <input
                type="text"
                value={collegeName}
                onChange={(e) => setCollegeName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Current Year
              </label>
              <input
                type="text"
                value={currentYear}
                onChange={(e) => setCurrentYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Graduation Year
              </label>
              <input
                type="text"
                value={gradYear}
                onChange={(e) => setGradYear(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-slate-400" /> CGPA / Percentage
              </label>
              <input
                type="text"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Target Role & Technical Skills Editor */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Placement Preferences & Skills
          </h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Preferred Job Role
            </label>
            <input
              type="text"
              value={preferredRole}
              onChange={(e) => setPreferredRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          {/* Languages Badges */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Programming Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {languages.map((l) => (
                <span
                  key={l}
                  className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800"
                >
                  <span>{l}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveLanguage(l)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newLang}
                onChange={(e) => setNewLang(e.target.value)}
                placeholder="Add language (e.g. C#, Rust, Ruby)..."
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
              <button
                type="button"
                onClick={handleAddLanguage}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
              >
                Add
              </button>
            </div>
          </div>

          {/* Skills Badges */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Technical Competencies & Subjects
            </label>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-semibold flex items-center gap-1.5 border border-purple-200 dark:border-purple-800"
                >
                  <span>{s}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(s)}
                    className="hover:text-rose-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill (e.g. Docker, Redis, Kubernetes)..."
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold hover:bg-slate-200"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-500/25 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
};

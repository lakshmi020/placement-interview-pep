import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, NotificationItem } from '../types';
import { ApiService } from '../services/api';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeTab: string;
  tabParams: Record<string, string>;
  theme: 'light' | 'dark';
  notifications: NotificationItem[];
  unreadCount: number;
  completedTopics: Set<string>;
  setActiveTab: (tab: string, params?: Record<string, string>) => void;
  login: (email: string, pass: string) => Promise<void>;
  register: (data: Omit<User, 'id'> & { password?: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (updated: User) => void;
  toggleTheme: () => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  toggleTopic: (topicId: string) => void;
  isTopicCompleted: (topicId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => ApiService.getCurrentUser());
  const [activeTab, setActiveTabState] = useState<string>('landing');
  const [tabParams, setTabParams] = useState<Record<string, string>>({});
  const [theme, setThemeState] = useState<'light' | 'dark'>(() => ApiService.getTheme());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => ApiService.getNotifications());
  const [completedTopics, setCompletedTopics] = useState<Set<string>>(() => ApiService.getCompletedTopics());

  useEffect(() => {
    ApiService.setTheme(theme);
  }, [theme]);

  const setActiveTab = (tab: string, params?: Record<string, string>) => {
    setActiveTabState(tab);
    setTabParams(params || {});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const login = async (email: string, pass: string) => {
    const user = await ApiService.login(email, pass);
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const register = async (data: Omit<User, 'id'> & { password?: string }) => {
    const user = await ApiService.register(data);
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const logout = () => {
    ApiService.logout();
    setCurrentUser(null);
    setActiveTab('landing');
  };

  const updateProfile = (updated: User) => {
    ApiService.updateProfile(updated);
    setCurrentUser(updated);
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setThemeState(next);
    ApiService.setTheme(next);
  };

  const markNotificationRead = (id: string) => {
    ApiService.markNotificationAsRead(id);
    setNotifications(ApiService.getNotifications());
  };

  const markAllNotificationsRead = () => {
    ApiService.markAllNotificationsRead();
    setNotifications(ApiService.getNotifications());
  };

  const toggleTopic = (topicId: string) => {
    ApiService.toggleTopicCompleted(topicId);
    setCompletedTopics(new Set(ApiService.getCompletedTopics()));
  };

  const isTopicCompleted = (topicId: string) => {
    return completedTopics.has(topicId);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        activeTab,
        tabParams,
        theme,
        notifications,
        unreadCount,
        completedTopics,
        setActiveTab,
        login,
        register,
        logout,
        updateProfile,
        toggleTheme,
        markNotificationRead,
        markAllNotificationsRead,
        toggleTopic,
        isTopicCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { RoadmapPage } from './pages/RoadmapPage';
import { TechnicalPage } from './pages/TechnicalPage';
import { CodingPage } from './pages/CodingPage';
import { AptitudePage } from './pages/AptitudePage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { HRPage } from './pages/HRPage';
import { CompanyPage } from './pages/CompanyPage';
import { ProgressPage } from './pages/ProgressPage';
import { ProfilePage } from './pages/ProfilePage';

const AppContent: React.FC = () => {
  const { activeTab } = useAuth();

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'landing':
        return <LandingPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'technical':
        return <TechnicalPage />;
      case 'coding':
        return <CodingPage />;
      case 'aptitude':
        return <AptitudePage />;
      case 'mock-interview':
        return <MockInterviewPage />;
      case 'hr':
        return <HRPage />;
      case 'companies':
        return <CompanyPage />;
      case 'progress':
        return <ProgressPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

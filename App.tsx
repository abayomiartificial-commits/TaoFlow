
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LoginPage } from './components/LoginPage';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { PracticeStudio } from './components/PracticeStudio';
import { Library } from './components/Library';
import { EvaluationFlow } from './components/EvaluationFlow';
import { Profile } from './components/Profile';
import { Tab } from './types';
import { Loader2 } from 'lucide-react';

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, profile, lessons, completeLesson } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Dashboard);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FDFBF7]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
          <p className="text-stone-500 font-serif italic">Cargando...</p>
        </div>
      </div>
    );
  }

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show onboarding if user hasn't completed it
  if (profile && !profile.onboarded) {
    return <EvaluationFlow />;
  }

  return (
    <div className="flex min-h-screen bg-[#FDFBF7] font-sans text-stone-800">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 pb-20 md:pb-0 overflow-y-auto h-screen relative scroll-smooth">
        {activeTab === Tab.Dashboard && profile && (
          <Dashboard profile={profile} onNavigate={setActiveTab} />
        )}
        {activeTab === Tab.Practice && (
          <PracticeStudio />
        )}
        {activeTab === Tab.Learn && (
          <Library lessons={lessons} onCompleteLesson={completeLesson} />
        )}
        {activeTab === Tab.Community && (
          <div className="p-10 max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl font-serif italic">Comunidad en construcción</h2>
            <p className="text-stone-500">Pronto podrás compartir tu progreso con otros maestros.</p>
          </div>
        )}
        {activeTab === Tab.Profile && profile && (
          <Profile profile={profile} lessons={lessons} />
        )}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

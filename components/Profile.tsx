

import React from 'react';
import { Settings, Trophy, Medal, Star, Flame, Wind, Target, ShieldCheck, ChevronRight, Award, CheckCircle2, BookOpen, LogOut } from 'lucide-react';
import { UserProfile, Badge, Lesson } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { calculateLevel } from '../lib/levelSystem';

interface ProfileProps {
  profile: UserProfile;
  lessons: Lesson[];
}

const IconMap = {
  Trophy: Trophy,
  Medal: Medal,
  Star: Star,
  Flame: Flame,
  Wind: Wind,
  Target: Target,
};


export const Profile: React.FC<ProfileProps> = ({ profile, lessons }) => {
  const { signOut } = useAuth();
  const levelInfo = calculateLevel(profile.points);
  const progress = levelInfo.progress;

  // Safe defaults for arrays
  const badges = profile.badges || [];
  const achievements = profile.achievements || [];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Error al cerrar sesión. Por favor intenta de nuevo.');
    }
  };

  // Filter and sort the last 5 completed lessons
  const completedLessons = lessons
    .filter(l => l.completed)
    .sort((a, b) => {
      const dateA = a.completedAt ? new Date(a.completedAt).getTime() : 0;
      const dateB = b.completedAt ? new Date(b.completedAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      {/* Header Profile Section */}
      <section className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 md:p-12 rounded-[3rem] shadow-xl shadow-stone-200/50 border border-stone-100">
        <div className="relative group">
          <div className="w-32 h-32 md:w-40 md:h-40 bg-teal-50 rounded-full flex items-center justify-center border-4 border-teal-100 relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
            <div className="absolute inset-0 bg-gradient-to-tr from-teal-600/10 to-transparent"></div>
            <span className="text-5xl md:text-6xl font-serif text-teal-700 font-bold">{profile.name.charAt(0)}</span>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg border border-stone-100">
            <ShieldCheck className="text-teal-600" size={24} />
          </div>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
            <h2 className="text-3xl font-serif text-stone-800 font-bold">{profile.name}</h2>
            <span className="inline-flex items-center px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-widest">
              Nivel {Math.floor(profile.points / 1000) + 1}
            </span>
          </div>
          <p className="text-stone-500 text-lg mb-6 italic">"{levelInfo.title}"</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm font-bold text-stone-400 uppercase tracking-tighter">
              <span>Progreso de Maestría</span>
              <span>{profile.points} / {levelInfo.nextLevelXP} XP</span>
            </div>
            <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full bg-teal-600 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(13,148,136,0.3)]"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-stone-50 p-4 rounded-2xl text-center border border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Racha</p>
            <div className="flex items-center justify-center gap-1 text-2xl font-serif text-orange-600">
              {profile.streak} <Flame size={20} fill="currentColor" />
            </div>
          </div>
          <div className="bg-stone-50 p-4 rounded-2xl text-center border border-stone-100">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Insignias</p>
            <div className="flex items-center justify-center gap-1 text-2xl font-serif text-teal-600">
              {badges.filter(b => b.unlocked).length} <Award size={20} />
            </div>
          </div>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Badges Section */}
        <section className="md:col-span-2 space-y-6">
          <h3 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
            Tu Vitrina de Logros <Medal className="text-teal-600" />
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const Icon = IconMap[badge.icon];
              return (
                <div
                  key={badge.id}
                  className={`p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center text-center group ${badge.unlocked
                    ? 'bg-white border-stone-100 shadow-md hover:shadow-xl hover:-translate-y-1'
                    : 'bg-stone-50 border-stone-100 opacity-60 grayscale'
                    }`}
                >
                  <div className={`p-4 rounded-full mb-4 transition-transform group-hover:scale-110 ${badge.unlocked ? badge.color : 'bg-stone-200 text-stone-400'}`}>
                    <Icon size={32} />
                  </div>
                  <h4 className={`font-bold text-sm mb-1 ${badge.unlocked ? 'text-stone-800' : 'text-stone-400'}`}>{badge.name}</h4>
                  <p className="text-[10px] text-stone-500 leading-tight">{badge.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: History & Stats */}
        <div className="space-y-10">
          {/* Recent History / XP */}
          <section className="space-y-6">
            <h3 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
              Actividad Reciente <Target className="text-teal-600" size={24} />
            </h3>
            <div className="space-y-4">
              {achievements.length > 0 ? (
                achievements.slice(-5).reverse().map((achievement) => (
                  <div key={achievement.id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <Target size={20} />
                      </div>
                      <div>
                        <h5 className="font-bold text-stone-800 text-sm">{achievement.title}</h5>
                        <p className="text-[10px] text-stone-400">{achievement.date}</p>
                      </div>
                    </div>
                    <span className="text-teal-600 font-bold text-sm">+{achievement.points} XP</span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-stone-400 text-sm italic">Comienza a practicar para ganar puntos.</p>
                </div>
              )}
            </div>
          </section>

          {/* Lesson Completion History */}
          <section className="space-y-6">
            <h3 className="text-2xl font-serif text-stone-800 flex items-center gap-3">
              Historial de Lecciones <BookOpen className="text-teal-600" size={24} />
            </h3>
            <div className="space-y-4">
              {completedLessons.length > 0 ? (
                completedLessons.map((lesson) => (
                  <div key={lesson.id} className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex items-center justify-between group hover:border-teal-200 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-stone-50 text-stone-400 rounded-xl flex items-center justify-center group-hover:bg-teal-50 group-hover:text-teal-600 transition-all">
                        <CheckCircle2 size={20} className="text-teal-600" />
                      </div>
                      <div className="overflow-hidden">
                        <h5 className="font-bold text-stone-800 text-sm truncate w-full" title={lesson.title}>{lesson.title}</h5>
                        <p className="text-[10px] text-stone-400 uppercase tracking-widest">{lesson.completedAt || 'Finalizado'}</p>
                      </div>
                    </div>
                    <div className="shrink-0 ml-2">
                      <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded uppercase">{lesson.category}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <p className="text-stone-400 text-sm italic">No has completado ninguna lección todavía.</p>
                  <button className="mt-4 text-teal-600 text-xs font-bold hover:underline">Ir a Biblioteca</button>
                </div>
              )}
            </div>
          </section>

          <div className="pt-6">
            <button
              onClick={handleSignOut}
              className="w-full py-4 border-2 border-stone-200 text-stone-600 hover:border-red-200 hover:text-red-600 hover:bg-red-50 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

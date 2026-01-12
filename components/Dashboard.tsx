
import React from 'react';
import { Activity, Users, ChevronRight, Wind, Award, Zap, Star } from 'lucide-react';
import { Tab, UserProfile } from '../types';
import { calculateLevel } from '../lib/levelSystem';

interface DashboardProps {
  profile: UserProfile;
  onNavigate: (tab: Tab) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onNavigate }) => {
  const levelInfo = calculateLevel(profile.points);

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-serif text-stone-800 leading-tight">
            Buenos días, <span className="text-teal-700 italic">{profile.name}</span>
          </h1>
          <p className="text-stone-500 mt-2 text-lg">Donde fluye la atención, fluye la energía.</p>
        </div>
        <div className="flex gap-8 border-l border-stone-200 pl-8">
          <div className="text-center">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Racha</p>
            <div className="text-3xl font-serif text-orange-600 flex items-center justify-center gap-1">
              {profile.streak} <Zap size={18} fill="currentColor" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em]">Puntos</p>
            <div className="text-3xl font-serif text-teal-600 flex items-center justify-center gap-1">
              <Star size={18} fill="currentColor" className="text-yellow-400" />
              {profile.points}
            </div>
          </div>
        </div>
      </header>

      {/* Visual Metaphor: The Zen Garden */}
      <div className="bg-gradient-to-br from-[#f8f5f0] to-[#f0ece4] rounded-[2rem] p-8 md:p-12 shadow-xl shadow-stone-200/50 border border-white relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 opacity-[0.03] rotate-12 transition-transform duration-1000 group-hover:rotate-45">
          <Wind size={400} />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative z-10">
          <div className="relative">
            <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center shadow-inner overflow-hidden border-8 border-teal-50">
              <div className="absolute inset-0 bg-teal-600 opacity-[0.03] animate-pulse"></div>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 text-teal-600 animate-flow">
                  <Wind size={96} strokeWidth={1} />
                </div>
                <span className="text-teal-700 font-serif font-bold text-lg mt-2">Enraizamiento</span>
              </div>
            </div>
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-lg">
              Nivel {levelInfo.level} - {levelInfo.title}
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-4">
            <h2 className="text-3xl font-serif italic text-stone-800">Tu Jardín Interior florece</h2>
            <p className="text-stone-600 text-lg leading-relaxed max-w-lg">
              Has comenzado tu camino con éxito. Ganaste <span className="font-bold text-teal-700">{profile.points} XP</span> en total.
            </p>
            <div className="pt-4">
              <div className="w-full bg-stone-200/50 rounded-full h-4 mb-3 border border-stone-200">
                <div
                  className="bg-teal-600 h-full rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(13,148,136,0.5)]"
                  style={{ width: `${levelInfo.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-stone-400 font-medium">
                Próximo nivel: {levelInfo.nextLevelXP} XP
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div
          onClick={() => onNavigate(Tab.Practice)}
          className="bg-white rounded-3xl p-8 shadow-md border border-stone-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-64"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-600 group-hover:text-white transition-all">
                <Activity size={28} />
              </div>
              <span className="text-xs font-bold bg-stone-100 text-stone-500 px-4 py-2 rounded-full uppercase tracking-tighter">15 min Sugeridos</span>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Sesión de Movilidad IA</h3>
            <p className="text-stone-500 leading-relaxed">Corrige tu postura en tiempo real y gana <span className="text-teal-600 font-bold">+50 XP</span>.</p>
          </div>
          <div className="flex items-center text-teal-600 font-bold group-hover:gap-3 transition-all">
            Empezar Práctica <ChevronRight size={20} />
          </div>
        </div>

        <div
          onClick={() => onNavigate(Tab.Profile)}
          className="bg-white rounded-3xl p-8 shadow-md border border-stone-100 hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer group flex flex-col justify-between h-64"
        >
          <div>
            <div className="flex justify-between items-start mb-6">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Award size={28} />
              </div>
              <span className="text-xs font-bold bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2">
                NUEVO LOGRO
              </span>
            </div>
            <h3 className="text-2xl font-bold text-stone-800 mb-2">Ver tus Insignias</h3>
            <p className="text-stone-500 leading-relaxed">Tienes insignias pendientes por desbloquear en tu perfil de practicante.</p>
          </div>
          <div className="flex items-center text-teal-600 font-bold group-hover:gap-3 transition-all">
            Ir al Perfil <ChevronRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

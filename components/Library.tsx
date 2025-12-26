
import React from 'react';
import { Play, Lock, Unlock, Clock, Star, Sparkles, Wind, Award, CheckCircle2 } from 'lucide-react';
import { Lesson } from '../types';

interface LibraryProps {
  lessons: Lesson[];
  onCompleteLesson: (lessonId: string) => void;
}

export const Library: React.FC<LibraryProps> = ({ lessons, onCompleteLesson }) => {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
             <span className="bg-teal-600/10 text-teal-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Tu Camino TaoFlow</span>
             <Sparkles size={14} className="text-teal-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-stone-800 leading-tight">Biblioteca de Aprendizaje</h2>
          <p className="text-stone-500 mt-3 text-lg max-w-2xl">Cada lección ha sido seleccionada por nuestra IA basada en tu evaluación inicial.</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {lessons.map((lesson, idx) => (
          <div 
            key={lesson.id} 
            className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-stone-100 flex flex-col ${lesson.locked ? 'opacity-70 grayscale' : ''}`}
          >
            <div className="h-56 overflow-hidden relative">
              <img 
                src={`https://picsum.photos/seed/${lesson.id}/800/600`} 
                alt={lesson.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute top-6 right-6">
                {lesson.completed ? (
                  <div className="bg-teal-500 text-white p-3 rounded-full shadow-lg border-4 border-white">
                    <CheckCircle2 size={18} />
                  </div>
                ) : lesson.locked ? (
                  <div className="bg-stone-900/90 backdrop-blur-md text-white p-3 rounded-full shadow-lg">
                    <Lock size={18} />
                  </div>
                ) : (
                  <div className="bg-white/90 backdrop-blur-md text-teal-600 p-3 rounded-full shadow-lg">
                    <Unlock size={18} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Lección {idx + 1}</span>
                <span className="text-xs font-bold text-orange-500">+150 XP</span>
              </div>
              
              <h3 className="text-2xl font-bold text-stone-800 mb-3 leading-tight">{lesson.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-1">{lesson.description}</p>
              
              {lesson.completed ? (
                <button className="w-full py-4 bg-teal-50 text-teal-700 rounded-2xl font-bold text-sm flex items-center justify-center gap-2">
                  <CheckCircle2 size={16} /> Lección Completada
                </button>
              ) : lesson.locked ? (
                <button className="w-full py-4 bg-stone-100 text-stone-400 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 cursor-not-allowed">
                  <Lock size={16} /> Bloqueada
                </button>
              ) : (
                <button 
                  onClick={() => onCompleteLesson(lesson.id)}
                  className="w-full py-4 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all shadow-xl shadow-stone-900/20 flex items-center justify-center gap-2"
                >
                  Comenzar Práctica <Play size={16} fill="white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { ChevronRight, Wind, Loader2, Sparkles } from 'lucide-react';
import { EvaluationData } from '../types';
import { useAuth } from '../contexts/AuthContext';
import * as api from '../lib/api';

export const EvaluationFlow: React.FC = () => {
  const { refreshProfile, refreshLessons } = useAuth();
  const [step, setStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<EvaluationData>({
    ageRange: '',
    fitnessLevel: '',
    primaryGoal: '',
    physicalLimitations: '',
    previousExperience: ''
  });

  const steps = [
    {
      title: "Bienvenido al Camino",
      question: "¿Cuál es tu rango de edad?",
      options: ["18-35", "36-50", "51-65", "65+"],
      field: "ageRange"
    },
    {
      title: "Tu Energía",
      question: "¿Cómo describirías tu nivel de actividad física actual?",
      options: ["Sedentario", "Activo ocasional", "Deportista regular", "Atleta"],
      field: "fitnessLevel"
    },
    {
      title: "Tu Intención",
      question: "¿Qué buscas principalmente en el Tai Chi?",
      options: ["Reducción de estrés", "Mejorar equilibrio", "Arte Marcial", "Salud articular"],
      field: "primaryGoal"
    },
    {
      title: "Tu Templo",
      question: "¿Tienes alguna limitación física o dolor crónico?",
      options: ["Ninguna", "Dolor de espalda", "Problemas de rodilla", "Movilidad reducida"],
      field: "physicalLimitations"
    },
    {
      title: "Tu Historia",
      question: "¿Has practicado Tai Chi o Qigong antes?",
      options: ["Nunca", "Hace mucho tiempo", "Algo de experiencia básica", "Practicante regular"],
      field: "previousExperience"
    }
  ];

  const handleNext = (option: string) => {
    const field = steps[step].field;
    const newData = { ...formData, [field]: option };
    setFormData(newData);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleComplete(newData);
    }
  };

  const handleComplete = async (data: EvaluationData) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generate curriculum via API
      await api.generateCurriculum(data);

      // Update profile to mark as onboarded
      await api.updateUserProfile({
        name: 'Practicante',
        experience: data.primaryGoal,
        onboarded: true
      });

      // Refresh user data
      await Promise.all([refreshProfile(), refreshLessons()]);
    } catch (err) {
      console.error('Error generating curriculum:', err);
      setError(err instanceof Error ? err.message : 'Error generando currículum');
      setIsGenerating(false);
    }
  };

  if (isGenerating) {
    return (
      <div className="fixed inset-0 bg-[#FDFBF7] z-[100] flex flex-col items-center justify-center p-6 text-center">
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin"></div>
          <Wind className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-600" size={40} />
        </div>
        <h2 className="text-3xl font-serif text-stone-800 mb-4 italic">El Maestro está trazando tu camino...</h2>
        <p className="text-stone-500 max-w-md animate-pulse">
          Estamos utilizando IA para diseñar una secuencia de lecciones adaptada a tu cuerpo y espíritu.
        </p>
        <div className="mt-8 flex items-center gap-2 text-teal-600 font-bold">
          <Sparkles size={20} />
          <span>Generando currículo personalizado</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[#FDFBF7] z-[100] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-stone-100 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">⚠️</span>
          </div>
          <h2 className="text-2xl font-serif text-stone-800 mb-4">Error</h2>
          <p className="text-stone-600 mb-6">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setStep(0);
            }}
            className="w-full py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-full font-bold transition-all"
          >
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 bg-[#FDFBF7] z-[100] flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-stone-100 animate-in fade-in zoom-in duration-500">
        <div className="flex justify-between items-center mb-8">
          <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">Paso {step + 1} de {steps.length}</span>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i <= step ? 'bg-teal-600' : 'bg-stone-100'}`}></div>
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-serif text-stone-500 mb-2 italic">{currentStep.title}</h2>
        <h1 className="text-3xl font-bold text-stone-800 mb-8 leading-tight">{currentStep.question}</h1>

        <div className="space-y-4">
          {currentStep.options.map((option) => (
            <button
              key={option}
              onClick={() => handleNext(option)}
              className="w-full text-left p-5 rounded-2xl border-2 border-stone-100 hover:border-teal-500 hover:bg-teal-50 transition-all group flex justify-between items-center"
            >
              <span className="text-lg font-medium text-stone-700 group-hover:text-teal-800">{option}</span>
              <ChevronRight className="text-stone-300 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

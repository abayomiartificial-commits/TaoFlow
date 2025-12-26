
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'Trophy' | 'Medal' | 'Star' | 'Flame' | 'Wind' | 'Target';
  color: string;
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  date: string;
  points: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: 'fundamento' | 'forma' | 'respiracion';
  difficulty: 'principiante' | 'intermedio' | 'avanzado';
  locked: boolean;
  completed?: boolean;
  completedAt?: string;
  content?: string;
}

export interface UserProfile {
  name: string;
  experience: string;
  goals: string[];
  limitations: string;
  level: string;
  onboarded: boolean;
  points: number;
  streak: number;
  badges: Badge[];
  achievements: Achievement[];
}

export interface EvaluationData {
  ageRange: string;
  fitnessLevel: string;
  primaryGoal: string;
  physicalLimitations: string;
  previousExperience: string;
}

export enum Tab {
  Dashboard = 'dashboard',
  Practice = 'practice',
  Learn = 'learn',
  Community = 'community',
  Profile = 'profile'
}

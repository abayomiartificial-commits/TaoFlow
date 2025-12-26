import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, signInWithGoogle as supabaseSignIn, signOut as supabaseSignOut } from '../lib/supabase';
import { UserProfile, Lesson, Achievement } from '../types';
import * as api from '../lib/api';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    profile: UserProfile | null;
    lessons: Lesson[];
    isLoading: boolean;
    isAuthenticated: boolean;
    signInWithGoogle: () => Promise<void>;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
    refreshLessons: () => Promise<void>;
    completeLesson: (lessonId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [lessons, setLessons] = useState<Lesson[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth state
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                loadUserData();
            } else {
                setIsLoading(false);
            }
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
                loadUserData();
            } else {
                setProfile(null);
                setLessons([]);
                setIsLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);

            // Load profile
            const profileData = await api.getUserProfile();
            setProfile(profileData.profile);

            // Load lessons
            const lessonsData = await api.getLessons();
            setLessons(lessonsData.lessons || []);
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabaseSignIn();
            if (error) throw error;
        } catch (error) {
            console.error('Error signing in:', error);
            throw error;
        }
    };

    const signOut = async () => {
        try {
            const { error } = await supabaseSignOut();
            if (error) throw error;

            setUser(null);
            setSession(null);
            setProfile(null);
            setLessons([]);
        } catch (error) {
            console.error('Error signing out:', error);
            throw error;
        }
    };

    const refreshProfile = async () => {
        try {
            const profileData = await api.getUserProfile();
            setProfile(profileData.profile);
        } catch (error) {
            console.error('Error refreshing profile:', error);
            throw error;
        }
    };

    const refreshLessons = async () => {
        try {
            const lessonsData = await api.getLessons();
            setLessons(lessonsData.lessons || []);
        } catch (error) {
            console.error('Error refreshing lessons:', error);
            throw error;
        }
    };

    const completeLesson = async (lessonId: string) => {
        try {
            await api.completeLesson(lessonId);

            // Refresh both lessons and profile (for updated points)
            await Promise.all([refreshLessons(), refreshProfile()]);
        } catch (error) {
            console.error('Error completing lesson:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                session,
                profile,
                lessons,
                isLoading,
                isAuthenticated: !!user,
                signInWithGoogle,
                signOut,
                refreshProfile,
                refreshLessons,
                completeLesson
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

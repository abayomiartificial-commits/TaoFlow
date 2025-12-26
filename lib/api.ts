import { supabase } from './supabase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Get authorization header with current user's token
 */
const getAuthHeader = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session?.access_token) {
        throw new Error('No active session. Please log in.');
    }

    return {
        'Authorization': `Bearer ${session.access_token}`,
        'Content-Type': 'application/json'
    };
};

/**
 * Handle API errors
 */
const handleResponse = async (response: Response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
};

// ============================================
// CURRICULUM API
// ============================================

export const generateCurriculum = async (evaluationData: any) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/curriculum/generate`, {
        method: 'POST',
        headers,
        body: JSON.stringify(evaluationData)
    });

    return handleResponse(response);
};

export const getCurriculum = async () => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/curriculum`, {
        method: 'GET',
        headers
    });

    return handleResponse(response);
};

// ============================================
// POSTURE ANALYSIS API
// ============================================

export const analyzePosture = async (imageBase64: string, sessionId?: string) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/posture/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ imageBase64, sessionId })
    });

    return handleResponse(response);
};

export const getPostureHistory = async (limit = 10) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/posture/history?limit=${limit}`, {
        method: 'GET',
        headers
    });

    return handleResponse(response);
};

// ============================================
// USER PROFILE API
// ============================================

export const getUserProfile = async () => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'GET',
        headers
    });

    return handleResponse(response);
};

export const updateUserProfile = async (updates: any) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/user/profile`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(updates)
    });

    return handleResponse(response);
};

export const getUserAchievements = async () => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/user/achievements`, {
        method: 'GET',
        headers
    });

    return handleResponse(response);
};

export const addAchievement = async (title: string, points: number) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/user/achievements`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ title, points })
    });

    return handleResponse(response);
};

// ============================================
// LESSONS API
// ============================================

export const getLessons = async () => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/lessons`, {
        method: 'GET',
        headers
    });

    return handleResponse(response);
};

export const completeLesson = async (lessonId: string) => {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_URL}/api/lessons/${lessonId}/complete`, {
        method: 'POST',
        headers
    });

    return handleResponse(response);
};

// ============================================
// HEALTH CHECK
// ============================================

export const checkAPIHealth = async () => {
    const response = await fetch(`${API_URL}/api/health`);
    return handleResponse(response);
};

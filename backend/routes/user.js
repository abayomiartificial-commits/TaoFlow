import express from 'express';
import { z } from 'zod';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation schemas
const ProfileUpdateSchema = z.object({
    name: z.string().min(1).optional(),
    experience: z.string().optional(),
    goals: z.array(z.string()).optional(),
    limitations: z.string().optional()
});

const AchievementSchema = z.object({
    title: z.string().min(1),
    points: z.number().int().positive()
});

/**
 * GET /api/user/profile
 * Get user profile
 */
router.get('/profile', requireAuth, async (req, res, next) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('user_id', req.user.id)
            .single();

        if (error && error.code !== 'PGRST116') { // Not found is ok
            throw new Error('Failed to fetch profile');
        }

        // If no profile exists, create default one
        if (!data) {
            const { data: newProfile, error: createError } = await supabaseAdmin
                .from('profiles')
                .insert({
                    user_id: req.user.id,
                    name: req.user.email?.split('@')[0] || 'Practicante',
                    experience: 'Explorador del Tao',
                    points: 0,
                    streak: 1,
                    level: 'Principiante',
                    onboarded: false
                })
                .select()
                .single();

            if (createError) {
                throw new Error('Failed to create profile');
            }

            return res.json({
                success: true,
                profile: newProfile
            });
        }

        res.json({
            success: true,
            profile: data
        });
    } catch (error) {
        next(error);
    }
});

/**
 * PUT /api/user/profile
 * Update user profile
 */
router.put('/profile', requireAuth, async (req, res, next) => {
    try {
        const updates = ProfileUpdateSchema.parse(req.body);

        const { data, error } = await supabaseAdmin
            .from('profiles')
            .update(updates)
            .eq('user_id', req.user.id)
            .select()
            .single();

        if (error) {
            throw new Error('Failed to update profile');
        }

        res.json({
            success: true,
            profile: data
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Invalid profile data',
                details: error.errors
            });
        }
        next(error);
    }
});

/**
 * POST /api/user/achievements
 * Add achievement to user profile
 */
router.post('/achievements', requireAuth, async (req, res, next) => {
    try {
        const achievement = AchievementSchema.parse(req.body);

        const { data, error } = await supabaseAdmin
            .from('achievements')
            .insert({
                user_id: req.user.id,
                title: achievement.title,
                points: achievement.points,
                earned_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            throw new Error('Failed to add achievement');
        }

        // Update user points
        await supabaseAdmin.rpc('increment_user_points', {
            user_id: req.user.id,
            points_to_add: achievement.points
        });

        res.json({
            success: true,
            achievement: data
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Invalid achievement data',
                details: error.errors
            });
        }
        next(error);
    }
});

/**
 * GET /api/user/achievements
 * Get user achievements
 */
router.get('/achievements', requireAuth, async (req, res, next) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('achievements')
            .select('*')
            .eq('user_id', req.user.id)
            .order('earned_at', { ascending: false });

        if (error) {
            throw new Error('Failed to fetch achievements');
        }

        res.json({
            success: true,
            achievements: data || []
        });
    } catch (error) {
        next(error);
    }
});

export default router;

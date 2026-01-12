import express from 'express';
import { z } from 'zod';
import { generateTaiChiCurriculum } from '../lib/gemini.js';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const EvaluationSchema = z.object({
    ageRange: z.string().min(1),
    fitnessLevel: z.string().min(1),
    primaryGoal: z.string().min(1),
    physicalLimitations: z.string(),
    previousExperience: z.string().min(1)
});

/**
 * POST /api/curriculum/generate
 * Generate personalized curriculum based on user evaluation
 */
router.post('/generate', requireAuth, async (req, res, next) => {
    try {
        // Validate request body
        const evaluationData = EvaluationSchema.parse(req.body);

        // Generate curriculum using Gemini
        const lessons = await generateTaiChiCurriculum(evaluationData);

        // Delete existing lessons for this user (if any) to allow regeneration
        await supabaseAdmin
            .from('lessons')
            .delete()
            .eq('user_id', req.user.id);

        // Save lessons to database
        const { data, error } = await supabaseAdmin
            .from('lessons')
            .insert(
                lessons.map(lesson => ({
                    user_id: req.user.id,
                    lesson_id: lesson.id,
                    title: lesson.title,
                    description: lesson.description,
                    duration: lesson.duration,
                    category: lesson.category,
                    difficulty: lesson.difficulty,
                    locked: lesson.locked,
                    content: lesson.content,
                    completed: false
                }))
            )
            .select();

        if (error) {
            console.error('Database error:', error);
            throw new Error('Failed to save lessons');
        }

        // Mark user as onboarded
        await supabaseAdmin
            .from('profiles')
            .update({ onboarded: true })
            .eq('user_id', req.user.id);

        res.json({
            success: true,
            lessons: data
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Invalid evaluation data',
                details: error.errors
            });
        }
        next(error);
    }
});

/**
 * GET /api/curriculum
 * Get user's curriculum
 */
router.get('/', requireAuth, async (req, res, next) => {
    try {
        const { data, error } = await supabaseAdmin
            .from('lessons')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: true });

        if (error) {
            throw new Error('Failed to fetch lessons');
        }

        res.json({
            success: true,
            lessons: data || []
        });
    } catch (error) {
        next(error);
    }
});

export default router;

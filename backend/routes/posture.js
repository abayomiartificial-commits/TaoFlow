import express from 'express';
import { z } from 'zod';
import { analyzePosture } from '../lib/gemini.js';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// Validation schema
const PostureAnalysisSchema = z.object({
    imageBase64: z.string().min(1),
    sessionId: z.string().optional()
});

/**
 * POST /api/posture/analyze
 * Analyze posture from image using Gemini Vision
 */
router.post('/analyze', requireAuth, async (req, res, next) => {
    try {
        const { imageBase64, sessionId } = PostureAnalysisSchema.parse(req.body);

        // Analyze posture using Gemini
        const feedback = await analyzePosture(imageBase64);

        // Save analysis to database
        const { data, error } = await supabaseAdmin
            .from('posture_analyses')
            .insert({
                user_id: req.user.id,
                session_id: sessionId,
                feedback,
                analyzed_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) {
            console.error('Database error:', error);
            throw new Error('Failed to save analysis');
        }

        res.json({
            success: true,
            feedback,
            analysis: data
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                error: 'Invalid request data',
                details: error.errors
            });
        }
        next(error);
    }
});

/**
 * GET /api/posture/history
 * Get user's posture analysis history
 */
router.get('/history', requireAuth, async (req, res, next) => {
    try {
        const limit = parseInt(req.query.limit) || 10;

        const { data, error } = await supabaseAdmin
            .from('posture_analyses')
            .select('*')
            .eq('user_id', req.user.id)
            .order('analyzed_at', { ascending: false })
            .limit(limit);

        if (error) {
            throw new Error('Failed to fetch history');
        }

        res.json({
            success: true,
            history: data || []
        });
    } catch (error) {
        next(error);
    }
});

export default router;

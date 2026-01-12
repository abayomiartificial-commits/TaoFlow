import express from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/admin/reset-lessons
 * Reset lesson states - unlock first lesson, lock all others
 */
router.post('/reset-lessons', requireAuth, async (req, res, next) => {
    try {
        // Get all lessons for this user, ordered by creation
        const { data: lessons, error: fetchError } = await supabaseAdmin
            .from('lessons')
            .select('*')
            .eq('user_id', req.user.id)
            .order('created_at', { ascending: true });

        if (fetchError) {
            throw new Error('Failed to fetch lessons');
        }

        if (!lessons || lessons.length === 0) {
            return res.json({
                success: true,
                message: 'No lessons to reset'
            });
        }

        // Reset all lessons: first one unlocked and not completed, rest locked
        for (let i = 0; i < lessons.length; i++) {
            const lesson = lessons[i];
            await supabaseAdmin
                .from('lessons')
                .update({
                    locked: i !== 0,  // First lesson (index 0) is unlocked
                    completed: false,
                    completed_at: null
                })
                .eq('id', lesson.id);
        }

        // Reset user points and achievements
        await supabaseAdmin
            .from('profiles')
            .update({ points: 0 })
            .eq('user_id', req.user.id);

        // Delete all achievements
        await supabaseAdmin
            .from('achievements')
            .delete()
            .eq('user_id', req.user.id);

        res.json({
            success: true,
            message: `Reset ${lessons.length} lessons. First lesson unlocked, rest locked.`,
            lessonsReset: lessons.length
        });
    } catch (error) {
        next(error);
    }
});

export default router;

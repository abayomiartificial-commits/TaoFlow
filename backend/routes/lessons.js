import express from 'express';
import { supabaseAdmin } from '../lib/supabase.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

/**
 * POST /api/lessons/:id/complete
 * Mark lesson as completed
 */
router.post('/:id/complete', requireAuth, async (req, res, next) => {
    try {
        const lessonId = req.params.id;

        // Update lesson status (search by UUID id, not lesson_id)
        const { data: lesson, error: lessonError } = await supabaseAdmin
            .from('lessons')
            .update({
                completed: true,
                completed_at: new Date().toISOString()
            })
            .eq('id', lessonId)  // Changed from 'lesson_id' to 'id'
            .eq('user_id', req.user.id)
            .select()
            .single();

        if (lessonError) {
            console.error('Lesson completion error:', lessonError);
            console.error('Lesson ID:', lessonId);
            console.error('User ID:', req.user.id);
            throw new Error(`Failed to complete lesson: ${lessonError.message || JSON.stringify(lessonError)}`);
        }

        if (!lesson) {
            console.error('No lesson found with ID:', lessonId, 'for user:', req.user.id);
            throw new Error('Lesson not found');
        }

        // Award XP
        const xpGain = 150;
        await supabaseAdmin.rpc('increment_user_points', {
            user_id: req.user.id,
            points_to_add: xpGain
        });

        // Create achievement
        await supabaseAdmin
            .from('achievements')
            .insert({
                user_id: req.user.id,
                title: 'Lección Completada',
                points: xpGain,
                earned_at: new Date().toISOString()
            });

        // Auto-unlock next lesson
        const { data: nextLesson } = await supabaseAdmin
            .from('lessons')
            .select('*')
            .eq('user_id', req.user.id)
            .eq('locked', true)
            .order('created_at', { ascending: true })
            .limit(1)
            .maybeSingle();

        if (nextLesson) {
            await supabaseAdmin
                .from('lessons')
                .update({ locked: false })
                .eq('id', nextLesson.id);
        }

        res.json({
            success: true,
            lesson,
            xpGained: xpGain,
            nextLessonUnlocked: !!nextLesson
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/lessons
 * Get all lessons for user
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

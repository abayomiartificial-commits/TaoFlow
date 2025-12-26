-- TaoFlow Database Schema for Supabase
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL DEFAULT 'Practicante',
  experience TEXT DEFAULT 'Explorador del Tao',
  goals TEXT[] DEFAULT '{}',
  limitations TEXT DEFAULT '',
  level TEXT DEFAULT 'Principiante',
  points INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 1,
  onboarded BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LESSONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  lesson_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fundamento', 'forma', 'respiracion')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('principiante', 'intermedio', 'avanzado')),
  locked BOOLEAN DEFAULT TRUE,
  content TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

-- ============================================
-- ACHIEVEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  earned_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- POSTURE ANALYSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS posture_analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_id TEXT,
  feedback TEXT NOT NULL,
  analyzed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BADGES TABLE (for tracking unlocked badges)
-- ============================================
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  unlocked BOOLEAN DEFAULT FALSE,
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, badge_id)
);

-- ============================================
-- INDEXES for better query performance
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_user_id ON lessons(user_id);
CREATE INDEX IF NOT EXISTS idx_lessons_completed ON lessons(user_id, completed);
CREATE INDEX IF NOT EXISTS idx_achievements_user_id ON achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_posture_user_id ON posture_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_badges_user_id ON badges(user_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE posture_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Lessons policies
CREATE POLICY "Users can view own lessons"
  ON lessons FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own lessons"
  ON lessons FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own lessons"
  ON lessons FOR UPDATE
  USING (auth.uid() = user_id);

-- Achievements policies
CREATE POLICY "Users can view own achievements"
  ON achievements FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON achievements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Posture analyses policies
CREATE POLICY "Users can view own posture analyses"
  ON posture_analyses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posture analyses"
  ON posture_analyses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Badges policies
CREATE POLICY "Users can view own badges"
  ON badges FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own badges"
  ON badges FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own badges"
  ON badges FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to increment user points
CREATE OR REPLACE FUNCTION increment_user_points(
  user_id UUID,
  points_to_add INTEGER
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE profiles
  SET points = points + points_to_add,
      updated_at = NOW()
  WHERE profiles.user_id = increment_user_points.user_id;
END;
$$;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to auto-update updated_at on profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-update updated_at on lessons
CREATE TRIGGER update_lessons_updated_at
  BEFORE UPDATE ON lessons
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- INITIAL DATA (Optional - for testing)
-- ============================================

-- You can add initial badge definitions here if needed
-- Example:
-- INSERT INTO badges (user_id, badge_id, name, description, icon, color)
-- VALUES 
--   (auth.uid(), 'b1', 'Primer Aliento', 'Completa tu primera lección de respiración.', 'Wind', 'bg-blue-50 text-blue-600'),
--   (auth.uid(), 'b2', 'Enraizado', 'Alcanza una racha de 3 días.', 'Flame', 'bg-orange-50 text-orange-600');

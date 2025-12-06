-- Initial database schema for Math Practice MVP
-- Run this migration to create all tables

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,  -- 8-digit numeric ID (e.g., "12345678")
  grade_level TEXT NOT NULL CHECK (grade_level IN ('SMP', 'SMA')),
  class_level INTEGER NOT NULL CHECK (class_level BETWEEN 7 AND 12),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_id ON users(id);

-- Topics table
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_code TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  class_levels JSONB NOT NULL  -- Array of integers
);

-- Questions table
CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES topics(id),
  grade_level TEXT NOT NULL,
  class_level INTEGER NOT NULL,
  
  prompt_text TEXT NOT NULL,
  prompt_image_url TEXT,
  
  type TEXT NOT NULL CHECK (type = 'mcq'),
  options JSONB NOT NULL,  -- Array for MCQ
  correct_option TEXT NOT NULL,  -- For MCQ
  
  explanation_text TEXT,
  
  source_year INTEGER,
  source_package TEXT,
  source_number INTEGER,
  
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);

-- User Question State (FSRS) table
CREATE TABLE IF NOT EXISTS user_question_state (
  user_id TEXT NOT NULL REFERENCES users(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  
  state TEXT NOT NULL DEFAULT 'new',
  stability NUMERIC NOT NULL DEFAULT 0,
  difficulty NUMERIC NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,
  
  last_result_correct BOOLEAN,
  last_reviewed_at TIMESTAMP,
  next_due_at TIMESTAMP NOT NULL DEFAULT NOW(),
  
  updated_at TIMESTAMP DEFAULT NOW(),
  
  PRIMARY KEY (user_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_uqs_due ON user_question_state(user_id, next_due_at);
CREATE INDEX IF NOT EXISTS idx_uqs_question ON user_question_state(question_id);

-- Sessions table
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  topic_id TEXT NOT NULL REFERENCES topics(id),
  
  status TEXT NOT NULL DEFAULT 'in_progress' 
    CHECK (status IN ('in_progress', 'completed', 'abandoned')),
  
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id, started_at DESC);

-- Session Items table
CREATE TABLE IF NOT EXISTS session_items (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  question_id TEXT NOT NULL REFERENCES questions(id),
  
  sequence INTEGER NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN,
  answered_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_session_items_session ON session_items(session_id, sequence);


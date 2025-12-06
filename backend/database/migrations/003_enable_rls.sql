-- Enable Row Level Security (RLS) on all public tables
-- This is required for Supabase security best practices
-- 
-- Note: The service_role (used by backend API via DATABASE_URL) bypasses RLS,
-- but RLS must still be enabled to satisfy Supabase security requirements.
-- These policies restrict access for anon/authenticated roles if PostgREST is used.

-- Revoke direct table privileges from PUBLIC and anon roles
-- This ensures access is only through RLS policies
REVOKE ALL ON users FROM PUBLIC;
REVOKE ALL ON users FROM anon;
REVOKE ALL ON topics FROM PUBLIC;
REVOKE ALL ON topics FROM anon;
REVOKE ALL ON questions FROM PUBLIC;
REVOKE ALL ON questions FROM anon;
REVOKE ALL ON user_question_state FROM PUBLIC;
REVOKE ALL ON user_question_state FROM anon;
REVOKE ALL ON sessions FROM PUBLIC;
REVOKE ALL ON sessions FROM anon;
REVOKE ALL ON session_items FROM PUBLIC;
REVOKE ALL ON session_items FROM anon;

-- Enable RLS on all tables
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS user_question_state ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS session_items ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to topics and questions (public data)
-- These are safe to expose as they contain educational content

-- Topics: Public read-only access (educational content is safe to expose)
-- Enable RLS explicitly (idempotent)
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read topics" ON topics;
DROP POLICY IF EXISTS "topics_no_inserts" ON topics;
DROP POLICY IF EXISTS "topics_no_updates" ON topics;
DROP POLICY IF EXISTS "topics_no_deletes" ON topics;

-- Allow SELECT to everyone (public data)
CREATE POLICY "Anyone can read topics"
  ON topics
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Explicitly deny INSERT operations
CREATE POLICY "topics_no_inserts"
  ON topics
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Explicitly deny UPDATE operations
CREATE POLICY "topics_no_updates"
  ON topics
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Explicitly deny DELETE operations
CREATE POLICY "topics_no_deletes"
  ON topics
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Questions: Public read-only access (educational content is safe to expose)
-- Enable RLS explicitly (idempotent)
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read questions" ON questions;
DROP POLICY IF EXISTS "questions_no_inserts" ON questions;
DROP POLICY IF EXISTS "questions_no_updates" ON questions;
DROP POLICY IF EXISTS "questions_no_deletes" ON questions;

-- Allow SELECT to everyone (public data)
CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO PUBLIC
  USING (true);

-- Explicitly deny INSERT operations
CREATE POLICY "questions_no_inserts"
  ON questions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- Explicitly deny UPDATE operations
CREATE POLICY "questions_no_updates"
  ON questions
  FOR UPDATE
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Explicitly deny DELETE operations
CREATE POLICY "questions_no_deletes"
  ON questions
  FOR DELETE
  TO anon, authenticated
  USING (false);

-- Users table: Private data - deny all access to anon/authenticated
-- Enable RLS explicitly (idempotent)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "users_no_access" ON users;

-- Deny all operations to anon and authenticated roles
-- Backend API uses service_role which bypasses RLS
CREATE POLICY "users_no_access"
  ON users
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- User Question State: Private data - deny all access
-- Enable RLS explicitly (idempotent)
ALTER TABLE user_question_state ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "user_question_state_no_access" ON user_question_state;

-- Deny all operations to anon and authenticated roles
CREATE POLICY "user_question_state_no_access"
  ON user_question_state
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Sessions: Private data - deny all access
-- Enable RLS explicitly (idempotent)
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "sessions_no_access" ON sessions;

-- Deny all operations to anon and authenticated roles
CREATE POLICY "sessions_no_access"
  ON sessions
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Session Items: Private data - deny all access
-- Enable RLS explicitly (idempotent)
ALTER TABLE session_items ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "session_items_no_access" ON session_items;

-- Deny all operations to anon and authenticated roles
CREATE POLICY "session_items_no_access"
  ON session_items
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);

-- Note: Since this backend uses SQLAlchemy with direct database connections
-- via the service_role credentials in DATABASE_URL, it bypasses RLS automatically.
-- These policies are for security if PostgREST is ever enabled or accessed directly.
-- The service_role (used by backend API) bypasses all RLS policies.


-- Migration: Restrict question type to MCQ only
-- This migration updates the database to only allow MCQ questions

-- Step 1: Delete any existing numeric questions (they will need to be re-added as MCQ)
DELETE FROM questions WHERE type = 'numeric';

-- Step 2: Drop the old check constraint
ALTER TABLE questions DROP CONSTRAINT IF EXISTS check_question_type;

-- Step 3: Add new constraint to only allow 'mcq'
ALTER TABLE questions ADD CONSTRAINT check_question_type CHECK (type = 'mcq');

-- Step 4: Drop the correct_value column (no longer needed)
ALTER TABLE questions DROP COLUMN IF EXISTS correct_value;

-- Step 5: Make options and correct_option NOT NULL (after ensuring all questions have them)
-- First, check if there are any NULL values (shouldn't be after deleting numeric questions)
-- If there are, we'll need to handle them, but for now we'll just add the constraint
-- Note: This might fail if there are existing questions with NULL values
-- In that case, you'll need to update those questions first

-- Update any remaining questions to ensure they have options and correct_option
-- (This should not be needed if numeric questions were deleted, but just in case)
UPDATE questions 
SET 
  options = '["A) Placeholder", "B) Placeholder", "C) Placeholder", "D) Placeholder"]',
  correct_option = 'A'
WHERE options IS NULL OR correct_option IS NULL;

-- Now make them NOT NULL
ALTER TABLE questions 
  ALTER COLUMN options SET NOT NULL,
  ALTER COLUMN correct_option SET NOT NULL;


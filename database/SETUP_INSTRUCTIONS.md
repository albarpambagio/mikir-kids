# Database Setup Instructions

## Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `mikir-kids` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click "Create new project"
5. Wait ~2 minutes for project to be created

## Step 2: Get Database Connection String

1. In Supabase Dashboard, go to **Project Settings** → **Database**
2. Scroll to **Connection String** section
3. Copy the **URI** connection string (not the Session mode)
4. It should look like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
5. Replace `[YOUR-PASSWORD]` with the password you created in Step 1

## Step 3: Configure Backend Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cd backend
   cp .env.example .env
   ```

2. Edit `.env` and paste your DATABASE_URL:
   ```
   DATABASE_URL=postgresql://postgres:your_actual_password@db.xxxxx.supabase.co:5432/postgres
   ```

## Step 4: Run Migrations

### Option A: Using psql (Recommended)

1. Install PostgreSQL client tools (if not already installed)
2. Run the migration files:

```bash
# From project root
cd database/migrations

# Run initial schema
psql "your_database_url_here" -f 001_initial_schema.sql

# Run seed data
psql "your_database_url_here" -f 002_seed_data.sql
```

### Option B: Using Supabase SQL Editor

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **New Query**
3. Copy contents of `001_initial_schema.sql` and paste
4. Click **Run** (or press Ctrl+Enter)
5. Repeat for `002_seed_data.sql`

### Option C: Using Python Script (See `run_migrations.py`)

```bash
cd backend
python database/run_migrations.py
```

## Step 5: Verify Setup

1. Go to Supabase Dashboard → **Table Editor**
2. You should see these tables:
   - `users`
   - `topics`
   - `questions`
   - `sessions`
   - `session_items`
   - `user_question_state`

3. Check `topics` table - should have 3 rows
4. Check `questions` table - should have sample questions

## Troubleshooting

### Connection Issues
- Make sure your IP is allowed in Supabase (Settings → Database → Connection Pooling)
- Check that password is correct (no extra spaces)
- Verify connection string format

### Migration Errors
- If tables already exist, you may need to drop them first:
  ```sql
  DROP TABLE IF EXISTS session_items CASCADE;
  DROP TABLE IF EXISTS sessions CASCADE;
  DROP TABLE IF EXISTS user_question_state CASCADE;
  DROP TABLE IF EXISTS questions CASCADE;
  DROP TABLE IF EXISTS topics CASCADE;
  DROP TABLE IF EXISTS users CASCADE;
  ```
- Then re-run migrations

### Seed Data Issues
- If seed data fails due to conflicts, that's okay - it means data already exists
- You can manually verify in Supabase Table Editor


# Complete Setup Guide

This guide will help you set up the Math Practice MVP project from scratch.

## Prerequisites

- Node.js 18+ installed
- Python 3.11+ installed
- [uv](https://github.com/astral-sh/uv) - Fast Python package installer
- Supabase account (free tier is fine)
- Git (optional)

### Install uv

**Windows (PowerShell):**
```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**macOS/Linux:**
```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

After installation, restart your terminal or run `refreshenv` (Windows) / reload your shell config.

## Step 1: Supabase Database Setup

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click **"New Project"**
3. Fill in:
   - **Name**: `mikir-kids` (or your choice)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to you
4. Click **"Create new project"**
5. Wait ~2 minutes for provisioning

### 1.2 Get Connection String

1. In Supabase Dashboard → **Project Settings** → **Database**
2. Scroll to **Connection String** section
3. Copy the **URI** (not Session mode)
4. Format: `postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres`
5. Replace `[PASSWORD]` with your actual password

### 1.3 Run Database Migrations

**Option A: Using Supabase SQL Editor (Easiest)**

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New Query"**
3. Open `database/migrations/001_initial_schema.sql`
4. Copy all contents and paste into SQL Editor
5. Click **"Run"** (or Ctrl+Enter)
6. Repeat for `002_seed_data.sql`

**Option B: Using Python Script**

```bash
cd backend
# Create .env file first (see Step 2)
# Using uv (recommended)
uv run python database/run_migrations.py

# Or if using pip
pip install psycopg2-binary
python database/run_migrations.py
```

**Option C: Using psql Command Line**

```bash
# Install PostgreSQL client tools first
psql "your_database_url_here" -f database/migrations/001_initial_schema.sql
psql "your_database_url_here" -f database/migrations/002_seed_data.sql
```

### 1.4 Verify Database Setup

1. Go to Supabase Dashboard → **Table Editor**
2. You should see 6 tables:
   - `users`
   - `topics` (should have 3 rows)
   - `questions` (should have sample questions)
   - `sessions`
   - `session_items`
   - `user_question_state`

---

## Step 2: Configure Environment Variables

### 2.1 Backend Configuration

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
DATABASE_URL=postgresql://postgres:your_actual_password@db.xxxxx.supabase.co:5432/postgres
ENVIRONMENT=development
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
```

### 2.2 Frontend Configuration

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Math Practice
VITE_DEFAULT_SESSION_SIZE=15
VITE_ENV=development
```

---

## Step 3: Install Dependencies

### 3.1 Frontend

```bash
cd frontend
npm install
```

### 3.2 Backend

**Using uv (Recommended):**

```bash
cd backend

# Install dependencies and create virtual environment automatically
uv sync
```

This will:
- Create a virtual environment (`.venv`) automatically
- Install all dependencies from `pyproject.toml`
- Install the project in editable mode

**Alternative: Using pip (if you prefer):**

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies using uv
uv sync
```

---

## Step 4: Start Development Servers

### 4.1 Start Backend

**Using uv (Recommended):**

```bash
cd backend
uv run uvicorn app.main:app --reload
```

**Alternative: Using activated virtual environment:**

```bash
cd backend
# Activate virtual environment first
# On Windows: .venv\Scripts\activate
# On Mac/Linux: source .venv/bin/activate
uvicorn app.main:app --reload
```

Backend should be running at: http://localhost:8000

Verify: Open http://localhost:8000/health in browser

### 4.2 Start Frontend

```bash
cd frontend
npm run dev
```

Frontend should be running at: http://localhost:5173

---

## Step 5: Test the Setup

### 5.1 Test Backend API

**Option A: Using Test Script**

```bash
cd backend
# Make sure backend is running first
# Using uv (recommended)
uv run python test_user_api.py

# Or with activated virtual environment
python test_user_api.py
```

**Option B: Manual Testing**

1. Open http://localhost:8000/docs (FastAPI auto-generated docs)
2. Try the `/api/users` POST endpoint
3. Should return a user_id

**Option C: Using curl**

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"grade_level": "SMP", "class_level": 7}'
```

### 5.2 Test Frontend

1. Open http://localhost:5173
2. Should see "Dashboard - Coming Soon" (placeholder page)
3. Check browser console for errors

---

## Troubleshooting

### Database Connection Issues

- **Error**: "Connection refused" or "timeout"
  - Check DATABASE_URL in `.env` file
  - Verify Supabase project is active
  - Check if password is correct (no extra spaces)

- **Error**: "relation does not exist"
  - Migrations not run yet
  - Run migrations (see Step 1.3)

### Backend Issues

- **Error**: "Module not found"
  - Run `uv sync` to install dependencies
  - Make sure you're using `uv run` to execute commands (e.g., `uv run uvicorn app.main:app --reload`)

- **Error**: "Port already in use"
  - Another process is using port 8000
  - Change port: `uvicorn app.main:app --reload --port 8001`

### Frontend Issues

- **Error**: "Cannot connect to API"
  - Check `VITE_API_URL` in `.env` file
  - Make sure backend is running
  - Check CORS settings in backend

- **Error**: "Module not found"
  - Run `npm install` again
  - Delete `node_modules` and reinstall

---

## Next Steps

Once setup is complete:

1. ✅ Database is configured and migrations run
2. ✅ Backend API is running and testable
3. ✅ Frontend is running

**Ready for Phase 2**: Authentication & Onboarding UI implementation!

---

## Quick Reference

| Service | URL | Command |
|---------|-----|---------|
| Backend API | http://localhost:8000 | `uv run uvicorn app.main:app --reload` |
| Backend Docs | http://localhost:8000/docs | (auto-generated) |
| Frontend | http://localhost:5173 | `npm run dev` |
| Supabase Dashboard | https://supabase.com/dashboard | (web) |

---

**Need Help?** Check the individual setup files:
- `database/SETUP_INSTRUCTIONS.md` - Detailed database setup
- `backend/README.md` - Backend-specific notes
- `frontend/README.md` - Frontend-specific notes (if exists)


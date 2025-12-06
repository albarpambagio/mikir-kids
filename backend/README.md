# Math Practice Backend

FastAPI backend for Math Deliberate Practice MVP.

## Prerequisites

- Python 3.11+
- [uv](https://github.com/astral-sh/uv) - Fast Python package installer

Install uv:
```bash
# On Windows (PowerShell)
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# On macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**After installation on Windows:**

The installer automatically adds `uv` to your user PATH. However, **existing terminals won't see it** until you:

1. **Restart your terminal/PowerShell** (recommended - easiest solution), OR
2. **Use the helper script** (in `backend/` directory):
   ```powershell
   cd backend
   . .\ensure_uv.ps1
   ```
3. **Manually refresh PATH in current session:**
   ```powershell
   $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
   ```

**Troubleshooting:** If `uv` works in one directory but not another, it's a PATH caching issue. Restart your terminal or run the helper script above.

To verify `uv` is installed:
```powershell
Test-Path "$env:USERPROFILE\.local\bin\uv.exe"  # Should return True
```

## Setup

1. Install dependencies using uv:
```bash
cd backend
uv sync
```

This will:
- Create a virtual environment automatically (`.venv/`)
- Install all dependencies from `pyproject.toml`
- Install the project in editable mode
- Generate/update `uv.lock` file (commit this for reproducible builds)

**To install test dependencies (for running tests):**
```bash
uv sync --extra test
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials
```

3. Run database migrations:

**Option A: Using SQL migrations (Recommended for Supabase)**
```bash
# Run the migration script (runs all migrations in order)
uv run python database/run_migrations.py
```

This will run:
- `001_initial_schema.sql` - Creates all tables
- `002_seed_data.sql` - Adds sample topics and questions
- `003_enable_rls.sql` - Enables Row Level Security (RLS) on all tables

**Option B: Using Alembic (if configured)**
```bash
uv run alembic upgrade head
```

**Note:** If you see "relation does not exist" errors, it means migrations haven't been run yet.

**Important:** The RLS migration (`003_enable_rls.sql`) enables Row Level Security on all tables as required by Supabase security best practices. This ensures your database is secure even if PostgREST is enabled.

4. Start development server:
```bash
# Using uv (recommended)
uv run uvicorn app.main:app --reload

# Or activate the virtual environment first
# On Windows:
.venv\Scripts\activate
# On Mac/Linux:
source .venv/bin/activate
# Then run:
uvicorn app.main:app --reload
```

**Important:** With `uv`, you should use `uv run` to execute commands. If you see errors like "uvicorn: The term 'uvicorn' is not recognized", it means you're trying to run it directly instead of through `uv run`.

## Installing Additional Dependencies

To add a new dependency:
```bash
uv add package-name
```

To add a development/test dependency:
```bash
uv add --dev package-name
# or for test dependencies
uv add --optional test package-name
```

## Lock File

The `uv.lock` file ensures reproducible builds. **Commit this file** to version control so all team members use the same dependency versions.

To update dependencies:
```bash
uv lock --upgrade  # Update lock file with latest compatible versions
uv sync            # Sync environment with lock file
```

## Troubleshooting

### "uvicorn: The term 'uvicorn' is not recognized"

This happens when you try to run `uvicorn` directly without using `uv run` or activating the virtual environment.

**Solution:** Use `uv run`:
```powershell
uv run uvicorn app.main:app --reload
```

Or activate the virtual environment first:
```powershell
.venv\Scripts\activate  # Windows
uvicorn app.main:app --reload
```

### "uv: The term 'uv' is not recognized"

See the "After installation on Windows" section above - you need to restart your terminal or refresh PATH.

### "ModuleNotFoundError: No module named 'requests'"

This happens when test dependencies aren't installed. The `requests` module is in optional test dependencies.

**Solution:** Install test dependencies:
```powershell
uv sync --extra test
```

Then run your test script:
```powershell
uv run python test_user_api.py
```

### "500 Internal Server Error" when creating users

This usually means:
1. **Database tables don't exist** - Run migrations first:
   ```powershell
   uv run python database/run_migrations.py
   ```
2. **Database connection failed** - Check your `.env` file has correct `DATABASE_URL`
3. **Database not accessible** - Verify your Supabase project is active

The updated error handling will now show more specific error messages to help diagnose the issue.

### "could not translate host name" or "No such host is known"

This DNS resolution error typically means:

1. **Supabase project is paused** (most common):
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Check if your project shows "Paused" status
   - Click "Restore project" to unpause it
   - Free tier projects pause after 1 week of inactivity

2. **Network/DNS issue**:
   - Check your internet connection
   - Try accessing Supabase dashboard in browser
   - Restart your router/network if needed

3. **Incorrect DATABASE_URL**:
   - Verify the hostname in your `.env` file matches your Supabase project
   - Get the correct connection string from: Supabase Dashboard → Project Settings → Database → Connection String

**Quick fix:** Check Supabase dashboard first - if project is paused, restore it and wait 1-2 minutes for it to come online.

## Testing

To run the API test suite:

1. **Make sure test dependencies are installed:**
   ```bash
   uv sync --extra test
   ```

2. **Start the development server** (in one terminal):
   ```bash
   uv run uvicorn app.main:app --reload
   ```

3. **Run the test script** (in another terminal):
   ```bash
   uv run python test_user_api.py
   ```

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string (Supabase)
- `ENVIRONMENT`: development/production


#!/usr/bin/env python3
"""
Script to run database migrations from SQL files.
Usage: python database/run_migrations.py
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import psycopg2
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("ERROR: DATABASE_URL not found in .env file")
    print("Please create backend/.env file with DATABASE_URL")
    sys.exit(1)

# Get migration files
# Script is in backend/database/, so migrations are in backend/database/migrations/
migrations_dir = Path(__file__).parent / "migrations"

if not migrations_dir.exists():
    print(f"ERROR: Migrations directory not found: {migrations_dir}")
    sys.exit(1)

migration_files = sorted(migrations_dir.glob("*.sql"))

if not migration_files:
    print(f"ERROR: No migration files found in {migrations_dir}")
    sys.exit(1)

print(f"Found {len(migration_files)} migration file(s)")

try:
    # Connect to database
    print("Connecting to database...")
    conn = psycopg2.connect(DATABASE_URL)
    conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
    cursor = conn.cursor()
    
    # Run each migration
    for migration_file in migration_files:
        print(f"\nRunning {migration_file.name}...")
        
        with open(migration_file, 'r', encoding='utf-8') as f:
            sql = f.read()
        
        try:
            cursor.execute(sql)
            print(f"✅ {migration_file.name} completed successfully")
        except Exception as e:
            error_str = str(e).lower()
            # Check if error is due to "already exists" - that's okay
            if ("already exists" in error_str or 
                "duplicate" in error_str or 
                "already enabled" in error_str or
                "policy" in error_str and "already exists" in error_str):
                print(f"⚠️  {migration_file.name} - Already applied (skipping)")
            else:
                print(f"❌ Error in {migration_file.name}: {e}")
                raise
    
    cursor.close()
    conn.close()
    
    print("\n✅ All migrations completed successfully!")
    print("\nNext steps:")
    print("1. Verify tables in Supabase Dashboard → Table Editor")
    print("2. Start backend server: uvicorn app.main:app --reload")
    
except psycopg2.Error as e:
    print(f"\n❌ Database error: {e}")
    print("\nTroubleshooting:")
    print("1. Check DATABASE_URL in .env file")
    print("2. Verify Supabase project is active")
    print("3. Check network connection")
    sys.exit(1)
except Exception as e:
    print(f"\n❌ Unexpected error: {e}")
    sys.exit(1)


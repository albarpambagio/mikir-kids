#!/usr/bin/env python3
"""
Test database connection to Supabase.
This helps diagnose connection issues.
"""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv
import psycopg2
from urllib.parse import urlparse

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    print("❌ ERROR: DATABASE_URL not found in .env file")
    print("\nPlease create backend/.env file with:")
    print("DATABASE_URL=postgresql://postgres:your_password@db.xxxxx.supabase.co:5432/postgres")
    sys.exit(1)

# Parse the connection string
try:
    parsed = urlparse(DATABASE_URL)
    host = parsed.hostname
    port = parsed.port or 5432
    user = parsed.username
    database = parsed.path.lstrip('/')
    
    print("🔍 Connection Details:")
    print(f"   Host: {host}")
    print(f"   Port: {port}")
    print(f"   User: {user}")
    print(f"   Database: {database}")
    print(f"   Password: {'*' * (len(parsed.password) if parsed.password else 0)}")
    print()
except Exception as e:
    print(f"❌ Error parsing DATABASE_URL: {e}")
    sys.exit(1)

print("🔌 Testing connection...")
print()

try:
    conn = psycopg2.connect(DATABASE_URL, connect_timeout=10)
    cursor = conn.cursor()
    
    # Test query
    cursor.execute("SELECT version();")
    version = cursor.fetchone()[0]
    
    print("✅ Connection successful!")
    print(f"\n📊 PostgreSQL Version: {version}")
    
    # Check if tables exist
    cursor.execute("""
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name;
    """)
    tables = cursor.fetchall()
    
    if tables:
        print(f"\n📋 Found {len(tables)} table(s):")
        for table in tables:
            print(f"   - {table[0]}")
    else:
        print("\n⚠️  No tables found. You may need to run migrations.")
    
    cursor.close()
    conn.close()
    
    print("\n✅ Database connection test passed!")
    
except psycopg2.OperationalError as e:
    error_msg = str(e)
    print(f"❌ Connection failed: {error_msg}")
    print()
    
    if "could not translate host name" in error_msg.lower() or "no such host is known" in error_msg.lower():
        print("🔧 This usually means:")
        print("   1. Your Supabase project is PAUSED (most common)")
        print("   2. The hostname is incorrect")
        print("   3. Network/DNS issue")
        print()
        print("📝 To fix:")
        print("   1. Go to https://supabase.com/dashboard")
        print("   2. Check if your project shows 'Paused' status")
        print("   3. Click 'Restore project' if paused")
        print("   4. Wait 1-2 minutes for the project to come online")
        print("   5. Try connecting again")
    elif "password authentication failed" in error_msg.lower():
        print("🔧 Password authentication failed:")
        print("   1. Check your password in DATABASE_URL")
        print("   2. Reset password in Supabase Dashboard → Project Settings → Database")
        print("   3. Update DATABASE_URL in .env file")
    elif "timeout" in error_msg.lower():
        print("🔧 Connection timeout:")
        print("   1. Check your internet connection")
        print("   2. Verify Supabase project is active")
        print("   3. Check firewall settings")
    else:
        print("🔧 General connection error:")
        print("   1. Verify DATABASE_URL is correct")
        print("   2. Check Supabase project status")
        print("   3. Ensure project is not paused")
    
    sys.exit(1)
    
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    sys.exit(1)


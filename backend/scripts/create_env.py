#!/usr/bin/env python3
"""
Helper script to create .env file from .env.example
Usage: python scripts/create_env.py
"""
import os
import shutil
from pathlib import Path

def main():
    script_dir = Path(__file__).parent
    backend_dir = script_dir.parent
    env_example = backend_dir / ".env.example"
    env_file = backend_dir / ".env"
    
    if env_file.exists():
        print("⚠️  .env file already exists!")
        response = input("Do you want to overwrite it? (y/N): ")
        if response.lower() != 'y':
            print("Cancelled.")
            return
    
    if not env_example.exists():
        print(f"❌ .env.example not found at {env_example}")
        print("Creating a basic .env file instead...")
        
        env_content = """# Database Configuration
# Get this from Supabase Dashboard -> Project Settings -> Database -> Connection String
DATABASE_URL=postgresql://postgres:your_password@db.your_project.supabase.co:5432/postgres

# Environment
ENVIRONMENT=development

# CORS Origins (comma-separated)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173
"""
        with open(env_file, 'w') as f:
            f.write(env_content)
    else:
        shutil.copy(env_example, env_file)
        print(f"✅ Created .env file from .env.example")
    
    print(f"\n📝 Next steps:")
    print(f"1. Edit {env_file}")
    print(f"2. Add your Supabase DATABASE_URL")
    print(f"3. Save the file")

if __name__ == "__main__":
    main()


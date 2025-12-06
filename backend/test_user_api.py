#!/usr/bin/env python3
"""
Simple test script for User ID generation endpoint.
Usage: python test_user_api.py
"""
import requests
import json

BASE_URL = "http://localhost:8000"

def test_health():
    """Test if API is running"""
    print("Testing API health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ API is running")
            return True
        else:
            print(f"❌ API returned status {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to API. Is the server running?")
        print("   Start server with: uvicorn app.main:app --reload")
        return False

def test_create_user():
    """Test creating a user without grade/class"""
    print("\nTesting user creation (without grade/class)...")
    try:
        response = requests.post(
            f"{BASE_URL}/api/users",
            json={}
        )
        if response.status_code == 200:
            data = response.json()
            user_id = data.get("user_id")
            print(f"✅ User created successfully")
            print(f"   User ID: {user_id}")
            return user_id
        else:
            print(f"❌ Failed to create user: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_create_user_with_grade():
    """Test creating a user with grade/class"""
    print("\nTesting user creation (with grade/class)...")
    try:
        response = requests.post(
            f"{BASE_URL}/api/users",
            json={
                "grade_level": "SMP",
                "class_level": 7
            }
        )
        if response.status_code == 200:
            data = response.json()
            user_id = data.get("user_id")
            print(f"✅ User created successfully")
            print(f"   User ID: {user_id}")
            print(f"   Grade: {data['user']['grade_level']}")
            print(f"   Class: {data['user']['class_level']}")
            return user_id
        else:
            print(f"❌ Failed to create user: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def test_get_user(user_id):
    """Test getting user by ID"""
    if not user_id:
        print("\n⚠️  Skipping get user test (no user ID)")
        return
    
    print(f"\nTesting get user (ID: {user_id})...")
    try:
        response = requests.get(f"{BASE_URL}/api/users/{user_id}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ User retrieved successfully")
            print(f"   ID: {data['id']}")
            print(f"   Grade: {data['grade_level']}")
            print(f"   Class: {data['class_level']}")
        else:
            print(f"❌ Failed to get user: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_validate_user(user_id):
    """Test validating user ID"""
    if not user_id:
        print("\n⚠️  Skipping validate user test (no user ID)")
        return
    
    print(f"\nTesting validate user (ID: {user_id})...")
    try:
        response = requests.get(f"{BASE_URL}/api/users/{user_id}/validate")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ User validated successfully")
            print(f"   Valid: {data.get('valid')}")
        else:
            print(f"❌ Failed to validate user: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

def test_update_user(user_id):
    """Test updating user profile"""
    if not user_id:
        print("\n⚠️  Skipping update user test (no user ID)")
        return
    
    print(f"\nTesting update user (ID: {user_id})...")
    try:
        response = requests.patch(
            f"{BASE_URL}/api/users/{user_id}",
            json={
                "grade_level": "SMA",
                "class_level": 10
            }
        )
        if response.status_code == 200:
            data = response.json()
            print(f"✅ User updated successfully")
            print(f"   New Grade: {data['grade_level']}")
            print(f"   New Class: {data['class_level']}")
        else:
            print(f"❌ Failed to update user: {response.status_code}")
            print(f"   Response: {response.text}")
    except Exception as e:
        print(f"❌ Error: {e}")

def main():
    print("=" * 60)
    print("User API Test Suite")
    print("=" * 60)
    
    # Test 1: Health check
    if not test_health():
        print("\n❌ API is not running. Please start the server first.")
        return
    
    # Test 2: Create user without grade/class
    user_id_1 = test_create_user()
    
    # Test 3: Create user with grade/class
    user_id_2 = test_create_user_with_grade()
    
    # Test 4: Get user
    if user_id_2:
        test_get_user(user_id_2)
    
    # Test 5: Validate user
    if user_id_2:
        test_validate_user(user_id_2)
    
    # Test 6: Update user
    if user_id_1:
        test_update_user(user_id_1)
    
    print("\n" + "=" * 60)
    print("Test suite completed!")
    print("=" * 60)

if __name__ == "__main__":
    main()


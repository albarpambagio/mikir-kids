
import requests
import json
import sys

BASE_URL = "http://localhost:8000"

def run_test():
    print("Testing Session Flow...")
    
    # 1. Create User
    print("Creating user...")
    resp = requests.post(f"{BASE_URL}/api/users", json={"grade_level": "SMP", "class_level": 7})
    if resp.status_code != 200:
        print(f"Failed to create user: {resp.text}")
        return
    user_id = resp.json()["user_id"]
    print(f"User ID: {user_id}")

    # 2. Get Topics
    print("Fetching topics...")
    resp = requests.get(f"{BASE_URL}/api/dashboard/{user_id}/topics")
    if resp.status_code != 200:
        print(f"Failed to fetch topics: {resp.text}")
        return
    topics = resp.json()
    if not topics:
        print("No topics found. Cannot test session.")
        return
    
    topic_id = topics[0]["topic_id"]
    print(f"Topic: {topic_id}")

    # 3. Create Session
    print("Starting session...")
    resp = requests.post(f"{BASE_URL}/api/sessions", json={
        "user_id": user_id,
        "topic_id": topic_id,
        "session_size": 3
    })
    if resp.status_code != 200:
        print(f"Failed to start session: {resp.text}")
        return
        
    session_data = resp.json()
    session_id = session_data["session_id"]
    questions = session_data["questions"]
    print(f"Session Started: {session_id}")
    print(f"Questions: {len(questions)}")
    
    # 4. Answer Question
    if questions:
        q = questions[0]
        print(f"Answering question {q['id']}...")
        resp = requests.post(f"{BASE_URL}/api/sessions/{session_id}/answer", json={
            "user_id": user_id,
            "question_id": q["id"],
            "answer": "A"
        })
        print(f"Answer Response: {resp.text}")
        if resp.status_code == 200:
            print("✅ Answer submitted successfully")
        else:
            print("❌ Failed to submit answer")

if __name__ == "__main__":
    try:
        run_test()
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to server")

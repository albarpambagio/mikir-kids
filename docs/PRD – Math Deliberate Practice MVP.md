# PRD – Math Deliberate Practice MVP

> **tl;dr**: Web app for Indonesian students to practice UN-style math questions by topic, using FSRS to automatically schedule reviews based on performance.

---

## 1. Product Overview

A focused web-based practice tool for **Indonesian SMP/SMA students** to drill mathematics using questions from **Ujian Nasional (UN)** archives, organized by topic rather than year.

**Core loop**:

```
Pick topic → Answer questions → See results → FSRS reschedules weak questions → Repeat
```

**What this is NOT**:

- Not a gamified app (no XP, streaks, leaderboards)
- Not a teacher platform (no class management)
- Not a mobile app (responsive web only)
- Not trying to scale to thousands of users (just for fun/learning)

---

## 2. Goals

### 2.1 Product Goals

1. Let students practice math by topic using real UN questions
2. Show them what they got wrong immediately after each session
3. Use FSRS to automatically bring back questions they struggle with
4. Make the practice loop feel smooth and frictionless

### 2.2 Success = "Does it work and feel good to use?"

Since this is a fun project, success means:

- ✅ You can complete a full practice session without bugs
- ✅ FSRS scheduling actually works (questions come back at smart intervals)
- ✅ It's pleasant enough that you'd use it yourself
- ✅ A friend could use it without asking you how it works

---

## 3. Target Users

**Primary**: Indonesian students (SMP class 7-9, SMA class 10-12) who want to practice UN-style math questions.

**Reality check**:

- Mostly will use on mobile browser
- Mixed motivation (some serious exam prep, some just casual practice)
- Need simple, obvious UI (no onboarding tutorials)

**Not optimizing for**:

- Teachers managing classes
- Parents monitoring progress
- Competitive learners who need leaderboards

---

## 4. Core User Story

> **As a student, I want to:**
> 
> 1. Pick a math topic I'm weak at
> 2. Answer 10-15 questions on that topic
> 3. Immediately see which ones I got wrong (with correct answers)
> 4. Have the system automatically show me those weak questions again later
> 5. Not have to manually track anything myself

---

## 5. Scope

### ✅ In Scope (MVP)

- Topic-based question selection
- Question types: Multiple choice (MCQ) only
- Session results showing correct/incorrect answers
- FSRS scheduling per user per question
- Basic session history (list of past sessions)
- Responsive web UI (works on mobile browsers)

### ❌ Out of Scope (MVP)

- Gamification (XP, badges, streaks, levels)
- Social features (leaderboards, sharing, friends)
- Teacher/parent dashboards
- Detailed analytics and charts
- Rich explanations (just show correct answer)
- Native mobile apps
- Complex knowledge graph (just simple topic tags)
- Account recovery, email notifications
- Offline mode

### 🤔 Maybe Later (Post-MVP)

- Step-by-step solution explanations
- Video hints for hard questions
- Custom topics/playlists
- Import questions from other sources

---

## 6. User Flows

### 6.1 Onboarding

```
1. Visit site
2. System generates unique User ID (e.g., "12345678")
3. User ID displayed prominently with "Salin" (Copy) button
4. Select grade: SMP (7/8/9) or SMA (10/11/12)
5. → Dashboard
```

**Returning Users**:

```
1. Visit site
2. Enter saved User ID in input field
3. If valid → Load profile and go to Dashboard
4. If invalid → Show error, offer to create new account
```

**Acceptance**:

- Takes ≤ 3 clicks to reach dashboard
- User ID clearly displayed and easy to copy
- Grade stored in profile (used to filter topics)
- User ID can be saved locally (localStorage) for convenience

---

### 6.2 Dashboard & Topic Selection

```
Dashboard shows:
├─ List of topics for your grade
│  ├─ Aljabar – Persamaan Linear
│  ├─ Aljabar – SPLDV  
│  ├─ Geometri – Segitiga
│  └─ Statistika – Rata-rata
│
└─ Each topic has "Latihan" button
   └─ Click → Start session
```

**Acceptance**:

- Only topics relevant to your grade shown
- 1 click from dashboard to start practice

---

### 6.3 Practice Session

**Flow**:

```
1. Click "Latihan" for topic T

2. Backend builds session (15 questions):
   Priority 1: FSRS-due questions (next_due_at ≤ now)
   Priority 2: New questions (never seen before)

3. Frontend shows questions one-by-one:
   ├─ Question text + diagram (if any)
   ├─ Input: MCQ buttons (A/B/C/D/E) or text field
   ├─ Submit answer
   ├─ Brief "Tersimpan ✓" confirmation (500ms)
   └─ Auto-advance to next question

4. After last question:
   ├─ Mark session as complete
   ├─ Run FSRS updates:
   │  ├─ Correct → rating "good"
   │  └─ Incorrect → rating "again"
   └─ Redirect to Session Summary
```

**Session Abandonment**:

- If user closes browser mid-session:
  - Session marked "incomplete"
  - Answered questions saved (partial progress)
  - Can resume or start fresh later
  - Incomplete sessions expire after 24 hours

**Acceptance**:

- Complete 15 questions without errors or page reloads
- All questions strictly from chosen topic
- Smooth transitions between questions (no jarring UI)
- Works on mobile (thumb-friendly buttons)

---

### 6.4 Session Summary

**Page structure**:

```
┌─ Session Summary ─────────────────────────┐
│ Topic: Aljabar – SPLDV                     │
│ Score: 12/15 Benar (80%)                   │
│                                            │
│ ⚠️  Soal yang Salah (3)                    │
│ ┌────────────────────────────────────────┐│
│ │ Soal #3                                ││
│ │ Jawaban kamu: B                        ││
│ │ Jawaban benar: C                       ││
│ │ [Lihat soal] ←─ opens read-only view  ││
│ └────────────────────────────────────────┘│
│ ┌────────────────────────────────────────┐│
│ │ Soal #7 ... (repeat for each wrong)    ││
│ └────────────────────────────────────────┘│
│                                            │
│ 📋 Semua Soal (15)                         │
│ ┌──────────────────────────────────────┐  │
│ │ 1. ✓ Benar   (A → A)                 │  │
│ │ 2. ✓ Benar   (C → C)                 │  │
│ │ 3. ✗ Salah   (B → C)                 │  │
│ │ ... (rest of questions)              │  │
│ └──────────────────────────────────────┘  │
│                                            │
│ [Latihan Lagi]  [Kembali ke Dashboard]    │
└────────────────────────────────────────────┘
```

**Acceptance**:

- Every question in session is visible
- Wrong answers clearly highlighted in separate section
- Can click to view full question (read-only)
- Clear CTAs for next action

---

## 7. Feature Specifications

### 7.1 User ID & Profile

**Data model**:

```javascript
user {
  id: string  // Numeric user ID (e.g., "12345678")
  grade_level: "SMP" | "SMA"
  class_level: 7 | 8 | 9 | 10 | 11 | 12
  created_at: timestamp
}
```

**User ID System**:

- **Generation**: Backend generates unique 8-digit numeric ID (e.g., `12345678`)
- **Format**: Numeric string, 8 digits (allows up to 99,999,999 users)
- **Storage**: User ID stored in localStorage for convenience (optional)
- **Access**: Users enter their ID to access saved progress
- **No password**: User ID is the only credential needed (like VPN account systems)

**User Flow**:

1. **New User**: 
   - System generates ID automatically
   - ID displayed on screen with copy button
   - User selects grade level
   - ID saved to database with grade preference

2. **Returning User**:
   - Enter User ID in input field
   - Backend validates ID exists
   - Load user profile and progress
   - If ID not found, show error message

---

### 7.2 Topics

Topics are logical groupings, independent of UN year.

**Example topics**:

```
SMP:
├─ Aljabar – Persamaan Linear
├─ Aljabar – SPLDV
├─ Aljabar – Pertidaksamaan
├─ Geometri – Bangun Datar
├─ Geometri – Bangun Ruang
├─ Statistika – Rata-rata & Median
└─ Peluang – Dasar

SMA:
├─ Fungsi Kuadrat
├─ Trigonometri – Dasar
├─ Trigonometri – Identitas
├─ Limit & Turunan
├─ Integral
└─ Matriks & Vektor
```

**Data model**:

```javascript
topic {
  id: string
  name: string
  short_code: string  // e.g. "SPLDV"
  grade_level: "SMP" | "SMA"
  class_levels: number[]  // e.g. [7, 8, 9]
}
```

---

### 7.3 Questions

**Data model**:

```javascript
question {
  id: string  // e.g. "SPLDV_001"
  topic_id: string
  grade_level: "SMP" | "SMA"
  class_level: number

  // Content
  prompt_text: string
  prompt_image_url: string | null

  // Answer (MCQ only)
  type: "mcq"
  options: string[]  // ["A) 2", "B) 3", ...] for MCQ
  correct_option: string  // "A" for MCQ

  // Optional
  explanation_text: string | null

  // Metadata (not shown to user)
  source_year: number
  source_package: string
  source_number: number
}
```

**Answer validation**:

- **MCQ**: Exact match (case-insensitive)

---

### 7.4 Session Engine

**Input**: `user_id`, `topic_id`, `session_size` (default 15)

**Logic**:

```sql
-- Step 1: Get FSRS-due questions
SELECT q.*
FROM questions q
JOIN user_question_state uqs 
  ON q.id = uqs.question_id
WHERE uqs.user_id = :user_id
  AND q.topic_id = :topic_id
  AND uqs.next_due_at <= NOW()
ORDER BY uqs.next_due_at ASC  -- Most overdue first
LIMIT :session_size;

-- Step 2: If count < session_size, fill with new questions
SELECT q.*
FROM questions q
LEFT JOIN user_question_state uqs
  ON q.id = uqs.question_id 
  AND uqs.user_id = :user_id
WHERE q.topic_id = :topic_id
  AND uqs.question_id IS NULL  -- Never seen by this user
ORDER BY RANDOM()
LIMIT :remaining_slots;
```

**Output**: Ordered list of questions for the session

**Edge cases**:

- Topic has < 15 questions → Show all available
- All questions are overdue → Show most overdue first
- New user, new topic → All questions are "new"

---

### 7.5 FSRS Integration

**Library**: Use `ts-fsrs` (TypeScript) or `py-fsrs` (Python)

**Simplified mapping**:

```javascript
// When user answers a question:
const rating = isCorrect ? Rating.Good : Rating.Again;

// Update FSRS state
const card = new Card(currentState);
const schedulingInfo = fsrs.repeat(card, now);
const updatedCard = schedulingInfo[rating].card;

// Persist
updateUserQuestionState({
  next_due_at: updatedCard.due,
  stability: updatedCard.stability,
  difficulty: updatedCard.difficulty,
  // ... other FSRS fields
});
```

**FSRS parameters** (tunable):

```javascript
const fsrs = new FSRS({
  requestRetention: 0.9,  // Aggressive for exam prep
  maximumInterval: 365,   // Max 1 year between reviews
  w: [/* default weights */]
});
```

**Data model**:

```javascript
user_question_state {
  user_id: string
  question_id: string

  // FSRS state
  state: "new" | "learning" | "review" | "relearning"
  stability: number
  difficulty: number
  reps: number
  lapses: number

  // Tracking
  last_result_correct: boolean
  last_reviewed_at: timestamp
  next_due_at: timestamp

  // Indexes
  PRIMARY KEY (user_id, question_id)
  INDEX (user_id, next_due_at)  -- For fetching due questions
}
```

**Fallback** (if FSRS fails):

```javascript
// Simple exponential backoff
const nextDue = isCorrect 
  ? now + (3 * 24 * 60 * 60 * 1000)  // 3 days
  : now + (1 * 24 * 60 * 60 * 1000); // 1 day
```

---

### 7.6 Sessions

**Data model**:

```javascript
session {
  id: string
  user_id: string
  topic_id: string
  status: "in_progress" | "completed" | "abandoned"
  started_at: timestamp
  completed_at: timestamp | null

  INDEX (user_id, started_at DESC)  -- For session history
}

session_item {
  id: string
  session_id: string
  question_id: string
  sequence: number  // Order in session (1, 2, 3...)

  user_answer: string
  is_correct: boolean
  answered_at: timestamp

  INDEX (session_id, sequence)
}
```

---

## 8. API Contracts

### 8.1 Start Session

```http
POST /api/sessions
Content-Type: application/json

{
  "user_id": "12345678",
  "topic_id": "SPLDV",
  "session_size": 15
}
```

**Response**:

```json
{
  "session_id": "sess_abc123",
  "topic": {
    "id": "SPLDV",
    "name": "Aljabar – SPLDV"
  },
  "questions": [
    {
      "id": "q_001",
      "sequence": 1,
      "type": "mcq",
      "prompt_text": "Tentukan nilai x dan y dari sistem persamaan:\n2x + 3y = 12\nx - y = 1",
      "prompt_image_url": null,
      "options": [
        "A) x = 3, y = 2",
        "B) x = 4, y = 1", 
        "C) x = 2, y = 3",
        "D) x = 5, y = 0"
      ]
    },
    {
      "id": "q_002",
      "sequence": 2,
      "type": "mcq",
      "prompt_text": "Jika 3x + 2y = 18 dan x = 4, berapakah nilai y?",
      "prompt_image_url": null,
      "options": ["A) 1", "B) 2", "C) 3", "D) 4"]
    }
    // ... 13 more questions
  ]
}
```

---

### 8.2 Submit Answer

```http
POST /api/sessions/{session_id}/answer
Content-Type: application/json

{
  "user_id": "12345678",
  "question_id": "q_001",
  "answer": "A"
}
```

**Response**:

```json
{
  "success": true,
  "is_correct": false,
  "remaining_questions": 14
}
```

**Note**: We don't reveal the correct answer yet (wait for session summary)

---

### 8.3 Complete Session

```http
POST /api/sessions/{session_id}/complete
Content-Type: application/json

{
  "user_id": "12345678"
}
```

**Response**:

```json
{
  "success": true,
  "session_id": "sess_abc123",
  "redirect_url": "/sessions/sess_abc123/summary"
}
```

---

### 8.4 Get Session Summary

```http
GET /api/sessions/{session_id}/summary?user_id=12345678
```

**Response**:

```json
{
  "session_id": "sess_abc123",
  "topic": {
    "id": "SPLDV",
    "name": "Aljabar – SPLDV"
  },
  "stats": {
    "total": 15,
    "correct": 12,
    "incorrect": 3
  },
  "weak_questions": [
    {
      "id": "q_003",
      "sequence": 3,
      "prompt_text": "...",
      "user_answer": "B",
      "correct_answer": "C",
      "type": "mcq"
    }
    // ... other incorrect questions
  ],
  "all_questions": [
    {
      "id": "q_001",
      "sequence": 1,
      "is_correct": true,
      "user_answer": "A",
      "correct_answer": "A"
    },
    {
      "id": "q_002", 
      "sequence": 2,
      "is_correct": true,
      "user_answer": "C",
      "correct_answer": "C"
    },
    {
      "id": "q_003",
      "sequence": 3,
      "is_correct": false,
      "user_answer": "B",
      "correct_answer": "C"
    }
    // ... rest of questions
  ]
}
```

---

## 9. Data Schema (Complete)

```sql
-- Users
CREATE TABLE users (
  id TEXT PRIMARY KEY,  -- 8-digit numeric ID (e.g., "12345678")
  grade_level TEXT NOT NULL CHECK (grade_level IN ('SMP', 'SMA')),
  class_level INTEGER NOT NULL CHECK (class_level BETWEEN 7 AND 12),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast user lookup
CREATE INDEX idx_users_id ON users(id);

-- Topics
CREATE TABLE topics (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  short_code TEXT NOT NULL,
  grade_level TEXT NOT NULL,
  class_levels INTEGER[] NOT NULL
);

-- Questions
CREATE TABLE questions (
  id TEXT PRIMARY KEY,
  topic_id TEXT NOT NULL REFERENCES topics(id),
  grade_level TEXT NOT NULL,
  class_level INTEGER NOT NULL,

  prompt_text TEXT NOT NULL,
  prompt_image_url TEXT,

  type TEXT NOT NULL CHECK (type = 'mcq'),
  options JSONB NOT NULL,  -- Array for MCQ
  correct_option TEXT NOT NULL,  -- For MCQ

  explanation_text TEXT,

  source_year INTEGER,
  source_package TEXT,
  source_number INTEGER,

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_questions_topic ON questions(topic_id);

-- User Question State (FSRS)
CREATE TABLE user_question_state (
  user_id TEXT NOT NULL REFERENCES users(id),
  question_id TEXT NOT NULL REFERENCES questions(id),

  state TEXT NOT NULL DEFAULT 'new',
  stability NUMERIC NOT NULL DEFAULT 0,
  difficulty NUMERIC NOT NULL DEFAULT 0,
  reps INTEGER NOT NULL DEFAULT 0,
  lapses INTEGER NOT NULL DEFAULT 0,

  last_result_correct BOOLEAN,
  last_reviewed_at TIMESTAMP,
  next_due_at TIMESTAMP NOT NULL DEFAULT NOW(),

  updated_at TIMESTAMP DEFAULT NOW(),

  PRIMARY KEY (user_id, question_id)
);

CREATE INDEX idx_uqs_due ON user_question_state(user_id, next_due_at);
CREATE INDEX idx_uqs_question ON user_question_state(question_id);

-- Sessions
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  topic_id TEXT NOT NULL REFERENCES topics(id),

  status TEXT NOT NULL DEFAULT 'in_progress' 
    CHECK (status IN ('in_progress', 'completed', 'abandoned')),

  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  INDEX (user_id, started_at DESC)
);

-- Session Items
CREATE TABLE session_items (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL REFERENCES sessions(id),
  question_id TEXT NOT NULL REFERENCES questions(id),

  sequence INTEGER NOT NULL,
  user_answer TEXT,
  is_correct BOOLEAN,
  answered_at TIMESTAMP,

  INDEX (session_id, sequence)
);
```

---

## 10. Non-Functional Requirements

### 10.1 Platform

- **Type**: Responsive web app (desktop + mobile browser)
- **Browsers**: Chrome 90+, Safari 14+, Firefox 88+
- **No native apps** (for now)

### 10.2 Performance

- Time to Interactive: < 3s on 3G
- Question loading: < 500ms per question
- FSRS calculation: < 100ms per question
- Database timeout: 5s max

### 10.3 Localization

- **UI language**: Bahasa Indonesia
- **Question content**: Indonesian (from UN archives)

### 10.4 Accessibility

- Keyboard navigation for all interactions
- High contrast mode support
- Touch targets ≥ 44x44px (mobile friendly)

### 10.5 Data

- User data kept indefinitely (until manual deletion)
- Incomplete sessions purged after 7 days
- No backups needed for MVP (it's just for fun)

---

## 11. Implementation Phases

### Phase 1: Foundation (Week 1)

- [ ] Set up project (React + Vite + FastAPI + Postgres)
- [ ] User ID generation system (8-digit numeric IDs)
- [ ] User ID input/validation flow
- [ ] Database schema + migrations
- [ ] Seed 3 topics + 50 questions

### Phase 2: Core Loop (Week 2)

- [ ] Dashboard UI (topic list)
- [ ] Session engine (question selection logic)
- [ ] Question answering UI
- [ ] Answer submission + validation

### Phase 3: FSRS (Week 3)

- [ ] Integrate FSRS library
- [ ] User question state persistence
- [ ] Session builder with due-date priority
- [ ] Test scheduling logic

### Phase 4: Summary & History (Week 4)

- [ ] Session summary page
- [ ] Weak questions highlighting
- [ ] Session history in dashboard
- [ ] Mobile responsive polish

### Phase 5: Launch (Week 5)

- [ ] Deploy to Vercel/Railway
- [ ] Test with 3-5 friends
- [ ] Fix critical bugs
- [ ] Ship it 🚀

---

## 12. Open Decisions

### 12.1 RESOLVED

- ✅ **Session size**: Fixed at 15 questions
- ✅ **FSRS rating**: Always use "good" (correct) or "again" (incorrect)
- ✅ **Explanations**: Optional field, won't populate for MVP

### 12.2 TO DECIDE

- ❓ **Question order**: Randomize or keep fixed order?
  - **Recommendation**: Randomize to prevent pattern memorization
- ❓ **MCQ answer matching**: Case-sensitive or case-insensitive?
  - **Recommendation**: Case-insensitive for better UX
- ❓ **Session resumption**: Allow or force restart?
  - **Recommendation**: Allow resume within 24 hours, then expire

---

## 13. Success Criteria (Personal Project)

This MVP is "done" when:

- ✅ You can get a User ID and complete a full session without bugs
- ✅ User ID system works (can save and retrieve progress with ID)
- ✅ FSRS scheduling works (questions come back at reasonable intervals)
- ✅ Session summary correctly shows weak questions
- ✅ Mobile experience doesn't feel broken
- ✅ A friend can use it without asking "how does this work?"

**Not measuring**: User growth, retention, engagement (it's just for fun!)

---

## 14. Future Ideas (Post-MVP)

If this turns out to be fun and useful:

- 📚 Step-by-step solution explanations
- 📹 Video hints from YouTube
- 🎯 Custom practice sets (pick specific questions)
- 📊 Progress charts (visual FSRS data)
- 🤝 Study groups (practice together)
- 🎨 Dark mode
- 📱 PWA (installable web app)
- 🔀 Question randomization engine (slightly modify numbers)

But for now: **Keep it simple, make it work.**

---

**Ready to build?** Start with Phase 1 and ship something usable in 3-4 weeks.

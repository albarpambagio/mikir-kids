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
- Account recovery, email notifications
- Offline mode

### 🤔 Maybe Later (Post-MVP)

- Step-by-step solution explanations
- Video hints for hard questions
- Custom topics/playlists
- Import questions from other sources
- Knowledge graph of topics
- diagnostic test

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
   ├─ Input: MCQ buttons (A/B/C/D/E)
   ├─ Submit answer
   ├─ ASK CONFIDENCE (before revealing correctness):
   │  ├─ Prompt: "Seberapa yakin kamu dengan jawaban ini?"
   │  ├─ Display 3 buttons:
   │  │  ├─ "Tebakan" (Just guessed)
   │  │  ├─ "Cukup yakin" (Pretty sure)
   │  │  └─ "Sangat yakin" (Very sure)
   │  └─ Student selects confidence level
   ├─ REVEAL RESULT:
   │  ├─ If CORRECT:
   │  │  ├─ Show ✅ "Benar!"
   │  │  ├─ Map confidence to FSRS rating:
   │  │  │  ├─ "Tebakan" → Rating.Hard
   │  │  │  ├─ "Cukup yakin" → Rating.Good
   │  │  │  └─ "Sangat yakin" → Rating.Easy
   │  │  └─ [Lanjut] button
   │  └─ If INCORRECT:
   │     ├─ Show ❌ "Salah"
   │     ├─ Show correct answer: "Jawaban yang benar: C"
   │     ├─ Show brief explanation (if available)
   │     ├─ FSRS rating set to Rating.Again (confidence ignored for scheduling)
   │     ├─ Store confidence for overconfidence analytics
   │     └─ [Lanjut] button
   └─ Click [Lanjut] → Next question

4. After last question:
   ├─ Mark session as complete
   ├─ FSRS updates already applied per-question
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
- Confidence asked BEFORE revealing correctness (prevents hindsight bias)
- Confidence question appears for ALL answers (both correct and incorrect)
- Result revealed after confidence selection
- Smooth transitions between questions (no jarring UI)
- Works on mobile (thumb-friendly buttons)

**Pedagogical Rationale**:

> **Why ask confidence BEFORE revealing correctness?** Research by Koriat & Bjork (2005) shows that confidence judgments made AFTER feedback are contaminated by "hindsight bias" - students retrospectively inflate their confidence after seeing they were correct. Pre-feedback confidence provides cleaner metacognitive data and better FSRS scheduling signals.
> 
> **Why ask for ALL answers (not just correct)?** When students are confident but WRONG, it creates productive cognitive dissonance that highlights knowledge gaps. This overconfidence detection is valuable for both immediate learning ("I was sure but made a mistake") and future analytics (identifying topics where students overestimate their understanding).
>
> **Why immediate feedback after confidence?** Research shows that for procedural skills like math, delayed feedback allows students to practice mistakes, reinforcing incorrect mental models. Immediate correction prevents this (Ericsson's Deliberate Practice principle).
> 
> **Why confidence ratings?** FSRS is designed for 4 ratings to differentiate "barely right" from "mastered". Binary correct/incorrect loses valuable learning signal. Confidence is a validated proxy for retention strength (Bjork, 1994).

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

**Pedagogical Rationale**:

> **Why highlight mistakes prominently?** Error-focused feedback is more effective than general praise for procedural learning (Hattie & Timperley, 2007). By showing "Soal yang Salah" first, students immediately focus on what needs improvement, aligning with growth mindset principles (Dweck, 2006). The full question list provides context without overwhelming the learner.

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

**3-Rating System with Confidence**:

```javascript
// When user answers a question:
let rating;

if (isCorrect) {
  // User selects confidence level
  switch (confidenceLevel) {
    case 'guessed':      rating = Rating.Hard; break;
    case 'pretty_sure':  rating = Rating.Good; break;
    case 'very_sure':    rating = Rating.Easy; break;
  }
} else {
  // Incorrect always maps to "Again"
  rating = Rating.Again;
}

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

**FSRS parameters** (evidence-based):

```javascript
const fsrs = new FSRS({
  requestRetention: 0.85,  // Optimal learning efficiency (not 0.9)
  maximumInterval: 180,    // 6 months max (exam-aware)
  w: [/* default weights */]
});
```

**Rationale for Parameters**:

- **0.85 retention**: Research shows ~85% is the "sweet spot" for learning efficiency. 90% leads to over-practicing easy material (diminishing returns).
- **180-day max interval**: For exam prep, questions shouldn't disappear for a full year. 6 months allows for adequate long-term retention without excessive gaps.

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
  "answer": "A",
  "confidence": "pretty_sure"  // Optional: only if answer is correct
}
```

**Response**:

```json
{
  "success": true,
  "is_correct": false,
  "correct_answer": "C",
  "explanation": "SPLDV diselesaikan dengan metode eliminasi: 2x + 3y = 12...",
  "remaining_questions": 14,
  "fsrs_rating": "again"  // For debugging/transparency
}
```

**Note**: Correct answer and explanation are now returned immediately for instant feedback

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

- ✅ **Session size**: Fixed at 15 questions (MVP); adaptive sizing considered for v1.1
- ✅ **FSRS rating**: Use 3-rating system (Easy/Good/Hard/Again) with confidence proxy
- ✅ **Feedback timing**: Immediate feedback after each question (not delayed to end)
- ✅ **FSRS retention**: Set to 0.85 (not 0.9) for optimal learning efficiency
- ✅ **Explanations**: Optional field, show if available (brief hints only)

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

## 14. Post-MVP Roadmap

This roadmap is informed by the **Pedagogy & Mastery Learning Review** (see `docs/Pedagogy & Mastery Learning Review.md`). Features are prioritized by pedagogical impact first, then user experience and platform maturity.

---

### 14.1 v1.1 – Sparring Mode (Priority #1) 🥊

**Timeline**: +1 week after MVP validation  
**Development Estimate**: 3-4 days  
**Pedagogical Foundation**: Addresses [Pedagogy Review Issue #9] - Lack of interleaved practice

#### Overview

**Sparring Mode** is a mastery-gated challenge mode that tests learned material across multiple topics with time pressure and interleaved question ordering.

**Learning Objectives**:
- **Interleaving Effect**: Mixing topics improves long-term retention and transfer (Rohrer & Taylor, 2007)
- **Retrieval Practice**: Testing strengthens memory more than re-study (Roediger & Karpicke, 2006)  
- **Desirable Difficulties**: Time pressure + mixed context = productive struggle (Bjork & Bjork, 2011)
- **Exam Readiness**: Simulates real UN exam conditions (mixed topics, time constraints)

**User Value**: "Am I actually ready for the exam across all topics?"

---

#### Unlock System

Sparring Mode unlocks when user reaches mastery threshold:

```yaml
Unlock Condition:
  - Master 3+ topics at ≥80% accuracy
  - Minimum 15 questions attempted per topic
  - FSRS state: majority in "review" (not "new")

Calculation:
  topicMastery = (correct_answers / total_attempts) >= 0.80
  minAttempts = total_attempts >= 15
  eligibleTopics = topics.filter(t => topicMastery && minAttempts)
  
  isUnlocked = eligibleTopics.length >= 3
```

**UI Messaging**:

```
🔒 Sparring Mode (Locked)
   Test your skills across multiple topics
   
   Unlock requirement: Master 3 topics at 80%+
   Progress: 1/3 topics mastered
   
   ✅ Aljabar Linear (92% - Mastered!)
   🔄 SPLDV (73% - Keep practicing)
   🔄 Geometri (45% - Needs work)
```

---

#### Question Selection Algorithm

**Strategy**: Multi-topic FSRS review with interleaving

```javascript
// Sparring session builder
async function buildSparringSession(userId) {
  // Step 1: Get user's mastered topics
  const masteredTopics = await getMasteredTopics(userId, {
    minAccuracy: 0.80,
    minAttempts: 15
  });
  
  // Step 2: Pull FSRS-due questions from ALL mastered topics
  const questions = await db.query(`
    SELECT q.*, uqs.next_due_at
    FROM questions q
    JOIN user_question_state uqs ON q.id = uqs.question_id
    WHERE uqs.user_id = $1
      AND q.topic_id IN ($2)  -- Multiple topics
      AND uqs.next_due_at <= NOW()
    ORDER BY uqs.next_due_at ASC
    LIMIT 20
  `, [userId, masteredTopics.map(t => t.id)]);
  
  // Step 3: Shuffle to interleave topics
  const shuffled = shuffle(questions);
  
  return {
    session_id: generateId(),
    mode: 'sparring',
    questions: shuffled,
    topic_mix: unique(shuffled.map(q => q.topic_name)),
    suggested_time_per_q: calculateAdaptiveTime(userId) // User's avg * 0.8
  };
}
```

**Key Design Decisions**:
- ✅ Reuses FSRS `next_due_at` (not separate question pool)
- ✅ Interleaves by shuffling (prevents topic blocking)
- ✅ Limited to 20 questions (prevents fatigue)
- ✅ Only includes mastered topics (quality assurance)

---

#### Time Pressure Mechanics

**Goal**: Add "desirable difficulty" without causing anxiety

**Implementation**: Adaptive soft timer

```javascript
// Calculate personalized time suggestion
function calculateAdaptiveTime(userId) {
  const avgTime = getUserAverageAnswerTime(userId); // e.g., 40 seconds
  const sparringTarget = avgTime * 0.8; // 20% faster (32 seconds)
  return Math.max(sparringTarget, 20); // Minimum 20 seconds floor
}
```

**UI Design**:

```
┌─ Question 5/20 ─────────────────────┐
│ Topic: Geometri                      │
│                                      │
│ [Question text...]                   │
│                                      │
│ ⏱️  Time: 00:25 / 00:32 (target)    │
│ [=========>            ] progress bar│
│                                      │
│ [A] [B] [C] [D] [Submit]            │
└──────────────────────────────────────┘
```

**Visual Feedback**:
- ✅ Green progress bar when under target time
- ⚠️ Amber progress bar when exceeding target (but no auto-submit)
- No countdown clock (less anxiety-inducing)
- Post-session time analysis (not real-time pressure)

**Pedagogical Rationale**:
> Time pressure is a validated "desirable difficulty" (Bjork) BUT only when it enhances effort without causing panic. Adaptive timing personalizes the challenge, while soft limits prevent the tool from becoming a stressor instead of a learning aid.

---

#### Feedback Flow

**Challenge**: Balance immediate feedback (prevents mistakes) with retrieval difficulty (strengthens memory)

**Solution**: Hybrid approach

```
During Sparring Session:
├─ Student submits answer
├─ Immediate visual feedback:
│  ├─ ✅ "Benar!" (if correct)
│  └─ ❌ "Salah - Jawaban: C" (if incorrect)
├─ NO confidence question (save time)
├─ NO explanation yet (save for end)
└─ [Lanjut] button → Next question

Post-Session Review:
├─ Show all questions with full explanation
├─ Time analysis by topic
├─ Performance comparison to practice mode
└─ Recommendations for weak topics
```

**Why this works**:
- ✅ Prevents practicing mistakes (shows correct answer immediately)
- ✅ Creates retrieval difficulty (withholds scaffolding until end)
- ✅ Reduces confusion (consistent correctness feedback, just delayed explanations)

---

#### FSRS Integration Strategy

**Problem**: Should sparring mistakes "count" the same as practice mistakes?

**Answer**: No - use weighted updates

```javascript
// Apply lighter penalty for sparring errors
function updateFSRS(questionId, isCorrect, sessionMode) {
  let rating;
  
  if (sessionMode === 'practice') {
    // Practice mode: standard FSRS
    rating = isCorrect 
      ? confidenceLevel // Easy/Good/Hard based on confidence
      : Rating.Again;   // Strong penalty
      
  } else if (sessionMode === 'sparring') {
    // Sparring mode: softer penalties
    rating = isCorrect
      ? Rating.Good     // No confidence differentiation (save time)
      : Rating.Hard;    // Lighter penalty (not "Again")
  }
  
  return fsrs.repeat(card, now, rating);
}
```

**Rationale**:
- Sparring is harder context (time pressure + interleaving)
- Mistakes might be retrieval failures, not knowledge gaps
- Prevents over-penalizing students for attempting challenge mode
- Still updates FSRS (data not wasted)

---

#### Data Model

**Minimal schema changes** (reuses existing tables):

```sql
-- Add mode column to sessions table
ALTER TABLE sessions 
  ADD COLUMN mode TEXT DEFAULT 'practice'
  CHECK (mode IN ('practice', 'sparring'));

-- Add sparring metrics (optional analytics)
ALTER TABLE sessions
  ADD COLUMN avg_time_per_question NUMERIC,
  ADD COLUMN target_time_per_question NUMERIC,
  ADD COLUMN time_pressure_met BOOLEAN;
```

No new tables needed! ✅

---

#### API Contracts

**Start Sparring Session**

```http
POST /api/sessions/sparring
Content-Type: application/json

{
  "user_id": "12345678"
}
```

**Response**:

```json
{
  "session_id": "sess_spar_001",
  "mode": "sparring",
  "topic_mix": ["Aljabar", "Geometri", "Statistika"],
  "question_count": 20,
  "suggested_time_per_q": 32,
  "questions": [
    {
      "id": "q_042",
      "sequence": 1,
      "topic": "Geometri",
      "type": "mcq",
      "prompt_text": "...",
      "options": ["A) ...", "B) ...", ...]
    },
    // ... 19 more, interleaved topics
  ]
}
```

**Submit Answer** (same as practice, mode auto-detected):

```http
POST /api/sessions/{session_id}/answer
{
  "user_id": "12345678",
  "question_id": "q_042",
  "answer": "C",
  "time_taken": 35 // seconds
}
```

**Get Sparring Summary**:

```http
GET /api/sessions/{session_id}/summary?user_id=12345678
```

**Response**:

```json
{
  "mode": "sparring",
  "stats": {
    "total": 20,
    "correct": 16,
    "incorrect": 4,
    "avg_time": 35.2,
    "target_time": 32.0,
    "time_pressure_met": false
  },
  "by_topic": {
    "Aljabar": { "correct": 6, "total": 7, "avg_time": 28 },
    "Geometri": { "correct": 5, "total": 8, "avg_time": 48 },
    "Statistika": { "correct": 5, "total": 5, "avg_time": 30 }
  },
  "recommendations": [
    "Focus practice on: Geometri (62% accuracy)",
    "Work on speed for: Geometri (48s avg, target 32s)"
  ],
  "weak_questions": [...],
  "all_questions": [...]
}
```

---

#### UI Specifications

**Dashboard Unlock Card**:

```
┌─ 🥊 Sparring Mode ────────────────────┐
│ [UNLOCKED] ✅                          │
│                                        │
│ Test your skills across multiple      │
│ topics with time-challenged questions  │
│                                        │
│ Topics included:                       │
│ • Aljabar Linear                       │
│ • SPLDV                                │
│ • Geometri                             │
│                                        │
│ 20 questions • ~10 minutes             │
│                                        │
│ [Mulai Sparring] button               │
└────────────────────────────────────────┘
```

**In-Session UI**:
- Progress indicator: "Question 8/20"
- Topic badge: "Geometri" (color-coded)
- Timer: Progress bar (not countdown)
- Question display (same as practice)
- [Lanjut] button after feedback (no auto-advance)

**Post-Session Summary**:
```
┌─ Sparring Summary ─────────────────────┐
│ Score: 16/20 (80%)                     │
│ Time: 35s avg (target: 32s)            │
│                                         │
│ 📊 By Topic:                           │
│ ✅ Aljabar: 6/7 (85%) - 28s avg       │
│ ⚠️ Geometri: 5/8 (62%) - 48s avg ⚠️   │
│ ✅ Statistika: 5/5 (100%) - 30s avg   │
│                                         │
│ 💡 Recommendations:                    │
│ • Practice more: Geometri              │
│ • Work on speed: Geometri              │
│                                         │
│ [Review Mistakes] [Practice Geometri]  │
│ [Spar Again] [Back to Dashboard]       │
└─────────────────────────────────────────┘
```

---

#### Success Criteria

Sparring Mode is successful when:

- ✅ Users with 3+ mastered topics see unlock message
- ✅ Session builds with interleaved questions (not topic-blocked)
- ✅ Timer displays adaptive target based on user's history
- ✅ Feedback shows correctness immediately, explanations delayed
- ✅ FSRS updates with weighted penalties (Hard not Again)
- ✅ Summary shows topic-level breakdown and actionable recommendations
- ✅ Users return to practice mode for weak topics identified by sparring

---

### 14.2 v1.5 – Pedagogical Enhancements

**Timeline**: After Sparring Mode validation (weeks 7-9)

These features address [Pedagogy Review Moderate Issues]:

#### 1. **Adaptive Session Sizing** [Issue #3]

```javascript
function getSessionSize(userTopicPerformance) {
  if (userTopicPerformance < 0.50) return 10; // Prevent frustration
  if (userTopicPerformance > 0.80) return 20; // Maintain flow
  return 15; // Default
}
```

**Or**: User choice - "Quick (10) | Normal (15) | Long (20)"

#### 2. **Mistake Categorization** [Issue #6]

After incorrect answer, ask:
- "Salah hitung?" (Calculation error)
- "Tidak paham konsep?" (Conceptual misunderstanding)

Tracks patterns in dashboard: "80% of your mistakes are calculation errors"

#### 3. **Mastery Progress Visualization** [Issue #10]

```
Topic Mastery Dashboard:
┌─ Your Progress ────────────────┐
│ Aljabar Linear: ████████░░ 85% │
│ Status: Ready for Exam ✅      │
│ Last practiced: 2 days ago     │
│                                 │
│ Geometri: ████░░░░░░ 45%      │
│ Status: Needs practice ⚠️      │
│ [Practice Now]                 │
└─────────────────────────────────┘
```

#### 4. **Diagnostic Test** [Issue #4]

5-question quick assessment for new topics to seed FSRS states:
- Easy (2Q)
- Medium (2Q)  
- Hard (1Q)

Avoids "all new" state for users with existing knowledge.

#### 5. **Progressive Difficulty Ordering** [Issue #8]

```sql
-- For new questions, order by difficulty
SELECT * FROM questions
WHERE user never attempted
ORDER BY difficulty_rating ASC -- Easy → Medium → Hard
```

#### 6. **Exam Countdown Mode** [Issue #5]

```javascript
// Adjust max interval based on exam date
const daysUntilExam = (examDate - today) / (1000 * 60 * 60 * 24);
const maxInterval = Math.min(180, daysUntilExam / 3);
```

User sets UN exam date → FSRS auto-adjusts to ensure coverage.

---

### 14.3 v2.0 – Platform Features

**Timeline**: After pedagogical foundation is solid (weeks 10+)

These are nice-to-have UX improvements:

- 📚 **Step-by-step explanations**: Detailed solution walkthroughs
- 📹 **Video hints**: Link to YouTube explanations
- 🎨 **Dark mode**: Better for evening study
- 📱 **PWA**: Installable web app (offline-capable)
- 🎯 **Custom practice sets**: User-curated question collections
- 🤝 **Study groups**: Collaborative practice sessions
- 🔀 **Question variants**: Slightly modify numbers for extra practice
- 👨‍🏫 **Teacher mode**: Custom questions for classroom use
- 📊 **Advanced analytics**: Visual FSRS data, learning curves
- 🌐 **Multi-language**: English version for international schools

---

### 14.4 Advanced Analytics & Insights

**Timeline**: Post v2.0 (requires sufficient usage data)

These features leverage the confidence rating system and session data to provide actionable learning insights:

#### 1. **Overconfidence Analytics** 🎯

**Purpose**: Identify topics where students overestimate their understanding

**Data Collection**:
```javascript
// Store confidence + correctness pairs
session_item {
  confidence_level: "guessed" | "pretty_sure" | "very_sure"
  is_correct: boolean
  answered_at: timestamp
}

// Detect overconfidence patterns
overconfidenceRate = 
  count(confidence="very_sure" AND is_correct=false) /
  count(confidence="very_sure")
```

**Dashboard Display**:
```
⚠️ Overconfidence Alert: Geometri
┌───────────────────────────────────────┐
│ You marked 8 questions as "Sangat     │
│ yakin" but got 5 wrong (62% wrong)    │
│                                        │
│ This suggests you may have gaps in:   │
│ • Triangle similarity concepts        │
│ • Pythagorean theorem applications    │
│                                        │
│ 💡 Recommendation: Review fundamentals │
│ before attempting more questions       │
│                                        │
│ [Practice Geometri Basics]            │
└───────────────────────────────────────┘
```

**Pedagogical Value**: 
> Overconfidence detection addresses the Dunning-Kruger effect in math learning. Students often feel confident with procedural steps but miss conceptual foundations. Flagging this prevents practicing with flawed mental models (Kruger & Dunning, 1999).

---

#### 2. **Learning Velocity Metrics** 📈

**Metrics**:
- **Questions/week**: Track practice consistency
- **Accuracy trend**: 7-day rolling average by topic
- **FSRS progression**: % of questions in "review" vs "new" state
- **Retention rate**: % of previously correct questions still correct after FSRS review

**Dashboard Visualization**:
```
📊 Your Learning Trajectory (Last 30 Days)
┌─────────────────────────────────────────┐
│ Aljabar Linear                          │
│ Accuracy: 72% → 85% (+13%) ↗️          │
│ Practice sessions: 12                   │
│ Review state: 78% (Strong retention!)   │
│                                          │
│ Geometri                                │
│ Accuracy: 45% → 48% (+3%) →            │
│ Practice sessions: 4 ⚠️                 │
│ Review state: 23% (Needs more practice) │
└─────────────────────────────────────────┘
```

**Alerts**:
- ⚠️ "You haven't practiced Statistika in 14 days - knowledge decay likely"
- 🎉 "Accuracy improved 20% this week - great progress!"

---

#### 3. **Mistake Pattern Recognition** 🔍

**Auto-detect common error types**:
```javascript
// Example pattern detection
const patterns = {
  "sign_errors": detectPatterns(["+/-", "negative numbers"]),
  "order_of_operations": detectPatterns(["PEMDAS", "bracket errors"]),
  "unit_conversion": detectPatterns(["cm → m", "time units"]),
  "algebraic_manipulation": detectPatterns(["factoring", "expanding"])
};

// Example: If 70% of Aljabar mistakes involve sign errors
showInsight("Most of your Aljabar mistakes are sign errors. Practice: negative number operations.");
```

**Implementation**:
- Tag questions with error categories during content ingestion
- Compare user's wrong answers to common misconception patterns
- Generate targeted micro-lessons

**User Benefit**: Precision guidance ("Practice sign rules") vs vague advice ("Study more")

---

#### 4. **Confidence Calibration Score** 🎓

**Measure how well student self-assessment matches actual performance**:

```javascript
function calculateCalibration(userId, topicId) {
  const sessions = getSessionData(userId, topicId);
  
  const calibrationScore = sessions.reduce((score, item) => {
    // Perfect calibration examples:
    // - "very_sure" + correct = +1
    // - "guessed" + incorrect = +1
    // - "very_sure" + incorrect = -2 (overconfident penalty)
    // - "guessed" + correct = -1 (underconfident, less severe)
    
    if (item.confidence === "very_sure" && item.is_correct) return score + 1;
    if (item.confidence === "guessed" && !item.is_correct) return score + 1;
    if (item.confidence === "very_sure" && !item.is_correct) return score - 2;
    if (item.confidence === "guessed" && item.is_correct) return score - 0.5;
    return score;
  }, 0);
  
  return normalize(calibrationScore); // 0-100 scale
}
```

**Dashboard Display**:
```
🎯 Confidence Calibration: 78/100
┌────────────────────────────────────────┐
│ You accurately predict your performance│
│ most of the time!                      │
│                                         │
│ Breakdown:                              │
│ ✅ Correct confidence: 82%             │
│ ⚠️ Overconfident: 12% (improve this)   │
│ 🤔 Underconfident: 6%                  │
│                                         │
│ Tip: When unsure, mark "Ragu" to get   │
│ better FSRS scheduling.                 │
└────────────────────────────────────────┘
```

**Pedagogical Foundation**: Metacognitive accuracy (knowing what you know) predicts learning success (Bjork, 1999). Teaching students to self-assess accurately is a transferable skill.

---

#### 5. **Topic Mastery Heatmap** 🗺️

**Visual representation of knowledge across curriculum**:

```
Your SMP Math Mastery Map
┌─────────────────────────────────────────┐
│        ALJABAR          GEOMETRI        │
│   ┌──────┐  ┌──────┐  ┌──────┐         │
│   │Linear│  │SPLDV │  │Bangun│         │
│   │ 92%  │→ │ 85%  │  │Datar │         │
│   │  🟢  │  │  🟢  │  │ 48%  │         │
│   └──────┘  └──────┘  │  🟡  │         │
│                        └──────┘         │
│      STATISTIKA         PELUANG        │
│   ┌──────┐  ┌──────┐  ┌──────┐         │
│   │Mean  │  │Median│  │Dasar │         │
│   │ 78%  │  │ 65%  │  │ 35%  │         │
│   │  🟢  │  │  🟡  │  │  🔴  │         │
│   └──────┘  └──────┘  └──────┘         │
│                                         │
│ 🟢 Mastered (≥80%) 🟡 Learning 🔴 Weak │
└─────────────────────────────────────────┘
```

**Features**:
- Color-coded mastery levels
- Topic dependency arrows (e.g., Linear → SPLDV)
- Click to drill into sub-topics
- Visual progress over time (animated heatmap replay)

---

#### 6. **Comparative Analytics** 📊

**Benchmark against anonymized cohort data**:

```
Your Performance vs Peers (SMP Class 9)
┌────────────────────────────────────────┐
│ Aljabar Linear                         │
│ You: 85% ████████░░                    │
│ Avg: 72% ███████░░░ (+13% above avg!) │
│                                         │
│ Geometri                               │
│ You: 48% ████░░░░░░                    │
│ Avg: 68% ██████░░░░ (-20% below avg)  │
│ 💡 Most students master this in 8      │
│    practice sessions                    │
└────────────────────────────────────────┘
```

**Privacy-preserving**:
- Only show aggregated cohort averages
- No individual student comparisons
- Opt-in feature

**Motivational Impact**: Social comparison can drive engagement when framed as informational (not competitive)

---

#### 7. **Predictive Exam Readiness** 🎯

**Use FSRS data to predict UN exam performance**:

```javascript
function calculateExamReadiness(userId, gradeLevel) {
  const topics = getTopicsForGrade(gradeLevel);
  
  const readiness = topics.map(topic => {
    const masteryScore = getTopicMastery(userId, topic.id);
    const retentionStrength = getAvgFSRSStability(userId, topic.id);
    const recentActivity = getSessionsLast30Days(userId, topic.id);
    
    // Weighted formula
    return {
      topic: topic.name,
      score: (masteryScore * 0.5) + (retentionStrength * 0.3) + (recentActivity * 0.2),
      prediction: mapToPrediction(score) // "Pass", "Borderline", "At Risk"
    };
  });
  
  return readiness;
}
```

**Dashboard Display**:
```
🎓 UN Exam Readiness Prediction
┌────────────────────────────────────────┐
│ Overall: 78% likely to pass            │
│ Confidence: Medium                     │
│                                         │
│ Strong Topics (90%+ predicted):        │
│ ✅ Aljabar Linear                      │
│ ✅ SPLDV                               │
│ ✅ Statistika                          │
│                                         │
│ ⚠️ At Risk Topics (need practice):     │
│ 🔴 Geometri (45% predicted)            │
│ 🟡 Peluang (68% predicted)             │
│                                         │
│ 📅 52 days until exam                  │
│ Suggested focus: 3 Geometri sessions/wk│
│                                         │
│ [Create Study Plan]                    │
└────────────────────────────────────────┘
```

**Ethical Considerations**:
- Frame as "suggested focus areas" not definitive predictions
- Emphasize actionability (what to practice) over labeling
- Include disclaimer about prediction limitations

---

#### 8. **Session Insights & Post-Practice Reflection** 💭

**Immediate post-session metacognitive prompts**:

After completing practice session:
```
📝 Quick Reflection
┌────────────────────────────────────────┐
│ How did this session feel?             │
│ 😫 Frustrating  😐 Okay  😊 Good       │
│                                         │
│ Any questions make you realize gaps?   │
│ [ ] Yes → [Tell us which ones]         │
│ [ ] No, felt confident                 │
│                                         │
│ [Skip] [Submit Reflection]             │
└────────────────────────────────────────┘
```

**Use reflection data to**:
- Adjust FSRS difficulty parameters
- Identify questions that confuse students (flag for review)
- Personalize encouragement messages

---

#### 9. **Learning Insights Dashboard** 🧠

**Consolidated "meta-learning" page**:

```
Your Learning Profile
┌─────────────────────────────────────────┐
│ 🎯 Calibration Score: 78/100           │
│ 📈 Avg Weekly Progress: +5% accuracy  │
│ ⚠️ Overconfidence Rate: 12%            │
│                                         │
│ 🔥 Best Learning Time: 7-9 PM          │
│ 📅 Most Productive Days: Tue, Thu      │
│ ⏱️ Optimal Session Length: 18 min      │
│                                         │
│ 🎓 Learning Style Insights:            │
│ • You improve faster with shorter,     │
│   more frequent sessions                │
│ • Geometry needs visual aids (90% of   │
│   mistakes are spatial reasoning)       │
│ • You retain Algebra best (95%         │
│   retention after 30 days)              │
│                                         │
│ 💡 Personalized Recommendations:       │
│ • Schedule Geometri practice at 7 PM   │
│   on Tuesdays                           │
│ • Use 10-question sessions for new     │
│   topics (instead of 15)                │
│ • Review Aljabar Linear every 14 days  │
│   (optimal for your retention curve)    │
└─────────────────────────────────────────┘
```

**Data Sources**:
- Session timestamps → identify peak learning times
- Session length vs accuracy → optimize duration
- Topic-specific retention curves → personalize FSRS
- Confidence patterns → metacognitive awareness

---

#### Implementation Priorities

**Phase 1 (Quick Wins)**:
1. Overconfidence alerts (low complexity, high pedagogical impact)
2. Topic mastery heatmap (visual, motivating)
3. Learning velocity metrics (simple aggregation)

**Phase 2 (Data-Dependent)**:
4. Mistake pattern recognition (requires ML or manual tagging)
5. Confidence calibration scoring (needs statistical modeling)
6. Session insights prompts (adds friction, test carefully)

**Phase 3 (Advanced)**:
7. Predictive exam readiness (requires validation dataset)
8. Comparative analytics (needs user base + privacy design)
9. Learning insights dashboard (synthesizes all above)

**Technical Requirements**:
- Analytics data warehouse (separate from operational DB)
- Background job processing for metric calculations
- Privacy-preserving aggregation methods
- A/B testing framework to validate pedagogical impact

**Success Metrics**:
- Analytics feature adoption rate
- User-reported actionability ("Did this insight change your practice?")
- Correlation between insight engagement and learning outcomes

---

## 15. Learning Science References

The pedagogical decisions in this PRD are grounded in the following research:

### Spaced Repetition & Optimal Difficulty
- **Bjork, R. A., & Bjork, E. L. (2011).** Making things hard on yourself, but in a good way: Creating desirable difficulties to enhance learning. *Psychology and the Real World*, 56-64.
- **Ebbinghaus, H. (1885).** Memory: A contribution to experimental psychology.

### Deliberate Practice
- **Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993).** The role of deliberate practice in the acquisition of expert performance. *Psychological Review*, 100(3), 363-406.

### Testing Effect & Retrieval Practice
- **Roediger, H. L., & Karpicke, J. D. (2006).** Test-enhanced learning: Taking memory tests improves long-term retention. *Psychological Science*, 17(3), 249-255.

### Interleaving
- **Rohrer, D., & Taylor, K. (2007).** The shuffling of mathematics problems improves learning. *Instructional Science*, 35(6), 481-498.

### Mastery Learning
- **Bloom, B. S. (1968).** Learning for mastery. *Evaluation Comment*, 1(2), 1-12.

### Feedback & Growth Mindset
- **Dweck, C. S. (2006).** *Mindset: The new psychology of success*. Random House.
- **Hattie, J., & Timperley, H. (2007).** The power of feedback. *Review of Educational Research*, 77(1), 81-112.

### Metacognition
- **Flavell, J. H. (1979).** Metacognition and cognitive monitoring: A new area of cognitive–developmental inquiry. *American Psychologist*, 34(10), 906-911.

### Confidence Ratings & Self-Assessment
- **Bjork, R. A. (1994).** Memory and metamemory considerations in the training of human beings. In J. Metcalfe & A. Shimamura (Eds.), *Metacognition: Knowing about knowing* (pp. 185-205). MIT Press.

---

**For detailed analysis**, see [`docs/Pedagogy & Mastery Learning Review.md`](file:///c:/Users/albar/Documents/01%20Projects/mikir%20kids/docs/Pedagogy%20&%20Mastery%20Learning%20Review.md).

---

But for now: **Keep it simple, make it work.**

---

**Ready to build?** Start with Phase 1 and ship something usable in 3-4 weeks.

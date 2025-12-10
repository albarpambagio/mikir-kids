# Project Overview & Status

> **Mikir Kids** - Math Deliberate Practice MVP  
> A focused web app for Indonesian students to practice UN-style math questions using FSRS scheduling.

---

## 📋 **Quick Reference**

| Document | Purpose | Status |
|----------|---------|--------|
| [PRD – Math Deliberate Practice MVP.md](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md) | Product requirements & specifications | ✅ Complete |
| [tech stack and project setup.md](./tech%20stack%20and%20project%20setup.md) | Technical architecture & setup guide | ✅ Complete |
| [Spacing System & Design Tokens Guide.md](./Spacing%20System%20%26%20Design%20Tokens%20Guide.md) | Design system spacing & tokens | ✅ Complete |
| **This Document** | Project status & big picture | 📊 Current |

---

## 🎯 **Project Vision**

**What we're building:**
- Web app for Indonesian SMP/SMA students
- Practice UN-style math questions by topic
- FSRS algorithm automatically schedules review of weak questions
- Simple User ID system (no passwords, like VPN accounts)

**What we're NOT building:**
- ❌ Gamification (XP, badges, streaks)
- ❌ Social features (leaderboards, sharing)
- ❌ Teacher/parent dashboards
- ❌ Mobile apps (responsive web only)

**Success Criteria:**
- ✅ User can get User ID and complete full session without bugs
- ✅ Immediate feedback shown after each question (prevents practicing mistakes)
- ✅ Confidence ratings captured for correct answers
- ✅ FSRS scheduling works (questions come back at smart intervals)
- ✅ Mobile experience doesn't feel broken
- ✅ Friend can use it without asking "how does this work?"

---

## 🏗️ **Architecture Overview**

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Auth Flow  │  │  Dashboard   │  │   Practice   │  │
│  │  (User ID)   │  │  (Topics)    │  │  (Sessions)  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  Tech: React 18 + Vite + TypeScript                     │
│  UI: shadcn/ui + Tailwind CSS                           │
│  State: Zustand + TanStack Query                        │
│  Deploy: Cloudflare Pages                               │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ HTTP/REST API
                   │
┌──────────────────▼──────────────────────────────────────┐
│                  Backend (FastAPI)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  User API    │  │ Session API  │  │  FSRS Logic  │  │
│  │  (User ID)   │  │  (Practice)  │  │  (Scheduling)│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  Tech: FastAPI + Python 3.11+                           │
│  FSRS: py-fsrs library                                  │
│  Deploy: Railway                                         │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ SQL Queries
                   │
┌──────────────────▼──────────────────────────────────────┐
│              Database (Supabase PostgreSQL)              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │    Users     │  │   Topics     │  │  Questions   │  │
│  │  Sessions    │  │ User State   │  │  (FSRS data) │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  Managed PostgreSQL (no Auth, just DB)                  │
└──────────────────────────────────────────────────────────┘
```

---

## 📊 **Implementation Phases**

### **Phase 1: Foundation** (Week 1)
**Goal**: Set up infrastructure and basic user system

- [x] **Frontend Setup**
  - [x] Initialize React + Vite project
  - [x] Install dependencies (shadcn/ui, Tailwind, etc.)
  - [x] Configure build tools
  - [x] Set up routing structure

- [x] **Backend Setup**
  - [x] Initialize FastAPI project
  - [x] Set up database connection (Supabase)
  - [x] Create database schema + migrations
  - [x] User ID generation endpoint

- [x] **Database**
  - [x] Create tables (users, topics, questions, sessions, user_question_state)
  - [x] Seed 3 topics + 50 questions
  - [x] Test queries
  - [x] Configure Row-Level Security (RLS) policies
  - [x] Set up database connection (connection pooler)

**Status**: 🟢 Complete  
**Dependencies**: None  
**Estimated Time**: 1 week  
**Notes**: Database fully configured with RLS security policies. All migrations applied successfully. Connection tested and working.

---

### **Phase 2: Authentication & Onboarding** (Week 2)
**Goal**: User can create/enter User ID and select grade

- [x] **UI Components** ✅ Complete
  - [x] AuthShell layout component (hero image)
  - [x] AuthLanding page (User ID creation/entry)
  - [x] GradeSelection page
  - [x] Supporting components (AuthForm, HeroSection, GradeSelectionForm, UserIDTabs)
  - [x] UserIdDisplay page

- [x] **Backend APIs** ✅ Complete
  - [x] `POST /api/users` (create user with ID) ✅ Tested
  - [x] `GET /api/users/{userId}` (validate & get user) ✅ Tested
  - [x] `PATCH /api/users/{userId}` (update grade/class) ✅ Tested

- [x] **Integration** ✅ Complete
  - [x] Wire up frontend to backend APIs
  - [x] Full auth flow implemented (create/validate → grade selection → dashboard)
  - [x] Error handling with user-friendly messages
  - [x] localStorage integration for User ID persistence
  - [x] Routing configured (React Router)

**Status**: 🟢 Complete  
**Dependencies**: Phase 1 complete ✅  
**Estimated Time**: 1 week  
**Progress**: 100% ✅

---

### **Phase 3: Dashboard & Topics** (Week 2-3)
**Goal**: User can see topics and start practice sessions

- [x] **UI Components** ✅ Complete
  - [x] Dashboard page (topic list)
  - [x] KPI cards (Total Skor, Jumlah Soal Dikerjakan, Tingkat Retensi)
  - [x] CTA card with texture overlay
  - [x] Question list items with circular progress indicators
  - [x] Filter dropdowns (Kelas, Topik)
  - [x] Sort by retention functionality with tooltip
  - [x] Navigation menu (Beranda, Topik)
  - [x] Settings button
  - [x] Tooltips for retention rate indicators
  - [x] "Latihan" buttons on question items

- [x] **Dashboard Layout & Styling** ✅ Complete
  - [x] Layout restructure (KPI cards left, CTA card right)
  - [x] Pixel-perfect styling matching Figma design
  - [x] Proper spacing and dividers
  - [x] Color scheme implementation (orange KPI values, gray categories)
  - [x] Badge positioning and styling
  - [x] Texture overlay on CTA card

- [x] **Backend APIs** ✅ Complete
  - [x] `GET /api/dashboard/{user_id}/topics` (replaces `GET /api/topics`)
  - [x] `GET /api/dashboard/{user_id}/stats` (for dashboard stats)
  - [x] `POST /api/sessions` (create session)

- [x] **Session Engine** ✅ Complete
  - [x] Priority 1: FSRS-due questions
  - [x] Priority 2: New questions
  - [x] Logic to return correct session size

**Status**: 🟢 Complete (Ready for full integration)
**Dependencies**: Phase 2 complete ✅  
**Estimated Time**: 1 week  
**Progress**: 100% (Frontend and Backend ready)

---

### **Phase 4: Practice Session** (Week 3)
**Goal**: User can answer questions one-by-one

- [x] **UI Components** ✅ Complete
  - [x] PracticeSession page with two-column layout
  - [x] Question display (text + image support)
  - [x] MCQ buttons with Figma-accurate styling
  - [x] Progress indicator (orange bar with question count)
  - [x] Question navigation sidebar (5-column grid)
  - [x] Navigation state tracking (active/completed/unanswered)
  - [x] ConfidenceSelector component with emoji icons (😕 😊 😁)
  - [x] Two-step confidence submission (select → Submit button)
  - [x] ResultCard component (correct/incorrect feedback)
  - [x] Explanation sections for both correct and incorrect answers
  - [x] Next review schedule display ("📅 Review selanjutnya: 10 menit lagi")

- [x] **Figma Design Implementation** ✅ Complete
  - [x] Exact color matching (#f9bc60, #fef2f2, #f0fdf4, etc.)
  - [x] Emoji rendering using emoji-picker-react
  - [x] Confidence selector: 3-column vertical layout with emojis
  - [x] Result cards: pink/red for incorrect, green for correct
  - [x] White explanation boxes with 💡 icon
  - [x] Navigation states: yellow outline (active), orange fill (completed)
  - [x] Persistent MCQ layout (no page transitions)

- [x] **Backend APIs** ✅ Complete
  - [x] `POST /api/sessions/{sessionId}/answer`
  - [x] Answer validation logic
  - [x] Session state management (SessionItem updates)

- [ ] **Features** (Integration needed)
  - [ ] Connect to backend Session API
  - [ ] Real-time answer submission
  - [ ] Auto-advance to next question
  - [ ] Session abandonment handling
  - [ ] Navigate to summary on completion

**Status**: � UI Complete, 🟡 Integration Pending  
**Dependencies**: Phase 3 complete ✅  
**Estimated Time**: 1-2 days (Integration only)

**Recent Updates** (2025-12-10):
- ✅ Implemented Figma-accurate confidence selector with emoji icons
- ✅ Added Submit button for two-step confidence flow
- ✅ Updated ResultCard with exact Figma colors and styling
- ✅ Added explanation sections for correct answers
- ✅ Implemented next review schedule display
- ✅ Added navigation state tracking (active vs completed)
- ✅ Changed active state to yellow outline for better differentiation

---

### **Phase 5: FSRS Integration** (Week 4)
**Goal**: Questions automatically reschedule based on performance

- [ ] **Backend Logic**
  - [ ] Integrate py-fsrs library
  - [ ] Update user_question_state on answer
  - [ ] Calculate next_due_at based on correct/incorrect
  - [ ] Session builder prioritizes due questions

- [ ] **Testing**
  - [ ] Test scheduling logic
  - [ ] Verify questions come back at correct intervals
  - [ ] Test edge cases (all correct, all wrong)

**Status**: 🔴 Not Started  
**Dependencies**: Phase 4 complete  
**Estimated Time**: 1 week

---

### **Phase 6: Session Summary** (Week 4)
**Goal**: User can review results and see weak questions

- [x] **UI Components** ✅ Complete
  - [x] SessionSummary page with modern design
  - [x] Emoji stats cards (🎉 Correct, 💪 Incorrect, ⭐ Score)
  - [x] Correct/Incorrect visual map (green checkmarks, red X marks)
  - [x] Enhanced question result cards with color-coded borders
  - [x] Status badges (✓ Jawaban Benar, ✗ Jawaban Salah)
  - [x] Highlighted user answer vs correct answer
  - [x] White explanation boxes with 💡 icon
  - [x] Next review schedule display for incorrect answers
  - [x] Action buttons (Back to Dashboard, Practice Again)

- [ ] **Backend APIs** (Integration needed)
  - [ ] `GET /api/sessions/{sessionId}/summary`
  - [ ] Session results aggregation
  - [ ] Pass session data via navigation state

- [ ] **Features** (Integration needed)
  - [ ] Connect to backend Summary API
  - [ ] Display actual session results
  - [ ] Navigate back to dashboard
  - [ ] "Practice Again" functionality

**Status**: 🟢 UI Complete, 🟡 Integration Pending  
**Dependencies**: Phase 4 complete  
**Estimated Time**: 1 day (Integration only)

**Recent Updates** (2025-12-10):
- ✅ Refactored with emoji stats cards for better visual appeal
- ✅ Added enhanced question result cards with color-coded borders
- ✅ Implemented next review schedule display for incorrect answers
- ✅ Added action buttons for navigation

- [ ] **Backend APIs** (Integration needed)
  - [ ] `GET /api/sessions/{sessionId}/summary`
  - [ ] Calculate stats (correct/incorrect)
  - [ ] Separate weak questions

- [ ] **Features** (Integration needed)
  - [ ] "Latihan lagi" button functionality
  - [ ] "Kembali ke dashboard" button
  - [ ] Display correct answers for wrong questions

**Status**: � In Progress (Frontend UI Complete, Integration Pending)  
**Dependencies**: Phase 4 complete  
**Estimated Time**: 1-2 days (Integration only)

---

### **Phase 7: Polish & Launch** (Week 5)
**Goal**: Production-ready app

- [ ] **Testing**
  - [ ] Full user flow testing
  - [ ] Mobile responsiveness
  - [ ] Error handling
  - [ ] Edge cases

- [ ] **Deployment**
  - [ ] Deploy frontend to Cloudflare Pages
  - [ ] Deploy backend to Railway
  - [ ] Configure environment variables
  - [ ] Test production build

- [ ] **Final Checks**
  - [ ] Fix critical bugs
  - [ ] Performance optimization
  - [ ] Documentation

**Status**: 🔴 Not Started  
**Dependencies**: All previous phases  
**Estimated Time**: 1 week

---

## 📈 **Current Status**

### **Overall Progress**: ~40% Complete

```
Phase 1: Foundation          [████████░░] 100% ✅
Phase 2: Auth & Onboarding  [████████░░] 100% ✅
Phase 3: Dashboard          [██████████] 100% ✅
Phase 4: Practice Session   [████████░░] 85% 🟡 (UI Done, Integration Pending)
Phase 5: FSRS Integration   [░░░░░░░░░░] 0%
Phase 6: Session Summary    [████████░░] 80% 🟡 (UI Done, Integration Pending)
Phase 7: Polish & Launch     [░░░░░░░░░░] 0%
```

### **What's Done** ✅
- [x] Product requirements document (PRD)
- [x] Technical architecture & stack decisions
- [x] Implementation plans (AuthLanding, GradeSelection, Spacing System)
- [x] Project overview document (this file)
- [x] **Backend infrastructure fully set up**
  - [x] FastAPI project initialized with `uv` package manager
  - [x] Database connection configured (Supabase with connection pooler)
  - [x] All database migrations applied (schema, seed data, RLS policies)
  - [x] User API endpoints implemented and tested
  - [x] Database security configured (Row-Level Security enabled)
- [x] **Database security**
  - [x] RLS enabled on all tables
  - [x] Explicit policies for public read-only tables (topics, questions)
  - [x] Private tables secured (users, sessions, user_question_state)
  - [x] Direct privileges revoked from PUBLIC/anon roles
- [x] **Phase 2: Authentication & Onboarding Complete**
  - [x] AuthShell layout component with hero section
  - [x] AuthLanding page (User ID creation/entry with tabs)
  - [x] GradeSelection page (grade and class selection)
  - [x] UserIdDisplay page (show newly created User ID)
  - [x] All UI components (AuthForm, HeroSection, GradeSelectionForm, UserIDTabs)
  - [x] API integration (createUser, validateUser, updateUser)
  - [x] Error handling and validation
  - [x] localStorage integration for User ID persistence
  - [x] Complete routing setup (React Router)
  - [x] Full auth flow: Create/Enter ID → Grade Selection → Dashboard

- [x] **Phase 3: Dashboard UI Complete** 🟡
  - [x] Dashboard page layout and structure
  - [x] KPI cards (Total Skor, Jumlah Soal Dikerjakan, Tingkat Retensi)
  - [x] CTA card with dark teal background and texture overlay
  - [x] Question list items with circular progress indicators
  - [x] Filter dropdowns (Kelas, Topik) with proper styling
  - [x] Sort by retention icon with tooltip
  - [x] Navigation menu (Beranda, Topik) in header
  - [x] Settings button (Pengaturan) in header
  - [x] Tooltips for retention rate indicators
  - [x] "Latihan" buttons on question items
  - [x] Pixel-perfect styling matching Figma design
  - [x] Proper spacing, dividers, and layout alignment
  - [x] Color scheme implementation (orange KPI values, gray categories)
  - [x] Badge positioning and styling
  - [x] Responsive layout considerations

### **What's Next** 🔜
1. **Complete Phase 3**: Dashboard & Topics (Backend Integration)
   - Implement backend APIs:
     - `GET /api/topics?grade_level={level}`
     - `GET /api/user-question-state/stats` (for dashboard stats)
     - `POST /api/sessions` (create session)
   - Build session engine (FSRS-due questions + new questions)
   - Wire up frontend to backend APIs
   - Implement sort by retention functionality
   - Test data flow and error handling

2. **Complete Phase 4**: Practice Session
   - Create PracticeSession page
   - Implement question display and answer submission
   - Add progress indicators and navigation

3. **Testing & Refinement**
   - Test full dashboard flow with real data
   - Verify mobile responsiveness
   - Test error scenarios and edge cases

### **Missing Features & States** 📋
**From Analysis Documents** (to be implemented):

#### **Critical Missing Pages** (Phase 4-6)
- [ ] **Practice Session Page** - Entire page missing from design
  - Question display (text + image)
  - MCQ buttons (A/B/C/D/E) or numeric input
  - Progress indicator (e.g., "Soal 5 dari 15")
  - Submit answer button
  - "Tersimpan ✓" confirmation (500ms)
  - Auto-advance to next question
  - Session abandonment handling

- [ ] **Session Summary Page** - Entire page missing from design
  - Session score display (e.g., "12/15 Benar (80%)")
  - Weak questions section (highlighted separately)
  - All questions list (with correct/incorrect indicators)
  - Correct answers for wrong questions
  - "Latihan lagi" button
  - "Kembali ke dashboard" button

#### **Important Missing States** (Dashboard Polish)
- [ ] **Loading States**
  - Skeleton loaders for KPI cards
  - Skeleton loaders for question list items
  - Progressive loading (show data as it arrives)

- [ ] **Empty States**
  - No questions state (new user)
  - Empty filter results
  - Zero values handling

- [ ] **Error States**
  - API error handling (KPI stats, question list)
  - Network error state
  - Retry functionality

- [ ] **Interactive States**
  - Hover states for all clickable elements
  - Focus states (keyboard navigation)
  - Active/pressed states
  - Selected filter indicators

- [ ] **Edge Cases**
  - Very large numbers formatting
  - Long topic names truncation
  - Many question items (scroll/pagination)
  - Circular progress edge cases (0%, 100%)

- [ ] **Accessibility**
  - ARIA labels for all interactive elements
  - Keyboard navigation support
  - Color contrast verification
  - Screen reader support

---

## 🗂️ **Project Structure**

```
mikir-kids/
├── docs/
│   ├── PRD – Math Deliberate Practice MVP.md
│   ├── tech stack and project setup.md
│   ├── Spacing System & Design Tokens Guide.md
│   ├── Dashboard Missing Features Analysis.md
│   ├── Dashboard Missing States & Edge Cases.md
│   ├── SETUP_GUIDE.md
│   └── Project Overview & Status.md (this file)
│
├── frontend/                    # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/            # Auth components (5 components)
│   │   │   │   ├── AuthShell.tsx
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   ├── GradeSelectionForm.tsx
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   └── UserIDTabs.tsx
│   │   │   ├── dashboard/       # Dashboard components (4 components)
│   │   │   │   ├── CTACard.tsx
│   │   │   │   ├── KPICard.tsx
│   │   │   │   ├── QuestionListItem.tsx
│   │   │   │   └── TopicCard.tsx
│   │   │   ├── layout/          # Layout components (3 components)
│   │   │   │   ├── Logo.tsx
│   │   │   │   ├── NavigationMenu.tsx
│   │   │   │   └── UserProfile.tsx
│   │   │   └── ui/              # shadcn/ui components (11 components)
│   │   │       ├── badge.tsx, button.tsx, card.tsx
│   │   │       ├── dropdown-menu.tsx, input.tsx
│   │   │       ├── progress.tsx, select.tsx
│   │   │       ├── skeleton.tsx, tabs.tsx, tooltip.tsx
│   │   │       └── CircularProgress.tsx
│   │   ├── pages/              # Page components (9 pages)
│   │   │   ├── AuthLanding.tsx       # ✅ Complete
│   │   │   ├── UserIdDisplay.tsx     # ✅ Complete
│   │   │   ├── GradeSelection.tsx    # ✅ Complete
│   │   │   ├── Dashboard.tsx         # ✅ Legacy (replaced by Enhanced)
│   │   │   ├── EnhancedDashboard.tsx # ✅ Complete (Pixel-perfect)
│   │   │   ├── DashboardTest.tsx     # ✅ Test page
│   │   │   ├── Topics.tsx            # ✅ Complete (Pixel-perfect)
│   │   │   ├── PracticeSession.tsx   # ✅ UI Complete (needs integration)
│   │   │   └── SessionSummary.tsx    # ✅ UI Complete (needs integration)
│   │   ├── lib/                # Utilities (api.ts, validation.ts, utils.ts)
│   │   ├── types/              # TypeScript types (user.ts, practice.ts, topics.ts)
│   │   └── main.tsx            # ✅ Router configured
│   ├── public/assets/images/   # Image assets (hero-background.jpg, logo.png)
│   └── package.json
│
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── api/
│   │   │   └── users.py        # User API endpoints
│   │   ├── models/
│   │   │   ├── database.py     # Database connection
│   │   │   └── models.py       # Data models
│   │   ├── services/
│   │   │   └── user_id_service.py  # User ID generation service
│   │   └── main.py             # FastAPI app entry point
│   └── pyproject.toml
│
└── database/                    # SQL migrations
    └── migrations/
        ├── 001_initial_schema.sql
        ├── 002_seed_data.sql
        ├── 003_enable_rls.sql
        └── 004_restrict_to_mcq_only.sql
```

---

## 🔗 **Key Decisions Made**

### ✅ **Resolved**
- **Auth System**: User ID only (8-digit numeric, no passwords)
- **Tech Stack**: React + Vite (frontend), FastAPI (backend), Supabase (database)
- **Deployment**: Cloudflare Pages (frontend), Railway (backend)
- **Session Size**: Fixed at 15 questions (MVP); adaptive sizing in v1.5
- **FSRS Rating**: 3-level confidence-based (Easy/Good/Hard/Again)
  - Correct + "Sangat yakin" → Easy
  - Correct + "Cukup yakin" → Good
  - Correct + "Tebakan" → Hard
  - Incorrect → Again
- **FSRS Parameters**: 0.85 retention (optimal learning efficiency), 180-day max interval
- **Feedback Timing**: Immediate per-question (not delayed to end)
- **UI Framework**: shadcn/ui + Tailwind CSS

### ❓ **To Decide**
- **Question Order**: Randomize or fixed? (Recommendation: Randomize)
- **Numeric Tolerance**: Exact or ±0.01? (Recommendation: ±0.01 for decimals)
- **Session Resumption**: Allow resume or force restart? (Recommendation: Resume within 24h)

---

## 📝 **Quick Start Guide**

### **For Development**

1. **Read the docs** (in order):
   - Start with this document (Project Overview)
   - Review PRD for requirements
   - Check tech stack doc for setup
   - Follow UI Execution Plan for implementation

2. **Set up environment**:
   ```bash
   # Frontend
   cd frontend
   npm install
   npm run dev
   
   # Backend (when ready)
   cd backend
   uv sync
   uv run uvicorn app.main:app --reload
   ```

3. **Start implementing**:
   - Follow UI Execution Plan Phase 0 (Prerequisites)
   - Work through phases sequentially
   - Update this document as you complete tasks

### **For Understanding the Project**

1. **What are we building?** → Read PRD
2. **How are we building it?** → Read tech stack doc
3. **What does it look like?** → Read ui plan.md
4. **How do I implement it?** → Read UI Execution Plan
5. **What's the current status?** → Read this document

---

## 🎯 **Success Metrics**

### **MVP Completion Checklist**
- [x] User can create User ID and select grade ✅
- [ ] User can see topics for their grade level
- [ ] User can start a practice session
- [ ] User can answer 15 questions
- [ ] FSRS schedules weak questions for review
- [ ] User can see session summary with weak questions
- [ ] App works on mobile browsers
- [ ] No critical bugs in core flow

### **Not Measuring** (for MVP)
- User growth / retention
- Engagement metrics
- Performance analytics
- Conversion rates

**Why?** This is a fun/learning project, not a commercial product.

---

## 🚨 **Blockers & Risks**

### **Current Blockers**
- None ✅ All infrastructure issues resolved
  - Database connection working (using Supabase connection pooler)
  - IPv6 connectivity issue resolved
  - All migrations applied successfully

### **Potential Risks**
1. **Backend API not ready** → Can mock API responses initially
2. **FSRS integration complexity** → Start with simple scheduling, refine later
3. **Image assets missing** → Use placeholder gradients initially
4. **Database schema changes** → Use migrations, keep schema in version control

### **Mitigation Strategies**
- Mock data for frontend development
- Incremental implementation (one screen at a time)
- Test early and often
- Keep documentation updated

---

## 📅 **Timeline Estimate**

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Foundation | 1 week | 🟢 Complete |
| Phase 2: Auth & Onboarding | 1 week | 🟢 Complete |
| Phase 3: Dashboard | 1 week | 🔴 Not Started |
| Phase 4: Practice Session | 1 week | 🔴 Not Started |
| Phase 5: FSRS Integration | 1 week | 🔴 Not Started |
| Phase 6: Session Summary | 3-4 days | 🔴 Not Started |
| Phase 7: Polish & Launch | 1 week | 🔴 Not Started |

**Total Estimated Time**: 5-6 weeks

**Reality Check**: This is a personal/fun project. Timeline is flexible. Focus on making it work, not hitting deadlines.

---

## 🗺️ **Post-MVP Roadmap**

After MVP completion, features are prioritized by **pedagogical impact** (informed by [Pedagogy & Mastery Learning Review](./Pedagogy%20&%20Mastery%20Learning%20Review.md)).

### **v1.1 – Sparring Mode** 🥊 (Priority #1)

**Timeline**: +1 week after MVP validation  
**Development**: 3-4 days  
**Pedagogical Foundation**: Addresses interleaved practice gap (Rohrer & Taylor, 2007)

**What it is**: Mastery-gated challenge mode that tests learned material across multiple topics with time pressure.

**Key Features**:
- **Unlock**: After mastering 3+ topics at 80%+ accuracy
- **Interleaving**: Mix questions from all mastered topics (not topic-blocked)
- **Time Pressure**: Adaptive soft timer (user's average × 0.8)
- **Feedback**: Immediate correctness, delayed explanations
- **FSRS**: Weighted updates (lighter penalties for challenge context)

**Learning Objectives**:
- Interleaving improves long-term retention (Rohrer & Taylor, 2007)
- Retrieval practice strengthens memory (Roediger & Karpicke, 2006)
- Desirable difficulties enhance learning (Bjork & Bjork, 2011)
- Exam readiness through mixed-topic simulation

**Why Priority #1**: 
- Low complexity (reuses 80% of practice mode code)
- High pedagogical value (addresses critical gap)
- Natural progression mechanism (unlocks after mastery)

**See**: [PRD Section 14.1](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md#141-v11--sparring-mode-priority-1-) for full specification

---

### **v1.5 – Pedagogical Enhancements** 📚

**Timeline**: Weeks 7-9 after MVP  
**Addresses**: [Pedagogy Review Moderate Issues]

1. **Adaptive Session Sizing** - Adjust 10/15/20 questions based on performance
2. **Mistake Categorization** - Tag errors as "Calculation" vs "Conceptual"
3. **Mastery Progress Visualization** - Show "85% Mastered - Ready for Exam"
4. **Diagnostic Test** - 5-question assessment to seed FSRS states
5. **Progressive Difficulty** - Order new questions Easy → Medium → Hard
6. **Exam Countdown Mode** - Adjust intervals based on UN exam date

---

### **v2.0 – Platform Features** 🚀

**Timeline**: After pedagogical foundation is solid (weeks 10+)

Nice-to-have UX improvements:
- 📚 Step-by-step explanations
- 📹 Video hints (YouTube integration)
- 🎨 Dark mode
- 📱 PWA (installable, offline-capable)
- 🎯 Custom practice sets
- 🤝 Study groups
- 🔀 Question variants
- 👨‍🏫 Teacher mode
- 📊 Advanced analytics
- 🌐 Multi-language support

**See**: [PRD Section 14](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md#14-post-mvp-roadmap) for detailed roadmap

---

## 🔄 **How to Update This Document**

As you make progress:

1. **Update Status**: Change 🔴 Not Started → 🟡 In Progress → 🟢 Complete
2. **Check off tasks**: Mark completed items with [x]
3. **Update progress bars**: Adjust percentage complete
4. **Add notes**: Document decisions, blockers, or learnings
5. **Update timeline**: Adjust estimates based on actual progress

**Example Update**:
```markdown
### Phase 1: Foundation (Week 1)
**Status**: 🟡 In Progress (Day 3 of 7)

- [x] Initialize React + Vite project
- [x] Install dependencies
- [ ] Configure build tools
- [ ] Set up routing structure
```

---

## 📚 **Documentation Index**

| Document | Last Updated | Purpose |
|----------|--------------|---------|
| [PRD](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md) | - | Product requirements, user flows, API contracts |
| [Tech Stack](./tech%20stack%20and%20project%20setup.md) | - | Setup instructions, code examples, deployment |
| [Spacing System & Design Tokens Guide](./Spacing%20System%20%26%20Design%20Tokens%20Guide.md) | - | Design system spacing & tokens reference |
| [Dashboard Missing Features Analysis](./Dashboard%20Missing%20Features%20Analysis.md) | - | Analysis of missing features from design |
| [Dashboard Missing States & Edge Cases](./Dashboard%20Missing%20States%20%26%20Edge%20Cases.md) | - | Missing UI states and edge cases |
| [Project Overview](./Project%20Overview%20&%20Status.md) | Today | This document - big picture & status |

---

## 🎉 **Next Steps**

1. **If starting fresh**:
   - Review all documentation
   - Set up development environment
   - Begin Phase 1 (Foundation)

2. **If continuing work**:
   - Check current phase status
   - Review UI Execution Plan for next tasks
   - Update this document with progress

3. **If stuck**:
   - Review relevant documentation
   - Check blockers section
   - Consider mocking data/APIs to unblock

---

**Last Updated**: December 10, 2024  
**Current Phase**: Phase 3 Complete ✅, Phase 4 In Progress 🟡
**Next Action**: Complete PracticeSession UI & Logic

**Recent Accomplishments**:
- ✅ **PRD Enhanced with Learning Science Documentation** (Dec 10)
  - Added learning science rationales for all major pedagogical decisions
  - Documented immediate feedback principle (Ericsson's Deliberate Practice)
  - Explained confidence-based FSRS ratings (Bjork's metamemory research)
  - Added error-focused feedback rationale (Hattie & Timperley, Dweck)
  - Created comprehensive Sparring Mode specification (v1.1)
  - Reorganized post-MVP roadmap into 3 tiers (v1.1, v1.5, v2.0)
  - Added complete learning science bibliography (8 research citations)
  - Document grew from 938 to 1,433 lines (+65%)
- ✅ Phase 3 Dashboard UI fully implemented
- ✅ Dashboard layout restructured to match Figma design (KPI cards left, CTA card right)
- ✅ CTA card redesigned with dark teal background (#035855) and texture overlay
- ✅ Navigation menu added (Beranda, Topik) with active/inactive states
- ✅ Settings button implemented (replacing UserProfile dropdown)
- ✅ KPI cards styled with orange values (#f4881b) matching design
- ✅ Question list items with circular progress, badges, and "Latihan" buttons
- ✅ Filter dropdowns (Kelas, Topik) with proper styling
- ✅ Sort by retention functionality with tooltip
- ✅ Tooltips added for retention rate indicators
- ✅ Pixel-perfect styling: colors, spacing, typography, dividers
- ✅ Badge positioning fixed (right side of category)
- ✅ All layout issues resolved (alignment, separators, spacing)
- ✅ Phase 2 Authentication & Onboarding fully complete
- ✅ All UI components implemented (AuthShell, AuthLanding, GradeSelection, UserIdDisplay)
- ✅ Frontend-backend integration complete with error handling
- ✅ Full auth flow working (create/enter User ID → grade selection → dashboard navigation)
- ✅ localStorage integration for User ID persistence
- ✅ Routing configured and tested
- ✅ Installed and configured `uv` package manager
- ✅ Resolved database connection issues (using Supabase connection pooler)
- ✅ Applied all database migrations including RLS security policies
- ✅ Tested all User API endpoints - all tests passing
- ✅ Database fully secured with Row-Level Security
- ✅ Phase 3 Backend Integration Complete
  - ✅ Implemented `dashboard.py` with optimized aggregation query (refactored N+1 issue)
  - ✅ Implemented `sessions.py` with Session Engine logic (FSRS priority + New questions)
  - ✅ Implemented Answer Submission endpoint with null-safety
  - ✅ Verified Session flow end-to-end with test script
  - ✅ Resolved frontend build error (missing Progress component)
- ✅ **Phase 4 Practice Session UI started**
  - ✅ PracticeSession page: Full UI with question display, MCQ buttons, progress bar
  - ✅ Question navigation sidebar with 15-question grid
  - ✅ SessionSummary page: Session summary with correct/incorrect visualization
  - ✅ Question result cards showing user vs. correct answers
  - ✅ Pixel-perfect UI implementation for Dashboard and Topic cards
  - ✅ Connected to Figma for design reference
  - ✅ All 9 pages implemented and routed in main.tsx
  - ✅ 23 custom components organized by feature (auth, dashboard, layout, ui)

---

*"Dua tiga mie tektek, ayo kita praktek"* 🚀


# Project Overview & Status

> **Mikir Kids** - Math Deliberate Practice MVP  
> A focused web app for Indonesian students to practice UN-style math questions using FSRS scheduling.

---

## 📋 **Quick Reference**

| Document | Purpose | Status |
|----------|---------|--------|
| [PRD – Math Deliberate Practice MVP.md](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md) | Product requirements & specifications | ✅ Complete |
| [tech stack and project setup.md](./tech%20stack%20and%20project%20setup.md) | Technical architecture & setup guide | ✅ Complete |
| [ui plan.md](./ui%20plan.md) | UI/UX designs & component specs | ✅ Complete |
| [UI Execution Plan.md](./UI%20Execution%20Plan.md) | Screen-by-screen implementation plan | ✅ Complete |
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

- [ ] **Frontend Setup**
  - [ ] Initialize React + Vite project
  - [ ] Install dependencies (shadcn/ui, Tailwind, etc.)
  - [ ] Configure build tools
  - [ ] Set up routing structure

- [ ] **Backend Setup**
  - [ ] Initialize FastAPI project
  - [ ] Set up database connection (Supabase)
  - [ ] Create database schema + migrations
  - [ ] User ID generation endpoint

- [ ] **Database**
  - [ ] Create tables (users, topics, questions, sessions, user_question_state)
  - [ ] Seed 3 topics + 50 questions
  - [ ] Test queries

**Status**: 🔴 Not Started  
**Dependencies**: None  
**Estimated Time**: 1 week

---

### **Phase 2: Authentication & Onboarding** (Week 2)
**Goal**: User can create/enter User ID and select grade

- [ ] **UI Components**
  - [ ] AuthShell layout component (hero image)
  - [ ] AuthLanding page (User ID creation/entry)
  - [ ] GradeSelection page

- [ ] **Backend APIs**
  - [ ] `POST /api/users` (create user with ID)
  - [ ] `GET /api/users/{userId}` (validate & get user)
  - [ ] `PATCH /api/users/{userId}` (update grade/class)

- [ ] **Integration**
  - [ ] Wire up frontend to backend
  - [ ] Test full auth flow
  - [ ] Add error handling

**Status**: 🔴 Not Started  
**Dependencies**: Phase 1 complete  
**Estimated Time**: 1 week

---

### **Phase 3: Dashboard & Topics** (Week 2-3)
**Goal**: User can see topics and start practice sessions

- [ ] **UI Components**
  - [ ] Dashboard page (topic list)
  - [ ] Topic cards with stats (dueCount, lastScorePercent)
  - [ ] Navigation to practice

- [ ] **Backend APIs**
  - [ ] `GET /api/topics?grade_level={level}`
  - [ ] `GET /api/user-question-state/stats` (for dashboard stats)
  - [ ] `POST /api/sessions` (create session)

- [ ] **Session Engine**
  - [ ] Priority 1: FSRS-due questions
  - [ ] Priority 2: New questions
  - [ ] Return 15 questions for session

**Status**: 🔴 Not Started  
**Dependencies**: Phase 2 complete  
**Estimated Time**: 1 week

---

### **Phase 4: Practice Session** (Week 3)
**Goal**: User can answer questions one-by-one

- [ ] **UI Components**
  - [ ] PracticeSession page
  - [ ] Question display (text + image)
  - [ ] MCQ buttons / numeric input
  - [ ] Progress indicator
  - [ ] Answer submission flow

- [ ] **Backend APIs**
  - [ ] `POST /api/sessions/{sessionId}/answer`
  - [ ] Answer validation logic
  - [ ] Session state management

- [ ] **Features**
  - [ ] Auto-advance to next question
  - [ ] "Tersimpan" confirmation
  - [ ] Session abandonment handling
  - [ ] Last question → navigate to summary

**Status**: 🔴 Not Started  
**Dependencies**: Phase 3 complete  
**Estimated Time**: 1 week

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

- [ ] **UI Components**
  - [ ] SessionSummary page
  - [ ] Weak questions section
  - [ ] All questions list
  - [ ] Score display

- [ ] **Backend APIs**
  - [ ] `GET /api/sessions/{sessionId}/summary`
  - [ ] Calculate stats (correct/incorrect)
  - [ ] Separate weak questions

- [ ] **Features**
  - [ ] "Latihan lagi" button
  - [ ] "Kembali ke dashboard" button
  - [ ] Display correct answers for wrong questions

**Status**: 🔴 Not Started  
**Dependencies**: Phase 4 complete  
**Estimated Time**: 3-4 days

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

### **Overall Progress**: 0% Complete

```
Phase 1: Foundation          [░░░░░░░░░░] 0%
Phase 2: Auth & Onboarding  [░░░░░░░░░░] 0%
Phase 3: Dashboard          [░░░░░░░░░░] 0%
Phase 4: Practice Session   [░░░░░░░░░░] 0%
Phase 5: FSRS Integration   [░░░░░░░░░░] 0%
Phase 6: Session Summary    [░░░░░░░░░░] 0%
Phase 7: Polish & Launch     [░░░░░░░░░░] 0%
```

### **What's Done** ✅
- [x] Product requirements document (PRD)
- [x] Technical architecture & stack decisions
- [x] UI/UX designs and component specs
- [x] Implementation execution plan
- [x] Project overview document (this file)

### **What's Next** 🔜
1. **Start Phase 1**: Set up project infrastructure
   - Initialize frontend project
   - Initialize backend project
   - Set up database schema

2. **Begin UI Implementation**: Follow UI Execution Plan
   - Phase 0: Prerequisites (components, types, assets)
   - Phase 1: AuthShell component
   - Phase 2: AuthLanding & GradeSelection pages

---

## 🗂️ **Project Structure**

```
mikir-kids/
├── docs/
│   ├── PRD – Math Deliberate Practice MVP.md
│   ├── tech stack and project setup.md
│   ├── ui plan.md
│   ├── UI Execution Plan.md
│   └── Project Overview & Status.md (this file)
│
├── frontend/                    # React + Vite app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── stores/
│   │   └── types/
│   └── package.json
│
├── backend/                     # FastAPI app
│   ├── app/
│   │   ├── api/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   └── requirements.txt
│
└── database/                    # SQL migrations
    └── migrations/
```

**Note**: Actual project structure may differ. This is the conceptual organization.

---

## 🔗 **Key Decisions Made**

### ✅ **Resolved**
- **Auth System**: User ID only (8-digit numeric, no passwords)
- **Tech Stack**: React + Vite (frontend), FastAPI (backend), Supabase (database)
- **Deployment**: Cloudflare Pages (frontend), Railway (backend)
- **Session Size**: Fixed at 15 questions
- **FSRS Rating**: Binary (correct = "good", incorrect = "again")
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
   pip install -r requirements.txt
   uvicorn app.main:app --reload
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
- [ ] User can create User ID and select grade
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
- None (project not started yet)

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
| Phase 1: Foundation | 1 week | 🔴 Not Started |
| Phase 2: Auth & Onboarding | 1 week | 🔴 Not Started |
| Phase 3: Dashboard | 1 week | 🔴 Not Started |
| Phase 4: Practice Session | 1 week | 🔴 Not Started |
| Phase 5: FSRS Integration | 1 week | 🔴 Not Started |
| Phase 6: Session Summary | 3-4 days | 🔴 Not Started |
| Phase 7: Polish & Launch | 1 week | 🔴 Not Started |

**Total Estimated Time**: 5-6 weeks

**Reality Check**: This is a personal/fun project. Timeline is flexible. Focus on making it work, not hitting deadlines.

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
| [UI Plan](./ui%20plan.md) | - | Screen designs, component code, UI specs |
| [UI Execution Plan](./UI%20Execution%20Plan.md) | - | Step-by-step implementation guide |
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

**Last Updated**: Today  
**Current Phase**: Planning Complete, Ready to Start Development  
**Next Action**: Begin Phase 1 - Foundation Setup

---

*"Dua tiga mie tektek, ayo kita praktek"* 🚀


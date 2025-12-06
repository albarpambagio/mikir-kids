# UI Execution Plan - Screen by Screen

> **Goal**: Implement all UI screens from `ui plan.md` in a logical, dependency-aware order.

---

## 📋 **Prerequisites & Setup**

### **Phase 0: Foundation (Do First)**

#### **0.1 Install Required shadcn/ui Components**
```bash
# Run these commands to add missing components
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add scroll-area
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add label
```

**Components already available** (from tech stack doc):
- ✅ `button`, `card`, `progress`, `badge`, `alert`, `skeleton`, `input`, `separator`

**Components to add**:
- ⚠️ `tabs` - For AuthLanding and GradeSelection
- ⚠️ `scroll-area` - For Dashboard and SessionSummary
- ⚠️ `separator` - For SessionSummary
- ⚠️ `label` - For form inputs

---

#### **0.2 Create Shared Types File**
**File**: `src/types/index.ts`

**Tasks**:
- [ ] Copy types from `ui plan.md` (lines 9-40)
- [ ] Ensure compatibility with existing types from tech stack doc
- [ ] Add any missing interfaces (WeakQuestion, SummaryItem)

**Dependencies**: None

**Estimated Time**: 10 minutes

---

#### **0.3 Prepare Hero Image Asset**
**File**: `public/images/lockers.jpg`

**Tasks**:
- [ ] Source or create locker/hero image (reference from design)
- [ ] Optimize image (WebP format recommended, fallback JPG)
- [ ] Place in `public/images/` directory
- [ ] Test image loads correctly

**Dependencies**: None

**Estimated Time**: 15 minutes (if image exists) / 1 hour (if needs creation)

---

## 🎨 **Screen Implementation Order**

### **Phase 1: Layout Component (Foundation)**

#### **Screen 1.1: AuthShell Component**
**File**: `src/components/layout/AuthShell.tsx`

**Tasks**:
- [ ] Create component file
- [ ] Copy code from `ui plan.md` (lines 46-95)
- [ ] Verify image path (`/images/lockers.jpg`)
- [ ] Test responsive behavior (mobile/desktop)
- [ ] Ensure gradient overlay renders correctly

**Dependencies**:
- ✅ `cn` utility from `@/lib/utils`
- ✅ Hero image asset

**Integration Points**: None (pure presentational)

**Estimated Time**: 20 minutes

**Testing Checklist**:
- [ ] Component renders without errors
- [ ] Hero image displays on left side
- [ ] Content area displays children correctly
- [ ] Responsive: stacks on mobile, side-by-side on desktop
- [ ] Gradient overlay visible

---

### **Phase 2: Authentication Flow**

#### **Screen 2.1: AuthLanding (User ID Entry/Creation)**
**File**: `src/pages/AuthLanding.tsx` (or integrate into existing `UserIdEntry.tsx`)

**Tasks**:
- [ ] Create/update page component
- [ ] Copy code from `ui plan.md` (lines 102-283)
- [ ] Install `tabs` component if not done
- [ ] Wire up callback props:
  - [ ] `onGenerateUserId` → Call `userAPI.create()` (without grade/class)
  - [ ] `onUseExisting` → Call `userAPI.getById()` + `loadUser()`
  - [ ] `onContinueWithNewUser` → Navigate to GradeSelection
- [ ] Add error handling for API failures
- [ ] Test copy-to-clipboard functionality
- [ ] Add loading states

**Dependencies**:
- ✅ AuthShell component
- ✅ `tabs`, `button`, `card`, `input`, `label` components
- ✅ `userAPI` from `@/lib/api`
- ✅ `useAuthStore` for user management
- ✅ React Router for navigation

**Integration Points**:
- Backend: `POST /api/users` (generate ID only, no grade/class yet)
- Backend: `GET /api/users/{userId}` (validate existing user)
- Frontend: `useAuthStore.loadUser()`

**Estimated Time**: 1.5 hours

**Testing Checklist**:
- [ ] "Buat User ID baru" tab works
- [ ] User ID generates and displays
- [ ] Copy button copies to clipboard
- [ ] "Pakai User ID" tab works
- [ ] Invalid User ID shows error
- [ ] Valid User ID loads user and navigates
- [ ] Loading states show during API calls
- [ ] Error messages display correctly

---

#### **Screen 2.2: GradeSelection**
**File**: `src/pages/GradeSelection.tsx` (or integrate into existing `UserIdDisplay.tsx`)

**Tasks**:
- [ ] Create/update page component
- [ ] Copy code from `ui plan.md` (lines 290-366)
- [ ] Wire up callback:
  - [ ] `onConfirm` → Call `userAPI.updateProfile()` with grade/class
  - [ ] Navigate to Dashboard after successful update
- [ ] Pre-select grade/class if user already has profile
- [ ] Add loading state during update

**Dependencies**:
- ✅ AuthShell component
- ✅ `tabs`, `button`, `card`, `badge` components
- ✅ `userAPI` from `@/lib/api`
- ✅ React Router for navigation

**Integration Points**:
- Backend: `PATCH /api/users/{userId}` (update grade_level, class_level)
- Frontend: `useAuthStore` to update user state

**Estimated Time**: 1 hour

**Testing Checklist**:
- [ ] SMP/SMA tabs switch correctly
- [ ] Class buttons select correctly
- [ ] User ID badge displays
- [ ] "Masuk ke dashboard" button disabled until class selected
- [ ] Profile updates on backend
- [ ] Navigation to dashboard works
- [ ] Loading state during update

---

### **Phase 3: Main Application**

#### **Screen 3.1: Dashboard**
**File**: `src/pages/Dashboard.tsx`

**Tasks**:
- [ ] Create/update page component
- [ ] Copy code from `ui plan.md` (lines 373-509)
- [ ] Install `scroll-area` component if not done
- [ ] Wire up callbacks:
  - [ ] `onStartPractice` → Call `sessionAPI.create()` + navigate to session
  - [ ] `onViewHistory` → Navigate to history page (optional, can be placeholder)
- [ ] Fetch topics using `useTopics()` hook
- [ ] Calculate `dueCount` and `lastScorePercent` from user question state
- [ ] Filter topics by user's grade level
- [ ] Add empty state if no topics

**Dependencies**:
- ✅ `scroll-area`, `progress`, `badge`, `card`, `button` components
- ✅ `useTopics()` hook
- ✅ `sessionAPI` from `@/lib/api`
- ✅ `useAuthStore` for user data
- ✅ React Router for navigation

**Integration Points**:
- Backend: `GET /api/topics?grade_level={user.gradeLevel}`
- Backend: `GET /api/user-question-state/stats` (for dueCount, lastScorePercent)
- Backend: `POST /api/sessions` (create new session)

**Estimated Time**: 2 hours

**Testing Checklist**:
- [ ] Topics list displays correctly
- [ ] Topics filtered by user's grade level
- [ ] Due count shows for topics with FSRS-due questions
- [ ] Last score percentage displays if available
- [ ] "Latihan" button creates session and navigates
- [ ] History button works (or shows placeholder)
- [ ] Empty state shows if no topics
- [ ] Responsive layout works

---

#### **Screen 3.2: PracticeSession**
**File**: `src/pages/Session.tsx`

**Tasks**:
- [ ] Create/update page component
- [ ] Copy code from `ui plan.md` (lines 516-674)
- [ ] Wire up callbacks:
  - [ ] `onAnswer` → Call `sessionAPI.submitAnswer()`
  - [ ] `onQuit` → Show confirmation, mark session abandoned, navigate to dashboard
- [ ] Manage question state (current index, questions array)
- [ ] Auto-advance to next question after answer submission
- [ ] Handle last question → Navigate to summary
- [ ] Add session resume logic (if session exists in state)
- [ ] Add keyboard shortcuts (Enter to submit)

**Dependencies**:
- ✅ `card`, `button`, `badge`, `progress`, `input` components
- ✅ `useSession()` hook
- ✅ `sessionAPI` from `@/lib/api`
- ✅ `useSessionStore` for session state
- ✅ React Router for navigation

**Integration Points**:
- Backend: `POST /api/sessions/{sessionId}/answer`
- Backend: `POST /api/sessions/{sessionId}/complete` (on last question)
- Frontend: `useSessionStore` to track current question index

**Estimated Time**: 2.5 hours

**Testing Checklist**:
- [ ] Question displays correctly (text + image if available)
- [ ] MCQ options render and select correctly
- [ ] Numeric input works
- [ ] Answer submission saves to backend
- [ ] "Tersimpan" confirmation shows briefly
- [ ] Auto-advance to next question
- [ ] Progress bar updates
- [ ] Last question navigates to summary
- [ ] "Keluar sesi" shows confirmation
- [ ] Keyboard shortcuts work (Enter to submit)
- [ ] Mobile-friendly button sizes

---

#### **Screen 3.3: SessionSummary**
**File**: `src/pages/Summary.tsx`

**Tasks**:
- [ ] Create/update page component
- [ ] Copy code from `ui plan.md` (lines 681-876)
- [ ] Install `separator` component if not done
- [ ] Wire up callbacks:
  - [ ] `onPracticeAgain` → Create new session for same topic
  - [ ] `onBackToDashboard` → Navigate to dashboard
- [ ] Fetch session summary using `useSessionSummary()` hook
- [ ] Calculate score percentage
- [ ] Separate weak questions (incorrect) from all questions
- [ ] Add empty state if no incorrect questions

**Dependencies**:
- ✅ `scroll-area`, `separator`, `badge`, `card`, `button` components
- ✅ `useSessionSummary()` hook
- ✅ `sessionAPI` from `@/lib/api`
- ✅ React Router for navigation

**Integration Points**:
- Backend: `GET /api/sessions/{sessionId}/summary`
- Backend: `POST /api/sessions` (for "Latihan lagi")

**Estimated Time**: 2 hours

**Testing Checklist**:
- [ ] Summary stats display correctly (total, correct, incorrect, percentage)
- [ ] Weak questions section shows incorrect answers
- [ ] All questions list shows all 15 questions
- [ ] Correct/incorrect indicators work (Check/X icons)
- [ ] "Latihan lagi" creates new session
- [ ] "Kembali ke dashboard" navigates correctly
- [ ] Empty state for perfect score (all correct)
- [ ] Scroll areas work correctly
- [ ] Responsive layout

---

## 🔗 **Integration & Wiring**

### **Phase 4: Router Setup**

#### **4.1 Update App Router**
**File**: `src/App.tsx`

**Tasks**:
- [ ] Add routes for new pages:
  - [ ] `/` → Redirect to `/dashboard` (if authenticated) or `/auth` (if not)
  - [ ] `/auth` → AuthLanding component
  - [ ] `/grade-selection` → GradeSelection component
  - [ ] `/dashboard` → Dashboard component
  - [ ] `/session/:id` → PracticeSession component
  - [ ] `/session/:id/summary` → SessionSummary component
- [ ] Add route guards (ProtectedRoute for authenticated routes)
- [ ] Handle redirects based on auth state

**Estimated Time**: 30 minutes

---

### **Phase 5: API Integration**

#### **5.1 Update API Methods**
**File**: `src/lib/api.ts`

**Tasks**:
- [ ] Ensure `userAPI.create()` supports creating user without grade/class
- [ ] Add `userAPI.updateProfile()` method
- [ ] Ensure `sessionAPI.create()` includes user_id
- [ ] Verify all API methods match PRD contracts

**Estimated Time**: 30 minutes

---

#### **5.2 Update Hooks**
**Files**: `src/hooks/useTopics.ts`, `src/hooks/useSession.ts`

**Tasks**:
- [ ] Verify `useTopics()` filters by grade level
- [ ] Add logic to calculate `dueCount` and `lastScorePercent`
- [ ] Ensure `useSession()` handles session state correctly

**Estimated Time**: 45 minutes

---

## 🧪 **Testing Strategy**

### **Phase 6: Testing & Polish**

#### **6.1 Component Testing**
**Tasks**:
- [ ] Test each screen in isolation with mock data
- [ ] Test responsive behavior (mobile, tablet, desktop)
- [ ] Test error states (API failures, invalid inputs)
- [ ] Test loading states
- [ ] Test empty states

**Estimated Time**: 2 hours

---

#### **6.2 Integration Testing**
**Tasks**:
- [ ] Test full user flow:
  1. New user → Generate ID → Select grade → Dashboard
  2. Existing user → Enter ID → Dashboard
  3. Start session → Answer questions → View summary
- [ ] Test edge cases:
  - Invalid User ID
  - Network errors
  - Session abandonment
  - Perfect score (all correct)

**Estimated Time**: 1.5 hours

---

#### **6.3 Visual Polish**
**Tasks**:
- [ ] Verify spacing matches design
- [ ] Check typography (font sizes, weights)
- [ ] Verify color scheme consistency
- [ ] Test dark mode (if implemented)
- [ ] Check accessibility (keyboard navigation, screen readers)

**Estimated Time**: 1 hour

---

## 📊 **Estimated Timeline**

| Phase | Task | Time Estimate |
|-------|------|---------------|
| **0** | Prerequisites | 1.5 hours |
| **1** | AuthShell | 20 minutes |
| **2** | AuthLanding | 1.5 hours |
| **2** | GradeSelection | 1 hour |
| **3** | Dashboard | 2 hours |
| **3** | PracticeSession | 2.5 hours |
| **3** | SessionSummary | 2 hours |
| **4** | Router Setup | 30 minutes |
| **5** | API Integration | 1.25 hours |
| **6** | Testing & Polish | 4.5 hours |

**Total Estimated Time**: ~17 hours (2-3 days of focused work)

---

## 🎯 **Execution Order Summary**

### **Day 1: Foundation & Auth**
1. ✅ Prerequisites (components, types, assets)
2. ✅ AuthShell component
3. ✅ AuthLanding page
4. ✅ GradeSelection page
5. ✅ Router setup for auth flow

### **Day 2: Main App**
1. ✅ Dashboard page
2. ✅ PracticeSession page
3. ✅ SessionSummary page
4. ✅ API integration updates

### **Day 3: Polish & Testing**
1. ✅ Full integration testing
2. ✅ Visual polish
3. ✅ Edge case handling
4. ✅ Documentation

---

## ⚠️ **Dependencies & Blockers**

### **Critical Dependencies**
- Backend API must support:
  - `POST /api/users` (create without grade/class)
  - `PATCH /api/users/{userId}` (update grade/class)
  - `GET /api/users/{userId}` (validate user)
  - `GET /api/topics?grade_level={level}`
  - `GET /api/user-question-state/stats` (for dashboard stats)

### **Nice-to-Have (Can Mock Initially)**
- FSRS stats (dueCount, lastScorePercent) - can show 0 or placeholder
- Session history - can be placeholder button

---

## 📝 **Notes**

1. **Image Asset**: If locker image doesn't exist, use a placeholder gradient or stock photo temporarily
2. **Mock Data**: Can use mock data for initial development, wire up API later
3. **Error Handling**: Ensure all API calls have try/catch and user-friendly error messages
4. **Loading States**: Add loading spinners for all async operations
5. **Mobile First**: Test on mobile devices early and often

---

## ✅ **Definition of Done**

Each screen is "done" when:
- [ ] Component renders without errors
- [ ] All UI elements match design from `ui plan.md`
- [ ] API integration works (or mock data works)
- [ ] Responsive design works (mobile + desktop)
- [ ] Error states handled gracefully
- [ ] Loading states implemented
- [ ] Navigation works correctly
- [ ] Code is clean and follows project conventions

---

**Ready to start? Begin with Phase 0 (Prerequisites) and work through each phase sequentially!** 🚀


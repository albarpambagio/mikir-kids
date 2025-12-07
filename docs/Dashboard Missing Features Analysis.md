# Dashboard Missing Features Analysis

> **Purpose**: Identify features missing from the Figma design compared to PRD requirements  
> **Related**: [PRD](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md), [Project Overview & Status](./Project%20Overview%20&%20Status.md)  
> **Status**: 📋 Analysis Document

---

## 📋 Overview

This document compares the **Figma design** (what's designed) with the **PRD requirements** (what's needed) to identify missing features, pages, and functionality that need to be designed and implemented.

---

## 🎯 Design vs Requirements Comparison

### **What's Designed (Figma)**
- ✅ Dashboard page with:
  - Header (Logo + User Profile)
  - KPI Cards (Total Skor, Jumlah Soal Dikerjakan, Tingkat Retensi)
  - CTA Card ("mulai latihan sekarang")
  - Question List ("Soal yang sudah dikerjakan")
  - Filters (Kelas, Topik)

### **What's Required (PRD)**
- ✅ Dashboard (partially designed)
- ❌ Practice Session page (NOT designed)
- ❌ Session Summary page (NOT designed)
- ❌ Topic selection interface (mismatch with design)

---

## 🔴 Critical Missing Features

### **1. Practice Session Page** ❌ **NOT DESIGNED**

**Status**: Entire page missing from design

**Required Features** (from PRD):
- Question display (text + image)
- MCQ buttons (A/B/C/D/E) or numeric input
- Progress indicator (e.g., "Soal 5 dari 15")
- Submit answer button
- "Tersimpan ✓" confirmation (500ms)
- Auto-advance to next question
- Session abandonment handling
- Navigation to summary after last question

**Design Requirements**:
```
┌─ Practice Session ─────────────────────┐
│ Topic: Aljabar – Persamaan Linear      │
│ Progress: [████░░░░░░░░░░░░] 5/15      │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ Soal 5 dari 15                      ││
│ │                                     ││
│ │ [Question text here...]            ││
│ │ [Question image if any]            ││
│ │                                     ││
│ │ A) Option 1                         ││
│ │ B) Option 2                         ││
│ │ C) Option 3                         ││
│ │ D) Option 4                         ││
│ │ E) Option 5                         ││
│ │                                     ││
│ │ [Submit Jawaban]                    ││
│ └─────────────────────────────────────┘│
│                                         │
│ [Tersimpan ✓] ← brief confirmation     │
└─────────────────────────────────────────┘
```

**Missing Components**:
- Question card component
- Progress bar/indicator
- MCQ button group
- Numeric input (for non-MCQ questions)
- Submit button
- Confirmation toast/notification
- Navigation logic

**Priority**: 🔴 **CRITICAL** - Core feature of the app

---

### **2. Session Summary Page** ❌ **NOT DESIGNED**

**Status**: Entire page missing from design

**Required Features** (from PRD):
- Session score display (e.g., "12/15 Benar (80%)")
- Weak questions section (highlighted separately)
- All questions list (with correct/incorrect indicators)
- Correct answers for wrong questions
- "Latihan lagi" button
- "Kembali ke dashboard" button
- View question details (read-only)

**Design Requirements** (from PRD):
```
┌─ Session Summary ─────────────────────┐
│ Topic: Aljabar – SPLDV                │
│ Score: 12/15 Benar (80%)               │
│                                        │
│ ⚠️  Soal yang Salah (3)                │
│ ┌────────────────────────────────────┐│
│ │ Soal #3                            ││
│ │ Jawaban kamu: B                    ││
│ │ Jawaban benar: C                   ││
│ │ [Lihat soal]                       ││
│ └────────────────────────────────────┘│
│                                        │
│ 📋 Semua Soal (15)                     │
│ ┌────────────────────────────────────┐│
│ │ 1. ✓ Benar   (A → A)              ││
│ │ 2. ✓ Benar   (C → C)              ││
│ │ 3. ✗ Salah   (B → C)              ││
│ │ ... (rest of questions)           ││
│ └────────────────────────────────────┘│
│                                        │
│ [Latihan Lagi]  [Kembali ke Dashboard]│
└────────────────────────────────────────┘
```

**Missing Components**:
- Score display component
- Weak questions list component
- All questions list component
- Question detail view (read-only)
- Action buttons
- Correct/incorrect indicators

**Priority**: 🔴 **CRITICAL** - Required for user feedback

---

### **3. Topic Selection Interface** ⚠️ **DESIGN MISMATCH**

**Status**: Design shows "Soal yang sudah dikerjakan" but PRD requires topic list

**What Design Shows**:
- "Soal yang sudah dikerjakan" (Questions already worked on)
- List of topics with progress indicators
- Filters to view past work

**What PRD Requires**:
- List of **available topics** for user's grade
- Each topic has "Latihan" button to **start new practice**
- Topics organized by category (Aljabar, Geometri, etc.)

**Design Mismatch**:
```
Current Design: History/Review View
├─ Shows topics user has worked on
├─ Shows progress/retention stats
└─ Focus: Review past work

PRD Requirement: Topic Selection View
├─ Shows all available topics for grade
├─ "Latihan" button to start practice
└─ Focus: Start new practice sessions
```

**Solution Options**:
1. **Option A**: Add topic selection section above "Soal yang sudah dikerjakan"
   - Two sections: "Pilih Topik" (top) and "Soal yang sudah dikerjakan" (bottom)
   
2. **Option B**: Make "Soal yang sudah dikerjakan" clickable to start practice
   - Clicking a topic card starts a new session for that topic
   
3. **Option C**: Add "Mulai Latihan Baru" button to each topic card
   - Keep history view but add action button

**Recommended**: **Option A** - Add topic selection section at top

**Priority**: 🔴 **CRITICAL** - Core navigation feature

---

## 🟡 Important Missing Features

### **4. Session History/List** ⚠️ **PARTIALLY DESIGNED**

**Status**: Design shows question history, but not session history

**What's Missing**:
- List of past sessions (not just questions)
- Session date/time
- Session score
- Session topic
- Link to view session summary

**Design Requirements**:
```
┌─ Riwayat Sesi ────────────────────────┐
│ ┌──────────────────────────────────┐ │
│ │ Aljabar – Persamaan Linear        │ │
│ │ 12/15 Benar (80%)                 │ │
│ │ 2 hari yang lalu                  │ │
│ │ [Lihat Detail]                    │ │
│ └──────────────────────────────────┘ │
│ ┌──────────────────────────────────┐ │
│ │ Statistika – Rata-rata          │ │
│ │ 10/15 Benar (67%)                │ │
│ │ 5 hari yang lalu                 │ │
│ │ [Lihat Detail]                   │ │
│ └──────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Priority**: 🟡 **IMPORTANT** - Nice to have for user context

---

### **5. Session Abandonment/Resume** ❌ **NOT DESIGNED**

**Status**: Feature required but no UI designed

**Required Features** (from PRD):
- Detect incomplete sessions
- Show "Resume session" option
- Show "Start fresh" option
- Session expiration (24 hours)

**Design Requirements**:
```
┌─ Sesi Tidak Selesai ─────────────────┐
│                                        │
│ Kamu memiliki sesi yang belum selesai: │
│                                        │
│ ┌────────────────────────────────────┐│
│ │ Aljabar – Persamaan Linear         ││
│ │ 8/15 soal dikerjakan               ││
│ │ Dimulai 2 jam yang lalu            ││
│ │                                     ││
│ │ [Lanjutkan Sesi]  [Mulai Baru]     ││
│ └────────────────────────────────────┘│
└────────────────────────────────────────┘
```

**Priority**: 🟡 **IMPORTANT** - Improves UX for interrupted sessions

---

### **6. Navigation Between Pages** ❌ **NOT DESIGNED**

**Status**: Navigation flow not shown in design

**Missing Navigation**:
- Dashboard → Practice Session
- Practice Session → Session Summary
- Session Summary → Dashboard
- Session Summary → Practice Session (Latihan lagi)
- Dashboard → Topic Selection
- Back button handling
- Breadcrumbs (optional)

**Design Requirements**:
- Clear navigation buttons
- Consistent header/navigation bar
- Back button support
- Mobile-friendly navigation

**Priority**: 🟡 **IMPORTANT** - Required for app flow

---

### **7. User Profile Menu** ⚠️ **PARTIALLY DESIGNED**

**Status**: Dropdown shown but content not specified

**What's Missing**:
- Menu items (Profile, Settings, Logout?)
- User ID display
- Grade/Class display
- Settings page (if needed)

**Design Requirements**:
```
┌─ User Menu ──────────────────────────┐
│ User ID: 12345678                    │
│ SMP - Kelas 7                        │
│ ──────────────────────────────────── │
│ [Profil]                             │
│ [Pengaturan]                         │
│ [Keluar]                             │
└──────────────────────────────────────┘
```

**Priority**: 🟢 **NICE TO HAVE** - Can be simple for MVP

---

## 🟢 Nice to Have Features

### **8. Question Detail View** ❌ **NOT DESIGNED**

**Status**: Referenced in PRD but not designed

**Required**: Read-only view of question with answer (for session summary)

**Priority**: 🟢 **NICE TO HAVE** - Can use modal or separate page

---

### **9. Search Functionality** ❌ **NOT DESIGNED**

**Status**: Not in PRD, but could be useful

**Potential Feature**: Search topics or questions

**Priority**: 🟢 **NICE TO HAVE** - Out of scope for MVP

---

### **10. Analytics/Charts** ❌ **NOT DESIGNED**

**Status**: Not in PRD (explicitly out of scope)

**Note**: PRD says "Detailed analytics and charts" are out of scope for MVP

**Priority**: 🟢 **NICE TO HAVE** - Post-MVP feature

---

## 📊 Feature Completeness Matrix

| Feature | PRD Required | Design Status | Implementation Status | Priority |
|---------|--------------|---------------|----------------------|----------|
| Dashboard Page | ✅ Yes | ✅ Designed | 🔴 Not Started | 🔴 Critical |
| Practice Session Page | ✅ Yes | ❌ **NOT DESIGNED** | 🔴 Not Started | 🔴 Critical |
| Session Summary Page | ✅ Yes | ❌ **NOT DESIGNED** | 🔴 Not Started | 🔴 Critical |
| Topic Selection | ✅ Yes | ⚠️ **MISMATCH** | 🔴 Not Started | 🔴 Critical |
| Session History | ✅ Yes | ⚠️ Partial | 🔴 Not Started | 🟡 Important |
| Session Resume | ✅ Yes | ❌ **NOT DESIGNED** | 🔴 Not Started | 🟡 Important |
| Navigation Flow | ✅ Yes | ❌ **NOT DESIGNED** | 🔴 Not Started | 🟡 Important |
| User Profile Menu | 🤔 Maybe | ⚠️ Partial | 🔴 Not Started | 🟢 Nice to Have |
| Question Detail View | ✅ Yes | ❌ **NOT DESIGNED** | 🔴 Not Started | 🟢 Nice to Have |

---

## 🎯 Design Gaps Summary

### **Critical Gaps** (Must Design)
1. ❌ **Practice Session Page** - Entire page missing
2. ❌ **Session Summary Page** - Entire page missing
3. ⚠️ **Topic Selection** - Design shows history, not selection

### **Important Gaps** (Should Design)
4. ⚠️ **Session History** - Partially designed (questions shown, not sessions)
5. ❌ **Session Resume** - No UI for incomplete sessions
6. ❌ **Navigation** - Flow not shown in design

### **Nice to Have** (Can Add Later)
7. ⚠️ **User Profile Menu** - Dropdown shown but content not specified
8. ❌ **Question Detail View** - Referenced but not designed

---

## 📝 Recommended Design Additions

### **1. Add Practice Session Page Design**

**Required Screens**:
- Practice Session - Question View
- Practice Session - Confirmation State
- Practice Session - Progress Indicator

**Key Components**:
- Question card
- MCQ button group
- Progress bar
- Submit button
- Confirmation toast

---

### **2. Add Session Summary Page Design**

**Required Screens**:
- Session Summary - Overview
- Session Summary - Weak Questions Section
- Session Summary - All Questions List

**Key Components**:
- Score display
- Weak questions list
- All questions list
- Action buttons

---

### **3. Fix Dashboard Design**

**Add Topic Selection Section**:
```
┌─ Dashboard ──────────────────────────┐
│ [Header: Logo + User Profile]       │
│                                       │
│ [CTA Card: "mulai latihan sekarang"] │
│ [KPI Cards: Stats]                   │
│                                       │
│ ┌─ Pilih Topik ───────────────────┐ │
│ │ Aljabar                           │ │
│ │ ├─ Persamaan Linear [Latihan]     │ │
│ │ ├─ SPLDV [Latihan]               │ │
│ │ └─ Pertidaksamaan [Latihan]       │ │
│ │                                   │ │
│ │ Geometri                          │ │
│ │ ├─ Bangun Datar [Latihan]        │ │
│ │ └─ Bangun Ruang [Latihan]        │ │
│ └───────────────────────────────────┘ │
│                                       │
│ ┌─ Soal yang sudah dikerjakan ─────┐ │
│ │ [Filters: Kelas, Topik]          │ │
│ │ [Question List Items]            │ │
│ └───────────────────────────────────┘ │
└───────────────────────────────────────┘
```

---

### **4. Add Navigation Design**

**Required**:
- Consistent header/nav bar
- Back button
- Breadcrumbs (optional)
- Mobile navigation menu

---

## 🚀 Implementation Priority

### **Phase 1: Critical Missing Pages** (Week 3-4)
1. Design Practice Session page
2. Design Session Summary page
3. Update Dashboard design (add topic selection)

### **Phase 2: Important Features** (Week 4-5)
4. Design Session History
5. Design Session Resume
6. Design Navigation flow

### **Phase 3: Polish** (Week 5+)
7. Design User Profile menu
8. Design Question Detail view
9. Add any missing states/edge cases

---

## 📋 Action Items

### **For Design** (Figma)
- [ ] Create Practice Session page design
- [ ] Create Session Summary page design
- [ ] Update Dashboard to include topic selection section
- [ ] Design Session Resume UI
- [ ] Design Navigation flow
- [ ] Design User Profile menu content

### **For Implementation**
- [ ] Implement Practice Session page (after design)
- [ ] Implement Session Summary page (after design)
- [ ] Update Dashboard with topic selection (after design update)
- [ ] Implement Session Resume feature
- [ ] Implement Navigation flow
- [ ] Implement User Profile menu

---

## 🔗 Related Documentation

- [Dashboard Missing States & Edge Cases](./Dashboard%20Missing%20States%20%26%20Edge%20Cases.md)
- [PRD – Math Deliberate Practice MVP](./PRD%20–%20Math%20Deliberate%20Practice%20MVP.md)
- [Project Overview & Status](./Project%20Overview%20&%20Status.md)

---

## 💡 Key Insights

1. **Only 1 of 3 main pages is designed** - Dashboard exists, but Practice Session and Session Summary are missing
2. **Design mismatch** - Dashboard shows history view, but PRD requires topic selection
3. **Navigation not designed** - Flow between pages needs to be designed
4. **Core features missing** - Practice and Summary are critical but not designed

**Recommendation**: Prioritize designing Practice Session and Session Summary pages before implementation, as these are core features of the app.

---

**Last Updated**: December 2024  
**Status**: 📋 Analysis Complete  
**Next Action**: Design Practice Session and Session Summary pages in Figma


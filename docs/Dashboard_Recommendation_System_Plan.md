# Dashboard Recommendation System - Implementation Plan

## Overview

This document outlines the implementation plan for adding an intelligent recommendation system to the dashboard. The goal is to transform the dashboard from a passive "report card" into an active "command center" that guides students on what to study next.

---

## Problem Statement

**Current State:**
- Dashboard shows statistics but doesn't tell users what to do next
- Users must manually decide which topic to practice
- No intelligent guidance based on FSRS data and learning patterns
- Cognitive overload from too many choices

**Desired State:**
- Dashboard provides clear, actionable recommendations
- System intelligently suggests the next best learning action
- Recommendations are personalized based on FSRS scheduling and mastery levels
- Users can follow recommendations or choose their own path

---

## Visual Wireframe

Based on the UX critique, here's the recommended layout for the recommendation system:

### Recommended Dashboard Layout

```
┌─────────────────────────────────────────────┐
│ 🎯 Rekomendasi untuk kamu                   │
│                                             │
│ Berdasarkan pola belajar kamu:              │
│                                             │
│ 1. Review Analisis Bayesian (5 soal overdue)│
│    → Tingkatkan retensi sebelum lupa       │
│                                             │
│ 2. Latihan Geometri (2 soal baru)          │
│    → Perluas penguasaan materi             │
│                                             │
│ [Mulai Rekomendasi]                         │
└─────────────────────────────────────────────┘
```

### Actionable Stats Cards

```
┌─────────────────────────────────────┐
│ 🔥 Perlu Review Hari Ini            │
│ 7 Soal                              │
│ [Mulai Review Sekarang] ← Clickable │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📊 Penguasaan: 67%                  │
│ +5% Pekan ini                       │
│ Target: 85% untuk siap UN           │
│ [Lihat Progress Detail]             │
└─────────────────────────────────────┘
```

### Improved Priorities Section

```
Prioritas
┌─────────────────────────────────────────────┐
│ ① Analisis Bayesian                         │
│   [🔥 Perlu Review: 5 Soal] ← Red badge    │
│   Est. 5 menit                              │
│   [Mulai Review]                            │
└─────────────────────────────────────────────┘
┌─────────────────────────────────────────────┐
│ ② Geometri                                  │
│   [📝 Perlu Latihan: 2 Soal] ← Teal badge  │
│   Est. 3 menit                              │
│   [Latihan]                                 │
└─────────────────────────────────────────────┘
```

### Simplified Topic Cards

```
┌─────────────────────────────────┐
│ Persamaan Linear                │ ← Larger, clearer
│ ████████░░ 80%                  │ ← Bigger progress bar
│ [Latihan]                       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ 🔥 SPLDV                        │ ← Fire emoji for urgent
│ ████████░░ 80%                  │
│ [Perlu Review: 2 Soal]          │ ← Badge inside card
│ [Mulai Review]                  │ ← Orange button
└─────────────────────────────────┘
```

---

## Recommendation Algorithm

### Priority Ranking Logic

The system should recommend actions based on the following priority order:

#### 1. **Urgent Reviews** (Highest Priority)
- **Criteria**: Questions with `due_date <= today` AND `stability < 7 days`
- **Why**: These are questions the student is about to forget
- **Action**: "Review Now"
- **Badge**: Red "Perlu Review" badge
- **Sort by**: Most overdue first (oldest due_date)

#### 2. **Due Reviews** (High Priority)
- **Criteria**: Questions with `due_date <= today` AND `stability >= 7 days`
- **Why**: Scheduled review time has arrived
- **Action**: "Review"
- **Badge**: Orange "Review Hari Ini" badge
- **Sort by**: Due date (oldest first)

#### 3. **Struggling Topics** (Medium-High Priority)
- **Criteria**: Topics with mastery < 50% AND recent incorrect answers
- **Why**: Student needs more practice on weak foundations
- **Action**: "Perlu Latihan"
- **Badge**: Teal "Perlu Latihan" badge
- **Sort by**: Lowest mastery percentage first

#### 4. **In-Progress Topics** (Medium Priority)
- **Criteria**: Topics with 50% <= mastery < 80% AND some questions answered
- **Why**: Student is making progress, should continue
- **Action**: "Lanjutkan Latihan"
- **Badge**: Blue "Dalam Progress" badge
- **Sort by**: Most recent activity first

#### 5. **New Topics** (Low Priority)
- **Criteria**: Topics with 0 questions answered
- **Why**: Expand learning to new areas
- **Action**: "Mulai Topik Baru"
- **Badge**: Gray "Topik Baru" badge
- **Sort by**: Curriculum order or difficulty

---

## Data Requirements

### Backend API Endpoints Needed

#### 1. GET `/api/recommendations`
Returns personalized recommendations for the current user.

**Response:**
```json
{
  "recommendations": [
    {
      "id": "rec_1",
      "type": "urgent_review",
      "priority": 1,
      "topic_id": "topic_123",
      "topic_name": "Persamaan Linear",
      "category": "Aljabar",
      "grade": "SMP - Kelas 7",
      "action": "review",
      "badge_text": "Perlu Review: 5 Soal",
      "badge_variant": "review",
      "questions_count": 5,
      "estimated_time_minutes": 5,
      "reason": "5 soal sudah lewat jadwal review",
      "due_questions": [
        {
          "question_id": "q_456",
          "due_date": "2025-12-08",
          "days_overdue": 2
        }
      ]
    },
    {
      "id": "rec_2",
      "type": "struggling_topic",
      "priority": 3,
      "topic_id": "topic_789",
      "topic_name": "Geometri",
      "category": "Geometri",
      "grade": "SMP - Kelas 7",
      "action": "practice",
      "badge_text": "Perlu Latihan: 2 Soal",
      "badge_variant": "practice",
      "questions_count": 2,
      "estimated_time_minutes": 3,
      "reason": "Penguasaan masih 35%",
      "mastery_percentage": 35
    }
  ],
  "metadata": {
    "total_recommendations": 2,
    "urgent_count": 1,
    "due_count": 0,
    "struggling_count": 1
  }
}
```

#### 2. GET `/api/dashboard/stats`
Enhanced to include recommendation-relevant data.

**Additional fields:**
```json
{
  "stats": {
    "questions_review": 7,
    "questions_urgent": 5,
    "questions_due_today": 2,
    "topics_in_progress": 3,
    "topics_struggling": 2,
    "topics_new": 5,
    "questions_this_week": 20,
    "mastery_percentage": 67,
    "mastery_change": 5
  }
}
```

---

## Frontend Implementation

### Phase 1: Data Integration

**Files to modify:**
- `frontend/src/pages/EnhancedDashboard.tsx`
- Create: `frontend/src/hooks/useRecommendations.ts`
- Create: `frontend/src/types/recommendations.ts`

**Steps:**

1. **Create types** (`types/recommendations.ts`):
```typescript
export type RecommendationType = 
  | 'urgent_review' 
  | 'due_review' 
  | 'struggling_topic' 
  | 'in_progress' 
  | 'new_topic'

export type BadgeVariant = 'review' | 'practice' | 'default'

export interface Recommendation {
  id: string
  type: RecommendationType
  priority: number
  topic_id: string
  topic_name: string
  category: string
  grade: string
  action: 'review' | 'practice'
  badge_text: string
  badge_variant: BadgeVariant
  questions_count: number
  estimated_time_minutes: number
  reason: string
  mastery_percentage?: number
  due_questions?: Array<{
    question_id: string
    due_date: string
    days_overdue: number
  }>
}

export interface RecommendationsResponse {
  recommendations: Recommendation[]
  metadata: {
    total_recommendations: number
    urgent_count: number
    due_count: number
    struggling_count: number
  }
}
```

2. **Create hook** (`hooks/useRecommendations.ts`):
```typescript
import { useQuery } from '@tanstack/react-query'
import type { RecommendationsResponse } from '@/types/recommendations'

export function useRecommendations() {
  return useQuery({
    queryKey: ['recommendations'],
    queryFn: async (): Promise<RecommendationsResponse> => {
      const response = await fetch('/api/recommendations')
      if (!response.ok) throw new Error('Failed to fetch recommendations')
      return response.json()
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: true
  })
}
```

3. **Update EnhancedDashboard** to use real data:
```typescript
const { data: recommendations, isLoading, error } = useRecommendations()

// Replace mock priorities with real recommendations
const priorities = recommendations?.recommendations.slice(0, 3) || []
```

### Phase 2: UI Enhancement

**Add recommendation explanation:**

```tsx
{/* Recommendation Insight */}
{recommendations?.metadata && (
  <div className="bg-[#eff6ff] rounded-[20px] p-6 mb-8">
    <div className="flex items-start gap-3">
      <Sparkles className="w-6 h-6 text-[#3b82f6] flex-shrink-0 mt-1" />
      <div>
        <h3 className="text-[20px] font-semibold tracking-[0.1px] text-[#3f3f46] mb-2">
          Rekomendasi Belajar
        </h3>
        <p className="text-[16px] font-light tracking-[0.08px] text-[#4b5563]">
          {recommendations.metadata.urgent_count > 0 
            ? `Kamu punya ${recommendations.metadata.urgent_count} soal yang perlu direview segera agar tidak lupa.`
            : "Bagus! Tidak ada review mendesak. Lanjutkan latihan untuk meningkatkan penguasaan."}
        </p>
      </div>
    </div>
  </div>
)}
```

**Add "Why this recommendation?" tooltip:**

```tsx
<Tooltip>
  <TooltipTrigger asChild>
    <div className="flex items-center gap-2">
      <Badge variant={priority.badge_variant} size="pill">
        {priority.badge_text}
      </Badge>
      <Info className="w-4 h-4 text-[#737373]" />
    </div>
  </TooltipTrigger>
  <TooltipContent>
    <p>{priority.reason}</p>
  </TooltipContent>
</Tooltip>
```

### Phase 3: Empty State Enhancement

**Update empty state to show recommendations:**

```tsx
function EmptyState({ recommendations }: { recommendations?: Recommendation[] }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="bg-[#fff3ea] rounded-[20px] p-12 text-center">
        <div className="flex justify-center mb-4">
          <Sparkles className="w-16 h-16 text-[#f9bc60]" />
        </div>
        <h3 className="text-[32px] font-semibold tracking-[0.16px] text-[#3f3f46] mb-3">
          Mulai perjalanan belajar kamu!
        </h3>
        <p className="text-[18px] font-light tracking-[0.09px] text-[#4b5563] mb-6">
          Sistem akan merekomendasikan topik terbaik untuk kamu pelajari berdasarkan kemajuan kamu.
        </p>
        <Button className="bg-[#f9bc60] hover:bg-[#f8b350] text-white text-[16px] font-bold tracking-[0.08px] h-[44px] px-8 rounded-full">
          Lihat Semua Topik
        </Button>
      </div>
    )
  }

  // Show recommendations even for new users
  return null
}
```

---

## Backend Implementation

### Database Schema Updates

**No schema changes needed** - we already have:
- `user_question_state` table with FSRS data
- `due_date` column for scheduling
- `stability` column for retention prediction

### API Implementation

**File:** `backend/app/routers/recommendations.py`

```python
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date, timedelta
from typing import List
from app.database import get_db
from app.auth import get_current_user
from app.models import User, UserQuestionState, Question, Topic

router = APIRouter(prefix="/api/recommendations", tags=["recommendations"])

@router.get("")
async def get_recommendations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Generate personalized learning recommendations based on:
    - FSRS scheduling (due dates, stability)
    - Mastery levels per topic
    - Recent performance
    """
    
    recommendations = []
    today = date.today()
    
    # 1. Urgent Reviews (stability < 7 days, overdue)
    urgent_reviews = get_urgent_reviews(db, current_user.id, today)
    recommendations.extend(urgent_reviews)
    
    # 2. Due Reviews (stability >= 7 days, due today)
    due_reviews = get_due_reviews(db, current_user.id, today)
    recommendations.extend(due_reviews)
    
    # 3. Struggling Topics (mastery < 50%)
    struggling = get_struggling_topics(db, current_user.id)
    recommendations.extend(struggling)
    
    # 4. In-Progress Topics (50% <= mastery < 80%)
    in_progress = get_in_progress_topics(db, current_user.id)
    recommendations.extend(in_progress)
    
    # 5. New Topics (never attempted)
    if len(recommendations) < 5:
        new_topics = get_new_topics(db, current_user.id)
        recommendations.extend(new_topics)
    
    # Sort by priority and limit to top 5
    recommendations.sort(key=lambda x: x['priority'])
    recommendations = recommendations[:5]
    
    # Calculate metadata
    metadata = {
        'total_recommendations': len(recommendations),
        'urgent_count': len([r for r in recommendations if r['type'] == 'urgent_review']),
        'due_count': len([r for r in recommendations if r['type'] == 'due_review']),
        'struggling_count': len([r for r in recommendations if r['type'] == 'struggling_topic'])
    }
    
    return {
        'recommendations': recommendations,
        'metadata': metadata
    }

def get_urgent_reviews(db: Session, user_id: int, today: date):
    """Get questions that are overdue and have low stability (< 7 days)"""
    # Query user_question_state for overdue questions with low stability
    # Group by topic_id
    # Return list of recommendations
    pass

def get_due_reviews(db: Session, user_id: int, today: date):
    """Get questions due for review today with higher stability"""
    pass

def get_struggling_topics(db: Session, user_id: int):
    """Get topics where user has < 50% mastery"""
    pass

def get_in_progress_topics(db: Session, user_id: int):
    """Get topics where user has 50-80% mastery"""
    pass

def get_new_topics(db: Session, user_id: int):
    """Get topics user hasn't started yet"""
    pass
```

---

## Testing Plan

### Unit Tests

1. **Recommendation algorithm tests:**
   - Test priority ordering
   - Test filtering logic
   - Test edge cases (no data, all mastered, etc.)

2. **API endpoint tests:**
   - Test with new user (should show new topics)
   - Test with user having overdue reviews
   - Test with user having mixed state

### Integration Tests

1. **Full flow test:**
   - User completes practice session
   - FSRS updates due dates
   - Recommendations API reflects changes
   - Dashboard shows updated recommendations

### Manual Testing Checklist

- [ ] New user sees "Start learning" recommendation
- [ ] User with overdue reviews sees urgent badge
- [ ] User with due reviews sees review badge
- [ ] User with low mastery sees practice recommendation
- [ ] Recommendations update after completing session
- [ ] Empty state shows appropriate message
- [ ] Loading state shows skeleton
- [ ] Error state shows retry button

---

## Rollout Plan

### Phase 1: Backend (Week 1)
- [ ] Implement recommendation algorithm
- [ ] Create `/api/recommendations` endpoint
- [ ] Write unit tests
- [ ] Test with sample data

### Phase 2: Frontend Integration (Week 2)
- [ ] Create types and hooks
- [ ] Replace mock data with API calls
- [ ] Add loading/error states
- [ ] Test with real backend

### Phase 3: UI Enhancement (Week 3)
- [ ] Add recommendation insights
- [ ] Add "Why?" tooltips
- [ ] Improve empty states
- [ ] Polish animations and transitions

### Phase 4: Testing & Polish (Week 4)
- [ ] Integration testing
- [ ] Manual QA
- [ ] Performance optimization
- [ ] Documentation

---

## Success Metrics

### Quantitative
- **Recommendation accuracy**: % of recommendations that lead to user action
- **Session start rate**: % increase in practice sessions started from recommendations
- **Time to action**: Reduction in time from dashboard load to starting practice

### Qualitative
- Users understand what to do next without confusion
- Recommendations feel personalized and relevant
- Dashboard feels like an active guide, not passive report

---

## Future Enhancements

### Post-MVP Ideas

1. **Smart scheduling:**
   - Avoid recommending too many reviews at once
   - Spread reviews throughout the day
   - Consider user's typical practice times

2. **Learning patterns:**
   - Detect when user is on a streak
   - Identify optimal practice duration
   - Suggest break times

3. **Adaptive difficulty:**
   - Recommend easier topics when user is struggling
   - Suggest harder topics when user is excelling
   - Balance challenge and success

4. **Contextual recommendations:**
   - "You haven't practiced in 3 days, start with an easy topic"
   - "You're doing great! Try a new topic"
   - "Review before bed for better retention"

---

## References

- **FSRS Algorithm**: https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm
- **Dashboard UX Critique**: See artifacts from previous session
- **PRD**: `docs/PRD – Math Deliberate Practice MVP.md`

# Pedagogy & Mastery Learning Design Review

> **Context**: Review of **Mikir Kids** (Math Deliberate Practice MVP) pedagogy and learning design.
> **Documents Reviewed**: `docs/PRD – Math Deliberate Practice MVP.md`, `docs/Project Overview & Status.md`
> **Date**: December 9, 2025

---

## 🎓 Executive Summary

Your design shows a strong technical understanding of spaced repetition and deliberate practice, particularly in leveraging FSRS. However, there are **critical pedagogical gaps** that risk undermining the learning effectiveness significantly.

The current design functions as a **Spaced Repetition Quiz App**, but falls short of being a true **Mastery Learning System**. The primary deficits are the lack of immediate feedback during practice, the over-simplification of FSRS ratings, and the absence of metacognitive scaffolding.

**Overall Rating**: Strong Foundation with Critical Gaps

---

## 🚨 Critical Issues & Recommendations

The following issues fundamentally break the learning loop and must be addressed for the MVP to be educationally effective.

### 1. FSRS Binary Feedback Is Inadequate

**The Problem:**
Currently, you map answers to only `Good` (Correct) or `Again` (Incorrect). This throws away valuable signal data. FSRS is designed for 4 ratings to differentiate between "barely right" and "mastered", or "silly mistake" and "fundamental misconception".

**Recommendation:**
Use the full 4-rating system or a proxy for confidence.

*   **Option A: Confidence Rating (Best)**
    After a correct answer, ask: "How confident were you?"
    *   "Just guessed" → `Rating.Hard`
    *   "Pretty sure" → `Rating.Good`
    *   "Very sure" → `Rating.Easy`
    *   (Incorrect always maps to `Rating.Again`)

*   **Option B: Time-Based Proxy (MVP Alternative)**
    *   Correct + Fast (< Median Time) → `Rating.Easy`
    *   Correct + Slow (> Median Time) → `Rating.Good`
    *   Incorrect → `Rating.Again`

### 2. Lack of Immediate Feedback

**The Problem:**
Students answer 15 questions before seeing any feedback. This violates the "Desirable Difficulty" principle for procedural math skills. Students risk **practicing mistakes**, reinforcing wrong mental models 15 times before correction.

**Recommendation:**
Implement **Immediate Feedback** mode for the MVP.

```text
Flow:
1. Submit answer
2. Immediate UI feedback:
   - ✅ Correct (+ optional confidence rating) OR
   - ❌ Incorrect + Correct Answer + Brief Hint
3. "Next Question" button
```

### 3. Fixed Session Size (One-Size-Fits-All)

**The Problem:**
A fixed 15-question session ignores student cognitive load. It overwhelms struggling students and bores advanced ones.

**Recommendation:**
Implement **Adaptive Session Sizing**.

```javascript
function getSessionSize(userPerformance) {
  if (userPerformance < 50%) return 10; // Prevent frustration
  if (userPerformance > 80%) return 20; // Maintain flow state
  return 15;
}
```
Or allow user selection: "Quick (10)", "Normal (15)", "Long (20)".

### 4. No Formative Assessment (Diagnostic)

**The Problem:**
New users start with default FSRS parameters ("New" state). They may choose topics far above their prerequisite knowledge level (e.g., trying "Trig Identities" without knowing "Trig Ratios").

**Recommendation:**
*   **MVP**: Add a "Prerequisite Warning" or simple self-assessment.
*   **Post-MVP**: Implement a 5-question diagnostic test for new users to seed FSRS states.

### 5. FSRS Implementation Nuances

**The Problem:**
*   **Target Retention (0.9)**: Too high. Optimal learning efficiency is around ~85%. 90% leads to over-practicing easy material.
*   **Max Interval (365 days)**: Too long for exam prep. Intervals should likely be capped based on the exam date (e.g., questions shouldn't disappear for a year if the exam is in 6 months).

**Recommendation:**
*   Lower `requestRetention` to **0.85**.
*   Make `maximumInterval` exam-aware (e.g., `daysUntilExam / 3`).

---

## ⚠️ Moderate Issues (Enhance for Version 1.5)

### 6. Missing Metacognitive Scaffolding
**Issue**: Students see *that* they are wrong, but not *why*.
**Fix**: Add error categorization (e.g., "Calculation Error" vs "Conceptual Error") to help students identify patterns in their mistakes.

### 7. Passive Session Summary
**Issue**: The summary lists results but doesn't guide next steps.
**Fix**: Add actionable recommendations.
> "You scored 60%. We recommend one more short session on this topic before moving on."

### 8. Progressive Difficulty Scaffolding
**Issue**: Random question ordering can serve difficult questions first, causing discouragement.
**Fix**: Order new questions by difficulty (Easy → Medium → Hard).

### 9. Lack of Within-Session Spacing
**Issue**: Blocked practice (15 Qs of the same topic) promotes short-term performance but poorer long-term retention compared to interleaved practice.
**Fix**: Interleave 2-3 review questions from *other* topics within a session.

### 10. No Mastery Progress Visualization
**Issue**: Metrics are backward-looking (Total Questions).
**Fix**: Show forward-looking mastery.
> "Aljabar Linear: 85% Mastered (Ready for Exam)"

---

## 📚 Learning Science Principles Reference

| Principle | Status in Current Design | Required Action |
| :--- | :--- | :--- |
| **Mastery Learning** (Bloom) | 🟡 Partial | Add clear mastery criteria ("You are ready to move on"). |
| **Deliberate Practice** (Ericsson) | 🟡 Partial | Add immediate feedback loops. |
| **Spaced Repetition** (Ebbinghaus) | ✅ Strong | Refine parameters (retention rate). |
| **Desirable Difficulties** (Bjork) | 🔴 Missing | Add progressive difficulty and interleaving. |
| **Metacognition** (Flavell) | 🔴 Missing | Add reflection prompts ("Why was this wrong?"). |

---

## 📋 Roadmap Recommendations

### 🔴 Critical (MVP Must-Haves)
1.  **Immediate Feedback**: Show Correct/Incorrect + Answer immediately after submission.
2.  **3-Button Rating**: Allow "Easy/Good/Again" (or implied via confidence) instead of binary.
3.  **Correct FSRS Config**: Set retention to 0.85.

### 🟡 Important (Post-MVP / v1.1)
1.  **Adaptive Sessions**: Logic to adjust session length.
2.  **Mistake Analysis**: Simple tags for why an answer was wrong.
3.  **Mastery Bars**: Visual progress towards "Topic Mastery".

### 🟢 Future (v2.0)
1.  **Diagnostic Test**: Onboarding assessment.
2.  **Interleaving**: Mix topics within a session.
3.  **Exam Countdown**: Adjust intervals based on UN exam date.

import { create } from 'zustand'
import type { Question } from '@/types'

interface SessionState {
  sessionId: string | null
  questions: Question[]
  currentIndex: number
  answers: Record<string, string>

  setSession: (sessionId: string, questions: Question[]) => void
  nextQuestion: () => void
  previousQuestion: () => void
  setAnswer: (questionId: string, answer: string) => void
  reset: () => void
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  questions: [],
  currentIndex: 0,
  answers: {},

  setSession: (sessionId, questions) => set({ 
    sessionId, 
    questions, 
    currentIndex: 0,
    answers: {},
  }),

  nextQuestion: () => set((state) => ({
    currentIndex: Math.min(state.currentIndex + 1, state.questions.length - 1),
  })),

  previousQuestion: () => set((state) => ({
    currentIndex: Math.max(state.currentIndex - 1, 0),
  })),

  setAnswer: (questionId, answer) => set((state) => ({
    answers: { ...state.answers, [questionId]: answer },
  })),

  reset: () => set({
    sessionId: null,
    questions: [],
    currentIndex: 0,
    answers: {},
  }),
}))


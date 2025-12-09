export interface Question {
  id: string
  topicId: string
  topicName: string
  questionText: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  tips?: string
}

export interface QuestionOption {
  id: string
  label: string
  text: string
}

export interface PracticeSession {
  sessionId: string
  topicId: string
  topicName: string
  grade: string
  totalQuestions: number
  currentQuestionIndex: number
  questions: Question[]
  answers: SessionAnswer[]
  startedAt: Date
}

export interface SessionAnswer {
  questionId: string
  selectedAnswer: string | null
  confidence: 'guess' | 'unsure' | 'confident' | 'very_confident' | null
  isCorrect: boolean | null
  timeSpent: number
}

export interface QuestionFeedback {
  questionId: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
  tips?: string
}

export interface SessionSummary {
  totalQuestions: number
  correctAnswers: number
  incorrectAnswers: number
  totalScore: number
  totalRetention: number
  questionResults: QuestionResult[]
}

export interface QuestionResult {
  questionId: string
  questionNumber: number
  questionText: string
  userAnswer: string
  correctAnswer: string
  isCorrect: boolean
  explanation: string
}
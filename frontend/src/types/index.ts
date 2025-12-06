export interface User {
  id: string  // 8-digit numeric ID (e.g., "12345678")
  grade_level: 'SMP' | 'SMA'
  class_level: number
  created_at: string
}

export interface Topic {
  id: string
  name: string
  short_code: string
  grade_level: 'SMP' | 'SMA'
  class_levels: number[]
}

export interface Question {
  id: string
  sequence: number
  type: 'mcq'
  prompt_text: string
  prompt_image_url?: string
  options: string[]
}

export interface Session {
  session_id: string
  topic: Topic
  questions: Question[]
  status: 'in_progress' | 'completed' | 'abandoned'
  started_at: string
}

export interface SessionAnswer {
  question_id: string
  user_answer: string
  is_correct: boolean
  answered_at: string
}

export interface SessionSummary {
  session_id: string
  topic: Topic
  stats: {
    total: number
    correct: number
    incorrect: number
    percentage: number
  }
  weak_questions: Array<{
    id: string
    sequence: number
    prompt_text: string
    prompt_image_url?: string
    user_answer: string
    correct_answer: string
    type: 'mcq'
  }>
  all_questions: Array<{
    id: string
    sequence: number
    is_correct: boolean
    user_answer: string
    correct_answer: string
  }>
  completed_at: string
}

export interface SessionHistoryItem {
  session_id: string
  topic_name: string
  score: number
  total: number
  percentage: number
  completed_at: string
}

export interface ApiError {
  message: string
  code?: string
  details?: any
}


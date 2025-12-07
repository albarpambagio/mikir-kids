export interface DashboardStats {
  totalScore: number
  totalQuestions: number
  retentionRate: number // 0-100
}

export interface QuestionStats {
  topic: string
  category: string
  grade: string
  progress: number // 0-100
  dueCount: number
}

export interface Topic {
  id: string
  name: string
  category: string
  grade: string
}

export interface GradeFilter {
  value: string
  label: string
}

export interface TopicFilter {
  value: string
  label: string
}


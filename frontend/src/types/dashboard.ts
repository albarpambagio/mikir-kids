export interface DashboardStats {
  questionsDue: number
  topicsMastered: number
  currentStreak: number
}

export interface TopicStat {
  topicId: string
  name: string
  category?: string
  grade?: string
  thumbnailUrl?: string
  questionsDue: number
  totalQuestions: number
  masteryLevel: number // 0-100
  status: "locked" | "new" | "in_progress" | "mastered"
}

// Keeping legacy types for compatibility during migration if needed, 
// but marked as deprecated or just removed if I'm confident.
// I'll leave filters as they are useful.

export interface GradeFilter {
  value: string
  label: string
}

export interface TopicFilter {
  value: string
  label: string
}

export interface Topic {
  id: string
  name: string
  category: string
  grade: string
}

export interface QuestionStats {
  topicId?: string  // Optional for compatibility with TopicStat
  topic: string
  category: string
  grade: string
  progress: number
  dueCount: number
}

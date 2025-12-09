export interface DashboardStats {
  questionsDue: number
  topicsMastered: number
  currentStreak: number
}

export interface TopicStat {
  topicId: string
  name: string
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

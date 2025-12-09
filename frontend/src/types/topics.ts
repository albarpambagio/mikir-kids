export interface Topic {
  id: string
  name: string
  category: string
  grade: string
  totalQuestions: number
  masteryLevel: number
  questionsDue: number
  status: 'new' | 'in_progress' | 'needs_review' | 'mastered'
}

export interface TopicCategory {
  name: string
  topics: Topic[]
}

export interface TopicFilters {
  grade: string
  category: string
  status: 'all' | 'new' | 'in_progress' | 'needs_review' | 'mastered'
  sortBy: 'needs_review' | 'name' | 'mastery' | 'recent'
}
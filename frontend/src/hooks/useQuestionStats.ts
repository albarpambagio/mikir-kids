import { useQuery } from "@tanstack/react-query"
import { QuestionStats } from "@/types/dashboard"
import { mockQuestionStats, shouldUseMockData, delay } from "@/lib/mockData"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchQuestionStats(
  userId: string,
  gradeFilter?: string,
  topicFilter?: string
): Promise<QuestionStats[]> {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    await delay(1000) // Simulate API delay
    
    let filtered = [...mockQuestionStats]
    
    // Apply grade filter
    if (gradeFilter && gradeFilter !== "all") {
      // Filter by grade - handle both "SMP - Kelas 7" format and just "Kelas 7"
      filtered = filtered.filter(q => {
        const gradeStr = q.grade.toLowerCase()
        const filterStr = gradeFilter.toLowerCase()
        return gradeStr.includes(filterStr) || gradeStr.includes(`kelas ${filterStr}`)
      })
    }
    
    // Apply topic filter
    if (topicFilter && topicFilter !== "all") {
      filtered = filtered.filter(q => q.topic === topicFilter)
    }
    
    return filtered
  }

  const params = new URLSearchParams()
  if (gradeFilter && gradeFilter !== "all") {
    params.append("grade", gradeFilter)
  }
  if (topicFilter && topicFilter !== "all") {
    params.append("topic", topicFilter)
  }
  
  const url = `${API_BASE_URL}/api/users/${userId}/questions/stats${params.toString() ? `?${params.toString()}` : ''}`
  
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      // Return empty array for new users
      return []
    }
    throw new Error('Gagal memuat daftar soal')
  }
  
  const data = await response.json()
  return (data.questions || []).map((q: any) => ({
    topic: q.topic || "Unknown",
    category: q.category || "Unknown",
    grade: q.grade || "Unknown",
    progress: q.progress || 0,
    dueCount: q.due_count || 0
  }))
}

export function useQuestionStats(
  userId: string | undefined,
  gradeFilter?: string,
  topicFilter?: string
) {
  return useQuery({
    queryKey: ['questionStats', userId, gradeFilter, topicFilter],
    queryFn: () => fetchQuestionStats(userId!, gradeFilter, topicFilter),
    enabled: !!userId,
    retry: shouldUseMockData() ? 0 : 1, // Don't retry with mock data
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}


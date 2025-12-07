import { useQuery } from "@tanstack/react-query"
import { Topic, GradeFilter, TopicFilter } from "@/types/dashboard"
import { mockTopics, shouldUseMockData, delay } from "@/lib/mockData"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchTopics(userId: string): Promise<Topic[]> {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    await delay(600) // Simulate API delay
    return mockTopics
  }

  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/topics`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      return []
    }
    throw new Error('Gagal memuat topik')
  }
  
  const data = await response.json()
  return (data.topics || []).map((t: any) => ({
    id: t.id || "",
    name: t.name || "Unknown",
    category: t.category || "Unknown",
    grade: t.grade || "Unknown"
  }))
}

export function useTopics(userId: string | undefined) {
  return useQuery({
    queryKey: ['topics', userId],
    queryFn: () => fetchTopics(userId!),
    enabled: !!userId,
    retry: shouldUseMockData() ? 0 : 1, // Don't retry with mock data
    staleTime: 10 * 60 * 1000, // 10 minutes (topics don't change often)
  })
}

// Helper to get unique grades from topics
export function useGradeFilters(userId: string | undefined): GradeFilter[] {
  const { data: topics } = useTopics(userId)
  
  if (!topics) return []
  
  const grades = new Set<string>()
  topics.forEach(topic => {
    if (topic.grade) {
      grades.add(topic.grade)
    }
  })
  
  return [
    { value: "all", label: "Semua Kelas" },
    ...Array.from(grades).sort().map(grade => ({
      value: grade,
      label: grade
    }))
  ]
}

// Helper to get unique topics from topics
export function useTopicFilters(userId: string | undefined, gradeFilter?: string): TopicFilter[] {
  const { data: topics } = useTopics(userId)
  
  if (!topics) return []
  
  let filteredTopics = topics
  if (gradeFilter && gradeFilter !== "all") {
    // Filter by grade - handle both "SMP - Kelas 7" format and just "Kelas 7"
    filteredTopics = topics.filter(t => {
      const gradeStr = t.grade.toLowerCase()
      const filterStr = gradeFilter.toLowerCase()
      return gradeStr.includes(filterStr) || gradeStr.includes(`kelas ${filterStr}`)
    })
  }
  
  const topicNames = new Set<string>()
  filteredTopics.forEach(topic => {
    if (topic.name) {
      topicNames.add(topic.name)
    }
  })
  
  return [
    { value: "all", label: "Semua Topik" },
    ...Array.from(topicNames).sort().map(topic => ({
      value: topic,
      label: topic
    }))
  ]
}


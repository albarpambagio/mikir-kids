import { useQuery } from "@tanstack/react-query"
import { DashboardStats } from "@/types/dashboard"
import { shouldUseMockData, delay } from "@/lib/mockData"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Mock data for development
const mockNewStats: DashboardStats = {
  questionsDue: 12,
  topicsMastered: 3,
  currentStreak: 4
}

async function fetchDashboardStats(userId: string): Promise<DashboardStats> {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    await delay(800) // Simulate API delay
    return mockNewStats
  }

  const response = await fetch(`${API_BASE_URL}/api/dashboard/${userId}/stats`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  if (!response.ok) {
    if (response.status === 404) {
      // Return default stats for new users
      return {
        questionsDue: 0,
        topicsMastered: 0,
        currentStreak: 0
      }
    }
    throw new Error('Gagal memuat statistik')
  }

  const data = await response.json()
  return {
    questionsDue: data.questions_due || 0,
    topicsMastered: data.topics_mastered || 0,
    currentStreak: data.current_streak || 0
  }
}

export function useDashboardStats(userId: string | undefined) {
  return useQuery({
    queryKey: ['dashboardStats', userId],
    queryFn: () => fetchDashboardStats(userId!),
    enabled: !!userId,
    retry: shouldUseMockData() ? 0 : 1, // Don't retry with mock data
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

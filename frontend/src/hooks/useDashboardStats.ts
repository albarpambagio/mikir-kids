import { useQuery } from "@tanstack/react-query"
import { DashboardStats } from "@/types/dashboard"
import { mockDashboardStats, shouldUseMockData, delay } from "@/lib/mockData"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

async function fetchDashboardStats(userId: string): Promise<DashboardStats> {
  // Use mock data if enabled
  if (shouldUseMockData()) {
    await delay(800) // Simulate API delay
    return mockDashboardStats
  }

  const response = await fetch(`${API_BASE_URL}/api/users/${userId}/stats`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  
  if (!response.ok) {
    if (response.status === 404) {
      // Return default stats for new users
      return {
        totalScore: 0,
        totalQuestions: 0,
        retentionRate: 0
      }
    }
    throw new Error('Gagal memuat statistik')
  }
  
  const data = await response.json()
  return {
    totalScore: data.total_score || 0,
    totalQuestions: data.total_questions || 0,
    retentionRate: data.retention_rate || 0
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


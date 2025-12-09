import { useQuery } from "@tanstack/react-query"
import { TopicStat } from "@/types/dashboard"
import { shouldUseMockData, delay } from "@/lib/mockData"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Mock data
const mockTopics: TopicStat[] = [
    {
        topicId: "1",
        name: "Aljabar Linear",
        questionsDue: 5,
        totalQuestions: 20,
        masteryLevel: 45,
        status: "in_progress"
    },
    {
        topicId: "2",
        name: "Geometri Dasar",
        questionsDue: 0,
        totalQuestions: 15,
        masteryLevel: 92,
        status: "mastered"
    },
    {
        topicId: "3",
        name: "Statistika",
        questionsDue: 0,
        totalQuestions: 30,
        masteryLevel: 0,
        status: "new"
    }
]

async function fetchDashboardTopics(userId: string): Promise<TopicStat[]> {
    // Use mock data if enabled
    if (shouldUseMockData()) {
        await delay(1000)
        return mockTopics
    }

    const response = await fetch(`${API_BASE_URL}/api/dashboard/${userId}/topics`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    })

    if (!response.ok) {
        throw new Error('Gagal memuat topik')
    }

    const data = await response.json()
    // Map snake_case to camelCase
    return data.map((item: any) => ({
        topicId: item.topic_id,
        name: item.name,
        thumbnailUrl: item.thumbnail_url,
        questionsDue: item.questions_due,
        totalQuestions: item.total_questions,
        masteryLevel: item.mastery_level,
        status: item.status
    }))
}

export function useDashboardTopics(userId: string | undefined) {
    return useQuery({
        queryKey: ['dashboardTopics', userId],
        queryFn: () => fetchDashboardTopics(userId!),
        enabled: !!userId,
        retry: shouldUseMockData() ? 0 : 1,
        staleTime: 5 * 60 * 1000,
    })
}

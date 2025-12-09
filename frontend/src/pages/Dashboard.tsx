import { useNavigate, useLocation } from "react-router-dom"
import { Clock, CheckCircle, Flame, AlertCircle, BookOpen } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { UserProfile } from "@/components/layout/UserProfile"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { CTACard } from "@/components/dashboard/CTACard"
import { KPICard } from "@/components/dashboard/KPICard"
import { TopicCard } from "@/components/dashboard/TopicCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useDashboardStats } from "@/hooks/useDashboardStats"
import { useDashboardTopics } from "@/hooks/useDashboardTopics"

export function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId, userName } = location.state || {}

  // Redirect if no userId
  if (!userId) {
    navigate("/", { replace: true })
    return null
  }

  // Fetch data
  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    refetch: refetchStats
  } = useDashboardStats(userId)

  const {
    data: topics,
    isLoading: topicsLoading,
    isError: topicsError,
    refetch: refetchTopics
  } = useDashboardTopics(userId)

  // Smart CTA Logic
  const questionsDue = stats?.questionsDue || 0

  // Sort topics: Due first, then In Progress, then Mastered, then New
  const sortedTopics = topics ? [...topics].sort((a, b) => {
    // 1. Has Due questions
    if (a.questionsDue > 0 && b.questionsDue === 0) return -1
    if (a.questionsDue === 0 && b.questionsDue > 0) return 1

    // 2. In Progress (Mastery > 0 but < 90)
    const aInProgress = a.masteryLevel > 0 && a.masteryLevel < 90
    const bInProgress = b.masteryLevel > 0 && b.masteryLevel < 90
    if (aInProgress && !bInProgress) return -1
    if (!aInProgress && bInProgress) return 1

    return 0
  }) : []

  return (
    <div className="min-h-screen bg-white relative">
      {/* Vertical divider - only on large screens */}
      <div className="hidden lg:block absolute left-[84px] top-0 bottom-0 w-0 border-l border-dashed border-[#94a3b8] pointer-events-none z-10" />

      {/* Header */}
      <header className="relative bg-white border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:px-[116px] py-4 flex items-center gap-6">
          <Logo />
          <NavigationMenu />
          <div className="flex-1" />
          <UserProfile userName={userName} userId={userId} />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-[116px] py-8 relative">
        {/* Top Section: CTA + KPIs */}
        <div className="relative">
          {/* Background rectangle */}
          <div className="hidden lg:block absolute bg-[#f8fafc] h-[213px] left-0 right-0 rounded-[20px] shadow-sm top-0" />

          <div className="flex flex-col lg:flex-row gap-6 relative z-10">
            {/* KPI Cards */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
              {statsLoading ? (
                <>
                  <Skeleton className="h-[193px] w-full rounded-[20px]" />
                  <Skeleton className="h-[193px] w-full rounded-[20px]" />
                  <Skeleton className="h-[193px] w-full rounded-[20px]" />
                </>
              ) : statsError ? (
                <div className="md:col-span-3 bg-red-50 border border-red-200 rounded-[20px] p-4 flex flex-col items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600 mb-2" />
                  <p className="text-sm font-medium text-red-800">Gagal memuat statistik</p>
                  <Button variant="outline" size="sm" onClick={() => refetchStats()} className="mt-2 text-red-600 border-red-200 hover:bg-red-50">
                    Coba Lagi
                  </Button>
                </div>
              ) : (
                <>
                  <KPICard
                    icon={Clock}
                    title="Perlu Review"
                    value={stats?.questionsDue || 0}
                    className={questionsDue > 0 ? "border-orange-200 bg-orange-50/50" : ""}
                  />
                  <KPICard
                    icon={CheckCircle}
                    title="Topik Aktif"
                    value={stats?.topicsMastered || 0}
                  />
                  <KPICard
                    icon={Flame}
                    title="Streak (Hari)"
                    value={stats?.currentStreak || 0}
                  />
                </>
              )}
            </div>
            {/* CTA Card */}
            <div className="w-full lg:w-[495px] flex-shrink-0">
              <CTACard userName={userName} questionsDue={stats?.questionsDue} />
            </div>
          </div>

          {/* Horizontal divider */}
          <div className="absolute left-[-10px] lg:left-[-116px] right-[-10px] lg:right-[-116px] h-0 border-t border-dashed border-[#94a3b8] pointer-events-none" style={{ bottom: '-40px' }} />
        </div>

        {/* Bottom Section: Topic Grid */}
        <div className="mt-[88px]">
          {/* Section Title */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[32px] font-bold leading-[40px] text-[#1e293b] tracking-tight">
              Peta Penguasaan Materi
            </h2>
            {/* Can add sort/filter here later */}
          </div>

          {topicsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-[180px] w-full rounded-[20px]" />
              ))}
            </div>
          ) : topicsError ? (
            <div className="bg-red-50 border border-red-200 rounded-[20px] p-8 text-center">
              <p className="text-red-800 mb-4">Gagal memuat daftar topik</p>
              <Button onClick={() => refetchTopics()}>Coba Lagi</Button>
            </div>
          ) : sortedTopics.length === 0 ? (
            <div className="text-center py-16 bg-slate-50 rounded-[20px] border border-dashed border-slate-200">
              <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Belum ada topik yang tersedia untuk kelas ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTopics.map((topic) => (
                <TopicCard
                  key={topic.topicId}
                  topicId={topic.topicId}
                  name={topic.name}
                  questionsDue={topic.questionsDue}
                  totalQuestions={topic.totalQuestions}
                  masteryLevel={topic.masteryLevel}
                  status={topic.status}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

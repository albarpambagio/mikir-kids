import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Clock, FileText, TrendingUp, AlertCircle, BookOpen, ArrowUpDown } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { UserProfile } from "@/components/layout/UserProfile"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { CTACard } from "@/components/dashboard/CTACard"
import { KPICard } from "@/components/dashboard/KPICard"
import { QuestionListItem } from "@/components/dashboard/QuestionListItem"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDashboardStats } from "@/hooks/useDashboardStats"
import { useQuestionStats } from "@/hooks/useQuestionStats"
import { useGradeFilters, useTopicFilters } from "@/hooks/useTopics"

export function Dashboard() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userId, userName } = location.state || {}
  
  // Redirect if no userId
  if (!userId) {
    navigate("/", { replace: true })
    return null
  }
  
  const [gradeFilter, setGradeFilter] = useState<string>("all")
  const [topicFilter, setTopicFilter] = useState<string>("all")
  const [sortByRetention, setSortByRetention] = useState<"asc" | "desc" | null>(null)

  // Fetch data
  const { 
    data: stats, 
    isLoading: statsLoading, 
    isError: statsError,
    refetch: refetchStats 
  } = useDashboardStats(userId)

  const { 
    data: questionStats, 
    isLoading: questionsLoading, 
    isError: questionsError,
    refetch: refetchQuestions 
  } = useQuestionStats(userId, gradeFilter, topicFilter)

  const gradeFilters = useGradeFilters(userId)
  const topicFilters = useTopicFilters(userId, gradeFilter)

  // Filter question stats based on selected filters
  const filteredQuestions = questionStats || []

  // Handle empty filter results
  const hasActiveFilters = gradeFilter !== "all" || topicFilter !== "all"
  const showEmptyFilterResults = hasActiveFilters && filteredQuestions.length === 0 && !questionsLoading

  // Handle no questions state
  const showNoQuestions = !hasActiveFilters && filteredQuestions.length === 0 && !questionsLoading

  const handleClearFilters = () => {
    setGradeFilter("all")
    setTopicFilter("all")
  }

  const handleStartPractice = () => {
    navigate("/practice")
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Vertical divider - only on large screens, extends full height */}
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
        {/* Top Section: CTA Card + KPI Cards */}
        <div className="relative">
          {/* Background rectangle behind cards - only visible on large screens */}
          <div className="hidden lg:block absolute bg-[#f5f5f5] h-[213px] left-0 right-0 rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.06)] top-0" />
          
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
              <div className="md:col-span-3 bg-red-50 border border-red-200 rounded-[20px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-sm font-medium text-red-800">
                    Gagal memuat statistik
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => refetchStats()}
                  className="mt-2"
                >
                  Coba Lagi
                </Button>
              </div>
            ) : (
              <>
                <KPICard
                  icon={Clock}
                  title="Total Skor"
                  value={stats?.totalScore || 0}
                />
                <KPICard
                  icon={FileText}
                  title="Jumlah Soal Dikerjakan"
                  value={stats?.totalQuestions || 0}
                />
                <KPICard
                  icon={TrendingUp}
                  title="Tingkat Retensi"
                  value={stats?.retentionRate !== undefined ? `${stats.retentionRate}%` : "0%"}
                />
              </>
            )}
            </div>
            {/* CTA Card */}
            <div className="w-full lg:w-[495px] flex-shrink-0">
              <CTACard userName={userName} />
            </div>
          </div>
          
          {/* Horizontal divider below KPI/CTA section - crosses vertical divider */}
          <div className="absolute left-[-10px] lg:left-[-116px] right-[-10px] lg:right-[-116px] h-0 border-t border-dashed border-[#94a3b8] pointer-events-none" style={{ bottom: '-40px' }} />
        </div>

        {/* Bottom Section: Question List */}
        <div className="mt-[88px]">
          {/* Section Title */}
          <h2 className="text-[40px] font-bold leading-[56px] text-[#3F3F46] tracking-[0.2px] mb-6">
            Soal yang sudah dikerjakan
          </h2>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Select
              value={gradeFilter}
              onValueChange={setGradeFilter}
              disabled={questionsLoading}
            >
              <SelectTrigger className="w-[212px] h-[45px] border border-[#94a3b8] rounded-[10px] text-[20px] font-light tracking-[0.1px] text-black">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                {gradeFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={topicFilter}
              onValueChange={setTopicFilter}
              disabled={questionsLoading}
            >
              <SelectTrigger className="w-[212px] h-[45px] border border-[#94a3b8] rounded-[10px] text-[20px] font-light tracking-[0.1px] text-black">
                <SelectValue placeholder="Topik" />
              </SelectTrigger>
              <SelectContent>
                {topicFilters.map((filter) => (
                  <SelectItem key={filter.value} value={filter.value}>
                    {filter.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-[45px]"
              >
                Hapus Filter
              </Button>
            )}

            {/* Vertical Separator */}
            <div className="h-[24px] w-0 border-l border-[#94a3b8]" />

            {/* Sort by Retention */}
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (sortByRetention === null) {
                        setSortByRetention("desc")
                      } else if (sortByRetention === "desc") {
                        setSortByRetention("asc")
                      } else {
                        setSortByRetention(null)
                      }
                    }}
                    className="h-[45px] px-3 hover:bg-accent"
                    aria-label="Sort by retention"
                  >
                    <ArrowUpDown className="h-5 w-5 text-[#4B5563]" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sort by Tingkat Retensi</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Question List */}
          {questionsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-[109px] w-full rounded-[20px]" />
              ))}
            </div>
          ) : questionsError ? (
            <div className="bg-red-50 border border-red-200 rounded-[20px] p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm font-medium text-red-800">
                  Gagal memuat daftar soal
                </p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => refetchQuestions()}
                className="mt-2"
              >
                Coba Lagi
              </Button>
            </div>
          ) : showEmptyFilterResults ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                Tidak ada soal yang sesuai dengan filter yang dipilih.
              </p>
              <Button variant="outline" onClick={handleClearFilters}>
                Hapus Filter
              </Button>
            </div>
          ) : showNoQuestions ? (
            <div className="flex flex-col items-center justify-center py-16">
              <BookOpen className="w-24 h-24 text-[#737373] mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                Belum ada soal yang dikerjakan
              </h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Mulai latihan sekarang untuk melihat progress kamu di sini.
              </p>
              <Button onClick={handleStartPractice} className="bg-[#f9bc60] hover:bg-[#f8b350] text-white">
                Mulai Latihan Sekarang
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredQuestions.map((question, index) => (
                <QuestionListItem
                  key={`${question.topic}-${index}`}
                  topic={question.topic}
                  category={question.category}
                  grade={question.grade}
                  progress={question.progress}
                  dueCount={question.dueCount}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

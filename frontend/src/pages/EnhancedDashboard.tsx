import { useState } from "react"
import { ArrowUp, Clock, Wrench, ClipboardList, Trophy, AlertCircle, ArrowRight } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { UserProfile } from "@/components/layout/UserProfile"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data
const stats = {
  questionsReview: 7,
  topicsInProgress: 3,
  questionsThisWeek: 20,
  masteryPercentage: 67,
  masteryChange: 5
}

const recommendations = [
  {
    id: "1",
    type: "review" as const,
    topicName: "Persamaan Linear",
    description: "Tingkatkan retensi sebelum lupa",
    badge: "Perlu Review: 2 Soal",
    questionsCount: 2
  },
  {
    id: "2",
    type: "practice" as const,
    topicName: "Geometri",
    description: "Perluas penguasaan materi",
    badge: "Soal Baru: 2 Soal",
    questionsCount: 2
  },
  {
    id: "3",
    type: "practice" as const,
    topicName: "Trigonometri",
    description: "Perluas penguasaan materi",
    badge: "Soal Baru: 2 Soal",
    questionsCount: 2
  }
]

const topics = [
  {
    id: "1",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    name: "Persamaan Linear",
    masteryLevel: 80,
    status: "practice" as const
  },
  {
    id: "2",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    name: "SPLDV",
    masteryLevel: 65,
    status: "review" as const,
    questionsDue: 2
  },
  {
    id: "3",
    category: "Geometri",
    grade: "SMP - Kelas 7",
    totalQuestions: 15,
    name: "Segitiga",
    masteryLevel: 45,
    status: "practice" as const
  },
  {
    id: "4",
    category: "Bilangan",
    grade: "SMP - Kelas 8",
    totalQuestions: 25,
    name: "Bilangan Berpangkat",
    masteryLevel: 35,
    status: "review" as const,
    questionsDue: 3
  },
  {
    id: "5",
    category: "Statistika",
    grade: "SMP - Kelas 9",
    totalQuestions: 18,
    name: "Mean, Median, Modus",
    masteryLevel: 90,
    status: "practice" as const
  },
  {
    id: "6",
    category: "Geometri",
    grade: "SMP - Kelas 8",
    totalQuestions: 22,
    name: "Lingkaran",
    masteryLevel: 55,
    status: "practice" as const
  },
  {
    id: "7",
    category: "Aljabar",
    grade: "SMP - Kelas 9",
    totalQuestions: 30,
    name: "Fungsi Kuadrat",
    masteryLevel: 25,
    status: "review" as const,
    questionsDue: 5
  },
  {
    id: "8",
    category: "Bilangan",
    grade: "SMP - Kelas 7",
    totalQuestions: 16,
    name: "Pecahan",
    masteryLevel: 95,
    status: "practice" as const
  },
  {
    id: "9",
    category: "Geometri",
    grade: "SMP - Kelas 9",
    totalQuestions: 20,
    name: "Bangun Ruang",
    masteryLevel: 70,
    status: "practice" as const
  }
]

// Loading skeleton components
function StatsCardSkeleton() {
  return (
    <div className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6">
      <div className="flex items-start gap-3 mb-4">
        <Skeleton className="w-6 h-6 rounded" />
        <Skeleton className="h-[48px] w-[120px]" />
      </div>
      <Skeleton className="h-[64px] w-[100px]" />
    </div>
  )
}

function TopicCardSkeleton() {
  return (
    <div className="bg-white border border-[#cbd5e1] rounded-[20px] p-6">
      <div className="mb-4">
        <Skeleton className="h-4 w-20 mb-2" />
        <div className="flex gap-2 mb-2">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-7 w-40" />
      </div>
      <div className="mb-4">
        <Skeleton className="h-2 w-full mb-2" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex justify-end">
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  )
}

// Empty state component
function EmptyState({ type }: { type: 'new-user' | 'no-reviews' }) {
  if (type === 'new-user') {
    return (
      <div className="bg-[#fff3ea] rounded-[20px] p-12 text-center">
        <div className="text-[64px] mb-4">🔥</div>
        <h3 className="text-[32px] font-semibold tracking-[0.16px] text-[#3f3f46] mb-3">
          Mulai perjalanan belajar kamu!
        </h3>
        <p className="text-[18px] font-light tracking-[0.09px] text-[#4b5563] mb-6">
          Pilih topik pertama untuk mulai latihan dan tingkatkan penguasaan matematika kamu.
        </p>
        <Button className="bg-[#FFA41A] hover:bg-[#ff9a00] text-white text-[16px] font-bold tracking-[0.08px] h-[44px] px-8 rounded-[8px]">
          Lihat Semua Topik
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-[#f0fdf4] rounded-[20px] p-12 text-center">
      <div className="text-[64px] mb-4">🔥</div>
      <h3 className="text-[32px] font-semibold tracking-[0.16px] text-[#3f3f46] mb-3">
        Kamu sudah up-to-date!
      </h3>
      <p className="text-[18px] font-light tracking-[0.09px] text-[#4b5563] mb-6">
        Tidak ada review hari ini. Mau latihan topik baru?
      </p>
      <Button className="bg-[#FFA41A] hover:bg-[#ff9a00] text-white text-[16px] font-bold tracking-[0.08px] h-[44px] px-8 rounded-[8px]">
        Jelajahi Topik
      </Button>
    </div>
  )
}

// Error state component
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="bg-[#fef2f2] rounded-[20px] p-12 text-center border border-[#fecaca]">
      <div className="flex justify-center mb-4">
        <AlertCircle className="w-16 h-16 text-[#ef4444]" />
      </div>
      <h3 className="text-[32px] font-semibold tracking-[0.16px] text-[#3f3f46] mb-3">
        Gagal memuat data
      </h3>
      <p className="text-[18px] font-light tracking-[0.09px] text-[#4b5563] mb-6">
        Periksa koneksi internet kamu dan coba lagi.
      </p>
      <Button
        onClick={onRetry}
        className="bg-[#ef4444] hover:bg-[#dc2626] text-white text-[16px] font-bold tracking-[0.08px] h-[44px] px-8 rounded-[8px]"
      >
        Coba Lagi
      </Button>
    </div>
  )
}

export function EnhancedDashboard() {
  // State management for demo purposes
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  // Filter and sort state
  const [gradeFilter, setGradeFilter] = useState("all")
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleReviewClick = () => {
    console.log("Navigate to review questions")
    // TODO: Navigate to practice session with due questions
  }

  const handleStatsClick = (statType: string) => {
    console.log(`Clicked stat: ${statType}`)
    // TODO: Navigate to relevant view or show details
  }

  const handleRetry = () => {
    setHasError(false)
    setIsLoading(true)
    // Simulate retry
    setTimeout(() => setIsLoading(false), 1000)
  }

  const getMasteryStatus = (level: number) => {
    if (level >= 80) return "✓ Dikuasai"
    if (level >= 50) return "Dalam Progress"
    return "Perlu Latihan"
  }

  // Filter topics by grade
  const filteredTopics = topics.filter(topic => {
    if (gradeFilter === "all") return true
    return topic.grade === gradeFilter
  })

  // Sort topics by mastery level
  const sortedTopics = [...filteredTopics].sort((a, b) => {
    return sortDirection === 'desc'
      ? b.masteryLevel - a.masteryLevel
      : a.masteryLevel - b.masteryLevel
  })

  const handleSortClick = () => {
    setSortDirection(prev => prev === 'desc' ? 'asc' : 'desc')
  }

  return (
    <TooltipProvider delayDuration={200} skipDelayDuration={100}>
      <div className="min-h-screen bg-white relative">
        {/* Vertical Dashed Line */}
        <div
          className="fixed top-0 bottom-0 left-0 lg:left-[116px] w-px border-l border-dashed border-[#94a3b8]"
          style={{ zIndex: 0 }}
        />

        {/* Header */}
        <header className="border-b border-dashed border-[#94a3b8]" style={{ position: 'relative', zIndex: 1 }}>
          <div className="px-6 lg:pl-[140px] lg:pr-[116px] py-4 flex items-center gap-6">
            <Logo />
            <NavigationMenu />
            <div className="flex-1" />
            <UserProfile />
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 lg:pl-[140px] lg:pr-[116px] py-8" style={{ position: 'relative', zIndex: 1 }}>
          {/* Page Title */}
          <div className="flex items-center gap-3 mb-8">
            <img src="/assets/icons/rocket.svg" alt="Rocket" className="w-12 h-12" />
            <h1 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46]">
              Perkembangan belajar
            </h1>
          </div>

          {/* Error State */}
          {hasError && (
            <ErrorState onRetry={handleRetry} />
          )}

          {/* Empty State */}
          {isEmpty && !hasError && (
            <EmptyState type="new-user" />
          )}

          {/* Normal Content */}
          {!hasError && !isEmpty && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {isLoading ? (
                  <>
                    <StatsCardSkeleton />
                    <StatsCardSkeleton />
                    <StatsCardSkeleton />
                    <StatsCardSkeleton />
                  </>
                ) : (
                  <>
                    {/* Questions Review */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleReviewClick()}
                          className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6 text-left hover:bg-[#eeeeee] transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <Clock className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
                            <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                              Perlu Review<br />Hari Ini
                            </p>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-[64px] font-bold tracking-[0.32px] text-[#525252] leading-none">
                              {stats.questionsReview}
                            </p>
                            <p className="text-[24px] font-light tracking-[0.12px] text-[#737373]">
                              Soal
                            </p>
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Klik untuk mulai review soal yang sudah waktunya direview</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Topics In Progress */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleStatsClick('topics')}
                          className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6 text-left hover:bg-[#eeeeee] transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <Wrench className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
                            <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                              Dalam Progress
                            </p>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <p className="text-[64px] font-bold tracking-[0.32px] text-[#525252] leading-none">
                              {stats.topicsInProgress}
                            </p>
                            <p className="text-[24px] font-light tracking-[0.12px] text-[#737373]">
                              Topik
                            </p>
                          </div>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Topik yang sedang kamu pelajari (penguasaan 50-80%)</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Questions This Week */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleStatsClick('weekly')}
                          className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6 text-left hover:bg-[#eeeeee] transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <ClipboardList className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
                            <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                              Soal Dikerjakan<br />Pekan Ini
                            </p>
                          </div>
                          <p className="text-[64px] font-bold tracking-[0.32px] text-[#525252] leading-none">
                            {stats.questionsThisWeek}
                          </p>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Total soal yang sudah kamu kerjakan minggu ini</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* Mastery */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleStatsClick('mastery')}
                          className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6 text-left hover:bg-[#eeeeee] transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2"
                        >
                          <div className="flex items-start gap-3 mb-4">
                            <Trophy className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
                            <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                              Penguasaan
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <ArrowUp className="w-5 h-5 text-[#0d9488]" />
                            <p className="text-[20px] font-light tracking-[0.1px] text-[#0d9488]">
                              {stats.masteryChange}% Pekan ini
                            </p>
                          </div>
                          <p className="text-[64px] font-bold tracking-[0.32px] text-[#525252] leading-none">
                            {stats.masteryPercentage}%
                          </p>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Rata-rata penguasaan semua topik. Target: 85% untuk siap UN</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                )}
              </div>

              {/* Horizontal Separator */}
              <div className="-mx-6 lg:-mx-[116px] border-t border-dashed border-[#94a3b8] my-8" style={{ position: 'relative', zIndex: 1 }} />

              {/* Recommendations Section */}
              <div className="mb-8">
                {/* Header - Outside orange card */}
                <h2 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46] mb-6">
                  🧭 Rekomendasi berdasarkan pola belajar
                </h2>

                {/* Orange Card - Contains scrolling cards + button */}
                <div className="bg-[#FFF3EA] rounded-[20px] py-4 px-6 flex items-center gap-6">
                  {/* Horizontal scroll container */}
                  <div className="flex-1 flex items-center gap-6 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        className="bg-white rounded-[25px] p-6 flex-shrink-0 w-[371px] h-[257px] flex flex-col hover:border-[#94a3b8] transition-all duration-200 cursor-pointer"
                        style={{
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.10), 0 2px 4px -2px rgba(0, 0, 0, 0.10)'
                        }}
                        onClick={() => console.log(`Start ${rec.type} for ${rec.topicName}`)}
                      >
                        {/* Type label */}
                        <p className="text-[16px] font-normal tracking-[0.08px] text-[#404040] mb-2">
                          {rec.type === "review" ? "Review" : "Latihan"}
                        </p>

                        {/* Topic name */}
                        <h3 className="text-[36px] font-semibold leading-[32px] tracking-[0.18px] text-[#404040] mb-2">
                          {rec.topicName}
                        </h3>

                        {/* Description */}
                        <p className="text-[14px] font-light tracking-[0.07px] text-[#737373] mb-4">
                          {rec.description}
                        </p>

                        {/* Badge - positioned at bottom */}
                        <div className="mt-auto">
                          <Badge
                            variant={rec.type === "review" ? "review" : "default"}
                            size="pill"
                          >
                            {rec.badge}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mulai Kerjakan Button - Right side */}
                  <button
                    onClick={() => console.log('Mulai kerjakan all recommendations')}
                    className="inline-flex min-h-[36px] px-4 py-[7.5px] justify-center items-center gap-2 text-[#FFA41A] hover:text-[#ff9a00] text-[16px] font-bold tracking-[0.08px] transition-colors duration-150 flex-shrink-0"
                  >
                    Mulai Kerjakan
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* End Recommendations Section */}

              {/* Topics Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <h2 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46]">
                      🗺️ Peta penguasaan materi
                    </h2>
                    {/* Class Filter - From Figma Design */}
                    <div className="relative">
                      <select
                        value={gradeFilter}
                        onChange={(e) => setGradeFilter(e.target.value)}
                        className="appearance-none bg-white border border-[#cbd5e1] rounded-[10px] px-4 py-2 pr-10 text-[15px] font-light tracking-[0.07px] text-[#4b5563] cursor-pointer hover:border-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2 transition-colors duration-150"
                      >
                        <option value="all">Semua Kelas</option>
                        <option value="SMP - Kelas 7">SMP - Kelas 7</option>
                        <option value="SMP - Kelas 8">SMP - Kelas 8</option>
                        <option value="SMP - Kelas 9">SMP - Kelas 9</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path d="M5 7.5L10 12.5L15 7.5" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {/* Sort Icon Inline */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleSortClick}
                        className="w-[45px] h-[45px] flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors duration-150 bg-white focus:outline-none focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2"
                      >
                        <img
                          src="/assets/icons/sort.svg"
                          alt="Sort"
                          className={`w-6 h-6 transition-transform duration-200 ${sortDirection === 'asc' ? 'rotate-180' : ''}`}
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Urutkan berdasarkan tingkat penguasaan ({sortDirection === 'desc' ? 'Tinggi → Rendah' : 'Rendah → Tinggi'})</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                {/* Topics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading ? (
                    <>
                      <TopicCardSkeleton />
                      <TopicCardSkeleton />
                      <TopicCardSkeleton />
                    </>
                  ) : (
                    sortedTopics.map((topic) => (
                      <div key={topic.id} className="bg-white border border-[#cbd5e1] rounded-[20px] p-6">
                        <div className="mb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563]">
                              {topic.category}
                            </p>
                            <Badge variant="grade" size="sm">
                              {topic.grade}
                            </Badge>
                            <Badge variant="grade" size="sm">
                              {topic.totalQuestions} Soal
                            </Badge>
                          </div>
                          <h3 className="text-[24px] font-semibold tracking-[0.12px] text-[#404040]">
                            {topic.name}
                          </h3>
                        </div>

                        <div className="mb-4">
                          <Progress value={topic.masteryLevel} className="h-2 mb-2" />
                          <div className="flex items-center justify-between">
                            <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563]">
                              {topic.masteryLevel}%
                            </p>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <p className="text-[12px] font-light text-[#737373]">
                                  {getMasteryStatus(topic.masteryLevel)}
                                </p>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>0-50%: Perlu Latihan | 50-80%: Dalam Progress | 80%+: Dikuasai</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          {topic.status === "review" && topic.questionsDue ? (
                            <>
                              <Badge variant="review" size="pill">
                                Perlu Review: {topic.questionsDue} Soal
                              </Badge>
                              <Button className="bg-[#FFA41A] hover:bg-[#ff9a00] text-white text-[14px] font-bold tracking-[0.07px] h-[36px] px-6 rounded-[8px] focus:ring-2 focus:ring-[#FFA41A] focus:ring-offset-2">
                                Mulai Review
                              </Button>
                            </>
                          ) : (
                            <>
                              <div />
                              <Button variant="outline" className="text-[#020617] border-[#cbd5e1] hover:bg-slate-50 text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-[8px] focus:ring-2 focus:ring-[#cbd5e1] focus:ring-offset-2">
                                Latihan
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        {/* Debug Controls (remove in production) */}
        <div className="fixed bottom-4 right-4 bg-white border border-[#cbd5e1] rounded-lg p-4 shadow-lg" style={{ zIndex: 1000 }}>
          <p className="text-sm font-semibold mb-2">Debug Controls:</p>
          <div className="flex flex-col gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setIsLoading(!isLoading); setHasError(false); setIsEmpty(false); }}
            >
              {isLoading ? "Hide" : "Show"} Loading
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setHasError(!hasError); setIsLoading(false); setIsEmpty(false); }}
            >
              {hasError ? "Hide" : "Show"} Error
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => { setIsEmpty(!isEmpty); setIsLoading(false); setHasError(false); }}
            >
              {isEmpty ? "Hide" : "Show"} Empty
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
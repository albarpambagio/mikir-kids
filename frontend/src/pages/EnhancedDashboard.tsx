import { ArrowUp, Clock, Wrench, ClipboardList, Trophy } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { UserProfile } from "@/components/layout/UserProfile"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data
const stats = {
  questionsReview: 7,
  topicsInProgress: 3,
  questionsThisWeek: 20,
  masteryPercentage: 67,
  masteryChange: 5
}

const priorities = [
  {
    id: "1",
    number: 1,
    name: "Analisis Bayesian",
    status: "Perlu Review: 5 Soal",
    estimatedTime: "Est. 5 menit",
    action: "review"
  },
  {
    id: "2",
    number: 2,
    name: "Geometri",
    status: "Penguasaan: 2 Soal",
    estimatedTime: "Est. 3 menit",
    action: "practice"
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
    status: "practice"
  },
  {
    id: "2",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    name: "Persamaan Linear",
    masteryLevel: 80,
    status: "review",
    questionsDue: 2
  },
  {
    id: "3",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    name: "Persamaan Linear",
    masteryLevel: 80,
    status: "practice"
  }
]

export function EnhancedDashboard() {
  return (
    <div className="min-h-screen bg-white relative">
      {/* Vertical Dashed Line - Fixed position, behind content */}
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Questions Review */}
          <div className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6">
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
          </div>

          {/* Topics In Progress */}
          <div className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6">
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
          </div>

          {/* Questions This Week */}
          <div className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6">
            <div className="flex items-start gap-3 mb-4">
              <ClipboardList className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
              <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                Soal Dikerjakan<br />Pekan Ini
              </p>
            </div>
            <p className="text-[64px] font-bold tracking-[0.32px] text-[#525252] leading-none">
              {stats.questionsThisWeek}
            </p>
          </div>

          {/* Mastery */}
          <div className="bg-[#f5f5f5] border border-[#f1f5f9] rounded-[20px] p-6">
            <div className="flex items-start gap-3 mb-4">
              <Trophy className="w-6 h-6 text-[#737373] flex-shrink-0 mt-1" />
              <p className="text-[24px] font-medium tracking-[0.12px] text-[#737373] leading-tight">
                Mastery
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
          </div>
        </div>

        {/* Priorities Section */}
        <div className="bg-[#fff3ea] rounded-[20px] p-6 mb-8">
          <h2 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46] mb-6">
            Prioritas
          </h2>
          <div className="space-y-4">
            {priorities.map((priority) => (
              <div
                key={priority.id}
                className="bg-white rounded-[20px] p-6 flex items-center gap-6"
              >
                <div className="w-[38px] h-[38px] rounded-full border-2 border-[#f37677] flex items-center justify-center flex-shrink-0">
                  <span className="text-[20px] font-bold tracking-[0.1px] text-[#f37677]">
                    {priority.number}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <Badge variant="review" size="pill" className="mb-2">
                    {priority.status}
                  </Badge>
                  <h3 className="text-[20px] font-medium tracking-[0.1px] text-black truncate">
                    {priority.name}
                  </h3>
                </div>
                <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563] flex-shrink-0">
                  {priority.estimatedTime}
                </p>
                <Button
                  variant={priority.action === "review" ? "default" : "outline"}
                  className={
                    priority.action === "review"
                      ? "bg-[#f9bc60] hover:bg-[#f8b350] text-white text-[14px] font-bold tracking-[0.07px] h-[36px] px-6 rounded-full flex-shrink-0"
                      : "text-[#020617] border-[#cbd5e1] hover:bg-slate-50 text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-full flex-shrink-0"
                  }
                >
                  {priority.action === "review" ? "Mulai Review" : "Latihan"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Horizontal Dashed Separator - Full width with negative margins to cross vertical line */}
        <div className="-mx-6 lg:-mx-[116px] border-b border-dashed border-[#94a3b8] mb-8" style={{ position: 'relative', zIndex: 1 }} />

        {/* Topics Section */}
        <div>
          <h2 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46] mb-6">
            Peta penguasaan materi
          </h2>

          {/* Filters */}
          <div className="flex items-center gap-4 mb-6">
            <Select defaultValue="all">
              <SelectTrigger className="w-[190px] h-[56px] rounded-[10px] border-[#cbd5e1] bg-white">
                <SelectValue placeholder="Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kelas</SelectItem>
                <SelectItem value="smp-7">SMP - Kelas 7</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[190px] h-[56px] rounded-[10px] border-[#cbd5e1] bg-white">
                <SelectValue placeholder="Topik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Topik</SelectItem>
                <SelectItem value="aljabar">Aljabar</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-[1px] h-[45px] bg-[#94a3b8]" />

            <button className="w-[45px] h-[45px] flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors bg-white">
              <img src="/assets/icons/sort.svg" alt="Sort" className="w-6 h-6" />
            </button>
          </div>

          {/* Topics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <div key={topic.id} className="bg-white border border-[#cbd5e1] rounded-[20px] p-6">
                <div className="mb-4">
                  <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563] mb-2">
                    {topic.category}
                  </p>
                  <div className="flex gap-2 mb-2">
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
                  <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563]">
                    {topic.masteryLevel}%
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {topic.status === "review" && topic.questionsDue ? (
                    <>
                      <Badge variant="review" size="pill">
                        Perlu Review: {topic.questionsDue} Soal
                      </Badge>
                      <Button className="bg-[#f9bc60] hover:bg-[#f8b350] text-white text-[14px] font-bold tracking-[0.07px] h-[36px] px-6 rounded-full">
                        Mulai Review
                      </Button>
                    </>
                  ) : (
                    <>
                      <div />
                      <Button variant="outline" className="text-[#020617] border-[#cbd5e1] hover:bg-slate-50 text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-full">
                        Latihan
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
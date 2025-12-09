import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { Logo } from "@/components/layout/Logo"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { UserProfile } from "@/components/layout/UserProfile"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import type { Topic } from "@/types/topics"

// Mock data
const mockTopics: Topic[] = [
  {
    id: "1",
    name: "Persamaan Linear",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    masteryLevel: 80,
    questionsDue: 0,
    status: "in_progress"
  },
  {
    id: "2",
    name: "Persamaan Linear",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    masteryLevel: 80,
    questionsDue: 2,
    status: "needs_review"
  },
  {
    id: "3",
    name: "Persamaan Linear",
    category: "Aljabar",
    grade: "SMP - Kelas 7",
    totalQuestions: 20,
    masteryLevel: 80,
    questionsDue: 0,
    status: "in_progress"
  }
]

export function Topics() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  const handleTopicClick = (topicId: string) => {
    navigate(`/practice/${topicId}`)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:pl-[140px] lg:pr-[116px] py-4 flex items-center gap-6">
          <Logo />
          <NavigationMenu />
          <div className="flex-1" />
          <UserProfile />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-[116px] py-8">
        {/* Page Title */}
        <h1 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46] mb-8">
          Katalog Topik
        </h1>

        {/* Filters and Search */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-8">
          {/* Grade Filter */}
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-full lg:w-[190px] h-[56px] rounded-[10px] border-[#cbd5e1]">
              <SelectValue placeholder="Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              <SelectItem value="smp-7">SMP - Kelas 7</SelectItem>
              <SelectItem value="smp-8">SMP - Kelas 8</SelectItem>
              <SelectItem value="smp-9">SMP - Kelas 9</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full lg:w-[190px] h-[56px] rounded-[10px] border-[#cbd5e1]">
              <SelectValue placeholder="Topik" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Topik</SelectItem>
              <SelectItem value="aljabar">Aljabar</SelectItem>
              <SelectItem value="geometri">Geometri</SelectItem>
              <SelectItem value="bilangan">Bilangan</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort Button */}
          <button className="w-[45px] h-[45px] flex items-center justify-center hover:bg-gray-50 rounded-lg transition-colors">
            <img src="/assets/icons/sort.svg" alt="Sort" className="w-6 h-6" />
          </button>

          <div className="flex-1" />

          {/* Search */}
          <div className="relative w-full lg:w-[400px]">
            <Input
              type="text"
              placeholder="Cari topik"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[56px] pl-4 pr-12 rounded-[10px] border-[#cbd5e1] text-[15px] font-light tracking-[0.07px] text-[#4b5563]"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#475569]" />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTopics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onClick={() => handleTopicClick(topic.id)}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

interface TopicCardProps {
  topic: Topic
  onClick: () => void
}

function TopicCard({ topic, onClick }: TopicCardProps) {
  const hasReview = topic.questionsDue > 0

  return (
    <div className="border border-[#cbd5e1] rounded-[20px] p-6 hover:border-[#94a3b8] transition-colors">
      {/* Header */}
      <div className="mb-4">
        <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563] mb-2">
          {topic.category}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="grade" size="sm">
            {topic.grade}
          </Badge>
          <Badge variant="grade" size="sm">
            {topic.totalQuestions} Soal
          </Badge>
        </div>
        <h3 className="text-[24px] font-semibold tracking-[0.12px] text-[#404040] leading-tight">
          {topic.name}
        </h3>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <Progress value={topic.masteryLevel} className="h-2 mb-2" />
        <p className="text-[15px] font-light tracking-[0.07px] text-[#4b5563]">
          {topic.masteryLevel}%
        </p>
      </div>

      {/* Action */}
      <div className="flex items-center justify-between">
        {hasReview ? (
          <>
            <Badge variant="review" size="pill">
              Perlu Review: {topic.questionsDue} Soal
            </Badge>
            <Button
              onClick={onClick}
              className="bg-[#f9bc60] hover:bg-[#f8b350] text-white text-[14px] font-bold tracking-[0.07px] h-[36px] px-6 rounded-full"
            >
              Mulai Review
            </Button>
          </>
        ) : (
          <>
            <div />
            <Button
              onClick={onClick}
              variant="outline"
              className="text-[#020617] border-[#cbd5e1] hover:bg-slate-50 text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-full"
            >
              Latihan
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
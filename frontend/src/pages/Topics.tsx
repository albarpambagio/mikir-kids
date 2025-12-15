
import { useState } from "react"
import { Logo } from "@/components/layout/Logo"
import { NavigationMenu } from "@/components/layout/NavigationMenu"
import { UserProfile } from "@/components/layout/UserProfile"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mastery data types
interface MasteryDot {
  id: string
  subtopicIndex: number
  questionIndex: number  // 0-27 (28 dots total)
  status: 'not_started' | 'in_progress' | 'mastered'
  questionId: string
}

interface MasteryCategory {
  id: string
  name: string
  grade: string
  subtopics: string[]  // 5 subtopic names
  dots: MasteryDot[]   // 140 dots total (5 cols × 28 dots)
}

// Helper function to generate consistent dots for a category (7 rows x 4 cols = 28 dots)
function generateDots(categoryId: string, pattern: 'beginner' | 'intermediate' | 'advanced'): MasteryDot[] {
  const dots: MasteryDot[] = []
  let dotId = 0

  // 5 Subtopic Columns
  for (let col = 0; col < 5; col++) {
    // 28 Dots per subtopic (ordered by visual grid placement if needed, but linear here is fine)
    for (let i = 0; i < 28; i++) {
      let status: 'not_started' | 'in_progress' | 'mastered' = 'not_started'

      if (pattern === 'beginner') {
        // First column: first 10 progress, second column: first 5 progress
        if (col === 0) status = i < 10 ? 'in_progress' : 'not_started'
        else if (col === 1) status = i < 5 ? 'in_progress' : 'not_started'
      } else if (pattern === 'intermediate') {
        // First 2 columns mastered
        if (col < 2) status = 'mastered'
        else if (col === 2) status = i < 20 ? 'in_progress' : 'not_started'
        else if (col === 3) status = i < 5 ? 'in_progress' : 'not_started'
      } else if (pattern === 'advanced') {
        // First 3 columns mastered
        if (col < 3) status = 'mastered'
        else if (col === 3) status = i < 25 ? 'mastered' : 'in_progress'
        else if (col === 4) status = i === 0 ? 'mastered' : (i < 5 ? 'in_progress' : 'not_started')
      }

      dots.push({
        id: `${categoryId} -${col} -${i} `,
        subtopicIndex: col,
        questionIndex: i,
        status,
        questionId: `q - ${categoryId} -${dotId++} `
      })
    }
  }

  return dots
}

// Mock mastery data
const masteryData: MasteryCategory[] = [
  {
    id: "aljabar-7",
    name: "Aljabar",
    grade: "SMP - Kelas 7",
    subtopics: ["Subtopik", "Subtopik", "Subtopik", "Subtopik", "Subtopik"],
    dots: generateDots("aljabar-7", "beginner")
  },
  {
    id: "geometri-7",
    name: "Geometri",
    grade: "SMP - Kelas 7",
    subtopics: ["Subtopik", "Subtopik", "Subtopik", "Subtopik", "Subtopik"],
    dots: generateDots("geometri-7", "intermediate")
  },
  {
    id: "aljabar-8",
    name: "Aljabar",
    grade: "SMP - Kelas 8",
    subtopics: ["Subtopik", "Subtopik", "Subtopik", "Subtopik", "Subtopik"],
    dots: generateDots("aljabar-8", "advanced")
  },
  {
    id: "bilangan-7",
    name: "Bilangan",
    grade: "SMP - Kelas 7",
    subtopics: ["Subtopik", "Subtopik", "Subtopik", "Subtopik", "Subtopik"],
    dots: generateDots("bilangan-7", "intermediate")
  }
]

export function Topics() {
  const [gradeFilter, setGradeFilter] = useState("all")

  // Filter categories by grade
  const filteredCategories = masteryData.filter(category => {
    if (gradeFilter === "all") return true
    return category.grade === gradeFilter
  })

  const handleDotClick = (category: string, dot: MasteryDot) => {
    console.log(`Clicked ${category} - ${dot.questionId} (${dot.status})`)
  }

  return (
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
        <h1 className="text-[40px] font-semibold tracking-[0.2px] text-[#3f3f46] mb-8">
          Katalog Topik
        </h1>

        {/* Filters Row: Legend (Left) - Grade (Right) */}
        <div className="flex items-center justify-between mb-8">
          {/* Mastery Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-[17px] h-[17px] rounded-full border border-[#cbd5e1] bg-white" />
              <span className="text-[14px] font-light tracking-[0.07px] text-[#4b5563]">
                Belum dikuasai
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-[17px] h-[17px] rounded-full border border-[#FFA41A]"
                style={{ background: 'linear-gradient(to right, #FFA41A 50%, white 50%)' }}
              />
              <span className="text-[14px] font-light tracking-[0.07px] text-[#4b5563]">
                Dalam progress
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-[17px] h-[17px] rounded-full bg-[#FFA41A]" />
              <span className="text-[14px] font-light tracking-[0.07px] text-[#4b5563]">
                Dikuasai
              </span>
            </div>
          </div>

          {/* Grade Filter */}
          <Select value={gradeFilter} onValueChange={setGradeFilter}>
            <SelectTrigger className="w-[190px] h-[44px] rounded-[8px] border-[#cbd5e1] text-[#4b5563]">
              <SelectValue placeholder="Kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kelas</SelectItem>
              <SelectItem value="SMP - Kelas 7">SMP - Kelas 7</SelectItem>
              <SelectItem value="SMP - Kelas 8">SMP - Kelas 8</SelectItem>
              <SelectItem value="SMP - Kelas 9">SMP - Kelas 9</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Mastery Categories */}
        <div className="space-y-6">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border border-[#cbd5e1] rounded-[20px] p-8 shadow-sm"
              >
                {/* Category Header with Inline Badge */}
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[24px] font-semibold tracking-[0.12px] text-[#404040]">
                    {category.name}
                  </h2>
                  <Badge
                    variant="grade"
                    size="sm"
                  >
                    {category.grade}
                  </Badge>
                </div>

                {/* Subtopic Columns */}
                <div className="flex justify-between gap-4">
                  {[0, 1, 2, 3, 4].map((colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-4 w-[160px]">
                      {/* Subtopic label */}
                      <p className="text-[12px] font-semibold tracking-[1.5px] text-[#737373] uppercase">
                        {category.subtopics[colIndex]}
                      </p>

                      {/* 7x4 Dot Grid (7 columns, 4 rows) */}
                      <div className="grid grid-cols-7 gap-2">
                        {[...Array(28)].map((_, i) => {
                          const dot = category.dots.find(
                            d => d.subtopicIndex === colIndex && d.questionIndex === i
                          )

                          if (!dot) return null

                          let dotClass = "w-[17px] h-[17px] rounded-full cursor-pointer transition-all duration-150 hover:scale-125"

                          if (dot.status === 'not_started') {
                            dotClass += " border border-[#cbd5e1] bg-white hover:border-[#94a3b8]"
                          } else if (dot.status === 'in_progress') {
                            // Half-filled with orange primary color
                            dotClass += " border border-[#FFA41A]"
                          } else if (dot.status === 'mastered') {
                            dotClass += " bg-[#FFA41A] hover:bg-[#ff9a00]"
                          }

                          return (
                            <div
                              key={i}
                              className={dotClass}
                              style={dot.status === 'in_progress' ? {
                                background: 'linear-gradient(to right, #FFA41A 50%, white 50%)'
                              } : undefined}
                              onClick={() => handleDotClick(category.name, dot)}
                              title={`${category.name} - Q${i + 1} (${dot.status})`}
                            />
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-[18px] font-light tracking-[0.09px] text-[#4b5563]">
                Tidak ada kategori yang sesuai dengan filter
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
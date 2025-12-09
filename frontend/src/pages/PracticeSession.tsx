import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Question } from "@/types/practice"

// Mock question data
const mockQuestion: Question = {
  id: "q1",
  topicId: "1",
  topicName: "Aljabar Linear",
  questionText: "Jika 3x + 7 = 22, maka nilai x adalah?",
  options: [
    { id: "a", label: "A", text: "3" },
    { id: "b", label: "B", text: "5" },
    { id: "c", label: "C", text: "7" },
    { id: "d", label: "D", text: "9" }
  ],
  correctAnswer: "d",
  explanation: "Untuk menyelesaikan persamaan ini:\n\n3x + 7 = 22\n3x = 22 - 7\n3x = 15\nx = 15 ÷ 3\nx = 5\n\nJadi, jawaban yang benar adalah B. 5",
  tips: "Ingat urutan operasi: Pindahkan konstanta ke kanan, lalu bagi kedua sisi dengan koefisien x."
}

const totalQuestions = 15
const currentQuestion = 2

export function PracticeSession() {
  const navigate = useNavigate()
  const { topicId } = useParams()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleBack = () => {
    navigate(-1)
  }

  const handleSubmit = () => {
    navigate(`/practice/${topicId}/feedback`)
  }

  const progressPercentage = (currentQuestion / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:px-[116px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#475569]" />
            </button>
            <h1 className="text-[32px] font-semibold tracking-[0.16px] text-[#404040]">
              {mockQuestion.topicName}
            </h1>
            <Badge variant="grade" size="sm">
              SMA - Kelas 12
            </Badge>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!selectedAnswer}
            className="bg-[#f9bc60] hover:bg-[#f8b350] text-white text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-lg disabled:opacity-50"
          >
            Selesai
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 lg:px-[116px] py-6">
        <div className="flex items-center gap-4">
          {/* Navigation buttons */}
          <div className="flex items-center gap-1 bg-[#fafafa] border border-[#f1f5f9] rounded-[5px] p-1">
            <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
              <ChevronLeft className="w-5 h-5 text-[#64748b]" />
            </button>
            <button className="p-1.5 hover:bg-gray-200 rounded transition-colors">
              <ChevronRight className="w-5 h-5 text-[#64748b]" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="flex-1">
            <div className="relative h-2 bg-[#cbd5e1] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#ff6f08] rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Question counter */}
          <span className="text-[20px] font-light tracking-[0.1px] text-[#ff6f08] min-w-[60px] text-right">
            {currentQuestion}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-6 lg:px-[116px] pb-8">
        <div className="flex gap-8">
          {/* Question Area */}
          <div className="flex-1">
            {/* Question Text */}
            <h2 className="text-[32px] font-normal tracking-[0.16px] text-[#404040] mb-8">
              {mockQuestion.questionText}
            </h2>

            {/* Answer Options */}
            <div className="space-y-4">
              {mockQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setSelectedAnswer(option.id)}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-[10px] border transition-all text-left",
                    selectedAnswer === option.id
                      ? "border-[#f9bc60] bg-[#fff3ea]"
                      : "border-[#cbd5e1] hover:border-[#94a3b8]"
                  )}
                >
                  <div
                    className={cn(
                      "w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[20px] tracking-[0.1px] transition-all",
                      selectedAnswer === option.id
                        ? "bg-[#f9bc60] text-white font-extrabold"
                        : "border border-[#cbd5e1] text-[#404040] font-light"
                    )}
                  >
                    {option.label}
                  </div>
                  <span className="text-[24px] font-medium tracking-[0.12px] text-black">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end" />
          </div>

          {/* Question Navigation Sidebar */}
          <div className="w-[456px] bg-[#fff3ea] rounded-[20px] p-6 flex-shrink-0">
            <h3 className="text-[24px] font-semibold tracking-[0.12px] text-[#262626] mb-6">
              Navigasi Soal
            </h3>
            <div className="grid grid-cols-7 gap-3">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={cn(
                    "w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-[20px] tracking-[0.1px] transition-all",
                    num === currentQuestion
                      ? "bg-[#f9bc60] text-white font-bold"
                      : "bg-white text-black font-normal hover:bg-[#f9bc60]/20 border border-transparent hover:border-[#f9bc60]"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
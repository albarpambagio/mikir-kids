import { useNavigate } from "react-router-dom"
import { X, Check, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Mock data
const mockSummary = {
  totalQuestions: 15,
  correctAnswers: 10,
  incorrectAnswers: 5,
  totalScore: 65,
  totalRetention: 65,
  questionResults: [
    {
      questionId: "q1",
      questionNumber: 1,
      questionText: "Jika 3x + 7 = 22, maka nilai x adalah?",
      userAnswer: "D. 9",
      correctAnswer: "D. 9",
      isCorrect: true,
      explanation: "Pembahasan lorem ipsum"
    },
    {
      questionId: "q2",
      questionNumber: 2,
      questionText: "Jika 3x + 7 = 22, maka nilai x adalah?",
      userAnswer: "B. 5",
      correctAnswer: "D. 9",
      isCorrect: false,
      explanation: "Pembahasan lorem ipsum"
    }
  ]
}

export function PracticeFeedback() {
  const navigate = useNavigate()

  const handleClose = () => {
    navigate("/dashboard")
  }

  // Generate correct/incorrect map for visualization
  const resultMap = Array.from({ length: 15 }, (_, i) => {
    if (i < 10) return i % 2 === 0 // Alternating pattern for demo
    return null // Empty circles for unanswered
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:px-[116px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-8 h-8 text-[#475569]" />
            </button>
            <h1 className="text-[32px] font-semibold tracking-[0.16px] text-[#404040]">
              Feedback Aljabar Linear
            </h1>
            <Badge variant="grade" size="sm">
              SMA - Kelas 12
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-[116px] py-8">
        {/* Summary Cards */}
        <div className="flex gap-6 mb-8">
          {/* Correct/Incorrect Map */}
          <div className="flex-1 border border-[#cbd5e1] rounded-[20px] p-6">
            <h3 className="text-[24px] font-semibold tracking-[0.12px] text-[#262626] mb-4">
              Peta Benar Salah
            </h3>
            <div className="grid grid-cols-10 gap-3">
              {resultMap.map((isCorrect, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  {isCorrect !== null ? (
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      isCorrect ? "bg-[#009689]" : "bg-[#ef4444]"
                    )}>
                      {isCorrect ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <X className="w-5 h-5 text-white" />
                      )}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-[#cbd5e1]" />
                  )}
                  <span className="text-[15px] font-normal tracking-[0.07px] text-[#525252]">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total Score */}
          <div className="w-[207px] border border-[#cbd5e1] rounded-[20px] p-6 flex flex-col items-center justify-center">
            <p className="text-[48px] font-semibold tracking-[0.24px] text-[#262626] mb-2">
              {mockSummary.totalScore}
            </p>
            <p className="text-[24px] font-normal tracking-[0.12px] text-[#525252]">
              Total Skor
            </p>
          </div>

          {/* Total Retention */}
          <div className="w-[207px] border border-[#cbd5e1] rounded-[20px] p-6 flex flex-col items-center justify-center">
            <p className="text-[48px] font-semibold tracking-[0.24px] text-[#262626] mb-2">
              {mockSummary.totalRetention}
            </p>
            <p className="text-[24px] font-normal tracking-[0.12px] text-[#525252]">
              Total Retensi
            </p>
          </div>
        </div>

        {/* Question Results */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mockSummary.questionResults.map((result, index) => (
            <QuestionResultCard key={result.questionId} result={result} index={index} />
          ))}
        </div>
      </main>
    </div>
  )
}

interface QuestionResultCardProps {
  result: {
    questionNumber: number
    questionText: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
    explanation: string
  }
  index: number
}

function QuestionResultCard({ result, index }: QuestionResultCardProps) {
  return (
    <div className="border border-[#cbd5e1] rounded-[20px] p-6">
      {/* Question */}
      <h4 className="text-[24px] font-normal tracking-[0.12px] text-[#404040] mb-6">
        {index + 1}. {result.questionText}
      </h4>

      {/* Answer Options */}
      <div className="space-y-4 mb-6">
        {["A", "B", "C", "D"].map((label) => {
          const optionText = label === "D" ? "9" : label === "C" ? "7" : label === "B" ? "5" : "3"
          const isUserAnswer = result.userAnswer.startsWith(label)
          const isCorrectAnswer = result.correctAnswer.startsWith(label)

          return (
            <div
              key={label}
              className={cn(
                "flex items-center gap-4 p-3 rounded-[10px] border transition-colors",
                isCorrectAnswer && result.isCorrect
                  ? "border-[#009689] bg-[#009689]/10"
                  : !result.isCorrect && isUserAnswer
                    ? "border-[#ef4444] bg-[#ef4444]/10"
                    : isCorrectAnswer && !result.isCorrect
                      ? "border-[#009689] bg-[#009689]/10"
                      : "border-[#cbd5e1]"
              )}
            >
              <div
                className={cn(
                  "w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[20px] tracking-[0.1px]",
                  isCorrectAnswer
                    ? "bg-[#009689] text-white font-extrabold"
                    : !result.isCorrect && isUserAnswer
                      ? "bg-[#ef4444] text-white font-extrabold"
                      : "border border-[#cbd5e1] text-[#404040] font-light"
                )}
              >
                {label}
              </div>
              <span className="text-[24px] font-medium tracking-[0.12px] text-black">
                {optionText}
              </span>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-[#cbd5e1] my-6" />

      {/* Explanation */}
      <p className="text-[20px] font-normal tracking-[0.1px] text-[#404040]">
        {result.explanation}
      </p>
    </div>
  )
}
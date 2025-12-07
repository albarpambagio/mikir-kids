import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CircularProgress } from "@/components/ui/CircularProgress"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface QuestionListItemProps {
  topic: string
  category: string
  grade: string
  progress: number // 0-100
  dueCount: number
  className?: string
}

export function QuestionListItem({
  topic,
  category,
  grade,
  progress,
  dueCount,
  className,
}: QuestionListItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    // Navigate to practice session for this topic
    navigate(`/practice?topic=${encodeURIComponent(topic)}`)
  }

  return (
    <Card
      className={cn(
        "border border-[#cbd5e1] bg-white rounded-[20px] h-[109px]",
        className
      )}
    >
      <CardContent className="p-4 h-full flex items-center gap-4">
        {/* Left: Circular Progress */}
        <div className="flex-shrink-0">
          <TooltipProvider delayDuration={100}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="cursor-help">
                  <CircularProgress value={progress} size={69} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tingkat Retensi Topik</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Middle: Topic Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[15px] font-light text-[#4B5563] tracking-[0.075px] truncate">
              {category}
            </p>
            <Badge 
              variant="outline"
              className="bg-[rgba(255,255,255,0.1)] border border-[#e2e8f0] 
                         rounded-full px-2 py-[3px] min-h-[24px] 
                         font-semibold text-[12px] text-[#020617] tracking-[0.18px] leading-[16px]
                         hover:bg-[rgba(255,255,255,0.1)] hover:border-[#e2e8f0]">
              {grade}
            </Badge>
          </div>
          <p 
            className="text-[20px] font-medium text-black tracking-[0.1px] truncate"
            title={topic}
          >
            {topic}
          </p>
        </div>

        {/* Right: Due Count + Button */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <p className="text-[15px] font-light text-[#737373] tracking-[0.075px]">
            Due: {dueCount} Soal
          </p>
          <Button
            variant="ghost"
            onClick={handleClick}
            className="h-[36px] px-4 rounded-[8px] 
                       shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
                       hover:bg-accent cursor-pointer"
            aria-label={`Latihan ${topic}`}
          >
            Latihan
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}


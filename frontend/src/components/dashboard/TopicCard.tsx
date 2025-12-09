import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { Play, CheckCircle, Clock } from "lucide-react"

interface TopicCardProps {
    topicId: string
    name: string
    questionsDue: number
    totalQuestions: number
    masteryLevel: number
    status: "locked" | "new" | "in_progress" | "mastered"
    className?: string
}

export function TopicCard({
    topicId,
    name,
    questionsDue,
    totalQuestions,
    masteryLevel,
    status,
    className
}: TopicCardProps) {
    const navigate = useNavigate()

    const handlePractice = () => {
        navigate(`/practice?topic=${encodeURIComponent(topicId)}`)
    }

    // Determine status color and icon
    const isMastered = status === "mastered"
    const hasDue = questionsDue > 0

    return (
        <Card className={cn(
            "bg-white rounded-[20px] border border-[#cbd5e1] hover:border-[#94a3b8] transition-colors",
            "h-auto min-h-[160px] flex flex-col justify-between",
            className
        )}>
            <CardContent className="p-6 flex flex-col h-full gap-4">
                {/* Header */}
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Badge
                                variant="secondary"
                                className={cn(
                                    "px-2 py-[2px] text-[11px] font-semibold tracking-wider uppercase",
                                    isMastered ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
                                )}
                            >
                                {isMastered ? "Mastered" : `${totalQuestions} Soal`}
                            </Badge>
                            {hasDue && (
                                <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-2 py-[2px] text-[11px]">
                                    {questionsDue} Due
                                </Badge>
                            )}
                        </div>
                        <h3 className="text-[20px] font-bold text-[#1e293b] leading-tight line-clamp-2" title={name}>
                            {name}
                        </h3>
                    </div>

                    {/* Status Icon */}
                    <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                        isMastered ? "bg-green-100" : hasDue ? "bg-orange-100" : "bg-slate-100"
                    )}>
                        {isMastered ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : hasDue ? (
                            <Clock className="w-5 h-5 text-orange-600" />
                        ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-slate-300 border-t-slate-500 animate-spin-slow" />
                            // Using a simple circle or icon for 'in progress' if needed, or just hidden
                        )}
                        {!isMastered && !hasDue && <Play className="w-4 h-4 text-slate-400 ml-0.5" />}
                    </div>
                </div>

                {/* Footer: Progress & Action */}
                <div className="mt-auto pt-4 border-t border-dashed border-[#e2e8f0]">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                                <span>Progress</span>
                                <span className="font-medium text-slate-700">{masteryLevel}%</span>
                            </div>
                            <Progress value={masteryLevel} className="h-2" />
                        </div>

                        <Button
                            onClick={handlePractice}
                            size="sm"
                            className={cn(
                                "rounded-full px-4 h-9 font-medium shadow-sm transition-all",
                                hasDue
                                    ? "bg-[#f9bc60] hover:bg-[#f8b350] text-[#001e1d]"
                                    : "bg-slate-900 hover:bg-slate-800 text-white"
                            )}
                        >
                            {hasDue ? "Review" : "Latihan"}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

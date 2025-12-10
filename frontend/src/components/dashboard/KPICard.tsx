import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KPICardProps {
  icon: LucideIcon
  title: string
  value: number | string
  className?: string
}

export function KPICard({ icon: Icon, title, value, className }: KPICardProps) {
  // Format large numbers with commas
  const formatValue = (val: number | string): string => {
    if (typeof val === "string") return val
    if (val >= 1000) {
      return val.toLocaleString("id-ID")
    }
    return val.toString()
  }

  // Determine title size based on title length
  const titleSize = title === "Jumlah Soal Dikerjakan" ? "text-[20px]" : "text-[24px]"
  const titleTracking = title === "Jumlah Soal Dikerjakan" ? "tracking-[0.1px]" : "tracking-[0.12px]"

  return (
    <Card
      className={cn(
        "bg-white rounded-[20px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.05)]",
        "h-[193px] w-full",
        "hover:shadow-lg transition-shadow duration-150",
        className
      )}
    >
      <CardContent className="p-6 flex flex-col h-full justify-center">
        <div className="flex items-start gap-2 mb-2">
          <Icon className="h-6 w-6 text-[#737373] mt-1 flex-shrink-0" />
          <p className={cn(
            titleSize,
            "text-[#737373] font-medium",
            titleTracking
          )}>
            {title}
          </p>
        </div>
        <p className="text-[64px] font-bold text-[#f4881b] leading-none tracking-[0.32px]">
          {formatValue(value)}
        </p>
      </CardContent>
    </Card>
  )
}


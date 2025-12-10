import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTACardProps {
  userName?: string
  questionsDue?: number
  className?: string
}

export function CTACard({ questionsDue = 0, className }: CTACardProps) {
  const navigate = useNavigate()

  const handleStartPractice = () => {
    // Navigate to practice session
    // If questions due, maybe go to a "review all" mode? 
    // For now, just go to practice (which lists topics) or maybe a specific "smart session" route later.
    // Let's keep it simple: go to topics list or practice selection
    // But since we are ON the dashboard which HAS the topics list, maybe this button should:
    // 1. If due > 0, Scroll to "Due" topic? Or start review session immediately?
    // Let's just navigate to '/practice' generally for now.
    navigate("/topics")
  }

  const hasDue = questionsDue > 0

  return (
    <Card
      className={cn(
        "bg-[#035855] text-white relative overflow-hidden",
        "rounded-[20px] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.1)]",
        "h-[193px] w-full",
        className
      )}
    >
      {/* Texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none rounded-[20px] overflow-hidden"
        style={{
          backgroundImage: "url('/assets/images/ctr-texture.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <CardContent className="p-6 flex items-center justify-between h-full relative z-10">
        <div className="flex flex-col">
          {hasDue ? (
            <>
              <p className="text-[32px] font-semibold leading-[36px] text-white tracking-[0.2px] mb-2 opacity-90">
                Waktunya Review!
              </p>
              <p className="text-[48px] font-bold leading-[48px] text-[#FFA41A] tracking-[0.24px] mb-[4px]">
                {questionsDue} Soal
              </p>
              <p className="text-[20px] font-medium leading-[24px] text-white tracking-[0.1px] opacity-80">
                Menunggu dikerjakan
              </p>
            </>
          ) : (
            <>
              <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px] mb-[14px]">
                Mau
              </p>
              <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px] mb-[14px]">
                Latihan
              </p>
              <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px]">
                Hari Ini?
              </p>
            </>
          )}
        </div>
        <Button
          onClick={handleStartPractice}
          className={cn(
            "h-[54px] px-6 rounded-[8px] font-bold text-[16px] shadow-lg hover:shadow-xl transition-all duration-150",
            hasDue
              ? "bg-[#FFA41A] hover:bg-[#ff9a00] text-[#001e1d]"
              : "bg-white hover:bg-gray-100 text-[#035855]"
          )}
          aria-label={hasDue ? "Mulai Review" : "Mulai latihan"}
        >
          {hasDue ? "Review Sekarang" : "Mulai"}
        </Button>
      </CardContent>
    </Card>
  )
}

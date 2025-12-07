import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CTACardProps {
  userName?: string
  className?: string
}

export function CTACard({ userName, className }: CTACardProps) {
  const navigate = useNavigate()

  const handleStartPractice = () => {
    // Navigate to practice session
    navigate("/practice")
  }

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
          <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px] mb-[14px]">
            Mau
          </p>
          <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px] mb-[14px]">
            Latihan
          </p>
          <p className="text-[48px] font-semibold leading-[40px] text-white tracking-[0.24px]">
            Hari Ini?
          </p>
        </div>
        <Button
          onClick={handleStartPractice}
          className="bg-[#f9bc60] hover:bg-[#f8b350] text-[#001e1d] 
                     h-[54px] px-4 rounded-full font-medium text-[16px]
                     shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Mulai latihan"
        >
          Mulai
        </Button>
      </CardContent>
    </Card>
  )
}


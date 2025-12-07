import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function NavigationMenu() {
  const location = useLocation()
  const navigate = useNavigate()

  const isDashboard = location.pathname === "/dashboard"
  const isTopics = location.pathname === "/topics"

  return (
    <nav className="flex items-center gap-2">
      <Button
        variant="ghost"
        onClick={() => navigate("/dashboard")}
        className={cn(
          "h-[36px] px-4 font-semibold text-[14px] tracking-[0.07px]",
          isDashboard ? "opacity-100" : "opacity-50"
        )}
      >
        Beranda
      </Button>
      <Button
        variant="ghost"
        onClick={() => navigate("/topics")}
        className={cn(
          "h-[36px] px-4 font-semibold text-[14px] tracking-[0.07px]",
          isTopics ? "opacity-100" : "opacity-50"
        )}
      >
        Topik
      </Button>
    </nav>
  )
}


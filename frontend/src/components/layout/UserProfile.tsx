import { ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface UserProfileProps {
  userName?: string
  userId?: string
}

export function UserProfile({ userName, userId }: UserProfileProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-[36px] px-4 rounded-[8px] 
                     flex items-center gap-2 font-semibold text-[14px] tracking-[0.07px]
                     text-[#334155] hover:bg-accent"
          aria-label="Pengaturan"
        >
          <span>Pengaturan</span>
          <ChevronDown className="h-[13.25px] w-[13.25px]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {userName || "Pengguna"}
            </p>
            {userId && (
              <p className="text-xs leading-none text-muted-foreground">
                ID: {userId}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Profil
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          Pengaturan
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem disabled>
          Keluar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


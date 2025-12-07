import { UserIcon, UserPlusIcon } from "@heroicons/react/24/outline"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface UserIDTabsProps {
  value: 'new' | 'existing';
  onValueChange: (value: 'new' | 'existing') => void;
}

export function UserIDTabs({ value, onValueChange }: UserIDTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-fit">
      <TabsList className="bg-accent p-[3px] rounded-[10px] inline-flex items-center">
        <TabsTrigger
          value="new"
          className={cn(
            "flex items-center gap-[6px] px-2 py-1 rounded-[10px] min-h-[29px] min-w-[29px] shrink-0",
            "data-[state=active]:bg-secondary data-[state=active]:text-black",
            "data-[state=active]:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
            "data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373]"
          )}
        >
          <UserPlusIcon className="w-[16.667px] h-[16.667px] shrink-0 data-[state=active]:text-black data-[state=inactive]:text-[#737373]" />
          <span className="text-sm font-medium leading-[21px] tracking-[0.07px] data-[state=active]:text-black data-[state=inactive]:text-[#737373] whitespace-nowrap">Buat User ID Baru</span>
        </TabsTrigger>
        <TabsTrigger
          value="existing"
          className={cn(
            "flex items-center gap-[6px] px-2 py-1 rounded-[10px] min-h-[29px] min-w-[29px] shrink-0",
            "data-[state=active]:bg-secondary data-[state=active]:text-black",
            "data-[state=active]:shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]",
            "data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#737373]"
          )}
        >
          <UserIcon className="w-[16.667px] h-[16.667px] shrink-0 data-[state=active]:text-black data-[state=inactive]:text-[#737373]" />
          <span className="text-sm font-semibold leading-[21px] tracking-[0.07px] data-[state=active]:text-black data-[state=inactive]:text-[#737373] whitespace-nowrap">Gunakan User ID</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}


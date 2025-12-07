import { cn } from "@/lib/utils"

interface CircularProgressProps {
  value: number // 0-100
  size?: number
  className?: string
}

export function CircularProgress({ 
  value, 
  size = 69, 
  className 
}: CircularProgressProps) {
  // Clamp value between 0 and 100
  const clampedValue = Math.max(0, Math.min(100, value))
  
  // Calculate color based on percentage
  const getColor = (val: number): string => {
    if (val === 0) return "#e11d48" // Red for 0%
    if (val >= 80) return "#84cc16" // Green for 80%+
    if (val >= 50) return "#facc15" // Yellow for 50-79%
    return "#e11d48" // Red for <50%
  }
  
  const color = getColor(clampedValue)
  const radius = (size - 8) / 2 // Account for stroke width
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clampedValue / 100) * circumference
  
  return (
    <div 
      className={cn("relative flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${clampedValue}%`}
    >
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="4"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      {/* Percentage text */}
      <span
        className="absolute text-[20px] font-bold"
        style={{ color }}
      >
        {clampedValue}%
      </span>
    </div>
  )
}


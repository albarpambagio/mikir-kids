export type ProgressValue = 0 | 10 | 25 | 33 | 50 | 66 | 75 | 90 | 100

interface ProgressBarProps {
    progress: ProgressValue
    className?: string
}

/**
 * ProgressBar component for practice sessions
 * Displays visual progress with predefined increment values
 * Based on Figma design specifications
 */
export function ProgressBar({ progress, className = "" }: ProgressBarProps) {
    return (
        <div
            className={`relative h-3 w-full overflow-hidden rounded-[12px] bg-[#cbd5e1] ${className}`}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progress: ${progress}%`}
        >
            <div
                className="h-full bg-[#FFA41A] transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
            />
        </div>
    )
}

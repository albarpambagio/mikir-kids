import { Check, X } from "lucide-react"

export type MCQOptionState = "default" | "selected" | "correct" | "incorrect" | "disabled"

interface MCQOptionProps {
    option: string
    value: string
    state?: MCQOptionState
    onClick?: () => void
    className?: string
}

/**
 * MCQOption component for multiple choice question options
 * Supports different states: default, selected, correct, incorrect, disabled
 * Styled according to Figma design specifications
 */
export function MCQOption({
    option,
    value,
    state = "default",
    onClick,
    className = ""
}: MCQOptionProps) {
    const getStateStyles = () => {
        switch (state) {
            case "selected":
                return "border-[#FFA41A] bg-[#fff3ea] ring-2 ring-[#FFA41A] ring-offset-2"
            case "correct":
                return "border-[#009689] bg-[#f0fdf4] ring-2 ring-[#009689] ring-offset-2"
            case "incorrect":
                return "border-[#ef4444] bg-[#fef2f2] ring-2 ring-[#ef4444] ring-offset-2"
            case "disabled":
                return "border-[#e2e8f0] bg-[#f8fafc] opacity-60 cursor-not-allowed"
            default:
                return "border-[#cbd5e1] bg-white hover:border-[#94a3b8] hover:bg-[#f8fafc]"
        }
    }

    const getIcon = () => {
        if (state === "correct") {
            return <Check className="w-5 h-5 text-[#009689]" />
        }
        if (state === "incorrect") {
            return <X className="w-5 h-5 text-[#ef4444]" />
        }
        return null
    }

    const isInteractive = state !== "disabled" && state !== "correct" && state !== "incorrect"

    return (
        <button
            type="button"
            onClick={isInteractive ? onClick : undefined}
            disabled={!isInteractive}
            className={`
        w-full
        flex items-center gap-4
        p-4
        border-2
        rounded-[12px]
        transition-all duration-200
        text-left
        ${getStateStyles()}
        ${isInteractive ? "cursor-pointer" : ""}
        ${className}
      `}
            aria-pressed={state === "selected"}
            aria-disabled={!isInteractive}
        >
            {/* Option Letter */}
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#f5f5f5] text-[14px] font-bold tracking-[0.07px] text-[#404040]">
                {value}
            </span>

            {/* Option Text */}
            <span className="flex-1 text-[16px] font-medium tracking-[0.08px] text-[#3f3f46]">
                {option}
            </span>

            {/* State Icon */}
            {getIcon() && (
                <span className="flex-shrink-0">
                    {getIcon()}
                </span>
            )}
        </button>
    )
}

interface MCQOptionsListProps {
    options: Array<{ value: string; text: string }>
    selectedValue?: string
    correctValue?: string
    showFeedback?: boolean
    onSelect?: (value: string) => void
    disabled?: boolean
    className?: string
}

/**
 * MCQOptionsList component for rendering a list of MCQ options
 * Handles selection state and feedback display
 */
export function MCQOptionsList({
    options,
    selectedValue,
    correctValue,
    showFeedback = false,
    onSelect,
    disabled = false,
    className = ""
}: MCQOptionsListProps) {
    const getOptionState = (value: string): MCQOptionState => {
        if (disabled) return "disabled"

        if (showFeedback) {
            if (value === correctValue) return "correct"
            if (value === selectedValue && value !== correctValue) return "incorrect"
            return "disabled"
        }

        return value === selectedValue ? "selected" : "default"
    }

    return (
        <div className={`space-y-3 ${className}`}>
            {options.map((option) => (
                <MCQOption
                    key={option.value}
                    option={option.text}
                    value={option.value}
                    state={getOptionState(option.value)}
                    onClick={() => onSelect?.(option.value)}
                />
            ))}
        </div>
    )
}

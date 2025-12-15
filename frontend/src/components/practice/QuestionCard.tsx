interface QuestionCardProps {
    children: React.ReactNode
    className?: string
}

/**
 * QuestionCard component for displaying questions in practice sessions
 * Styled according to Figma design specifications with proper borders, shadows, and spacing
 */
export function QuestionCard({ children, className = "" }: QuestionCardProps) {
    return (
        <div
            className={`
        bg-white 
        border border-[#cbd5e1] 
        rounded-[12px] 
        p-6
        shadow-md-figma
        ${className}
      `}
        >
            {children}
        </div>
    )
}

interface QuestionTextProps {
    text: string
    imageUrl?: string | null
    className?: string
}

/**
 * QuestionText component for displaying question prompt with optional image
 */
export function QuestionText({ text, imageUrl, className = "" }: QuestionTextProps) {
    return (
        <div className={`mb-6 ${className}`}>
            <p className="text-[18px] font-medium tracking-[0.09px] text-[#3f3f46] mb-4 whitespace-pre-wrap">
                {text}
            </p>
            {imageUrl && (
                <div className="mt-4">
                    <img
                        src={imageUrl}
                        alt="Question diagram"
                        className="max-w-full h-auto rounded-[8px]"
                    />
                </div>
            )}
        </div>
    )
}

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResultCardProps {
    isCorrect: boolean;
    userAnswer: string;
    correctAnswer: string;
    explanation?: string;
    nextReview?: string; // e.g., "10 menit lagi", "1 jam lagi", "1 hari lagi"
    onNext: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({
    isCorrect,
    userAnswer,
    correctAnswer,
    explanation,
    nextReview,
    onNext,
}) => {
    return (
        <Card
            className={`
        w-full p-6 shadow-lg border-2
        ${isCorrect ? 'bg-[#f0fdf4] border-[#bbf7d0]' : 'bg-[#fef2f2] border-[#fecaca]'}
      `}
        >
            <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-3">
                    <span className="text-3xl">
                        {isCorrect ? '✅' : '❌'}
                    </span>
                    <h2
                        className={`text-2xl font-semibold ${isCorrect ? 'text-[#15803d]' : 'text-[#991b1b]'
                            }`}
                    >
                        {isCorrect ? 'Benar!' : 'Salah'}
                    </h2>
                </div>

                {/* Answer Details (only for incorrect) */}
                {!isCorrect && (
                    <div className="space-y-2">
                        <p className="text-base text-[#374151]">
                            <span className="font-medium">Jawaban kamu:</span> {userAnswer}
                        </p>
                        <p className="text-base">
                            <span className="font-medium text-[#059669]">
                                Jawaban yang benar:
                            </span>{' '}
                            <span className="font-semibold text-[#059669]">
                                {correctAnswer}
                            </span>
                        </p>
                    </div>
                )}

                {/* Explanation - Show for both correct and incorrect */}
                {explanation && (
                    <div className={cn("p-4 bg-white rounded-lg border-2 border-[#e5e7eb]", !isCorrect && "mt-4")}>
                        <div className="flex items-start gap-2">
                            <span className="text-xl flex-shrink-0">💡</span>
                            <div className="flex-1">
                                <p className="font-semibold text-[#111827] mb-2">Penjelasan:</p>
                                <p className="text-sm text-[#374151] whitespace-pre-line leading-relaxed">
                                    {explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Next Review Schedule (only for incorrect) */}
                {!isCorrect && nextReview && (
                    <div className="mt-3 text-sm text-[#6b7280]">
                        📅 Review selanjutnya: <span className="font-medium text-[#374151]">{nextReview}</span>
                    </div>
                )}

                {/* Lanjut Button */}
                <div className="pt-4">
                    <Button
                        onClick={onNext}
                        className="w-full bg-[#f4881b] hover:bg-[#ea580c] text-white font-semibold py-3 rounded-lg transition-colors"
                    >
                        Lanjut
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ResultCard;

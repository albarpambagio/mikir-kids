import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import ConfidenceSelector from '@/components/practice/ConfidenceSelector';
import ResultCard from '@/components/practice/ResultCard';
import {
  mockPracticeSession,
  mockCheckAnswer,
  type ConfidenceLevel,
} from '@/data/mockPracticeData';

type SessionPhase = 'QUESTION' | 'CONFIDENCE' | 'RESULT';

export function PracticeSession() {
  const navigate = useNavigate();
  const { topicId } = useParams();

  // Session state
  const [phase, setPhase] = useState<SessionPhase>('QUESTION');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<ConfidenceLevel | null>(null);
  const [result, setResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation?: string;
  } | null>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());

  const currentQuestion = mockPracticeSession.questions[currentQuestionIndex];
  const totalQuestions = mockPracticeSession.questions.length;
  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Handlers
  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return;
    setPhase('CONFIDENCE');
  };

  const handleConfidenceSubmit = (conf: ConfidenceLevel) => {
    setConfidence(conf);

    // Call mock API to check answer
    const apiResult = mockCheckAnswer(currentQuestion.id, selectedAnswer!, conf);

    setResult({
      isCorrect: apiResult.is_correct,
      correctAnswer: apiResult.correct_answer,
      explanation: apiResult.explanation,
    });

    setPhase('RESULT');
  };

  const handleNext = () => {
    // Mark current question as answered
    setAnsweredQuestions(prev => new Set(prev).add(currentQuestionIndex));

    if (currentQuestionIndex < totalQuestions - 1) {
      // Reset state for next question
      setSelectedAnswer(null);
      setConfidence(null);
      setResult(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setPhase('QUESTION');
    } else {
      // Navigate to summary
      navigate(`/practice/${topicId}/summary`);
    }
  };

  const handleQuestionNavigate = (index: number) => {
    // Optional: Allow jumping to specific question
  };

  // Calculate next review time based on FSRS (simplified for mock)
  const getNextReviewTime = (isCorrect: boolean, confidence: ConfidenceLevel | null): string => {
    if (isCorrect) return '';

    // For incorrect answers (Rating.Again), typical FSRS intervals:
    // First review: 10 minutes
    // Could be adjusted based on confidence for analytics
    return '10 menit lagi';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:px-[116px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              <ArrowLeft className="w-6 h-6 text-[#475569]" />
            </button>
            <h1 className="text-[32px] font-semibold tracking-[0.16px] text-[#404040]">
              {mockPracticeSession.topic}
            </h1>
            <Badge variant="grade" size="sm">
              SMP - Kelas 8
            </Badge>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="px-6 lg:px-[116px] py-6">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="relative h-2 bg-[#cbd5e1] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#ff6f08] rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <span className="text-[20px] font-light tracking-[0.1px] text-[#ff6f08] min-w-[60px] text-right">
            {currentQuestionIndex + 1}/{totalQuestions}
          </span>
        </div>
      </div>

      {/* Main Content - TWO COLUMN LAYOUT */}
      <main className="px-6 lg:px-[116px] pb-8">
        <div className="flex gap-8">
          {/* LEFT COLUMN - Question + Confidence + Feedback (all stack vertically) */}
          <div className="flex-1 space-y-6">
            {/* Question - ALWAYS VISIBLE */}
            <div>
              <h2 className="text-[32px] font-normal tracking-[0.16px] text-[#404040] mb-8 whitespace-pre-line">
                {currentQuestion.prompt_text}
              </h2>

              {/* MCQ Options */}
              <div className="space-y-4">
                {currentQuestion.options.map((option, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedAnswer(letter)}
                      disabled={phase !== 'QUESTION'}
                      className={cn(
                        'w-full flex items-center gap-4 p-4 rounded-[10px] border transition-all duration-150 text-left',
                        selectedAnswer === letter
                          ? 'border-[#FFA41A] bg-[#fff3ea]'
                          : 'border-[#cbd5e1] hover:border-[#94a3b8]',
                        phase !== 'QUESTION' && 'opacity-60 cursor-not-allowed'
                      )}
                    >
                      <div
                        className={cn(
                          'w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[20px] tracking-[0.1px] transition-all duration-150',
                          selectedAnswer === letter
                            ? 'bg-[#FFA41A] text-white font-extrabold'
                            : 'border border-[#cbd5e1] text-[#404040] font-light'
                        )}
                      >
                        {letter}
                      </div>
                      <span className="text-[24px] font-medium tracking-[0.12px] text-black">
                        {option}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Submit Button - Only show in QUESTION phase */}
              {phase === 'QUESTION' && (
                <div className="mt-8 flex justify-end">
                  <Button
                    onClick={handleSubmitAnswer}
                    disabled={!selectedAnswer}
                    className="bg-[#FFA41A] hover:bg-[#ff9a00] text-white text-[14px] font-semibold tracking-[0.07px] h-[36px] px-6 rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Jawaban
                  </Button>
                </div>
              )}
            </div>

            {/* Confidence Selector - Shows after submit */}
            {phase === 'CONFIDENCE' && (
              <div className="mt-8">
                <ConfidenceSelector
                  onSubmit={handleConfidenceSubmit}
                  selectedConfidence={confidence}
                />
              </div>
            )}

            {/* Result Feedback - Shows after confidence selection */}
            {phase === 'RESULT' && result && (
              <div className="mt-8">
                <ResultCard
                  isCorrect={result.isCorrect}
                  userAnswer={selectedAnswer!}
                  correctAnswer={result.correctAnswer}
                  explanation={result.explanation}
                  nextReview={!result.isCorrect ? getNextReviewTime(result.isCorrect, confidence) : undefined}
                  onNext={handleNext}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN - Question Navigation Sidebar */}
          <div className="w-[320px] bg-[#fff3ea] rounded-[20px] p-5 flex-shrink-0 self-start">
            <h3 className="text-[20px] font-semibold tracking-[0.1px] text-[#262626] mb-4">
              Navigasi Soal
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: totalQuestions }, (_, i) => i + 1).map((num) => {
                const questionIndex = num - 1;
                const isAnswered = answeredQuestions.has(questionIndex);
                const isCurrent = num === currentQuestionIndex + 1;

                return (
                  <button
                    key={num}
                    onClick={() => handleQuestionNavigate(questionIndex)}
                    className={cn(
                      'w-[48px] h-[48px] rounded-[8px] flex items-center justify-center text-[18px] tracking-[0.09px] transition-all duration-150 font-semibold',
                      isCurrent
                        ? 'bg-white text-[#FFA41A] border-2 border-[#FFA41A]' // Active: yellow outline
                        : isAnswered
                          ? 'bg-[#FFA41A] text-white border-2 border-[#FFA41A]' // Completed: orange fill
                          : 'bg-white text-black hover:bg-[#FFA41A]/20 border border-gray-200 hover:border-[#FFA41A]' // Default
                    )}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Check, Home, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Emoji } from 'emoji-picker-react';

// Mock data - will be replaced with actual session data
const mockSummary = {
  topic: 'Aljabar – Sistem Persamaan Linear Dua Variabel (SPLDV)',
  grade: 'SMP - Kelas 8',
  totalQuestions: 5,
  correctAnswers: 3,
  incorrectAnswers: 2,
  totalScore: 60,
  totalRetention: 75,
  questionResults: [
    {
      questionId: 'q_001',
      questionNumber: 1,
      questionText: 'Tentukan nilai x dan y dari sistem persamaan berikut:\n2x + 3y = 12\nx - y = 1',
      options: ['A) x = 2, y = 1', 'B) x = 3, y = 2', 'C) x = 4, y = 3', 'D) x = 5, y = 4'],
      userAnswer: 'B',
      correctAnswer: 'B',
      isCorrect: true,
      confidence: 'yakin',
      explanation: 'Gunakan metode eliminasi untuk menyelesaikan sistem persamaan.',
      nextReview: undefined,
    },
    {
      questionId: 'q_002',
      questionNumber: 2,
      questionText: 'Harga 2 buku dan 3 pensil adalah Rp 15.000. Harga 1 buku dan 2 pensil adalah Rp 8.000. Berapa harga 1 buku?',
      options: ['A) Rp 2.000', 'B) Rp 3.000', 'C) Rp 4.000', 'D) Rp 5.000'],
      userAnswer: 'C',
      correctAnswer: 'B',
      isCorrect: false,
      confidence: 'agak_ragu',
      explanation: 'Misalkan harga buku = b dan harga pensil = p. Maka: 2b + 3p = 15000 dan b + 2p = 8000.',
      nextReview: '10 menit lagi',
    },
  ],
};

export function SessionSummary() {
  const navigate = useNavigate();
  const location = useLocation();

  // In real implementation, get session data from location.state or API
  const sessionData = location.state?.sessionData || mockSummary;

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handlePracticeAgain = () => {
    navigate(-2); // Go back to topic selection
  };

  // Generate correct/incorrect map for visualization
  const resultMap = sessionData.questionResults.map((result: any) => result.isCorrect);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-dashed border-[#94a3b8]">
        <div className="px-6 lg:px-[116px] py-4 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              onClick={handleBackToDashboard}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-150"
            >
              <X className="w-6 h-6 text-[#475569]" />
            </button>
            <h1 className="text-[32px] font-semibold tracking-[0.16px] text-[#404040]">
              Ringkasan Sesi Latihan
            </h1>
            <Badge variant="grade" size="sm">
              {sessionData.grade}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 lg:px-[116px] py-8">
        {/* Topic Title */}
        <h2 className="text-[24px] font-semibold tracking-[0.12px] text-[#262626] mb-6">
          {sessionData.topic}
        </h2>

        {/* Summary Cards */}
        <div className="flex gap-6 mb-8">
          {/* Correct/Incorrect Map */}
          <div className="flex-1 border border-[#cbd5e1] rounded-[20px] p-6">
            <h3 className="text-[20px] font-semibold tracking-[0.1px] text-[#262626] mb-4">
              Peta Benar Salah
            </h3>
            <div className="flex gap-3 flex-wrap">
              {resultMap.map((isCorrect: boolean, index: number) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center',
                      isCorrect ? 'bg-[#10b981]' : 'bg-[#ef4444]'
                    )}
                  >
                    {isCorrect ? (
                      <Check className="w-5 h-5 text-white" />
                    ) : (
                      <X className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="text-[14px] font-medium tracking-[0.07px] text-[#525252]">
                    {index + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="flex gap-4">
            {/* Correct Answers */}
            <div className="w-[180px] border border-[#cbd5e1] rounded-[20px] p-6 flex flex-col items-center justify-center">
              <div className="text-5xl mb-2">
                <Emoji unified="1f389" size={48} />
              </div>
              <p className="text-[40px] font-bold tracking-[0.2px] text-[#10b981] mb-1">
                {sessionData.correctAnswers}
              </p>
              <p className="text-[16px] font-medium tracking-[0.08px] text-[#525252]">
                Benar
              </p>
            </div>

            {/* Incorrect Answers */}
            <div className="w-[180px] border border-[#cbd5e1] rounded-[20px] p-6 flex flex-col items-center justify-center">
              <div className="text-5xl mb-2">
                <Emoji unified="1f4aa" size={48} />
              </div>
              <p className="text-[40px] font-bold tracking-[0.2px] text-[#ef4444] mb-1">
                {sessionData.incorrectAnswers}
              </p>
              <p className="text-[16px] font-medium tracking-[0.08px] text-[#525252]">
                Salah
              </p>
            </div>

            {/* Total Score */}
            <div className="w-[180px] border border-[#cbd5e1] rounded-[20px] p-6 flex flex-col items-center justify-center">
              <div className="text-5xl mb-2">
                <Emoji unified="2b50" size={48} />
              </div>
              <p className="text-[40px] font-bold tracking-[0.2px] text-[#f4881b] mb-1">
                {sessionData.totalScore}
              </p>
              <p className="text-[16px] font-medium tracking-[0.08px] text-[#525252]">
                Skor
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 bg-white border-2 border-[#cbd5e1] text-[#404040] hover:bg-gray-50 px-6 py-3 rounded-[8px] font-semibold"
          >
            <Home className="w-5 h-5" />
            Kembali ke Dashboard
          </Button>
          <Button
            onClick={handlePracticeAgain}
            className="flex items-center gap-2 bg-[#f4881b] hover:bg-[#ea580c] text-white px-6 py-3 rounded-[8px] font-semibold"
          >
            <RotateCcw className="w-5 h-5" />
            Latihan Lagi
          </Button>
        </div>

        {/* Question Results */}
        <h3 className="text-[24px] font-semibold tracking-[0.12px] text-[#262626] mb-6">
          Detail Jawaban
        </h3>
        <div className="space-y-6">
          {sessionData.questionResults.map((result: any, index: number) => (
            <QuestionResultCard key={result.questionId} result={result} index={index} />
          ))}
        </div>
      </main>
    </div>
  );
}

interface QuestionResultCardProps {
  result: {
    questionNumber: number;
    questionText: string;
    options: string[];
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    confidence: string;
    explanation: string;
    nextReview?: string;
  };
  index: number;
}

function QuestionResultCard({ result, index }: QuestionResultCardProps) {
  return (
    <div
      className={cn(
        'border-2 rounded-[20px] p-6 bg-white',
        result.isCorrect ? 'border-[#10b981]' : 'border-[#ef4444]'
      )}
    >
      {/* Header with status */}
      <div className="flex items-center gap-3 mb-4">
        <div
          className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center',
            result.isCorrect ? 'bg-[#10b981]' : 'bg-[#ef4444]'
          )}
        >
          {result.isCorrect ? (
            <Check className="w-6 h-6 text-white" />
          ) : (
            <X className="w-6 h-6 text-white" />
          )}
        </div>
        <div>
          <h4 className="text-[20px] font-semibold text-[#262626]">
            Soal {index + 1}
          </h4>
          <p className={cn(
            'text-[14px] font-medium',
            result.isCorrect ? 'text-[#10b981]' : 'text-[#ef4444]'
          )}>
            {result.isCorrect ? '✓ Jawaban Benar' : '✗ Jawaban Salah'}
          </p>
        </div>
      </div>

      {/* Question */}
      <p className="text-[18px] font-normal tracking-[0.09px] text-[#404040] mb-6 whitespace-pre-line">
        {result.questionText}
      </p>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {result.options.map((option, idx) => {
          const letter = String.fromCharCode(65 + idx);
          const isUserAnswer = result.userAnswer === letter;
          const isCorrectAnswer = result.correctAnswer === letter;

          return (
            <div
              key={idx}
              className={cn(
                'flex items-center gap-4 p-3 rounded-[10px] border-2 transition-colors duration-150',
                isCorrectAnswer
                  ? 'border-[#10b981] bg-white'
                  : !result.isCorrect && isUserAnswer
                    ? 'border-[#ef4444] bg-white'
                    : 'border-transparent bg-white/50'
              )}
            >
              <div
                className={cn(
                  'w-[36px] h-[36px] rounded-[8px] flex items-center justify-center text-[16px] font-bold',
                  isCorrectAnswer
                    ? 'bg-[#10b981] text-white'
                    : !result.isCorrect && isUserAnswer
                      ? 'bg-[#ef4444] text-white'
                      : 'bg-gray-100 text-gray-600'
                )}
              >
                {letter}
              </div>
              <span className="text-[16px] font-medium text-[#262626]">{option}</span>
              {isCorrectAnswer && (
                <span className="ml-auto text-[14px] font-semibold text-[#10b981]">
                  ✓ Jawaban Benar
                </span>
              )}
              {!result.isCorrect && isUserAnswer && (
                <span className="ml-auto text-[14px] font-semibold text-[#ef4444]">
                  ✗ Jawaban Kamu
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Explanation */}
      {result.explanation && (
        <div className="bg-white rounded-lg border-2 border-[#e5e7eb] p-4">
          <div className="flex items-start gap-2">
            <span className="text-xl flex-shrink-0">💡</span>
            <div>
              <p className="font-semibold text-[#111827] mb-1">Penjelasan:</p>
              <p className="text-[14px] text-[#374151] whitespace-pre-line leading-relaxed">
                {result.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Next Review Schedule (only for incorrect) */}
      {!result.isCorrect && result.nextReview && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#6b7280]">
          <span>📅</span>
          <span>
            Review selanjutnya: <span className="font-medium text-[#374151]">{result.nextReview}</span>
          </span>
        </div>
      )}
    </div>
  );
}
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ClipboardDocumentIcon, CheckCircleIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { AuthShell } from "@/components/auth/AuthShell"
import { HeroSection } from "@/components/auth/HeroSection"

export function UserIdDisplay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state || {};
  const [copied, setCopied] = useState(false);

  if (!userId) {
    // Redirect to home if no userId in state
    navigate('/');
    return null;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(userId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleContinue = () => {
    navigate('/grade-selection', {
      state: { userId, isNew: true }
    });
  };

  return (
    <AuthShell
      heroContent={
        <HeroSection
          backgroundImage="/assets/images/hero-background.jpg"
          heading="Latihan Matematika dengan pendekatan bertahap"
          description="Pilih topik yang ingin dipelajari, kerjakan soal, dan sistem akan menjadwalkan kapan soal perlu diulang untuk memperkuat pemahamanmu."
        />
      }
    >
      <div className="flex flex-col p-6 md:p-12 w-full max-w-md mx-auto">
        {/* Logo */}
        <div className="flex items-center mb-10">
          <img 
            src="/assets/images/logo.png" 
            alt="Mikir Kids" 
            className="h-[84px] w-auto"
          />
        </div>

        {/* Heading */}
        <h1 className="text-[48px] font-semibold text-[#001e1d] leading-[48px] tracking-[-1.5px] mb-2">
          User ID Kamu
        </h1>

        {/* Sub-heading */}
        <p className="text-[20px] font-semibold text-[#01413e] leading-[24px] mb-8 w-[399px]">
          Simpan User ID ini dengan baik! Kamu akan membutuhkannya untuk mengakses progres belajarmu.
        </p>

        {/* User ID Display */}
        <div className="flex flex-col gap-4 mb-6 w-full md:w-[342px]">
          <div className="flex items-center gap-2">
            <div className="flex-1 p-4 bg-[#f1f5f9] rounded-[8px] text-center border border-[#cbd5e1]">
              <span className="text-2xl font-mono font-bold tracking-wider text-[#001e1d]">
                {userId}
              </span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={handleCopy}
              className="h-[52px] w-[52px] border border-[#cbd5e1] rounded-[8px]"
            >
              {copied ? (
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              ) : (
                <ClipboardDocumentIcon className="h-5 w-5 text-[#001e1d]" />
              )}
            </Button>
          </div>
          <p className="text-[12px] text-[#64748b] leading-[16px] tracking-[0.18px] text-center">
            {copied ? 'User ID disalin!' : 'Klik ikon untuk menyalin'}
          </p>
        </div>

        {/* Info Text */}
        <p className="text-[12px] text-[#64748b] leading-[16px] tracking-[0.18px] text-center mb-6 w-full md:w-auto">
          *User ID sudah tersimpan otomatis di perangkat ini.
        </p>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="bg-[#f9bc60] text-[#001e1d] hover:bg-[#f9bc60]/90 rounded-[8px] h-9 px-4 py-[7.5px] w-full md:w-auto"
        >
          Lanjutkan
        </Button>
      </div>
    </AuthShell>
  );
}


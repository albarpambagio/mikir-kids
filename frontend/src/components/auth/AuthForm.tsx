import { useState, useEffect } from "react"
import { PlusIcon, ArrowPathIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { UserIDTabs } from "./UserIDTabs"
import { Input } from "@/components/ui/input"
import { validateUserId } from "@/lib/validation"

interface AuthFormProps {
  onCreateUserID: () => Promise<void>;
  onUseExistingID: (userId: string) => Promise<void>;
  savedUserId?: string | null; // Optional: pre-fill with saved User ID
}

export function AuthForm({ onCreateUserID, onUseExistingID, savedUserId }: AuthFormProps) {
  const [activeTab, setActiveTab] = useState<'new' | 'existing'>('new');
  const [userId, setUserId] = useState(savedUserId || '');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill User ID if saved and switch to existing tab
  useEffect(() => {
    if (savedUserId && validateUserId(savedUserId)) {
      setUserId(savedUserId);
      setActiveTab('existing');
    }
  }, [savedUserId]);

  const handleSubmit = async () => {
    setError(null);
    
    if (activeTab === 'existing') {
      // Validate User ID format
      if (!userId.trim()) {
        setError('User ID harus diisi.');
        return;
      }
      
      if (!validateUserId(userId.trim())) {
        setError('User ID harus 8 angka.');
        return;
      }
    }

    setIsLoading(true);
    try {
      if (activeTab === 'new') {
        await onCreateUserID();
      } else {
        await onUseExistingID(userId.trim());
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 md:p-12 w-full max-w-md mx-auto">
      {/* Logo */}
      <div className="flex items-center mb-10">
        <img 
          src="/assets/images/logo.png" 
          alt="Mikir Kids" 
          className="h-[75px] w-auto"
        />
      </div>

      {/* Heading */}
      <h1 className="text-[48px] font-semibold text-[#001e1d] leading-[48px] tracking-[-1.5px] mb-2">
        Mulai Belajar
      </h1>

      {/* Sub-heading */}
      <div className="mb-16 max-w-[399px]">
        <p className="text-[20px] font-semibold text-[#01413e] leading-[24px]">
          Tidak Perlu Email & Password. Progres belajarmu akan tersimpan
          <br />
          melalui User ID.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="mb-6">
        <UserIDTabs value={activeTab} onValueChange={(value) => {
          setActiveTab(value);
          setError(null); // Clear error when switching tabs
        }} />
      </div>

      {/* Info Text - Only show for "Buat User ID Baru" tab */}
      {activeTab === 'new' && (
        <p className="text-sm text-[#525252] leading-[21px] mb-6 max-w-[409px] tracking-[0.07px]">
          Kami bakal bikin User ID 8 digit khusus buat kamu. Simpan ya, biar progres belajarmu tetap aman.
        </p>
      )}
      
      {/* Info Text for "Gunakan User ID" tab */}
      {activeTab === 'existing' && (
        <p className="text-sm text-[#525252] leading-[21px] mb-6 max-w-[409px] tracking-[0.07px]">
          Masukkan User ID yang sudah kamu simpan sebelumnya untuk melanjutkan belajar.
        </p>
      )}

      {/* Existing User ID Input (shown when "Gunakan User ID" tab is active) */}
      {activeTab === 'existing' && (
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Masukkan User ID"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setError(null); // Clear error on input change
            }}
            className="w-full"
            disabled={isLoading}
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-6">
          {error}
        </div>
      )}

      {/* Primary Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#f9bc60] text-[#001e1d] hover:bg-[#f9bc60]/90 rounded-full h-9 px-4 py-[7.5px] w-full max-w-[390px] disabled:opacity-50 gap-2"
      >
        {isLoading ? (
          <>
            <ArrowPathIcon className="w-[13.25px] h-[13.25px] animate-spin" />
            Memproses...
          </>
        ) : (
          <>
            <PlusIcon className="w-[13.25px] h-[13.25px]" />
            <span className="text-sm font-semibold leading-[21px] tracking-[0.07px]">
              {activeTab === 'new' ? 'Buat User ID' : 'Gunakan User ID'}
            </span>
          </>
        )}
      </Button>
    </div>
  );
}


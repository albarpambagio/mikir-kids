import { useState, useEffect } from "react"
import { ArrowPathIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { GradeLevel, ClassLevel } from "@/types/user"

interface GradeSelectionFormProps {
  userId: string;
  initialGradeLevel?: GradeLevel | null;
  initialClassLevel?: ClassLevel | null;
  onSubmit: (gradeLevel: GradeLevel, classLevel: ClassLevel) => Promise<void>;
}

const getClassOptions = (grade: GradeLevel): ClassLevel[] => {
  if (grade === "SMP") return [7, 8, 9];
  if (grade === "SMA") return [10, 11, 12];
  return [];
};

export function GradeSelectionForm({ 
  initialGradeLevel, 
  initialClassLevel,
  onSubmit 
}: GradeSelectionFormProps) {
  const [gradeLevel, setGradeLevel] = useState<GradeLevel | "">(initialGradeLevel || "");
  const [classLevel, setClassLevel] = useState<string>(initialClassLevel?.toString() || "");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Reset class level when grade changes
  useEffect(() => {
    if (gradeLevel) {
      setClassLevel("");
      setError(null);
    }
  }, [gradeLevel]);

  const validateForm = (): boolean => {
    if (!gradeLevel) {
      setError('Pilih tingkat dulu ya.');
      return false;
    }
    
    if (!classLevel) {
      setError('Pilih kelas kamu.');
      return false;
    }
    
    const classNum = parseInt(classLevel) as ClassLevel;
    const validClasses = getClassOptions(gradeLevel);
    
    if (!validClasses.includes(classNum)) {
      setError('Kelas tidak valid untuk tingkat yang dipilih.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await onSubmit(gradeLevel as GradeLevel, parseInt(classLevel) as ClassLevel);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  const classOptions = gradeLevel ? getClassOptions(gradeLevel as GradeLevel) : [];

  return (
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
        Mulai Belajar
      </h1>

      {/* Sub-heading */}
      <p className="text-[20px] font-semibold text-[#01413e] leading-[24px] mb-16 w-[399px]">
        Progres belajarmu akan tersimpan otomatis menggunakan User ID.
      </p>

      {/* Form Fields */}
      <div className="flex flex-col gap-4 mb-4 w-full md:w-[342px]">
        {/* Grade Level Field */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[14px] leading-[21px] text-[#020617]">
            Pilih tingkat dulu ya…
          </label>
          <Select
            value={gradeLevel}
            onValueChange={(value) => {
              setGradeLevel(value as GradeLevel);
              setError(null);
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="bg-white border border-[#cbd5e1] rounded-[8px] pl-[12px] pr-[8px] py-[7.5px] min-h-[36px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SMP">SMP</SelectItem>
              <SelectItem value="SMA">SMA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Class Level Field */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-[14px] leading-[21px] text-[#020617]">
            Pilih kelas kamu…
          </label>
          <Select
            value={classLevel}
            onValueChange={(value) => {
              setClassLevel(value);
              setError(null);
            }}
            disabled={isLoading || !gradeLevel}
          >
            <SelectTrigger className="bg-white border border-[#cbd5e1] rounded-[8px] pl-[12px] pr-[8px] py-[7.5px] min-h-[36px] shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
              <SelectValue placeholder="Select an item" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  Kelas {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Info Text */}
      <p className="text-[12px] text-[#64748b] leading-[16px] tracking-[0.18px] text-center mb-6 w-full md:w-auto">
        *Supaya kamu dapat soal yang pas dengan levelmu.
      </p>

      {/* Error Message */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md mb-4 w-full md:w-[342px]">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isLoading || !gradeLevel || !classLevel}
        className="bg-[#f9bc60] text-[#001e1d] hover:bg-[#f9bc60]/90 rounded-[8px] h-9 px-4 py-[7.5px] disabled:opacity-50 w-full md:w-auto"
      >
        {isLoading ? (
          <>
            <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
            Memproses...
          </>
        ) : (
          "Mulai Belajar"
        )}
      </Button>
    </div>
  );
}


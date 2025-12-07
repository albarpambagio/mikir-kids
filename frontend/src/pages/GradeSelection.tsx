import { useNavigate, useLocation } from "react-router-dom"
import { useEffect } from "react"
import { AuthShell } from "@/components/auth/AuthShell"
import { HeroSection } from "@/components/auth/HeroSection"
import { GradeSelectionForm } from "@/components/auth/GradeSelectionForm"
import { updateUser } from "@/lib/api"
import { GradeLevel, ClassLevel } from "@/types/user"

export function GradeSelection() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, isNew, user } = location.state || {};

  useEffect(() => {
    if (!userId) {
      navigate('/');
    }
  }, [userId, navigate]);

  const handleSubmit = async (
    gradeLevel: GradeLevel, 
    classLevel: ClassLevel
  ) => {
    try {
      await updateUser(userId, gradeLevel, classLevel);
      // Navigate to dashboard
      navigate('/dashboard', { 
        state: { userId, gradeLevel, classLevel } 
      });
    } catch (error) {
      throw error; // Let GradeSelectionForm handle error display
    }
  };

  if (!userId) {
    return null; // Will redirect in useEffect
  }

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
      <GradeSelectionForm
        userId={userId}
        initialGradeLevel={user?.grade_level || null}
        initialClassLevel={user?.class_level || null}
        onSubmit={handleSubmit}
      />
    </AuthShell>
  );
}


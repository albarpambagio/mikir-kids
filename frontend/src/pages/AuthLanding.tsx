import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { AuthShell } from "@/components/auth/AuthShell"
import { HeroSection } from "@/components/auth/HeroSection"
import { AuthForm } from "@/components/auth/AuthForm"
import { createUser, validateUser } from "@/lib/api"
import { validateUserId } from "@/lib/validation"

export function AuthLanding() {
  const navigate = useNavigate();
  const [savedUserId, setSavedUserId] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved User ID on mount
    const saved = localStorage.getItem('mikir_kids_user_id');
    if (saved && validateUserId(saved)) {
      setSavedUserId(saved);
    }
  }, []);

  const handleCreateUserID = async () => {
    try {
      const response = await createUser();
      // Save to localStorage
      localStorage.setItem('mikir_kids_user_id', response.userId);
      // Navigate to User ID display page (to show User ID with copy button)
      navigate('/user-id-display', { 
        state: { userId: response.userId } 
      });
    } catch (error) {
      throw error; // Let AuthForm handle error display
    }
  };

  const handleUseExistingID = async (userId: string) => {
    try {
      const user = await validateUser(userId);
      // Save to localStorage
      localStorage.setItem('mikir_kids_user_id', userId);
      
      // If user already has grade and class, go directly to dashboard
      if (user.grade_level && user.class_level) {
        navigate('/dashboard', { 
          state: { 
            userId: userId, 
            gradeLevel: user.grade_level, 
            classLevel: user.class_level 
          } 
        });
      } else {
        // If user doesn't have grade/class yet, go to grade selection
        navigate('/grade-selection', { 
          state: { userId: userId, isNew: false, user } 
        });
      }
    } catch (error) {
      throw error; // Let AuthForm handle error display
    }
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
      <AuthForm
        onCreateUserID={handleCreateUserID}
        onUseExistingID={handleUseExistingID}
        savedUserId={savedUserId}
      />
    </AuthShell>
  );
}


export interface User {
  id: string; // 8-digit numeric
  grade_level: "SMP" | "SMA" | null;
  class_level: 7 | 8 | 9 | 10 | 11 | 12 | null;
}

export type GradeLevel = "SMP" | "SMA";
export type ClassLevel = 7 | 8 | 9 | 10 | 11 | 12;

export interface AuthResponse {
  userId: string;
  isNew: boolean;
}


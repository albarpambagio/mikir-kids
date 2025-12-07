import { ReactNode } from "react"

interface AuthShellProps {
  children: ReactNode;
  heroContent: ReactNode;
}

export function AuthShell({ children, heroContent }: AuthShellProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Column - Hero Section */}
      <div className="w-full md:w-[540px] flex-shrink-0">
        {heroContent}
      </div>
      
      {/* Right Column - Auth Form */}
      <div className="flex-1 flex items-center justify-center bg-white py-8 md:py-0">
        {children}
      </div>
    </div>
  );
}


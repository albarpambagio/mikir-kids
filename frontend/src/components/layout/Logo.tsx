import { Link } from "react-router-dom"

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link 
      to="/dashboard" 
      className={className}
      aria-label="Mikir Kids - Beranda"
    >
      <img 
        src="/assets/images/logo.png" 
        alt="Mikir Kids" 
        className="h-[50px] w-[111px] object-contain"
      />
    </Link>
  )
}


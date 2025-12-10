interface HeroSectionProps {
  backgroundImage: string;
  heading: string;
  description: string;
}

export function HeroSection({ backgroundImage, heading, description }: HeroSectionProps) {
  return (
    <div className="relative h-screen md:h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-[#FFA41A] opacity-20" />
      
      {/* Text Overlay - Bottom Left */}
      <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white">
        <h2 className="text-[24px] font-semibold leading-[28.8px] tracking-[-1px] mb-3 max-w-[389px]">
          {heading}
        </h2>
        <p className="text-xs leading-4 tracking-[0.18px] max-w-[404px]">
          {description}
        </p>
      </div>
    </div>
  );
}


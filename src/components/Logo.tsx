import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const Logo: React.FC<LogoProps> = ({ className = '', variant = 'full' }) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem inspired by Western Visayas Hablon weaving & sunburst */}
      <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#E65100] via-[#F57C00] to-[#FFB300] flex items-center justify-center shadow-md shadow-amber-900/10 shrink-0 overflow-hidden">
        {/* Hablon weave pattern grid lines */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[size:6px_6px]" />
        
        {/* Stylized culinary sun icon */}
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white drop-shadow-sm" fill="currentColor">
          <circle cx="12" cy="12" r="5" className="fill-white" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

        {/* Small "4" badge for Group 4 */}
        <div className="absolute -bottom-1 -right-1 bg-[#BF360C] text-[10px] font-black text-white w-4 h-4 rounded-full flex items-center justify-center border border-white">
          4
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-extrabold text-xl tracking-tight text-[#1E1B18] font-['Outfit']">
            Namit
          </span>
          <span className="font-black text-xl text-[#E65100] font-['Outfit']">
            4
          </span>
          <span className="font-extrabold text-xl text-[#0F4C3A] font-['Outfit']">
            Visayas
          </span>
        </div>
        {variant === 'full' && (
          <span className="text-[10px] font-medium tracking-wider text-[#8A7968] uppercase mt-0.5">
            Group 4 · Food Tourism Destination
          </span>
        )}
      </div>
    </div>
  );
};

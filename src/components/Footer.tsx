import React from 'react';
import { Logo } from './Logo';
import { Heart, Compass, BookOpen, Award, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCustomizer }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1E1B18] text-[#DCD3C7] pt-14 pb-12 border-t border-[#36312B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1: Brand & Practical Exam context */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E65100] to-[#FFB300] flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                4
              </div>
              <span className="font-extrabold text-xl text-white font-['Outfit']">
                Namit 4 Visayas
              </span>
            </div>
            <p className="text-xs text-[#A89C8F] leading-relaxed max-w-sm">
              A comprehensive Food Tourism Destination Platform developed for the <strong>Tourism and Promotion Services Practical Examination</strong>. Research, curation, and design by <strong>Group 4</strong> (8 members).
            </p>
            <div className="text-[11px] text-[#8C7D6D]">
              Region VI: Iloilo · Negros Occidental · Guimaras · Capiz · Aklan · Antique
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-white transition-colors"
                >
                  Showcase & Video
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors"
                >
                  8 Regional Dishes
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('map')}
                  className="hover:text-white transition-colors"
                >
                  Interactive Diner Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('spots')}
                  className="hover:text-white transition-colors"
                >
                  Travel Spots & Food Pairings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Group 4 Member Directory
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('references')}
                  className="hover:text-white transition-colors text-amber-400 font-semibold"
                >
                  References & Photo Credits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Online Credits & References */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              References & Photo Credits
            </div>
            <div className="bg-[#292420] p-4 rounded-xl border border-[#3E3832] space-y-2 text-xs">
              <div className="text-[11px] text-[#FFB300] font-semibold">
                Authentic Sources & Attribution:
              </div>
              <p className="text-white/80 leading-relaxed text-[11px]">
                Culinary texts, regional maps, and photography credits documented in partnership with DOT Region VI and public culinary repositories.
              </p>
              <div className="pt-2 flex flex-col gap-1.5">
                <button
                  onClick={() => onNavigate('references')}
                  className="w-full py-1.5 px-3 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-center"
                >
                  View All Links & Photo Credits →
                </button>
                <button
                  onClick={onOpenCustomizer}
                  className="w-full py-1.5 px-3 text-xs font-semibold bg-[#E65100] hover:bg-[#BF360C] text-white rounded-lg transition-colors text-center"
                >
                  Customize Photos & Information
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#36312B] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7D6D]">
          <div>
            © 2026 <strong>Namit 4 Visayas</strong> · Western Visayas Food Tourism Showcase · Group 4
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

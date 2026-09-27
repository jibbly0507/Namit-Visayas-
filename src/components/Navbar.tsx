import React, { useState } from 'react';
import { Logo } from './Logo';
import { Sparkles, SlidersHorizontal, Menu, X, CheckSquare } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCustomizer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenCustomizer,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Showcase' },
    { id: 'gallery', label: '8 Regional Dishes' },
    { id: 'map', label: 'Diner Map & Ratings' },
    { id: 'spots', label: 'Travel Spots' },
    { id: 'about', label: 'Group 4 Team' },
    { id: 'references', label: 'References & Credits' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#EADFCF]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Brand Zone */}
        <button
          onClick={() => handleLinkClick('hero')}
          className="flex items-center text-left hover:opacity-95 transition-opacity focus:outline-none"
        >
          <Logo variant="full" />
        </button>

        {/* Zone 2: Navigation Links (Clean text links with hover underline, strict single-line) */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium transition-colors whitespace-nowrap py-1 relative ${
                  isActive
                    ? 'text-[#E65100] font-semibold'
                    : 'text-[#5C544B] hover:text-[#1E1B18]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#E65100] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Customizer button (Change Photos / Names) */}
          <button
            onClick={onOpenCustomizer}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#E65100] text-white hover:bg-[#BF360C] transition-colors shadow-xs whitespace-nowrap"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Change Photos & Info</span>
            <span className="md:hidden">Edit</span>
          </button>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#5C544B] hover:text-[#1E1B18] hover:bg-[#F0E6D8] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFAF7] border-b border-[#EADFCF] px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#FBE8DE] text-[#BF360C] font-semibold'
                    : 'text-[#5C544B] hover:bg-[#F2E8DC] hover:text-[#1E1B18]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EADFCF] flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenCustomizer();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold rounded-lg bg-[#E65100] text-white"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Change Photos & Member Details</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

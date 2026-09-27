import React, { useState } from 'react';
import { X, Play, Film, Sparkles, Volume2 } from 'lucide-react';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-[#181614] rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10 flex flex-col text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="w-4 h-4 text-[#FFB300]" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFB300]">
                Group 4 Tourism Showcase
              </span>
              <h3 className="text-base font-bold font-['Outfit']">
                Taste of Western Visayas: The Food Tourism Documentary
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative aspect-video bg-black flex items-center justify-center">
          <iframe
            className="w-full h-full"
            src="https://www.youtube-nocookie.com/embed/PB1_maFyzp8?autoplay=1&mute=0&controls=1&rel=0"
            title="Western Visayas Food & Tourism Journey"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Caption */}
        <div className="px-6 py-4 bg-[#201D1A] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-white/70">
          <div>
            <span className="font-semibold text-white">Featured Locations:</span> Calle Real (Iloilo), Manokan Country (Bacolod), Jordan Mango Plantations (Guimaras), Baybay Beach (Capiz).
          </div>
          <div className="text-[11px] text-amber-400 font-medium">
            Tourism & Promotion Services Practical Exam Presentation
          </div>
        </div>
      </div>
    </div>
  );
};

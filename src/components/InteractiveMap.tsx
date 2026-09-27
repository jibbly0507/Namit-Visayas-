import React, { useState } from 'react';
import { LocalDiner, Province } from '../types';
import { MapPin, Navigation, Star, Phone, ExternalLink, Sparkles, Filter, Edit3, Plus } from 'lucide-react';

interface InteractiveMapProps {
  diners: LocalDiner[];
  selectedDiner: LocalDiner | null;
  onSelectDiner: (diner: LocalDiner) => void;
  onOpenReviewModal: (diner: LocalDiner) => void;
  onEditDiner?: (diner: LocalDiner) => void;
  onAddNewDiner?: () => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  diners,
  selectedDiner,
  onSelectDiner,
  onOpenReviewModal,
  onEditDiner,
  onAddNewDiner,
}) => {
  const [selectedProvinceFilter, setSelectedProvinceFilter] = useState<Province>('All');

  // Province geo coordinates & data for the custom Western Visayas regional map
  const provincesData = [
    { name: 'Aklan', code: 'AKL', tag: 'Home of Boracay & Binakol', cx: 32, cy: 22, color: '#F59E0B' },
    { name: 'Antique', code: 'ANT', tag: 'Kawa Baths & Coastal Kitchens', cx: 20, cy: 50, color: '#10B981' },
    { name: 'Capiz', code: 'CAP', tag: 'Seafood Capital of the Philippines', cx: 52, cy: 26, color: '#3B82F6' },
    { name: 'Iloilo', code: 'ILO', tag: 'UNESCO Creative City of Gastronomy', cx: 42, cy: 56, color: '#EF4444' },
    { name: 'Guimaras', code: 'GUI', tag: 'Sweetest Mangoes in the World', cx: 47, cy: 72, color: '#EAB308' },
    { name: 'Negros Occidental', code: 'NEG', tag: 'Sugarlandia & Chicken Inasal Haven', cx: 68, cy: 58, color: '#8B5CF6' },
  ];

  const filteredDiners = diners.filter((d) => {
    return selectedProvinceFilter === 'All' || d.province === selectedProvinceFilter;
  });

  return (
    <section id="map" className="py-14 sm:py-20 border-b border-[#E8DDCF] bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="text-xs font-bold uppercase tracking-wider text-[#BF360C]">
            Interactive Food Geography
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-1">
            Western Visayas Diner & Culinary Map
          </h2>
          <p className="text-sm sm:text-base text-[#685F53] mt-2">
            Click any province or hotspot on the map to discover iconic local heritage diners, street-side culinary institutions, and live visitor ratings.
          </p>
        </div>

        {/* Map & Diner Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left/Center: Interactive SVG Western Visayas Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E5DACD] p-5 sm:p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#EFE5D8]">
              <div className="flex items-center gap-2">
                <Navigation className="w-4 h-4 text-[#BF360C]" />
                <span className="text-xs font-bold text-[#1E1B18] uppercase tracking-wide">
                  Region VI Culinary Coordinates
                </span>
              </div>
              <div className="text-xs text-[#7A6F62]">
                Interactive Map · Panay, Guimaras & Negros
              </div>
            </div>

            {/* SVG Visual Map Container */}
            <div className="relative aspect-[16/11] bg-gradient-to-b from-[#F2F8F8] to-[#E9F3F3] rounded-xl my-4 overflow-hidden border border-[#D5E5E5] flex items-center justify-center">
              {/* Subtle oceanic waves background */}
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#0F4C3A_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Water Labels */}
              <div className="absolute top-4 left-6 text-[10px] font-semibold text-[#8DA6A6] tracking-wider uppercase select-none">
                Sibuyan Sea
              </div>
              <div className="absolute bottom-6 left-6 text-[10px] font-semibold text-[#8DA6A6] tracking-wider uppercase select-none">
                Panay Gulf
              </div>
              <div className="absolute bottom-6 right-8 text-[10px] font-semibold text-[#8DA6A6] tracking-wider uppercase select-none">
                Guimaras Strait
              </div>

              {/* Custom SVG Island Outlines of Western Visayas */}
              <svg viewBox="0 0 100 90" className="w-full h-full p-2 drop-shadow-md select-none">
                {/* Panay Island: Aklan, Antique, Capiz, Iloilo */}
                <g className="cursor-pointer">
                  {/* Aklan Sector */}
                  <path
                    d="M 22 24 Q 28 14 38 18 Q 44 22 36 28 Q 28 30 22 24 Z"
                    fill={selectedProvinceFilter === 'Aklan' ? '#F59E0B' : '#E8D2A0'}
                    stroke="#C7A769"
                    strokeWidth="0.8"
                    className="hover:opacity-90 transition-all"
                    onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Aklan' ? 'All' : 'Aklan')}
                  />
                  {/* Capiz Sector */}
                  <path
                    d="M 38 18 Q 54 18 60 28 Q 54 36 42 34 Q 36 28 38 18 Z"
                    fill={selectedProvinceFilter === 'Capiz' ? '#3B82F6' : '#C7DEEE'}
                    stroke="#8BAEC9"
                    strokeWidth="0.8"
                    className="hover:opacity-90 transition-all"
                    onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Capiz' ? 'All' : 'Capiz')}
                  />
                  {/* Antique Sector */}
                  <path
                    d="M 22 24 Q 28 30 24 50 Q 18 66 16 68 Q 12 56 16 38 Q 18 28 22 24 Z"
                    fill={selectedProvinceFilter === 'Antique' ? '#10B981' : '#B8DFC8'}
                    stroke="#82B997"
                    strokeWidth="0.8"
                    className="hover:opacity-90 transition-all"
                    onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Antique' ? 'All' : 'Antique')}
                  />
                  {/* Iloilo Sector */}
                  <path
                    d="M 24 50 Q 42 34 54 36 Q 58 48 48 64 Q 38 66 24 50 Z"
                    fill={selectedProvinceFilter === 'Iloilo' ? '#EF4444' : '#F1C2B6'}
                    stroke="#CF8C7C"
                    strokeWidth="0.8"
                    className="hover:opacity-90 transition-all"
                    onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Iloilo' ? 'All' : 'Iloilo')}
                  />
                </g>

                {/* Guimaras Island */}
                <ellipse
                  cx="48"
                  cy="72"
                  rx="5"
                  ry="7"
                  fill={selectedProvinceFilter === 'Guimaras' ? '#EAB308' : '#FDE68A'}
                  stroke="#CA8A04"
                  strokeWidth="0.8"
                  className="cursor-pointer hover:opacity-90 transition-all"
                  onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Guimaras' ? 'All' : 'Guimaras')}
                />

                {/* Negros Occidental Sector */}
                <path
                  d="M 62 44 Q 72 38 78 46 Q 82 62 76 76 Q 66 78 62 60 Q 60 52 62 44 Z"
                  fill={selectedProvinceFilter === 'Negros Occidental' ? '#8B5CF6' : '#DDD2F2'}
                  stroke="#A892D1"
                  strokeWidth="0.8"
                  className="cursor-pointer hover:opacity-90 transition-all"
                  onClick={() => setSelectedProvinceFilter(selectedProvinceFilter === 'Negros Occidental' ? 'All' : 'Negros Occidental')}
                />

                {/* Region VI Text Labels on Map */}
                <text x="30" y="24" fontSize="3" fontWeight="bold" fill="#5A4720">Aklan</text>
                <text x="48" y="27" fontSize="3" fontWeight="bold" fill="#204A6E">Capiz</text>
                <text x="14" y="48" fontSize="2.8" fontWeight="bold" fill="#1C5332">Antique</text>
                <text x="36" y="52" fontSize="3.5" fontWeight="bold" fill="#6E2313">Iloilo</text>
                <text x="44" y="73" fontSize="2.5" fontWeight="bold" fill="#6B5103">Guimaras</text>
                <text x="66" y="58" fontSize="3.2" fontWeight="bold" fill="#3E206E">Negros Occ.</text>
              </svg>

              {/* Plotted Diner Markers */}
              {diners.map((diner) => {
                const isSelected = selectedDiner?.id === diner.id;
                return (
                  <button
                    key={diner.id}
                    onClick={() => onSelectDiner(diner)}
                    style={{ left: `${diner.mapCoords.x}%`, top: `${diner.mapCoords.y}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                    }`}
                    title={`${diner.name} (${diner.city})`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`w-3.5 h-3.5 rounded-full ring-2 ring-white shadow-md flex items-center justify-center ${
                        isSelected ? 'bg-[#BF360C]' : 'bg-[#E65100]'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </span>
                      {isSelected && (
                        <span className="absolute w-6 h-6 rounded-full bg-[#BF360C]/30 animate-ping -z-10" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter buttons beneath map */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-[#706659]">Filter Province:</span>
              <button
                onClick={() => setSelectedProvinceFilter('All')}
                className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                  selectedProvinceFilter === 'All'
                    ? 'bg-[#1E1B18] text-white'
                    : 'bg-[#F0E6D8] text-[#5C544B] hover:text-[#1E1B18]'
                }`}
              >
                All Region VI
              </button>
              {provincesData.map((p) => (
                <button
                  key={p.name}
                  onClick={() => setSelectedProvinceFilter(p.name as Province)}
                  className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors ${
                    selectedProvinceFilter === p.name
                      ? 'bg-[#BF360C] text-white'
                      : 'bg-[#F0E6D8] text-[#5C544B] hover:text-[#1E1B18]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected / Filtered Diners List with Rating System */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E5DACD] p-5 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#EFE5D8]">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-[#1E1B18] font-['Outfit']">
                    Iconic Local Diners ({filteredDiners.length})
                  </h3>
                  <span className="text-xs text-[#BF360C] font-semibold">
                    {selectedProvinceFilter}
                  </span>
                </div>
                {onAddNewDiner && (
                  <button
                    onClick={onAddNewDiner}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0F4C3A] text-white text-[11px] font-bold hover:bg-[#093527] transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Diner</span>
                  </button>
                )}
              </div>

              {/* Scrollable list of diners */}
              <div className="space-y-3.5 mt-4 max-h-[500px] overflow-y-auto pr-1">
                {filteredDiners.map((diner) => {
                  const isSelected = selectedDiner?.id === diner.id;
                  return (
                    <div
                      key={diner.id}
                      onClick={() => onSelectDiner(diner)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#BF360C] bg-[#FFF8F5] shadow-xs'
                          : 'border-[#E8DDCF] bg-white hover:border-[#BF360C]/50 hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={diner.photo}
                          alt={diner.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#E5DACD]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F4C3A]">
                              {diner.province} · {diner.city}
                            </span>
                            <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              <span>{diner.rating}</span>
                            </div>
                          </div>

                          <h4 className="text-sm font-bold text-[#1E1B18] truncate mt-0.5">
                            {diner.name}
                          </h4>

                          <p className="text-xs text-[#7A6F62] truncate mt-0.5">
                            Specialty: <span className="text-[#BF360C] font-medium">{diner.specialty}</span>
                          </p>

                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-[11px] text-[#8C7D6D]">
                              {diner.reviews.length} Verified Reviews
                            </span>
                            <div className="flex items-center gap-2">
                              {onEditDiner && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onEditDiner(diner);
                                  }}
                                  className="text-[11px] font-bold text-[#706659] hover:text-[#1E1B18] flex items-center gap-1"
                                >
                                  <Edit3 className="w-3 h-3 text-[#BF360C]" />
                                  <span>Edit</span>
                                </button>
                              )}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onOpenReviewModal(diner);
                                }}
                                className="text-[11px] font-bold text-[#BF360C] hover:underline"
                              >
                                + Rate & Review
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Snippet of latest review */}
                      {diner.reviews.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-[#F0E6D8] text-[11px] text-[#635A4F] italic bg-[#FCFAF7] p-2 rounded">
                          "{diner.reviews[0].comment}" — <span className="font-semibold not-italic text-[#1E1B18]">{diner.reviews[0].author}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

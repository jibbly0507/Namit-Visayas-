import React, { useState } from 'react';
import { TravelSpot } from '../types';
import { MapPin, Compass, Lightbulb, Utensils, Info, Sparkles, Edit3, Plus } from 'lucide-react';

interface TravelSpotsProps {
  spots: TravelSpot[];
  onEditSpot?: (spot: TravelSpot) => void;
  onAddNewSpot?: () => void;
}

export const TravelSpots: React.FC<TravelSpotsProps> = ({
  spots,
  onEditSpot,
  onAddNewSpot,
}) => {
  return (
    <section id="spots" className="py-14 sm:py-20 border-b border-[#E8DDCF] bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
              Destination & Gastronomy Fusion
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-1">
              Top Western Visayas Travel Spots & Food Pairings
            </h2>
            <p className="text-sm sm:text-base text-[#685F53] mt-2 max-w-2xl">
              Tourism is intimately woven with local cuisine. Explore famous landmarks across Region VI, complete with cultural fun facts and verified culinary stops.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-end">
            {onAddNewSpot && (
              <button
                onClick={onAddNewSpot}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F4C3A] text-white text-xs font-bold hover:bg-[#093527] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Destination</span>
              </button>
            )}
            <div className="text-xs text-[#7A6F62] italic">
              *All destinations paired with signature local delicacies
            </div>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spots.map((spot) => (
            <div
              key={spot.id}
              className="bg-white rounded-2xl border border-[#E5DACD] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo with gradient scrim */}
                <div className="relative aspect-[16/10] bg-[#EFE8DC] overflow-hidden">
                  <img
                    src={spot.photo}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-white">
                    {spot.province}
                  </div>

                  {/* Quick Edit spot action */}
                  {onEditSpot && (
                    <button
                      onClick={() => onEditSpot(spot)}
                      title="Edit this travel destination"
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-[#1E1B18] shadow-sm text-xs font-bold flex items-center gap-1 opacity-90 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#BF360C]" />
                      <span>Edit Spot</span>
                    </button>
                  )}

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 rounded-lg text-white">
                    <div className="text-[11px] text-amber-300 font-medium truncate flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{spot.location}</span>
                    </div>
                  </div>
                </div>

                {/* Spot Details */}
                <div className="p-5 space-y-3.5">
                  <h3 className="text-lg font-bold text-[#1E1B18] font-['Outfit'] group-hover:text-[#BF360C] transition-colors leading-snug">
                    {spot.name}
                  </h3>

                  <p className="text-xs text-[#524B42] leading-relaxed">
                    {spot.description}
                  </p>

                  {/* Culinary Connection Box */}
                  <div className="p-3 rounded-xl bg-[#FBF7F2] border border-[#EFE5D8] space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#BF360C] flex items-center gap-1">
                      <Utensils className="w-3.5 h-3.5" />
                      <span>Culinary Pairing</span>
                    </div>
                    <div className="text-xs font-medium text-[#1E1B18]">
                      {spot.culinaryConnection}
                    </div>
                  </div>

                  {/* Fun Fact */}
                  <div className="flex items-start gap-2 text-xs text-[#4A433A] bg-[#F2F7F4] p-3 rounded-xl border border-[#CCE5D9]">
                    <Lightbulb className="w-4 h-4 text-[#0F4C3A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#0F4C3A]">Fun Cultural Fact: </span>
                      <span>{spot.funFact}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Travel Tip Footer & Edit Action */}
              <div className="px-5 py-3 bg-[#FAF6F0] border-t border-[#E8DDCF] text-[11px] text-[#7A6F62] flex items-center justify-between">
                <span className="truncate pr-2">Tip: {spot.travelTip}</span>
                {onEditSpot && (
                  <button
                    onClick={() => onEditSpot(spot)}
                    className="text-[#BF360C] font-bold hover:underline shrink-0"
                  >
                    Edit →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

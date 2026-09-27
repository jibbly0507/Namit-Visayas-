import React from 'react';
import { FoodItem } from '../types';
import { Users, Award, Camera, ExternalLink, Sparkles, BookOpen, Edit3 } from 'lucide-react';

interface AboutUsProps {
  items: FoodItem[];
  manifestoTitle?: string;
  manifestoText?: string;
  onSelectFood: (item: FoodItem) => void;
  onEditMember: (item: FoodItem) => void;
  onEditManifesto?: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({
  items,
  manifestoTitle = 'Group 4 Curatorial Commitment',
  manifestoText = 'Every proponent contributed primary culinary research, community interviews, and photo curation to deliver an authentic tourism promotion platform celebrating the deep heritage of Region VI.',
  onSelectFood,
  onEditMember,
  onEditManifesto,
}) => {
  return (
    <section id="about" className="py-14 sm:py-20 border-b border-[#E8DDCF] bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-[#BF360C]">
            Meet the Proponents
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-1">
            Group 4 · Tourism & Promotion Team
          </h2>
          <p className="text-sm sm:text-base text-[#685F53] mt-2">
            Eight passionate student researchers collaborating on <em>"Namit 4 Visayas."</em> Each proponent conducted field and archival research to document and curate one signature delicacy representing the cultural soul of Western Visayas.
          </p>
        </div>

        {/* 8 Members Grid (Clean 4-column layout on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => {
            const member = item.submitter;
            return (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-[#E5DACD] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
              >
                <div>
                  {/* Formal 1x1 Portrait Container */}
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3.5 group/avatar">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#E65100] via-[#F57C00] to-[#0F4C3A] shadow-md">
                        <img
                          src={member.avatar}
                          alt={`${member.name} 1x1 formal picture`}
                          className="w-full h-full rounded-full object-cover bg-[#F0E6D8]"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                          }}
                        />
                      </div>

                      {/* Quick change photo overlay */}
                      <button
                        onClick={() => onEditMember(item)}
                        className="absolute bottom-0 right-0 p-1.5 rounded-full bg-[#1E1B18] text-white hover:bg-[#BF360C] transition-colors shadow-xs"
                        title="Upload/Change 1x1 Photo"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#BF360C]">
                      Member #{idx + 1} · {member.studentNumber || 'Group 4'}
                    </div>

                    <h3 className="text-base font-bold text-[#1E1B18] font-['Outfit'] mt-0.5">
                      {member.name}
                    </h3>

                    <p className="text-xs text-[#706659] font-medium">
                      {member.role}
                    </p>
                  </div>

                  {/* Assigned Food Delicacy */}
                  <div className="mt-4 pt-3 border-t border-[#F0E6D8] space-y-1.5 text-center">
                    <span className="text-[10px] uppercase font-bold text-[#8A7968] tracking-wide">
                      Assigned Food Entry:
                    </span>
                    <button
                      onClick={() => onSelectFood(item)}
                      className="block w-full text-xs font-bold text-[#BF360C] hover:underline truncate"
                      title={item.title}
                    >
                      {item.title} ({item.province})
                    </button>
                  </div>

                  {/* Personal Quote / Reflection */}
                  {member.quote && (
                    <p className="mt-3 text-[11px] text-[#635A4F] italic text-center leading-relaxed bg-[#FCFAF7] p-2.5 rounded-lg border border-[#F2E8DC]">
                      "{member.quote}"
                    </p>
                  )}
                </div>

                {/* Bottom Action */}
                <div className="mt-4 pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs">
                  <button
                    onClick={() => onEditMember(item)}
                    className="text-[11px] text-[#BF360C] hover:text-[#7A1F00] font-bold flex items-center gap-1"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => onSelectFood(item)}
                    className="text-[11px] font-bold text-[#0F4C3A] hover:underline"
                  >
                    View Food →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Group Collaboration Manifesto */}
        <div className="mt-12 bg-white rounded-2xl border border-[#E5DACD] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs relative group">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#0F4C3A] uppercase tracking-wide">
              <Award className="w-4 h-4" />
              <span>Attribution & Heritage Documentation</span>
              {onEditManifesto && (
                <button
                  onClick={onEditManifesto}
                  className="ml-2 text-[11px] font-semibold text-[#BF360C] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Commitment</span>
                </button>
              )}
            </div>
            <h4 className="text-lg font-bold text-[#1E1B18] font-['Outfit']">
              {manifestoTitle}
            </h4>
            <p className="text-xs sm:text-sm text-[#5C544B] leading-relaxed">
              {manifestoText}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <div className="text-xs font-bold text-[#1E1B18]">Group 4 Roster</div>
              <div className="text-[11px] text-[#7A6F62]">{items.length} / {items.length} Fully Attributed</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#EDF7F2] text-[#0F4C3A] flex items-center justify-center font-bold">
              ✓
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

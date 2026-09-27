import React, { useState } from 'react';
import { ReferenceItem } from '../types';
import { BookOpen, Camera, ExternalLink, Globe, FileText, Search, Sparkles, Edit3, Plus } from 'lucide-react';

interface ReferencesSectionProps {
  references: ReferenceItem[];
  onEditReference?: (ref: ReferenceItem) => void;
  onAddNewReference?: () => void;
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({
  references,
  onEditReference,
  onAddNewReference,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [query, setQuery] = useState('');

  const categories = [
    'All',
    'Official Tourism Portal',
    'Culinary Lore & History',
    'Photo Credit & Imagery',
    'Heritage Documentation',
  ];

  const filteredReferences = references.filter((ref) => {
    const matchesCat = selectedCategory === 'All' || ref.category === selectedCategory;
    const matchesQuery =
      ref.title.toLowerCase().includes(query.toLowerCase()) ||
      ref.description.toLowerCase().includes(query.toLowerCase()) ||
      ref.authorOrSource.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <section id="references" className="py-14 sm:py-20 border-b border-[#E8DDCF] bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BF360C]/10 text-[#BF360C] text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Online Credits & Citations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-1">
            References & Photo Credits
          </h2>
          <p className="text-sm sm:text-base text-[#685F53] mt-2">
            Full attribution for photographs, culinary descriptions, regional tourism registries, and multimedia assets referenced across Western Visayas (Region VI).
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 border-b border-[#EADFCF]">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                  selectedCategory === cat
                    ? 'bg-[#BF360C] text-white border-[#BF360C] shadow-xs'
                    : 'bg-white text-[#5C544B] border-[#DCD3C7] hover:border-[#BF360C] hover:text-[#BF360C]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box & Add Reference */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            {onAddNewReference && (
              <button
                onClick={onAddNewReference}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#0F4C3A] text-white text-xs font-bold hover:bg-[#093527] transition-colors shrink-0 shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Reference</span>
              </button>
            )}

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F73]" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reference or credit..."
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#DCD3C7] rounded-xl focus:ring-2 focus:ring-[#E65100]/30 focus:border-[#E65100] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Photo Attribution Notice Banner */}
        <div className="p-5 rounded-2xl bg-[#FFF8F2] border border-[#F3D7C5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#BF360C] text-white flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#1E1B18]">
                Photography & Visual Attribution Policy
              </h4>
              <p className="text-xs text-[#5C544B] mt-0.5 leading-relaxed">
                Images on this website are sourced from licensed Philippine culinary archives, creative commons food photographers, official DOT portals, and primary member submissions. All credits remain with their respective copyright holders.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-xs font-bold text-[#BF360C]">
            Creative Commons & Fair Use
          </div>
        </div>

        {/* References Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredReferences.map((ref) => (
            <div
              key={ref.id}
              className="bg-white rounded-2xl border border-[#E5DACD] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all space-y-3 flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#BF360C] uppercase tracking-wider text-[10px] bg-[#FBE8DE] px-2 py-0.5 rounded">
                    {ref.category}
                  </span>
                  <div className="flex items-center gap-2">
                    {ref.year && (
                      <span className="text-[#8C7D6D] tabular-nums text-xs">
                        {ref.year}
                      </span>
                    )}
                    {onEditReference && (
                      <button
                        onClick={() => onEditReference(ref)}
                        className="text-[11px] font-bold text-[#BF360C] hover:text-[#7A1F00] flex items-center gap-1"
                        title="Edit citation or source"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit</span>
                      </button>
                    )}
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#1E1B18] font-['Outfit'] leading-snug group-hover:text-[#BF360C] transition-colors">
                  {ref.title}
                </h3>

                <p className="text-xs text-[#7A6F62] font-medium">
                  Source: <span className="text-[#1E1B18]">{ref.authorOrSource}</span>
                </p>

                <p className="text-xs text-[#524B42] leading-relaxed pt-1">
                  {ref.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F0E6D8] flex items-center justify-between text-xs font-semibold text-[#0F4C3A]">
                <a
                  href={ref.url || '#'}
                  target={ref.url ? '_blank' : undefined}
                  rel={ref.url ? 'noopener noreferrer' : undefined}
                  className="truncate pr-2 hover:underline flex items-center gap-1.5"
                >
                  <span>{ref.linkText}</span>
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-[#0F4C3A]" />
                </a>
                {onEditReference && (
                  <button
                    onClick={() => onEditReference(ref)}
                    className="text-[#706659] hover:text-[#1E1B18] text-[11px] font-medium"
                  >
                    Edit Credit
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

import React, { useState } from 'react';
import { FoodItem, Province } from '../types';
import { Search, SlidersHorizontal, Eye, Edit3, Star, CheckCircle, Sparkles, LayoutGrid, List, Plus } from 'lucide-react';

interface FoodGalleryProps {
  items: FoodItem[];
  introStory?: string;
  onSelectItem: (item: FoodItem) => void;
  onEditItem: (item: FoodItem) => void;
  onEditStory?: () => void;
  onAddNewDish?: () => void;
}

export const FoodGallery: React.FC<FoodGalleryProps> = ({
  items,
  introStory,
  onSelectItem,
  onEditItem,
  onEditStory,
  onAddNewDish,
}) => {
  const [selectedProvince, setSelectedProvince] = useState<Province>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewStyle, setViewStyle] = useState<'gallery' | 'detailed'>('gallery');

  const provinces: Province[] = [
    'All',
    'Iloilo',
    'Negros Occidental',
    'Guimaras',
    'Capiz',
    'Aklan',
  ];

  const filteredItems = items.filter((item) => {
    const matchesProvince =
      selectedProvince === 'All' || item.province === selectedProvince;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.submitter.name.toLowerCase().includes(query) ||
      item.province.toLowerCase().includes(query);
    return matchesProvince && matchesSearch;
  });

  return (
    <section id="gallery" className="py-14 sm:py-20 border-b border-[#E8DDCF] bg-[#FCFAF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Warm Visayas Introduction */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="relative group">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#BF360C]">
              <span>Heirloom Culinary Traditions</span>
              <span aria-hidden="true">·</span>
              <span>Region VI · Western Visayas</span>
              <span aria-hidden="true">·</span>
              <span>Curated by Group 4</span>
              {onEditStory && (
                <button
                  onClick={onEditStory}
                  className="ml-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#BF360C] hover:underline"
                  title="Edit Introduction Story"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Story</span>
                </button>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-1 tracking-tight">
              Western Visayas Food Gallery
            </h2>
            <p className="text-sm sm:text-base text-[#685F53] mt-2 max-w-3xl leading-relaxed">
              {introStory || (
                <>
                  <em>Maayong pag-abot!</em> Step into Western Visayas—a blessed archipelago of verdant hills, azure seas, and sunlit sugarlands where food is the very heartbeat of home. From the soothing warmth of slow-simmered Ilonggo broth to the smoky sizzle of Bacolod barbecues, the sweetness of Guimaras groves, and the bountiful seafood of Capiz shores, every single dish carries the deep affection, generosity, and pride of the Visayan table.
                </>
              )}
            </p>
          </div>

          {/* View Mode Toggle Controls & Add Dish button */}
          <div className="flex items-center gap-2.5">
            {onAddNewDish && (
              <button
                onClick={onAddNewDish}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#0F4C3A] text-white text-xs font-bold hover:bg-[#093527] transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Dish</span>
              </button>
            )}

            <div className="inline-flex items-center p-1 bg-[#EFE6D9] rounded-xl border border-[#DCD3C7]">
              <button
                onClick={() => setViewStyle('gallery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewStyle === 'gallery'
                    ? 'bg-white text-[#1E1B18] shadow-xs'
                    : 'text-[#685F53] hover:text-[#1E1B18]'
                }`}
                title="Simple Gallery Review View"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery View</span>
              </button>
              <button
                onClick={() => setViewStyle('detailed')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  viewStyle === 'detailed'
                    ? 'bg-white text-[#1E1B18] shadow-xs'
                    : 'text-[#685F53] hover:text-[#1E1B18]'
                }`}
                title="Detailed View"
              >
                <List className="w-3.5 h-3.5" />
                <span>Detailed View</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar & Search Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-8 mb-4 border-b border-[#EADFCF]/70">
          {/* Province Filter Tabs (Interactive filter buttons) */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {provinces.map((prov) => {
              const active = selectedProvince === prov;
              return (
                <button
                  key={prov}
                  onClick={() => setSelectedProvince(prov)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors border ${
                    active
                      ? 'bg-[#BF360C] text-white border-[#BF360C] shadow-xs'
                      : 'bg-white text-[#5C544B] border-[#DCD3C7] hover:border-[#BF360C] hover:text-[#BF360C]'
                  }`}
                >
                  {prov}
                  {prov === 'All' && ` (${items.length})`}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A7F73]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search food, member, or origin..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[#DCD3C7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E65100]/30 focus:border-[#E65100] transition-all text-[#1E1B18] placeholder-[#9E9387]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8A7F73] hover:text-[#1E1B18]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* 8-Food Grid Showcase */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E5DACD] p-8">
            <p className="text-base font-semibold text-[#1E1B18]">No dishes found</p>
            <p className="text-xs text-[#706659] mt-1">Try resetting your province filter or search term.</p>
            <button
              onClick={() => {
                setSelectedProvince('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold bg-[#E65100] text-white rounded-lg hover:bg-[#BF360C]"
            >
              Reset Filters
            </button>
          </div>
        ) : viewStyle === 'gallery' ? (
          /* Simple Gallery Review View (Requested by user: simple gallery view for easy review) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5DACD] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Photo of the Food with Styled Fallback */}
                  <div className="relative aspect-[4/3] bg-[#EFE8DC] overflow-hidden">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-semibold text-white">
                      {item.province}
                    </div>

                    {/* Quick photo change action */}
                    <button
                      onClick={() => onEditItem(item)}
                      title="Change Food Photo or Member Avatar"
                      className="absolute bottom-2.5 right-2.5 p-1.5 rounded-lg bg-white/90 hover:bg-white text-[#1E1B18] shadow-sm text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#BF360C]" />
                      <span className="text-[10px]">Change</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-3">
                    {/* Submitter Credit Corner / Box (As requested: formal 1x1 circle profile + name) */}
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FBF7F2] border border-[#EFE5D8]">
                      <div className="relative shrink-0">
                        <img
                          src={item.submitter.avatar}
                          alt={`${item.submitter.name} 1x1 profile`}
                          className="w-9 h-9 rounded-full object-cover border-2 border-[#E65100] shadow-2xs"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-[#BF360C] truncate">
                          Submitted By
                        </div>
                        <div className="text-xs font-bold text-[#1E1B18] truncate">
                          {item.submitter.name}
                        </div>
                        <div className="text-[10px] text-[#7A6F62] truncate">
                          Group 4 Member
                        </div>
                      </div>
                    </div>

                    {/* Title of the food */}
                    <div>
                      <h3 className="text-base font-bold text-[#1E1B18] font-['Outfit'] group-hover:text-[#BF360C] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#8C7D6D] italic">
                        {item.originPlace}
                      </p>
                    </div>

                    {/* Description of the food */}
                    <p className="text-xs text-[#524B42] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    {/* Best Pairing Callout */}
                    <div className="pt-2 border-t border-[#F0E6D8] text-[11px] text-[#7A6F62] bg-[#FAF6F0] p-2 rounded-lg">
                      <span className="font-bold text-[#BF360C]">Best Paired With: </span>
                      <span className="text-[#3E3832] font-medium line-clamp-2">{item.bestPairing}</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => onSelectItem(item)}
                    className="flex-1 py-2 px-3 text-xs font-semibold text-center text-[#1E1B18] bg-[#F5EDE2] hover:bg-[#EFE3D3] rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#E65100]" />
                    <span>View Heritage Details</span>
                  </button>
                  <button
                    onClick={() => onEditItem(item)}
                    title="Change Photos or Details"
                    className="p-2 text-xs font-medium text-[#7A6F62] hover:text-[#BF360C] bg-[#FBF7F2] border border-[#E8DDCF] rounded-lg transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Detailed Magazine View */
          <div className="space-y-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#E5DACD] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Photo Column */}
                <div className="md:col-span-5 relative aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden bg-[#EFE8DC]">
                  <img
                    src={item.photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-white">
                    {item.province}
                  </div>
                  <button
                    onClick={() => onEditItem(item)}
                    className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-white/95 text-xs font-semibold text-[#1E1B18] shadow-sm flex items-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#BF360C]" />
                    <span>Edit Photo</span>
                  </button>
                </div>

                {/* Content Column */}
                <div className="md:col-span-7 space-y-4">
                  {/* Credit Bar: Submitter Name + 1x1 Profile Avatar */}
                  <div className="flex items-center justify-between pb-3 border-b border-[#EFE5D8]">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.submitter.avatar}
                        alt={`${item.submitter.name} 1x1 avatar`}
                        className="w-10 h-10 rounded-full object-cover border-2 border-[#E65100]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="text-xs font-bold text-[#1E1B18]">
                          {item.submitter.name}
                        </div>
                        <div className="text-[11px] text-[#7A6F62]">
                          Group 4 Member · {item.submitter.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-[#0F4C3A]">
                        {item.rating} ★
                      </span>
                      <span className="text-[11px] text-[#8C7D6D] ml-1">
                        ({item.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-[#1E1B18] font-['Outfit']">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#8C7D6D] font-medium mt-0.5">
                      {item.nativeTitle} · {item.originPlace}
                    </p>
                  </div>

                  <p className="text-sm text-[#524B42] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Flavor Profile Tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#685F53]">
                    <span className="font-semibold text-[#1E1B18]">Key Flavors:</span>
                    {item.flavorProfile.map((fl, fIdx) => (
                      <span key={fIdx} className="bg-[#F5EDE2] px-2 py-0.5 rounded text-[11px] font-medium text-[#7D4F27]">
                        {fl}
                      </span>
                    ))}
                  </div>

                  {/* Best Pairing & Ingredients summary */}
                  <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#EFE5D8] text-xs space-y-1">
                    <div>
                      <span className="font-bold text-[#BF360C]">Traditional Pairing: </span>
                      <span className="text-[#3E3832]">{item.bestPairing}</span>
                    </div>
                    <div className="text-[11px] text-[#7A6F62] truncate">
                      <span className="font-semibold text-[#1E1B18]">Authentic Ingredients: </span>
                      <span>{item.keyIngredients.slice(0, 4).join(', ')}...</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => onSelectItem(item)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Culinary History</span>
                    </button>
                    <button
                      onClick={() => onEditItem(item)}
                      className="px-3 py-2 text-xs font-medium text-[#4A433A] bg-[#F5EDE2] hover:bg-[#EFE3D3] rounded-lg transition-colors"
                    >
                      Edit Entry
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

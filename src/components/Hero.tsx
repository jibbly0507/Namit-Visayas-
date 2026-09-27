import React from 'react';
import { FoodItem, SiteConfig } from '../types';
import { extractYouTubeId } from '../data/initialData';
import { Compass, ArrowRight, UtensilsCrossed, Sparkles, MapPin, Edit3, Youtube } from 'lucide-react';

interface HeroProps {
  batchoyItem?: FoodItem;
  siteConfig?: SiteConfig;
  onExploreFood: () => void;
  onOpenMap: () => void;
  onEditHeader?: () => void;
  onEditDish?: (item: FoodItem) => void;
}

export const Hero: React.FC<HeroProps> = ({
  batchoyItem,
  siteConfig,
  onExploreFood,
  onOpenMap,
  onEditHeader,
  onEditDish,
}) => {
  // Use batchoy item from user state or fallback to default
  const batchoyPhoto =
    batchoyItem?.photo ||
    'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1200&q=80';
  const batchoyTitle = batchoyItem?.title || 'La Paz Batchoy';
  const batchoyOrigin = batchoyItem?.originPlace || 'La Paz Public Market, Iloilo City';
  const submitterName = batchoyItem?.submitter?.name || 'Althea Mae Santos';
  const submitterAvatar =
    batchoyItem?.submitter?.avatar ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80';

  // Config values
  const greeting = siteConfig?.welcomeGreeting || 'Maayong adlaw! Welcome to Western Visayas';
  const title = siteConfig?.siteTitle || 'Namit 4 Visayas';
  const subtitle =
    siteConfig?.siteSubtitle ||
    '"Maayong pag-abot sa amon banwa!" Step into Region VI—where the heart of Philippine hospitality meets legendary heirloom flavors across Panay Island, Guimaras, and Negros Occidental.';
  const videoId = extractYouTubeId(siteConfig?.youtubeVideoUrl || 'PB1_maFyzp8');
  const videoCaption =
    siteConfig?.videoCaption ||
    'Discover the sights, heritage streets, and cultural wonders of Western Visayas';

  return (
    <section className="relative overflow-hidden pt-6 pb-16 md:pt-10 md:pb-20 border-b border-[#E8DDCF]">
      {/* Background Hablon inspired geometric accents and warm lighting */}
      <div className="absolute top-0 right-0 -z-10 w-96 md:w-[600px] h-96 md:h-[600px] bg-gradient-to-bl from-[#FFB300]/15 via-[#E65100]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 md:w-[500px] h-80 md:h-[500px] bg-gradient-to-tr from-[#0F4C3A]/10 via-[#F57C00]/8 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Top Welcome Banner with Traditional Language Greeting (Maayong adlaw) */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative group">
          {/* Quick Edit Header Action */}
          {onEditHeader && (
            <button
              onClick={onEditHeader}
              className="absolute -top-3 right-0 sm:right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/90 hover:bg-white text-[#BF360C] border border-[#E8DDCF] shadow-xs transition-colors"
              title="Edit Banner, Title, Video & Story"
            >
              <Edit3 className="w-3 h-3 text-[#E65100]" />
              <span className="hidden sm:inline">Edit Header & Video</span>
            </button>
          )}

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#BF360C]/10 via-[#E65100]/15 to-[#0F4C3A]/10 border border-[#E65100]/25 text-[#BF360C] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#E65100] animate-pulse" />
            <span>{greeting}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1E1B18] tracking-tight font-['Outfit']">
            {title.includes('4') ? (
              <>
                {title.split('4')[0]}
                <span className="text-[#E65100]">4</span>
                {title.split('4').slice(1).join('4')}
              </>
            ) : (
              title
            )}
          </h1>

          <p className="text-base sm:text-lg text-[#5A5248] leading-relaxed mt-2 max-w-2xl">
            {subtitle}
          </p>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={onExploreFood}
              className="px-6 py-3 text-sm font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-xl shadow-md shadow-orange-950/15 transition-all flex items-center gap-2 active:scale-[0.98]"
            >
              <span>Explore Western Visayas Dishes</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenMap}
              className="px-5 py-3 text-sm font-semibold text-[#302B25] bg-white hover:bg-[#F5ECE1] border border-[#DCD3C7] rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#0F4C3A]" />
              <span>Interactive Diner Map</span>
            </button>
          </div>
        </div>

        {/* Video Header of Western Visayas */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E5DACD] bg-black shadow-xl group">
          <div className="relative aspect-video max-h-[500px] w-full">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=0`}
              title="Western Visayas Tourism Video Header"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="px-5 py-3 bg-[#1C1917] text-white/80 border-t border-white/10 flex flex-wrap items-center justify-between text-xs gap-2">
            <div className="flex items-center gap-2">
              <span className="font-bold text-amber-400">Featured Video:</span>
              <span>{videoCaption}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] text-white/60">
                Region VI · Panay, Guimaras & Negros Occidental
              </span>
              {onEditHeader && (
                <button
                  onClick={onEditHeader}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium flex items-center gap-1 transition-colors"
                >
                  <Youtube className="w-3 h-3 text-red-400" />
                  <span>Change Video</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Showcase Grid: Featured Batchoy Card + Cultural Story Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left Column: Featured Dish (La Paz Batchoy with updated photo) */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-lg border border-[#E5DACD] relative overflow-hidden group">
              <div className="aspect-[16/10] sm:aspect-[4/3] rounded-xl overflow-hidden relative bg-[#F0E6D8]">
                <img
                  src={batchoyPhoto}
                  alt={batchoyTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1617093727343-374698b1b08d?auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                {/* Province badge */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white tracking-wide border border-white/20">
                  Featured Ilonggo Dish
                </div>

                {/* Quick Edit dish button on hover */}
                {batchoyItem && onEditDish && (
                  <button
                    onClick={() => onEditDish(batchoyItem)}
                    className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-white/90 hover:bg-white text-xs font-bold text-[#1E1B18] shadow-sm flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity"
                    title="Edit La Paz Batchoy Photo, Name & Details"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#BF360C]" />
                    <span>Edit Dish</span>
                  </button>
                )}

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-amber-300 font-medium">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{batchoyOrigin}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-['Outfit'] leading-snug mt-0.5">
                    {batchoyTitle}
                  </h3>
                </div>
              </div>

              {/* Submitter Credit Footer Preview (Displays whatever name/photo user set) */}
              <div className="mt-4 flex items-center justify-between px-1 py-1">
                <div className="flex items-center gap-2.5">
                  <img
                    src={submitterAvatar}
                    alt={`${submitterName} profile`}
                    className="w-9 h-9 rounded-full object-cover border-2 border-[#E65100] shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#1E1B18]">
                      {submitterName}
                    </div>
                    <div className="text-[11px] text-[#7A6F62]">
                      Food Curator · Group 4
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {batchoyItem && onEditDish && (
                    <button
                      onClick={() => onEditDish(batchoyItem)}
                      className="text-xs font-bold text-[#706659] hover:text-[#1E1B18]"
                    >
                      Change Photo
                    </button>
                  )}
                  <button
                    onClick={onExploreFood}
                    className="text-xs font-bold text-[#BF360C] hover:underline"
                  >
                    View in Gallery →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cultural Welcome & Island Highlights */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F4C3A]">
                The Culinary Heart of Panay & Negros
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] font-['Outfit']">
                A Feast of Traditions, Sea Breezes & Sugarcane Sweetness
              </h2>
              <p className="text-sm text-[#5C544B] leading-relaxed">
                Western Visayas is blessed with a diverse culinary landscape shaped by clean coastal waters, fertile volcanic soil, and sun-drenched orchards. From the smoky barbecue aroma of Bacolod's Manokan Country to the golden sweetness of Guimaras mangoes and the pristine seafood of Capiz, our food is a reflection of joy and community.
              </p>
            </div>

            {/* Cultural Highlights Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white border border-[#E5DACD] text-center">
                <div className="text-xl font-extrabold text-[#BF360C] font-['Outfit']">
                  6
                </div>
                <div className="text-[11px] font-medium text-[#706659] mt-0.5">
                  Provinces
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E5DACD] text-center">
                <div className="text-xl font-extrabold text-[#0F4C3A] font-['Outfit']">
                  Heirloom
                </div>
                <div className="text-[11px] font-medium text-[#706659] mt-0.5">
                  Recipes
                </div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#E5DACD] text-center">
                <div className="text-xl font-extrabold text-[#E65100] font-['Outfit']">
                  Namit Gid
                </div>
                <div className="text-[11px] font-medium text-[#706659] mt-0.5">
                  Hospitality
                </div>
              </div>
            </div>

            {/* Cultural Callout Card */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#E8DDCF] flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#FBE8DE] text-[#BF360C] flex items-center justify-center shrink-0 mt-0.5">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#1E1B18]">
                  "Namit gid ang pagkaon sa Visayas!"
                </div>
                <div className="text-xs text-[#6E6457] mt-0.5 leading-relaxed">
                  In Hiligaynon, <em>"Namit"</em> speaks not just of taste, but of love, shared laughter, and generosity poured into every meal.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

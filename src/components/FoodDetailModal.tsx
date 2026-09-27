import React from 'react';
import { FoodItem } from '../types';
import { X, ChefHat, Sparkles } from 'lucide-react';

interface FoodDetailModalProps {
  item: FoodItem | null;
  onClose: () => void;
  onEdit: (item: FoodItem) => void;
}

export const FoodDetailModal: React.FC<FoodDetailModalProps> = ({
  item,
  onClose,
  onEdit,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E5DACD] max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DDCF] bg-[#FCFAF7]">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#BF360C]">
              {item.province}
            </span>
            <span aria-hidden="true" className="text-[#BF360C]">·</span>
            <span className="text-xs text-[#706659] font-medium">
              Submitted by {item.submitter.name}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#706659] hover:text-[#1E1B18] hover:bg-[#EFE5D8] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Visual & Title */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden bg-[#F0E6D8] border border-[#E8DDCF]">
              <img
                src={item.photo}
                alt={item.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-2 right-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white/90 hover:bg-white text-[#1E1B18] shadow-xs"
                >
                  Change Photo
                </button>
              </div>
            </div>

            <div className="md:col-span-6 space-y-3">
              <div>
                <span className="text-xs font-semibold text-[#8C7D6D] uppercase">
                  {item.originPlace}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E1B18] font-['Outfit'] mt-0.5">
                  {item.title}
                </h2>
                <p className="text-xs text-[#BF360C] font-semibold italic mt-0.5">
                  "{item.nativeTitle}"
                </p>
              </div>

              {/* Submitter Formal 1x1 Credit Profile Box */}
              <div className="p-3.5 rounded-xl bg-[#FCFAF7] border border-[#EFE5D8] flex items-center gap-3">
                <img
                  src={item.submitter.avatar}
                  alt={`${item.submitter.name} 1x1 formal picture`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#E65100] shadow-xs"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-[#BF360C]">
                    Group 4 Presenter & Curator
                  </div>
                  <div className="text-sm font-bold text-[#1E1B18]">
                    {item.submitter.name}
                  </div>
                  <div className="text-xs text-[#7A6F62]">
                    {item.submitter.role} · ID: {item.submitter.studentNumber || 'Group 4'}
                  </div>
                </div>
              </div>

              {item.submitter.quote && (
                <div className="text-xs italic text-[#635A4F] bg-[#F7F0E6] p-3 rounded-lg border-l-4 border-[#E65100]">
                  "{item.submitter.quote}"
                </div>
              )}
            </div>
          </div>

          {/* Description & Cultural Story */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-[#1E1B18] uppercase tracking-wide">
              Culinary Description & Flavors
            </h4>
            <p className="text-sm text-[#4A433A] leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="space-y-3 p-4 bg-[#FAF5EE] rounded-xl border border-[#EADFCF]">
            <h4 className="text-sm font-bold text-[#0F4C3A] uppercase tracking-wide flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              <span>Cultural Heritage & Significance in Western Visayas</span>
            </h4>
            <p className="text-sm text-[#524B42] leading-relaxed">
              {item.culturalBackground}
            </p>
          </div>

          {/* Key Ingredients & Pairings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-[#E5DACD] space-y-2">
              <h5 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wide">
                Key Ingredients & Preparation
              </h5>
              <ul className="text-xs text-[#5C544B] space-y-1 list-disc pl-4">
                {item.keyIngredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-white border border-[#E5DACD] space-y-2">
              <h5 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wide">
                Best Pairing & Serving Style
              </h5>
              <p className="text-xs text-[#5C544B] leading-relaxed">
                {item.bestPairing}
              </p>
              <div className="pt-2 border-t border-[#F0E6D8]">
                <div className="text-[11px] font-semibold text-[#BF360C]">
                  Fun Cultural Fact:
                </div>
                <div className="text-xs text-[#6E6457] mt-0.5">
                  {item.funFact}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#FCFAF7] border-t border-[#E8DDCF] flex items-center justify-between">
          <button
            onClick={() => onEdit(item)}
            className="text-xs font-semibold text-[#BF360C] hover:underline"
          >
            Edit Entry Details
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#1E1B18] hover:bg-black rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

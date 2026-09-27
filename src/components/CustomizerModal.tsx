import React, { useState } from 'react';
import { FoodItem } from '../types';
import { X, Upload, Image, User, Check, RefreshCw, Sparkles } from 'lucide-react';

interface CustomizerModalProps {
  isOpen: boolean;
  items: FoodItem[];
  activeItem: FoodItem | null;
  onClose: () => void;
  onSaveItem: (updatedItem: FoodItem) => void;
  onResetAll: () => void;
}

export const CustomizerModal: React.FC<CustomizerModalProps> = ({
  isOpen,
  items,
  activeItem,
  onClose,
  onSaveItem,
  onResetAll,
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    activeItem ? activeItem.id : items[0]?.id || ''
  );

  const currentItem = items.find((i) => i.id === selectedId) || items[0];

  // Editable Form State
  const [foodTitle, setFoodTitle] = useState(currentItem?.title || '');
  const [foodPhoto, setFoodPhoto] = useState(currentItem?.photo || '');
  const [foodDescription, setFoodDescription] = useState(currentItem?.description || '');
  const [originPlace, setOriginPlace] = useState(currentItem?.originPlace || '');
  const [keyIngredientsText, setKeyIngredientsText] = useState(
    currentItem?.keyIngredients?.join('\n') || ''
  );
  const [bestPairing, setBestPairing] = useState(currentItem?.bestPairing || '');
  const [memberName, setMemberName] = useState(currentItem?.submitter.name || '');
  const [memberRole, setMemberRole] = useState(currentItem?.submitter.role || '');
  const [memberAvatar, setMemberAvatar] = useState(currentItem?.submitter.avatar || '');
  const [memberQuote, setMemberQuote] = useState(currentItem?.submitter.quote || '');
  const [statusMsg, setStatusMsg] = useState('');

  // When switching selected food in dropdown
  const handleSelectFood = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;
    setSelectedId(id);
    setFoodTitle(item.title);
    setFoodPhoto(item.photo);
    setFoodDescription(item.description);
    setOriginPlace(item.originPlace);
    setKeyIngredientsText(item.keyIngredients?.join('\n') || '');
    setBestPairing(item.bestPairing || '');
    setMemberName(item.submitter.name);
    setMemberRole(item.submitter.role);
    setMemberAvatar(item.submitter.avatar);
    setMemberQuote(item.submitter.quote || '');
    setStatusMsg('');
  };

  // Helper for file upload to data URL
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'food' | 'avatar'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (type === 'food') {
        setFoodPhoto(result);
      } else {
        setMemberAvatar(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentItem) return;

    const parsedIngredients = keyIngredientsText
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const updated: FoodItem = {
      ...currentItem,
      title: foodTitle.trim() || currentItem.title,
      photo: foodPhoto.trim() || currentItem.photo,
      description: foodDescription.trim() || currentItem.description,
      originPlace: originPlace.trim() || currentItem.originPlace,
      keyIngredients: parsedIngredients.length > 0 ? parsedIngredients : currentItem.keyIngredients,
      bestPairing: bestPairing.trim() || currentItem.bestPairing,
      submitter: {
        ...currentItem.submitter,
        name: memberName.trim() || currentItem.submitter.name,
        role: memberRole.trim() || currentItem.submitter.role,
        avatar: memberAvatar.trim() || currentItem.submitter.avatar,
        quote: memberQuote.trim() || currentItem.submitter.quote,
      },
    };

    onSaveItem(updated);
    setStatusMsg('Changes saved successfully to your website!');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  if (!isOpen || !currentItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E5DACD] max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DDCF] bg-[#FCFAF7] flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#BF360C]">
              Photo & Content Customizer
            </div>
            <h3 className="text-lg font-bold text-[#1E1B18] font-['Outfit']">
              Personalize Your Group 4 Submissions
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#706659] hover:text-[#1E1B18] hover:bg-[#EFE5D8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Food Selector Dropdown */}
        <div className="px-6 py-3 bg-[#FAF6F0] border-b border-[#E8DDCF] flex flex-wrap items-center justify-between gap-3">
          <label className="text-xs font-bold text-[#1E1B18]">Select Food Entry to Edit:</label>
          <select
            value={selectedId}
            onChange={(e) => handleSelectFood(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold bg-white border border-[#DCD3C7] rounded-lg text-[#1E1B18] focus:ring-2 focus:ring-[#E65100]/30 outline-none"
          >
            {items.map((item, idx) => (
              <option key={item.id} value={item.id}>
                #{idx + 1}: {item.title} ({item.submitter.name})
              </option>
            ))}
          </select>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
          {statusMsg && (
            <div className="p-3 bg-[#E8F5E9] text-[#2E7D32] text-xs font-bold rounded-xl flex items-center gap-2">
              <Check className="w-4 h-4 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {/* Section 1: Food Details & Photo */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] flex items-center gap-1.5">
              <Image className="w-4 h-4 text-[#BF360C]" />
              <span>1. Food Entry Details & Picture</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Food Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={foodTitle}
                  onChange={(e) => setFoodTitle(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Origin Place / City
                </label>
                <input
                  type="text"
                  value={originPlace}
                  onChange={(e) => setOriginPlace(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Food Photo Controls (Upload or URL) */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#1E1B18]">
                  Food Photo (Paste URL or Upload File)
                </label>
                {foodPhoto && (
                  <span className="text-[10px] text-[#0F4C3A] font-semibold">
                    ✓ Image Loaded
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={foodPhoto}
                  alt="Food preview"
                  className="w-16 h-14 object-cover rounded-lg border border-[#DCD3C7] shrink-0 bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="url"
                    value={foodPhoto}
                    onChange={(e) => setFoodPhoto(e.target.value)}
                    placeholder="Paste image link (e.g. https://...)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                      <Upload className="w-3 h-3 text-[#BF360C]" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'food')}
                      />
                    </label>
                    <span className="text-[10px] text-[#8C7D6D]">
                      Upload your actual practical exam photo
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                Description of the Food *
              </label>
              <textarea
                required
                rows={3}
                value={foodDescription}
                onChange={(e) => setFoodDescription(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Key Ingredients (One ingredient per line)
                </label>
                <textarea
                  rows={4}
                  value={keyIngredientsText}
                  onChange={(e) => setKeyIngredientsText(e.target.value)}
                  placeholder="Enter authentic ingredients (one per line)..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Best Pairing & Serving Style
                </label>
                <textarea
                  rows={4}
                  value={bestPairing}
                  onChange={(e) => setBestPairing(e.target.value)}
                  placeholder="e.g. Warm Puto Manapla and extra broth..."
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100] resize-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Member Attribution & 1x1 Photo */}
          <div className="space-y-4 pt-4 border-t border-[#E8DDCF]">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#1E1B18] flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#0F4C3A]" />
              <span>2. Submitter Credit & Formal 1x1 Picture</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Member's Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                  Project Role
                </label>
                <input
                  type="text"
                  value={memberRole}
                  onChange={(e) => setMemberRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                />
              </div>
            </div>

            {/* Member 1x1 Picture Controls */}
            <div className="p-4 rounded-xl bg-[#FAF6F0] border border-[#EADFCF] space-y-3">
              <label className="text-xs font-bold text-[#1E1B18]">
                Formal 1x1 Circular Picture (Paste URL or Upload Picture)
              </label>

              <div className="flex items-center gap-3">
                <img
                  src={memberAvatar}
                  alt="Member Avatar preview"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#E65100] shrink-0 bg-white"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
                  }}
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="url"
                    value={memberAvatar}
                    onChange={(e) => setMemberAvatar(e.target.value)}
                    placeholder="Paste avatar URL..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                  />
                  <div className="flex items-center gap-2">
                    <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-[#1E1B18] bg-white hover:bg-[#F0E6D8] border border-[#DCD3C7] rounded-md transition-colors">
                      <Upload className="w-3 h-3 text-[#0F4C3A]" />
                      <span>Upload 1x1 Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload(e, 'avatar')}
                      />
                    </label>
                    <span className="text-[10px] text-[#8C7D6D]">
                      Upload your formal school portrait
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A433A] mb-1">
                Personal Food Reflection / Quote
              </label>
              <input
                type="text"
                value={memberQuote}
                onChange={(e) => setMemberQuote(e.target.value)}
                placeholder="A short reflection about the dish or Western Visayas culture"
                className="w-full px-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-[#E8DDCF] flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={onResetAll}
              className="text-xs font-semibold text-[#BF360C] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All to Original Visayas Data</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#706659] hover:bg-[#F2EAE0] rounded-lg"
              >
                Close
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

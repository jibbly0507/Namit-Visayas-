import React, { useState, useEffect } from 'react';
import { FoodItem } from '../types';
import { compressImageFile, compressAvatarFile } from '../utils/imageCompression';
import { X, Upload, Check, Link as LinkIcon, Image as ImageIcon, Sparkles, Loader2 } from 'lucide-react';

interface QuickPhotoModalProps {
  isOpen: boolean;
  item: FoodItem | null;
  mode?: 'food' | 'avatar';
  onClose: () => void;
  onSavePhoto: (updatedItem: FoodItem) => void;
  onOpenFullEditor?: (item: FoodItem) => void;
}

export const QuickPhotoModal: React.FC<QuickPhotoModalProps> = ({
  isOpen,
  item,
  mode = 'food',
  onClose,
  onSavePhoto,
  onOpenFullEditor,
}) => {
  const [photoUrl, setPhotoUrl] = useState('');
  const [isCompressing, setIsCompressing] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (item) {
      setPhotoUrl(mode === 'food' ? item.photo : item.submitter.avatar);
      setSavedSuccess(false);
      setErrorMsg('');
    }
  }, [item, mode, isOpen]);

  if (!isOpen || !item) return null;

  const isFoodMode = mode === 'food';
  const title = isFoodMode ? item.title : `${item.submitter.name}'s Formal 1x1 Photo`;

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setErrorMsg('');

      // Compress image so it saves instantly in storage without exceeding quotas
      const compressedUrl = isFoodMode
        ? await compressImageFile(file, 1200, 1200, 0.82)
        : await compressAvatarFile(file);

      setPhotoUrl(compressedUrl);

      // Auto-save immediately upon upload for maximum convenience
      const updatedItem: FoodItem = isFoodMode
        ? { ...item, photo: compressedUrl }
        : {
            ...item,
            submitter: {
              ...item.submitter,
              avatar: compressedUrl,
            },
          };

      onSavePhoto(updatedItem);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    } catch (err) {
      console.error('Failed to compress/save photo', err);
      setErrorMsg('Could not process photo file. Please try a different image.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleManualSave = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!photoUrl.trim()) return;

    const updatedItem: FoodItem = isFoodMode
      ? { ...item, photo: photoUrl.trim() }
      : {
          ...item,
          submitter: {
            ...item.submitter,
            avatar: photoUrl.trim(),
          },
        };

    onSavePhoto(updatedItem);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5DACD] flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E8DDCF] bg-[#FCFAF7] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E65100] text-white flex items-center justify-center">
              <ImageIcon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#BF360C]">
                {isFoodMode ? 'Change Food Photo' : 'Change Member 1x1 Portrait'}
              </div>
              <h3 className="text-base font-bold text-[#1E1B18] font-['Outfit'] leading-tight">
                {title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#706659] hover:text-[#1E1B18] hover:bg-[#EFE5D8] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Success Banner */}
          {savedSuccess && (
            <div className="p-3 bg-[#E8F5E9] border border-[#A5D6A7] text-[#2E7D32] text-xs font-bold rounded-xl flex items-center gap-2 animate-in fade-in">
              <Check className="w-4 h-4 shrink-0" />
              <span>✓ Photo updated and permanently saved to your website!</span>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Current Photo Preview */}
          <div className="flex flex-col items-center justify-center p-4 bg-[#FAF6F0] rounded-xl border border-[#EADFCF]">
            <div className="relative group">
              <img
                src={photoUrl}
                alt="Photo preview"
                className={`object-cover border-2 shadow-sm bg-white ${
                  isFoodMode
                    ? 'w-48 h-36 rounded-xl border-[#DCD3C7]'
                    : 'w-32 h-32 rounded-full border-[#E65100]'
                }`}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = isFoodMode
                    ? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80'
                    : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
              />
              {isCompressing && (
                <div className="absolute inset-0 bg-black/60 rounded-xl flex flex-col items-center justify-center text-white gap-2">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                  <span className="text-xs font-bold">Optimizing & Saving...</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-[#7A6F62] mt-2 text-center">
              {isFoodMode
                ? 'High-resolution food photo displayed on the homepage and gallery'
                : 'Formal 1x1 circular portrait displayed on the card and About Us page'}
            </p>
          </div>

          {/* Option A: Upload Local File */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#1E1B18]">
              Method 1: Upload from your device (Auto-saves immediately)
            </label>
            <label className="cursor-pointer flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl border-2 border-dashed border-[#E65100]/40 bg-[#FFF8F5] hover:bg-[#FBE8DE] text-[#BF360C] font-bold text-xs transition-colors">
              <Upload className="w-4 h-4" />
              <span>{isCompressing ? 'Compressing & Saving Photo...' : 'Choose Photo File from Device'}</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                disabled={isCompressing}
                onChange={handleFileUpload}
              />
            </label>
            <p className="text-[10px] text-[#8C7D6D]">
              PNG, JPG, WEBP accepted. Automatically optimized for fast loading and persistent saving.
            </p>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-[#E8DDCF]" />
            <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-[#8C7D6D] tracking-wider">
              OR
            </span>
            <div className="flex-grow border-t border-[#E8DDCF]" />
          </div>

          {/* Option B: Paste Image Link */}
          <form onSubmit={handleManualSave} className="space-y-2">
            <label className="block text-xs font-bold text-[#1E1B18]">
              Method 2: Paste Direct Image Web Link (URL)
            </label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8C7D6D]" />
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#DCD3C7] rounded-lg outline-none focus:border-[#E65100]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-xs transition-colors shrink-0"
              >
                Save Link
              </button>
            </div>
          </form>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3.5 bg-[#FCFAF7] border-t border-[#E8DDCF] flex items-center justify-between">
          {onOpenFullEditor ? (
            <button
              onClick={() => {
                onClose();
                onOpenFullEditor(item);
              }}
              className="text-xs font-semibold text-[#BF360C] hover:underline"
            >
              Edit Dish Description & Ingredients →
            </button>
          ) : (
            <div />
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-[#1E1B18] bg-[#F0E6D8] hover:bg-[#E8DDCF] rounded-lg transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

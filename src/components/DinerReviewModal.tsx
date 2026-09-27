import React, { useState } from 'react';
import { LocalDiner, DinerReview } from '../types';
import { X, Star, MessageSquare, ThumbsUp, Check } from 'lucide-react';

interface DinerReviewModalProps {
  diner: LocalDiner | null;
  onClose: () => void;
  onSubmitReview: (dinerId: string, review: DinerReview) => void;
}

export const DinerReviewModal: React.FC<DinerReviewModalProps> = ({
  diner,
  onClose,
  onSubmitReview,
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [recommendedDish, setRecommendedDish] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!diner) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newReview: DinerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      rating,
      date: 'Just now',
      comment: comment.trim(),
      recommendedDish: recommendedDish.trim() || diner.specialty,
    };

    onSubmitReview(diner.id, newReview);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
      setAuthor('');
      setComment('');
      setRecommendedDish('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E5DACD] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E8DDCF] bg-[#FCFAF7] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#BF360C]">
              Diner Rating & Review
            </span>
            <h3 className="text-lg font-bold text-[#1E1B18] font-['Outfit']">
              {diner.name}
            </h3>
            <p className="text-xs text-[#7A6F62]">
              {diner.city}, {diner.province}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#706659] hover:text-[#1E1B18] hover:bg-[#EFE5D8]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {submitted ? (
            <div className="py-8 text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-[#1E1B18]">Review Posted!</h4>
              <p className="text-xs text-[#5C544B]">
                Thank you for contributing to our Tourism Practical Exam food rating system!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] uppercase tracking-wide mb-1.5">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-115"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          (hoverRating || rating) >= star
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-[#D5C9BA]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm font-bold text-[#1E1B18]">
                    {hoverRating || rating} / 5
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] uppercase tracking-wide mb-1">
                  Your Name / Examiner Name *
                </label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Maria Santos or Prof. Dela Cruz"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DCD3C7] rounded-xl focus:ring-2 focus:ring-[#E65100]/30 focus:border-[#E65100] outline-none"
                />
              </div>

              {/* Recommended Dish */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] uppercase tracking-wide mb-1">
                  Recommended Order / Dish
                </label>
                <input
                  type="text"
                  value={recommendedDish}
                  onChange={(e) => setRecommendedDish(e.target.value)}
                  placeholder={`e.g. ${diner.specialty}`}
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DCD3C7] rounded-xl focus:ring-2 focus:ring-[#E65100]/30 focus:border-[#E65100] outline-none"
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-xs font-bold text-[#1E1B18] uppercase tracking-wide mb-1">
                  Your Review / Food Tourism Feedback *
                </label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Describe the flavor, authenticity, atmosphere, and service..."
                  className="w-full px-3.5 py-2 text-xs sm:text-sm bg-white border border-[#DCD3C7] rounded-xl focus:ring-2 focus:ring-[#E65100]/30 focus:border-[#E65100] outline-none resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-[#706659] hover:bg-[#F2EAE0] rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-[#E65100] hover:bg-[#BF360C] rounded-lg shadow-xs"
                >
                  Submit Review
                </button>
              </div>
            </form>
          )}

          {/* Existing Community Reviews */}
          <div className="pt-4 border-t border-[#E8DDCF]">
            <h4 className="text-xs font-bold text-[#1E1B18] uppercase tracking-wider mb-3">
              Visitor Reviews ({diner.reviews.length})
            </h4>
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {diner.reviews.map((rev) => (
                <div key={rev.id} className="p-3 rounded-lg bg-[#FAF6F0] border border-[#EFE5D8] text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-[#1E1B18]">{rev.author}</span>
                    <div className="flex items-center text-amber-500 font-semibold">
                      <Star className="w-3 h-3 fill-current inline mr-0.5" />
                      {rev.rating}★
                    </div>
                  </div>
                  <p className="text-[#5C544B] leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  {rev.recommendedDish && (
                    <div className="mt-1 text-[11px] text-[#BF360C] font-medium">
                      Order: {rev.recommendedDish}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

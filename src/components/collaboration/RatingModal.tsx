"use client"
import React, { useState } from 'react';
import { X, Star, Heart } from 'lucide-react';

interface RatingModalProps {
  collaborator: {
    name: string;
    title: string;
    avatar: string;
  };
  project: {
    title: string;
  };
  onClose: () => void;
  onSubmit: (rating: number, review: string) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({ 
  collaborator, 
  project, 
  onClose, 
  onSubmit 
}) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      await onSubmit(rating, review);
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const ratingLabels = {
    1: 'Poor',
    2: 'Fair',
    3: 'Good',
    4: 'Very Good',
    5: 'Excellent'
  };

  return (
    <div className="fixed inset-0 bg-accent1/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary/20">
          <div className="flex items-center space-x-3">
            <Heart className="text-primary" size={24} />
            <h2 className="text-xl font-bold text-text">Rate & Review</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
          >
            <X size={20} className="text-text/70" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Collaborator Info */}
          <div className="text-center space-y-3">
            <img
              src={collaborator.avatar}
              alt={collaborator.name}
              className="w-20 h-20 rounded-full object-cover mx-auto"
            />
            <div>
              <h3 className="font-bold text-text">{collaborator.name}</h3>
              <p className="text-text/70 text-sm">{collaborator.title}</p>
              <p className="text-text/60 text-sm mt-1">"{project.title}"</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="text-center space-y-4">
            <p className="text-text/70">How was your experience?</p>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    size={32}
                    className={`${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    } transition-colors`}
                  />
                </button>
              ))}
            </div>
            {(hoveredRating || rating) > 0 && (
              <p className="text-primary font-medium">
                {ratingLabels[(hoveredRating || rating) as keyof typeof ratingLabels]}
              </p>
            )}
          </div>

          {/* Review Text */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-text/70 mb-2">
              Share your experience (optional)
            </label>
            <textarea
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
              placeholder="Tell other entrepreneurs about your collaboration experience..."
            />
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text py-3 rounded-2xl font-medium hover:bg-secondary/20 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={rating === 0 || isSubmitting}
              className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                rating === 0 || isSubmitting
                  ? 'bg-text/20 text-text/40 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:shadow-lg hover:shadow-result-cta-shadow hover:scale-105'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-text/20 border-t-text/40 rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingModal;
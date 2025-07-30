import React, { useState } from 'react';
import { Heart, Edit3 } from 'lucide-react';

interface ReflectionAreaProps {
  title: string;
  subtitle: string;
  value: string;
  onChange: (value: string) => void;
}

const ReflectionArea: React.FC<ReflectionAreaProps> = ({ title, subtitle, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="relative inline-block p-6 rounded-3xl bg-gradient-to-br from-pink-400/20 via-purple-400/20 to-indigo-400/20 backdrop-blur-sm border border-white/20 shadow-xl">
          <div className="text-6xl animate-pulse">📝</div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-text via-primary to-accent2 bg-clip-text text-transparent">{title}</h2>
          <p className="text-lg text-text/80 font-medium">{subtitle}</p>
        </div>
      </div>

      {/* Reflection Card */}
      <div className="max-w-xl mx-auto">
        <div className={`bg-white/70 backdrop-blur-sm border-2 rounded-3xl p-8 transition-all duration-300 shadow-xl ${
          isFocused 
            ? 'border-primary/70 shadow-2xl shadow-primary/20 scale-105' 
            : 'border-primary/30 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10'
        }`}>
          {/* Journal Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/30 to-accent2/30 rounded-full flex items-center justify-center shadow-lg">
              <Edit3 size={18} className="text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-text">Your Personal Journal</h3>
              <p className="text-sm text-text/70 font-medium">Express yourself freely ✨</p>
            </div>
          </div>

          {/* Textarea */}
          <div className="relative">
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your thoughts here... What dreams, concerns, or ideas are on your mind? What feels important to share about your journey?"
              className="w-full h-36 p-5 bg-gradient-to-br from-baby-powder/70 to-white/70 border border-primary/20 rounded-2xl text-text placeholder-text/60 resize-none focus:outline-none focus:border-primary/70 focus:bg-white/80 focus:shadow-lg transition-all duration-300 font-medium"
              style={{ 
                fontFamily: 'inherit',
                lineHeight: '1.6'
              }}
            />
            
            {/* Character count */}
            <div className="absolute bottom-3 right-3 text-xs text-text/50 font-medium bg-white/70 px-2 py-1 rounded-full">
              {value.length} characters
            </div>
          </div>

          {/* Encouragement */}
          <div className="mt-4 flex items-center space-x-2 text-sm text-text/70 font-medium">
            <Heart size={16} className="text-primary animate-pulse" />
            <span>Your thoughts are valuable and will help us understand you better 💫</span>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button
            onClick={() => onChange('')}
            className="text-sm text-text/60 hover:text-primary transition-all duration-300 underline decoration-dotted hover:scale-105 font-medium"
          >
            I'd prefer to skip this reflection
          </button>
        </div>
      </div>

      {/* Inspirational Quote */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-primary/20 via-accent2/20 to-purple-400/20 rounded-2xl p-6 max-w-md mx-auto shadow-lg border border-primary/20">
          <p className="text-sm text-text/80 italic font-medium">
            "The cave you fear to enter holds the treasure you seek."
          </p>
          <p className="text-xs text-text/60 mt-2 font-semibold">— Joseph Campbell</p>
        </div>
      </div>
    </div>
  );
};

export default ReflectionArea;
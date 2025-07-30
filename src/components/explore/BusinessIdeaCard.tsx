import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, DollarSign, TrendingUp, Star } from 'lucide-react';

interface BusinessIdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    category: string;
    investment: string;
    timeline: string;
    difficulty: string;
    platforms: string[];
    earning: string;
    image: string;
    tags: string[];
  };
}

const BusinessIdeaCard: React.FC<BusinessIdeaCardProps> = ({ idea }) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-glass-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={idea.image}
          alt={idea.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent1/40 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(idea.difficulty)}`}>
            {idea.difficulty}
          </span>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-1 bg-glass-bg backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="text-yellow-400" size={14} fill="currentColor" />
            <span className="text-xs font-medium text-text">Recommended</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text group-hover:text-primary transition-colors">
            {idea.title}
          </h3>
          <p className="text-text/70 text-sm leading-relaxed line-clamp-2">
            {idea.description}
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {idea.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 py-3 border-t border-secondary/20">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="text-primary" size={14} />
            </div>
            <p className="text-xs text-text/60">Timeline</p>
            <p className="text-xs font-semibold text-text">{idea.timeline}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <DollarSign className="text-primary" size={14} />
            </div>
            <p className="text-xs text-text/60">Investment</p>
            <p className="text-xs font-semibold text-text capitalize">{idea.investment}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <TrendingUp className="text-primary" size={14} />
            </div>
            <p className="text-xs text-text/60">Earning</p>
            <p className="text-xs font-semibold text-text">{idea.earning.split('/')[0]}</p>
          </div>
        </div>

        {/* Platforms */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-text/70">Key Platforms:</p>
          <div className="flex flex-wrap gap-1">
            {idea.platforms.slice(0, 3).map((platform, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/20 text-text text-xs rounded-lg"
              >
                {platform}
              </span>
            ))}
            {idea.platforms.length > 3 && (
              <span className="px-2 py-1 bg-secondary/20 text-text/60 text-xs rounded-lg">
                +{idea.platforms.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA */}
        <Link
          href={`/RoadmapPage/${idea.id}`}
          className="group/btn w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
        >
          <span>View Roadmap</span>
          <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default BusinessIdeaCard;
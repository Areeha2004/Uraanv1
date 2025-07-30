'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, Clock, DollarSign, Users, TrendingUp, Star } from 'lucide-react';

interface ResultCardProps {
  result: {
    id: string;
    title: string;
    description: string;
    match: number;
    timeline: string;
    investment: string;
    platforms: string[];
    benefits: string[];
    image: string;
  };
  index: number;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, index }) => {
  const router = useRouter();

  return (
    <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-glass-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {/* Content */}
        <div className="lg:col-span-2 p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1">
                  <Star className="text-yellow-400" size={18} fill="currentColor" />
                  <span className="text-primary font-bold">{result.match}% Match</span>
                </div>
                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  #{index + 1} Recommended
                </div>
              </div>
              <h3 className="text-2xl font-bold text-text">{result.title}</h3>
              <p className="text-text/70 leading-relaxed">{result.description}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center space-x-3 bg-baby-powder/50 rounded-xl p-3">
              <Clock className="text-primary" size={20} />
              <div>
                <p className="text-xs text-text/60">Timeline</p>
                <p className="font-semibold text-text text-sm">{result.timeline}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-baby-powder/50 rounded-xl p-3">
              <DollarSign className="text-primary" size={20} />
              <div>
                <p className="text-xs text-text/60">Investment</p>
                <p className="font-semibold text-text text-sm">{result.investment}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 bg-baby-powder/50 rounded-xl p-3">
              <TrendingUp className="text-primary" size={20} />
              <div>
                <p className="text-xs text-text/60">Potential</p>
                <p className="font-semibold text-text text-sm">High Growth</p>
              </div>
            </div>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="font-semibold text-text mb-3">Key Platforms:</h4>
            <div className="flex flex-wrap gap-2">
              {result.platforms.map((platform, idx) => (
                <span key={idx} className="px-3 py-1 bg-secondary/20 text-text rounded-full text-sm">
                  {platform}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="font-semibold text-text mb-3">Why This Works for You:</h4>
            <ul className="space-y-2">
              {result.benefits.slice(0, 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-text/70 text-sm">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA (non-anchor version to avoid nesting errors) */}
          <div
            onClick={() => router.push(`/RoadmapPage/${result.id}`)}
            className="cursor-pointer group inline-flex items-center space-x-3 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-6 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
          >
            <span>Start Your Journey</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Image */}
        <div className="relative lg:col-span-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent2/20"></div>
          <img
            src={result.image}
            alt={result.title}
            className="w-full h-full object-cover lg:min-h-96"
          />
          <div className="absolute bottom-4 right-4 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-xl p-3">
            <div className="flex items-center space-x-2">
              <Users className="text-primary" size={18} />
              <div>
                <p className="text-xs text-text/60">Success Rate</p>
                <p className="font-bold text-text">92%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;

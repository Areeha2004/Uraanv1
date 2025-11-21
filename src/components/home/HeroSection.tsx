'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Play, CheckCircle, Zap, TrendingUp } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-visible pt-20 pb-32">
      
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-baby-powder via-base to-secondary/10 bg-animated-gradient"></div>

      {/* Animated Grid Pattern (Subtle) */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
          backgroundSize: '4rem 4rem'
        }}></div>
      </div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 via-accent2/10 to-transparent rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] bg-gradient-to-br from-accent1/15 via-primary/10 to-transparent rounded-full blur-3xl animate-float-slow delay-1s"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-secondary/10 to-transparent rounded-full blur-2xl animate-float"></div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent2/10 backdrop-blur-sm border border-primary/20 rounded-full px-4 py-2 shadow-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse-fast"></div>
              <span className="text-sm font-medium text-primary">AI-Powered Business Intelligence</span>
              <Sparkles size={14} className="text-accent2" />
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
                <span className="text-text block">Transform Your</span>
                <span className="bg-gradient-to-r from-primary via-primary-light to-accent2 bg-clip-text text-transparent block">
                  Ideas Into Income
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-text/70 max-w-2xl leading-relaxed">
                Join 2,500+ Pakistani women entrepreneurs building profitable businesses with personalized AI guidance, proven roadmaps, and community support.
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2">
                <CheckCircle size={16} className="text-primary" />
                <span className="text-sm font-medium text-text">No Experience Required</span>
              </div>
              <div className="flex items-center gap-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2">
                <Zap size={16} className="text-accent2" />
                <span className="text-sm font-medium text-text">5-Min Setup</span>
              </div>
              <div className="flex items-center gap-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-4 py-2">
                <TrendingUp size={16} className="text-accent1" />
                <span className="text-sm font-medium text-text">Proven Results</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
              <Link
                href="/QuizPage"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-xl font-semibold text-base shadow-lg hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
              >
                <span className="relative">Discover Your Business Path</span>
                <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/ExplorePage"
                className="group inline-flex items-center justify-center gap-2 bg-baby-powder border-2 border-text/10 text-text px-8 py-4 rounded-xl font-semibold text-base hover:border-primary/30 hover:bg-secondary/5 transition-all duration-300"
              >
                <Play size={18} className="group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </Link>
            </div>

          </div>

          {/* Right Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent2/20 rounded-3xl blur-3xl animate-float-slow"></div>

              {/* Main Image Card */}
              <div className="relative bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-4 shadow-2xl animate-float">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
                  <img
                    src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                    alt="Successful entrepreneur"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-text/60 via-transparent to-transparent"></div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-baby-powder border border-secondary/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent2 rounded-xl flex items-center justify-center">
                    <TrendingUp size={20} className="text-baby-powder" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">₨50L+</p>
                    <p className="text-xs text-text/60">Revenue Generated</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-baby-powder border border-secondary/20 rounded-2xl p-4 shadow-xl backdrop-blur-sm animate-float-slow delay-1s">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent1 to-primary-light rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} className="text-baby-powder" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-text">95%</p>
                    <p className="text-xs text-text/60">Success Rate</p>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-4 bg-gradient-to-br from-primary to-primary-light text-baby-powder rounded-full p-3 shadow-lg animate-bounce-slow">
                <Sparkles size={16} />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Keyframe Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce 2s ease-in-out infinite; }
        .delay-1s { animation-delay: 1s; }

        .animate-pulse-fast { animation: pulse 1.2s infinite; }

        .bg-animated-gradient {
          background-size: 300% 300%;
          animation: gradientShift 25s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;

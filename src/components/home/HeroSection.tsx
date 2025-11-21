import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20"></div>
      <div className="absolute top-16 left-16 w-72 h-72 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-16 right-16 w-96 h-96 bg-gradient-to-br from-accent2/20 to-primary/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-3 text-sm font-medium text-primary">
            <Sparkles size={16} />
            <span>Empowering Pakistani Women Entrepreneurs</span>
            <Heart size={16} className="text-primary-light" />
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Launch Your
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent2 bg-clip-text text-transparent block">
              Dream Business
            </span>
            <span className="text-text block">with Confidence</span>
          </h1>

          <p className="text-lg sm:text-xl text-text/80 max-w-xl leading-relaxed">
            Discover your perfect business idea with AI-powered guidance, get step-by-step roadmaps, 
            access curated starter kits, and join a supportive community of Pakistani women entrepreneurs.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <Link
              href="/QuizPage"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <span>Take Quiz</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/ExplorePage"
              className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-secondary/20 transition-all duration-300 hover:scale-105"
            >
              <span>Explore Ideas</span>
              <Sparkles size={20} />
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 mt-8 text-text/70 justify-center lg:justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">500+</span>
              </div>
              <span className="text-sm">Women Empowered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">50+</span>
              </div>
              <span className="text-sm">Business Ideas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-sm">95%</span>
              </div>
              <span className="text-sm">Success Rate</span>
            </div>
          </div>
        </div>

        {/* Right Images */}
        <div className="lg:w-1/2 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="row-span-2 rounded-3xl overflow-hidden shadow-2xl transform transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
              alt="Woman entrepreneur laptop"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
              alt="Woman planning business"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl transform transition-transform hover:scale-105">
            <img
              src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
              alt="Woman entrepreneur"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

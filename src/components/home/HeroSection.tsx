import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/10 to-primary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto text-center space-y-8">
        {/* Hero Badge */}
        <div className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-3 text-sm font-medium text-primary">
          <Sparkles size={16} />
          <span>Empowering Pakistani Women Entrepreneurs</span>
          <Heart size={16} className="text-primary-light" />
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight">
            Launch Your
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent2 bg-clip-text text-transparent block">
              Dream Business
            </span>
            <span className="text-text">with Confidence</span>
          </h1>
          <p className="text-lg sm:text-xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            Discover your perfect business idea with AI-powered guidance, get step-by-step roadmaps, 
            access curated starter kits, and join a supportive community of Pakistani women entrepreneurs.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/QuizPage"
            className="group inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
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

        {/* Hero Image */}
        <div className="relative mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="md:col-span-2 relative">
              <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/10 shadow-2xl">
                <img
                  src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
                  alt="Pakistani woman working on laptop"
                  className="w-full h-80 object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -top-4 -left-4 bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-text">AI Analysis Complete</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-accent2/20 to-primary/10 shadow-xl">
                <img
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
                  alt="Pakistani woman entrepreneur"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 pt-12 text-text/60">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">500+</span>
            </div>
            <span className="text-sm">Women Empowered</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">50+</span>
            </div>
            <span className="text-sm">Business Ideas</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold text-sm">95%</span>
            </div>
            <span className="text-sm">Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
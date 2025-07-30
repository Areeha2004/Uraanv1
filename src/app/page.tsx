import React from 'react';
import Link from 'next/link';

import { ArrowRight, ChevronDown, Star, Users, Target, Award } from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import TestimonialsSection from '../components/home/TestimonialsSection';
import CTASection from '../components/home/CTASection';

const HomePage: React.FC = () => {
  return (
    <div className="overflow-hidden">
      


      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      
      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-text">
                About <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">URAAN</span>
              </h2>
              <p className="text-lg text-text/80 leading-relaxed">
                URAAN means "flight" in Urdu - representing the journey of Pakistani women taking off toward entrepreneurial success. We believe every woman has the potential to build something amazing, and we're here to provide the guidance, tools, and community to make it happen.
              </p>
              <p className="text-text/70">
                Our AI-powered platform analyzes your skills, interests, and circumstances to recommend personalized business ideas with clear roadmaps. From freelancing to e-commerce, we help you find your perfect path to financial independence.
              </p>
              <Link
                href="/AboutPage"
                className="inline-flex items-center space-x-2 text-primary hover:text-primary-light transition-colors font-medium"
              >
                <span>Learn more about our mission</span>
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/10">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                  alt="Pakistani woman entrepreneur"
                  className="w-full h-96 object-cover rounded-2xl hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-xl p-4 shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                    <Award className="text-baby-powder" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-text">500+ Success Stories</p>
                    <p className="text-sm text-text/60">Women empowered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8">
        <ChevronDown className="text-primary animate-bounce" size={24} />
      </div>
    </div>
  );
};

export default HomePage;
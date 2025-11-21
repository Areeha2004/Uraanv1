import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-primary via-primary-light to-accent2 rounded-3xl p-8 md:p-12 text-center text-baby-powder relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 border border-baby-powder rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border border-baby-powder rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-baby-powder rounded-full blur-sm"></div>
          </div>

          <div className="relative space-y-6">
            <div className="inline-flex items-center space-x-2 bg-baby-powder/20 backdrop-blur-sm rounded-full px-6 py-2 text-sm font-medium">
              <Sparkles size={16} />
              <span>Ready to Start Your Journey?</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              Join 2,500+ Pakistani Women
              <br />
              Building Their Dream Businesses
            </h2>

            <p className="text-lg text-baby-powder/90 max-w-2xl mx-auto">
              Take our AI quiz to discover your perfect business idea and get a personalized roadmap to success. Your entrepreneurial journey starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href="/QuizPage"
                className="group inline-flex items-center space-x-2 bg-baby-powder text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <span>Start Your Quiz Now</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/SignupPage"
                className="inline-flex items-center space-x-2 border-2 border-baby-powder text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder hover:text-primary transition-all duration-300"
              >
                <span>Sign Up Free</span>
              </Link>
            </div>

            <div className="flex justify-center items-center space-x-6 pt-6 text-baby-powder/80">
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm">Forever</div>
              </div>
              <div className="w-px h-12 bg-baby-powder/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">5 min</div>
                <div className="text-sm">Quiz Time</div>
              </div>
              <div className="w-px h-12 bg-baby-powder/30"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

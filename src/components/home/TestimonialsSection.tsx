'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Fatima Khan',
      location: 'Karachi',
      business: 'Online Boutique',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      quote: 'URAAN helped me turn my passion for fashion into a thriving online business. The roadmap was so clear and the community support was incredible!',
      revenue: '₨2L+ monthly',
      rating: 5
    },
    {
      name: 'Ayesha Malik',
      location: 'Lahore',
      business: 'Digital Marketing Agency',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
      quote: 'The AI analysis perfectly matched my skills with freelance opportunities. Within 6 months, I had my own agency with 5 regular clients.',
      revenue: '₨3L+ monthly',
      rating: 5
    },
    {
      name: 'Zara Ahmed',
      location: 'Islamabad',
      business: 'Online Tutoring',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
      quote: 'Starting was scary, but URAAN made it feel possible. The starter kits and templates saved me months of research and trial-and-error.',
      revenue: '₨1.5L+ monthly',
      rating: 5
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Success Stories from Our <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Community</span>
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Real stories from Pakistani women who transformed their lives through entrepreneurship
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Testimonial Content */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center space-x-1 text-yellow-400">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={20} fill="currentColor" />
                  ))}
                </div>

                <Quote className="text-primary/30" size={40} />

                <blockquote className="text-lg md:text-xl text-text leading-relaxed">
                  {testimonials[currentIndex].quote}
                </blockquote>

                <div className="space-y-2">
                  <h4 className="font-bold text-text text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-text/60">{testimonials[currentIndex].location} • {testimonials[currentIndex].business}</p>
                  <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                    <span>{testimonials[currentIndex].revenue}</span>
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-48 h-48 rounded-2xl overflow-hidden shadow-xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-primary to-primary-light rounded-full p-3 shadow-lg">
                    <Star size={20} className="text-baby-powder" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full hover:bg-secondary/20 transition-all duration-200"
            >
              <ChevronLeft size={20} className="text-text" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? 'bg-primary' : 'bg-text/20'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full hover:bg-secondary/20 transition-all duration-200"
            >
              <ChevronRight size={20} className="text-text" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

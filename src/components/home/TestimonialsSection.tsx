'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Fatima Khan',
    location: 'Karachi',
    business: 'Boutique studio',
    image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
    quote:
      'URAAN helped me transition from random efforts to a real system. I launched with confidence, priced correctly, and secured repeat clients in weeks.',
    revenue: 'PKR 200K+ monthly',
    shift: 'From side hustle to structured brand',
  },
  {
    name: 'Ayesha Malik',
    location: 'Lahore',
    business: 'Digital growth agency',
    image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
    quote:
      'The roadmap made every decision obvious. Instead of researching endlessly, I executed. That speed completely changed my trajectory.',
    revenue: 'PKR 300K+ monthly',
    shift: 'Scaled from solo freelancer to agency lead',
  },
  {
    name: 'Zara Ahmed',
    location: 'Islamabad',
    business: 'Online tutoring brand',
    image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
    quote:
      'I loved the premium templates and mentor-style guidance. It felt like having an operator in my corner every single day.',
    revenue: 'PKR 150K+ monthly',
    shift: 'Built a trusted education business',
  },
];

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Proof of impact</p>
          <h2 className="font-display mt-4 text-3xl leading-tight text-text md:text-4xl">
            Trusted by serious founders
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-text/70">
            These stories show what happens when premium design, strategy, and execution come together.
          </p>
        </div>

        <div className="premium-card overflow-hidden rounded-3xl p-5 md:p-6">
          <div
            key={testimonials[currentIndex].name}
            className="grid animate-reveal-up grid-cols-1 gap-6 md:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
                <span className="ml-2 text-xs font-semibold uppercase tracking-[0.12em] text-text/60">5.0 founder rating</span>
              </div>
              <Quote size={24} className="text-primary/35" />
              <blockquote className="font-display text-xl leading-relaxed text-text md:text-2xl">
                {testimonials[currentIndex].quote}
              </blockquote>
              <div className="space-y-2">
                <p className="text-base font-semibold text-text">{testimonials[currentIndex].name}</p>
                <p className="text-sm text-text/65">
                  {testimonials[currentIndex].location} | {testimonials[currentIndex].business}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full border border-primary/15 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {testimonials[currentIndex].revenue}
                  </span>
                  <span className="rounded-full border border-text/10 bg-baby-powder/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-text/65">
                    {testimonials[currentIndex].shift}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-4">
              <div className="relative w-full max-w-[230px]">
                <div className="absolute inset-0 rounded-[1.25rem] bg-gradient-to-br from-primary/20 to-accent2/20 blur-xl" />
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="relative h-[270px] w-full rounded-[1.25rem] object-cover shadow-lg"
                />
              </div>

              <div className="flex w-full max-w-[230px] items-center justify-between rounded-xl border border-text/10 bg-baby-powder/90 p-2">
                <button
                  onClick={prevTestimonial}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-text/10 bg-baby-powder text-text transition-all duration-200 hover:border-primary/30 hover:text-primary"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex items-center gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === currentIndex ? 'w-7 bg-primary' : 'w-2.5 bg-text/25'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={nextTestimonial}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-text/10 bg-baby-powder text-text transition-all duration-200 hover:border-primary/30 hover:text-primary"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

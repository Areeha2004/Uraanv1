import React from 'react';
import { ArrowRight, Brain, Map, Users, Award, Download, Target } from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: Brain,
      title: 'Take Our AI Quiz',
      description: 'Answer questions about your skills, interests, time availability, and goals. Our AI analyzes your responses to understand what business would suit you best.',
      details: [
        'Personalized assessment of your strengths',
        'Analysis of your current situation',
        'Understanding of your entrepreneurial goals',
        'Consideration of cultural and local factors'
      ],
      time: '5 minutes',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg'
    },
    {
      number: '02',
      icon: Target,
      title: 'Get Your Results',
      description: 'Receive personalized business recommendations ranked by compatibility. Each suggestion includes investment requirements, timeline, and potential earnings.',
      details: [
        'Top 3 business matches for your profile',
        'Detailed analysis of each opportunity',
        'Investment and time requirements',
        'Success probability ratings'
      ],
      time: 'Instant',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    },
    {
      number: '03',
      icon: Map,
      title: 'Follow Your Roadmap',
      description: 'Access step-by-step roadmaps that break down your business launch into manageable tasks with clear timelines and milestones.',
      details: [
        'Week-by-week action plans',
        'Downloadable templates and tools',
        'Video tutorials and guides',
        'Progress tracking system'
      ],
      time: 'Ongoing',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg'
    },
    {
      number: '04',
      icon: Download,
      title: 'Use Starter Kits',
      description: 'Download curated packages with everything you need: business plans, marketing templates, legal documents, and resource lists.',
      details: [
        'Industry-specific business templates',
        'Marketing materials and social media kits',
        'Legal document templates',
        'Supplier and resource directories'
      ],
      time: 'Available 24/7',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      number: '05',
      icon: Users,
      title: 'Join the Community',
      description: 'Connect with like-minded women entrepreneurs for support, advice, collaboration opportunities, and celebrating successes together.',
      details: [
        'Private forums and discussion groups',
        'Mentorship matching',
        'Networking events and workshops',
        'Peer support and accountability'
      ],
      time: 'Always active',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    },
    {
      number: '06',
      icon: Award,
      title: 'Track & Celebrate',
      description: 'Monitor your progress with our dashboard, earn achievement badges, and celebrate milestones as you build your successful business.',
      details: [
        'Visual progress tracking',
        'Milestone celebrations',
        'Achievement badge system',
        'Performance analytics and insights'
      ],
      time: 'Daily updates',
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            How <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">URAAN</span> Works
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            From discovering your perfect business idea to launching successfully - we guide you through every step of your entrepreneurial journey.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {steps.map((step, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
                      <step.icon size={28} className="text-baby-powder" />
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-primary/20">{step.number}</div>
                      <div className="text-sm text-primary font-medium">{step.time}</div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-text">{step.title}</h2>
                  <p className="text-lg text-text/70 leading-relaxed">{step.description}</p>

                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-text/70">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {index === 0 && (
                    <div className="pt-4">
                      <a
                        href="/quiz"
                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
                      >
                        <span>Take Quiz Now</span>
                        <ArrowRight size={20} />
                      </a>
                    </div>
                  )}
                </div>

                {/* Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="aspect-w-4 aspect-h-3 rounded-3xl overflow-hidden bg-gradient-to-br from-secondary/20 to-primary/10 shadow-2xl">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-96 object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute -top-6 -right-6 bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{step.number}</div>
                      <div className="text-xs text-text/60">Step</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-8">
            Your Journey to <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Success</span> Starts Here
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">2,500+</div>
              <div className="text-text/70">Women have started their journey</div>
            </div>
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-text/70">Success rate with our roadmaps</div>
            </div>
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
              <div className="text-3xl font-bold text-primary mb-2">₨50L+</div>
              <div className="text-text/70">Revenue generated by our community</div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-text/70 max-w-2xl mx-auto">
              Ready to discover your perfect business idea and start your entrepreneurial journey? 
              Take our AI quiz and get personalized recommendations in just 5 minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/quiz"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
              >
                <span>Start Your Quiz</span>
                <ArrowRight size={20} />
              </a>
              <a
                href="/explore"
                className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-secondary/20 transition-all duration-300"
              >
                <span>Browse Business Ideas</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;
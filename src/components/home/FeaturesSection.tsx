import React from 'react';
import { Brain, Map, Users, Download, Target, Award } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Our smart algorithm analyzes your skills, interests, and circumstances to recommend perfect business ideas tailored just for you.',
      color: 'from-primary to-primary-light'
    },
    {
      icon: Map,
      title: 'Step-by-Step Roadmaps',
      description: 'Get detailed, actionable roadmaps that break down your business journey into manageable steps with clear timelines.',
      color: 'from-accent2 to-accent2-light'
    },
    {
      icon: Download,
      title: 'Curated Starter Kits',
      description: 'Access downloadable templates, guides, and resources specifically designed for Pakistani market conditions.',
      color: 'from-secondary to-primary-light'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with like-minded women entrepreneurs, share experiences, and get support throughout your journey.',
      color: 'from-primary-light to-accent2'
    },
    {
      icon: Target,
      title: 'Progress Tracking',
      description: 'Monitor your progress with visual dashboards, milestone celebrations, and personalized insights.',
      color: 'from-accent1 to-primary'
    },
    {
      icon: Award,
      title: 'Achievement System',
      description: 'Earn badges and recognition as you complete milestones and help others in the community.',
      color: 'from-primary to-secondary'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Everything You Need to <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Succeed</span>
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            From initial idea to thriving business, we provide comprehensive support at every step of your entrepreneurial journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-8 hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-glass-shadow"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-xl font-bold text-text mb-4">{feature.title}</h3>
              <p className="text-text/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
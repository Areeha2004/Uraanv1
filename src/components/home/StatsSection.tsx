import React from 'react';
import { Users, TrendingUp, Award, Heart } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: '2,500+',
      label: 'Active Community Members',
      description: 'Women supporting each other'
    },
    {
      icon: TrendingUp,
      number: '₨50L+',
      label: 'Revenue Generated',
      description: 'By our community members'
    },
    {
      icon: Award,
      number: '150+',
      label: 'Success Stories',
      description: 'Businesses launched successfully'
    },
    {
      icon: Heart,
      number: '95%',
      label: 'Satisfaction Rate',
      description: 'Members love our platform'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Empowering Women Across Pakistan
          </h2>
          <p className="text-lg text-text/70 max-w-2xl mx-auto">
            Our platform has helped thousands of Pakistani women turn their dreams into thriving businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-glass-shadow"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <stat.icon size={28} className="text-baby-powder" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-bold text-primary">{stat.number}</h3>
                <p className="font-semibold text-text">{stat.label}</p>
                <p className="text-sm text-text/60">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;

import React from 'react';
import { Heart, Target, Users, Award, MapPin, Calendar } from 'lucide-react';

const AboutPage: React.FC = () => {
  const timeline = [
    {
      year: '2023',
      title: 'The Vision',
      description: 'URAAN was born from the dream of empowering Pakistani women to achieve financial independence through entrepreneurship.',
      icon: Heart
    },
    {
      year: '2024',
      title: 'First Launch',
      description: 'We launched our MVP with 50 business ideas and welcomed our first 100 community members.',
      icon: Target
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered personalized recommendations and smart roadmap generation.',
      icon: Award
    },
    {
      year: '2025',
      title: 'Community Growth',
      description: 'Reached 2,500+ active members and launched collaboration marketplace.',
      icon: Users
    }
  ];

  const team = [
    {
      name: 'Aisha Rahman',
      role: 'Founder & CEO',
      bio: 'Former tech executive turned entrepreneur advocate. Passionate about women empowerment.',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    },
    {
      name: 'Fatima Ali',
      role: 'Head of Community',
      bio: 'Community builder with 10+ years experience in women-focused initiatives.',
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg'
    },
    {
      name: 'Sara Khan',
      role: 'Lead Product Designer',
      bio: 'UX designer dedicated to creating inclusive, accessible experiences for women.',
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            About <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">URAAN</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            URAAN means "flight" in Urdu - representing the journey of Pakistani women taking off toward entrepreneurial success. We believe every woman has the potential to soar.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mb-6">
                <Target size={28} className="text-baby-powder" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-4">Our Mission</h2>
              <p className="text-text/70 leading-relaxed">
                To empower Pakistani women with the tools, knowledge, and community support they need to build successful businesses and achieve financial independence. We're breaking barriers and creating opportunities in a way that respects our cultural values while embracing modern entrepreneurship.
              </p>
            </div>

            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-accent2 to-accent2-light rounded-2xl flex items-center justify-center mb-6">
                <Heart size={28} className="text-baby-powder" />
              </div>
              <h2 className="text-2xl font-bold text-text mb-4">Our Vision</h2>
              <p className="text-text/70 leading-relaxed">
                A Pakistan where every woman has the confidence, resources, and support to turn her entrepreneurial dreams into reality. We envision a future where women-led businesses thrive across all sectors, contributing to economic growth and social progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-text">
                The Story Behind URAAN
              </h2>
              <div className="space-y-4 text-text/70 leading-relaxed">
                <p>
                  URAAN was founded when our team recognized a critical gap: talented, ambitious Pakistani women who had incredible business ideas but lacked a clear path to turn them into reality. Traditional business education felt disconnected from the realities of starting a business as a woman in Pakistan.
                </p>
                <p>
                  We saw women struggling with questions like: "What business should I start with my skills?" "How do I actually begin?" "Where can I find support and guidance?" "How do I balance cultural expectations with entrepreneurial ambitions?"
                </p>
                <p>
                  That's when we decided to create URAAN - a platform specifically designed for Pakistani women, by Pakistani women. We combined cutting-edge AI technology with deep cultural understanding to create personalized pathways to entrepreneurial success.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg"
                  alt="Pakistani women entrepreneurs"
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <img
                  src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg"
                  alt="Women working together"
                  className="w-full h-32 object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img
                  src="https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg"
                  alt="Woman with laptop"
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <img
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg"
                  alt="Successful entrepreneur"
                  className="w-full h-48 object-cover rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Our Journey</h2>
            <p className="text-lg text-text/70">From vision to reality - here's how URAAN has grown</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-primary to-accent2"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
                      <div className="flex items-center space-x-3 mb-3">
                        {index % 2 === 0 ? (
                          <>
                            <div>
                              <h3 className="text-xl font-bold text-text">{item.title}</h3>
                              <p className="text-primary font-semibold">{item.year}</p>
                            </div>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                              <item.icon size={20} className="text-baby-powder" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center">
                              <item.icon size={20} className="text-baby-powder" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-text">{item.title}</h3>
                              <p className="text-primary font-semibold">{item.year}</p>
                            </div>
                          </>
                        )}
                      </div>
                      <p className="text-text/70">{item.description}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-primary rounded-full border-4 border-baby-powder relative z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Meet Our Team</h2>
            <p className="text-lg text-text/70">Passionate women working to empower other women</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-text mb-2">{member.name}</h3>
                <p className="text-primary font-semibold mb-4">{member.role}</p>
                <p className="text-text/70 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto">
                <Heart size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-xl font-bold text-text">Empowerment</h3>
              <p className="text-text/70 text-sm">Believing in every woman's potential to create change</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent2 to-accent2-light rounded-2xl flex items-center justify-center mx-auto">
                <Users size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-xl font-bold text-text">Community</h3>
              <p className="text-text/70 text-sm">Stronger together - supporting each other's success</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary-light rounded-2xl flex items-center justify-center mx-auto">
                <MapPin size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-xl font-bold text-text">Cultural Respect</h3>
              <p className="text-text/70 text-sm">Honoring our values while embracing progress</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-accent1 rounded-2xl flex items-center justify-center mx-auto">
                <Award size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-xl font-bold text-text">Excellence</h3>
              <p className="text-text/70 text-sm">Delivering quality resources and support</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
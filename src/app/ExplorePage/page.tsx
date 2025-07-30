"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import BusinessIdeaCard from '../../components/explore/BusinessIdeaCard';


const ExplorePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedInvestment, setSelectedInvestment] = useState('all');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'ecommerce', label: 'E-commerce' },
    { id: 'service', label: 'Service' },
    { id: 'creative', label: 'Creative' },
    { id: 'technology', label: 'Technology' },
    { id: 'education', label: 'Education' },
    { id: 'food', label: 'Food & Hospitality' }
  ];

  const investmentLevels = [
    { id: 'all', label: 'All Investment Levels' },
    { id: 'minimal', label: 'Minimal (₨5K - ₨20K)' },
    { id: 'low', label: 'Low (₨20K - ₨50K)' },
    { id: 'medium', label: 'Medium (₨50K - ₨1L)' },
    { id: 'high', label: 'High (₨1L+)' }
  ];

  const businessIdeas = [
    {
      id: 'online-boutique',
      title: 'Online Fashion Boutique',
      description: 'Curate and sell Pakistani fashion online through social media platforms',
      category: 'ecommerce',
      investment: 'medium',
      timeline: '2-3 months',
      difficulty: 'Beginner',
      platforms: ['Instagram', 'Facebook', 'WhatsApp'],
      earning: '₨50K - ₨2L/month',
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg',
      tags: ['Fashion', 'Social Media', 'E-commerce']
    },
    {
      id: 'online-tutoring',
      title: 'Online Tutoring Service',
      description: 'Teach students online in subjects you excel at',
      category: 'education',
      investment: 'minimal',
      timeline: '2-4 weeks',
      difficulty: 'Beginner',
      platforms: ['Zoom', 'Google Meet', 'Preply'],
      earning: '₨30K - ₨1L/month',
      image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
      tags: ['Education', 'Online', 'Flexible']
    },
    {
      id: 'content-creation',
      title: 'Social Media Management',
      description: 'Help businesses grow their online presence',
      category: 'freelance',
      investment: 'low',
      timeline: '1-2 months',
      difficulty: 'Intermediate',
      platforms: ['Instagram', 'Facebook', 'LinkedIn'],
      earning: '₨40K - ₨1.5L/month',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      tags: ['Marketing', 'Creative', 'Remote']
    },
    {
      id: 'home-bakery',
      title: 'Home-based Bakery',
      description: 'Start a bakery business from your home kitchen',
      category: 'food',
      investment: 'medium',
      timeline: '1-2 months',
      difficulty: 'Intermediate',
      platforms: ['Instagram', 'WhatsApp', 'Local delivery'],
      earning: '₨25K - ₨80K/month',
      image: 'https://images.pexels.com/photos/3992538/pexels-photo-3992538.jpeg',
      tags: ['Food', 'Home-based', 'Creative']
    },
    {
      id: 'graphic-design',
      title: 'Freelance Graphic Design',
      description: 'Offer graphic design services to businesses and individuals',
      category: 'creative',
      investment: 'low',
      timeline: '3-4 weeks',
      difficulty: 'Intermediate',
      platforms: ['Fiverr', 'Upwork', 'Instagram'],
      earning: '₨35K - ₨1.2L/month',
      image: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg',
      tags: ['Design', 'Creative', 'Freelance']
    },
    {
      id: 'handmade-crafts',
      title: 'Handmade Crafts Business',
      description: 'Create and sell handmade items online and at local markets',
      category: 'creative',
      investment: 'low',
      timeline: '2-3 months',
      difficulty: 'Beginner',
      platforms: ['Etsy', 'Instagram', 'Local markets'],
      earning: '₨20K - ₨60K/month',
      image: 'https://images.pexels.com/photos/3771124/pexels-photo-3771124.jpeg',
      tags: ['Handmade', 'Creative', 'Unique']
    }
  ];

  const filteredIdeas = businessIdeas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory;
    const matchesInvestment = selectedInvestment === 'all' || idea.investment === selectedInvestment;
    
    return matchesSearch && matchesCategory && matchesInvestment;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            Explore <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Business Ideas</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Discover curated business opportunities perfect for Pakistani women entrepreneurs. Each idea comes with detailed roadmaps and starter kits.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
            <input
              type="text"
              placeholder="Search business ideas, skills, or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <Filter className="text-text/60" size={20} />
            <span className="font-medium text-text">Filter by:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-text/70 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-xl text-text focus:outline-none focus:border-primary"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>

            {/* Investment Filter */}
            <div>
              <label className="block text-sm font-medium text-text/70 mb-2">Investment Level</label>
              <select
                value={selectedInvestment}
                onChange={(e) => setSelectedInvestment(e.target.value)}
                className="w-full p-3 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-xl text-text focus:outline-none focus:border-primary"
              >
                {investmentLevels.map(level => (
                  <option key={level.id} value={level.id}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-text">
              {filteredIdeas.length} Business Ideas Found
            </h2>
            <div className="text-sm text-text/60">
              Showing results for {selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.label : 'all categories'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIdeas.map(idea => (
              <BusinessIdeaCard key={idea.id} idea={idea} />
            ))}
          </div>

          {filteredIdeas.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">No Results Found</h3>
              <p className="text-text/60 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedInvestment('all');
                }}
                className="bg-primary text-baby-powder px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp size={28} className="text-baby-powder" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-text/70">Business Ideas</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent2 to-accent2-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock size={28} className="text-baby-powder" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">2-12</div>
              <div className="text-text/70">Weeks to Launch</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
                <DollarSign size={28} className="text-baby-powder" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">₨5K+</div>
              <div className="text-text/70">Starting Investment</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-accent1 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-baby-powder" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-text/70">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
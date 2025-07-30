"use client"
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, CheckCircle, MessageCircle, Heart } from 'lucide-react';

const CollaborationPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'design', label: 'Design & Branding' },
    { id: 'marketing', label: 'Marketing & Social Media' },
    { id: 'development', label: 'Web Development' },
    { id: 'content', label: 'Content Writing' },
    { id: 'photography', label: 'Photography' },
    { id: 'consulting', label: 'Business Consulting' },
    { id: 'finance', label: 'Finance & Accounting' }
  ];

  const locations = [
    { id: 'all', label: 'All Pakistan' },
    { id: 'karachi', label: 'Karachi' },
    { id: 'lahore', label: 'Lahore' },
    { id: 'islamabad', label: 'Islamabad' },
    { id: 'faisalabad', label: 'Faisalabad' },
    { id: 'remote', label: 'Remote Only' }
  ];

  const collaborators = [
    {
      id: 1,
      name: 'Sana Malik',
      title: 'Brand Designer & Logo Specialist',
      location: 'Karachi',
      avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      rating: 4.9,
      reviews: 127,
      completedProjects: 89,
      responseTime: '2 hours',
      startingPrice: '₨15,000',
      category: 'design',
      skills: ['Logo Design', 'Brand Identity', 'Social Media Graphics'],
      portfolio: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg',
      verified: true,
      topRated: true
    },
    {
      id: 2,
      name: 'Fatima Sheikh',
      title: 'Social Media Marketing Expert',
      location: 'Lahore',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
      rating: 4.8,
      reviews: 95,
      completedProjects: 156,
      responseTime: '1 hour',
      startingPrice: '₨20,000',
      category: 'marketing',
      skills: ['Instagram Marketing', 'Facebook Ads', 'Content Strategy'],
      portfolio: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      verified: true,
      topRated: false
    },
    {
      id: 3,
      name: 'Ayesha Khan',
      title: 'WordPress Developer',
      location: 'Remote',
      avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
      rating: 4.9,
      reviews: 203,
      completedProjects: 134,
      responseTime: '3 hours',
      startingPrice: '₨25,000',
      category: 'development',
      skills: ['WordPress', 'E-commerce', 'WooCommerce'],
      portfolio: 'https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg',
      verified: true,
      topRated: true
    },
    {
      id: 4,
      name: 'Zara Ahmed',
      title: 'Content Writer & Copywriter',
      location: 'Islamabad',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      rating: 4.7,
      reviews: 78,
      completedProjects: 112,
      responseTime: '4 hours',
      startingPrice: '₨8,000',
      category: 'content',
      skills: ['Blog Writing', 'Product Descriptions', 'Email Marketing'],
      portfolio: 'https://images.pexels.com/photos/3992538/pexels-photo-3992538.jpeg',
      verified: true,
      topRated: false
    },
    {
      id: 5,
      name: 'Nadia Butt',
      title: 'Product Photographer',
      location: 'Karachi',
      avatar: 'https://images.pexels.com/photos/3771124/pexels-photo-3771124.jpeg',
      rating: 4.8,
      reviews: 67,
      completedProjects: 89,
      responseTime: '6 hours',
      startingPrice: '₨12,000',
      category: 'photography',
      skills: ['Product Photography', 'E-commerce Photos', 'Photo Editing'],
      portfolio: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg',
      verified: true,
      topRated: false
    },
    {
      id: 6,
      name: 'Ruqaiya Ali',
      title: 'Business Consultant',
      location: 'Lahore',
      avatar: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
      rating: 4.9,
      reviews: 145,
      completedProjects: 78,
      responseTime: '1 hour',
      startingPrice: '₨30,000',
      category: 'consulting',
      skills: ['Business Strategy', 'Market Research', 'Financial Planning'],
      portfolio: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      verified: true,
      topRated: true
    }
  ];

  const filteredCollaborators = collaborators.filter(collaborator => {
    const matchesSearch = collaborator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collaborator.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || collaborator.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || 
                           collaborator.location.toLowerCase() === selectedLocation ||
                           (selectedLocation === 'remote' && collaborator.location === 'Remote');
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            Find Your Perfect <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Collaborator</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with skilled Pakistani women professionals who understand your vision. From design to development, marketing to consulting - find the right expertise to grow your business.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
            <input
              type="text"
              placeholder="Search by name, skill, or service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 inline-block">
            <div className="flex items-center space-x-4 text-sm text-text/70">
              <div className="flex items-center space-x-1">
                <CheckCircle className="text-green-500" size={16} />
                <span>Verified professionals</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="text-primary" size={16} />
                <span>Safe payments</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="text-primary" size={16} />
                <span>Direct communication</span>
              </div>
            </div>
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
              <label className="block text-sm font-medium text-text/70 mb-2">Service Category</label>
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

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-text/70 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full p-3 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-xl text-text focus:outline-none focus:border-primary"
              >
                {locations.map(location => (
                  <option key={location.id} value={location.id}>{location.label}</option>
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
              {filteredCollaborators.length} Collaborators Found
            </h2>
            <div className="text-sm text-text/60">
              Showing results for {selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.label : 'all categories'}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCollaborators.map(collaborator => (
              <div
                key={collaborator.id}
                className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-glass-shadow"
              >
                {/* Header */}
                <div className="relative h-32 bg-gradient-to-br from-primary/20 to-accent2/20">
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {collaborator.verified && (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </span>
                    )}
                    {collaborator.topRated && (
                      <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                        Top Rated
                      </span>
                    )}
                  </div>
                  <div className="absolute -bottom-8 left-6">
                    <img
                      src={collaborator.avatar}
                      alt={collaborator.name}
                      className="w-16 h-16 rounded-2xl border-4 border-baby-powder object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-12 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                      {collaborator.name}
                    </h3>
                    <p className="text-text/70 text-sm">{collaborator.title}</p>
                    <div className="flex items-center space-x-2 text-sm text-text/60">
                      <MapPin size={14} className="text-primary" />
                      <span>{collaborator.location}</span>
                    </div>
                  </div>

                  {/* Rating & Stats */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-secondary/20">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Star className="text-yellow-400" size={14} fill="currentColor" />
                        <span className="font-semibold text-text">{collaborator.rating}</span>
                      </div>
                      <p className="text-xs text-text/60">{collaborator.reviews} reviews</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <CheckCircle className="text-green-500" size={14} />
                      </div>
                      <p className="text-xs text-text/60">{collaborator.completedProjects} projects</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-text/70">Specializes in:</p>
                    <div className="flex flex-wrap gap-1">
                      {collaborator.skills.slice(0, 3).map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Response Time & Price */}
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-1 text-text/60">
                      <Clock size={14} className="text-primary" />
                      <span>Responds in {collaborator.responseTime}</span>
                    </div>
                    <div className="font-semibold text-primary">
                      From {collaborator.startingPrice}
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                    <img
                      src={collaborator.portfolio}
                      alt="Portfolio preview"
                      className="w-full h-24 object-cover"
                    />
                  </div>

                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105">
                    View Profile & Hire
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredCollaborators.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">No Collaborators Found</h3>
              <p className="text-text/60 mb-6">Try adjusting your search terms or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedLocation('all');
                }}
                className="bg-primary text-baby-powder px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-12">How Collaboration Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto">
                <Search size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-lg font-bold text-text">1. Browse & Search</h3>
              <p className="text-text/70 text-sm">Find the perfect collaborator using our filters and search</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent2 to-accent2-light rounded-2xl flex items-center justify-center mx-auto">
                <MessageCircle size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-lg font-bold text-text">2. Connect & Discuss</h3>
              <p className="text-text/70 text-sm">Message directly to discuss your project requirements</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary-light rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-lg font-bold text-text">3. Hire Safely</h3>
              <p className="text-text/70 text-sm">Secure payment system protects both parties</p>
            </div>
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-light to-accent1 rounded-2xl flex items-center justify-center mx-auto">
                <Heart size={28} className="text-baby-powder" />
              </div>
              <h3 className="text-lg font-bold text-text">4. Build Together</h3>
              <p className="text-text/70 text-sm">Collaborate to bring your business vision to life</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-primary via-primary-light to-accent2 rounded-3xl p-8 md:p-12 text-center text-baby-powder relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-baby-powder rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border border-baby-powder rounded-full"></div>
            </div>

            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Ready to Offer Your Skills?
              </h2>
              <p className="text-lg text-baby-powder/90 max-w-2xl mx-auto">
                Join our network of skilled women professionals and help other entrepreneurs succeed while building your own freelance business.
              </p>
              <button className="bg-baby-powder text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder/90 transition-all duration-300 hover:scale-105 shadow-lg">
                Become a Collaborator
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollaborationPage;
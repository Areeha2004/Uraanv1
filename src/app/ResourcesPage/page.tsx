"use client"
import React, { useState } from 'react';
import { Download, Play, FileText, Book, Video, CheckCircle, Search, Filter } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const resourceCategories = [
    { id: 'all', label: 'All Resources', icon: Book },
    { id: 'guides', label: 'Business Guides', icon: FileText },
    { id: 'templates', label: 'Templates', icon: Download },
    { id: 'videos', label: 'Video Tutorials', icon: Video },
    { id: 'checklists', label: 'Checklists', icon: CheckCircle }
  ];

  const resources = [
    {
      id: 1,
      title: 'Complete Business Plan Template',
      description: 'A comprehensive business plan template specifically designed for Pakistani women entrepreneurs.',
      category: 'templates',
      type: 'PDF Template',
      downloads: 1250,
      rating: 4.9,
      tags: ['Business Plan', 'Strategy', 'Foundation'],
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg'
    },
    {
      id: 2,
      title: 'Social Media Marketing for Pakistani Businesses',
      description: 'Step-by-step guide to building your brand on Instagram, Facebook, and WhatsApp.',
      category: 'guides',
      type: 'Guide',
      downloads: 980,
      rating: 4.8,
      tags: ['Social Media', 'Marketing', 'Branding'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    },
    {
      id: 3,
      title: 'Setting Up Your Online Store',
      description: 'Video tutorial series on creating your e-commerce presence from scratch.',
      category: 'videos',
      type: 'Video Course',
      downloads: 756,
      rating: 4.7,
      tags: ['E-commerce', 'Online Store', 'Tutorial'],
      image: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg'
    },
    {
      id: 4,
      title: 'Pre-Launch Business Checklist',
      description: 'Everything you need to check before launching your business in Pakistan.',
      category: 'checklists',
      type: 'Checklist',
      downloads: 1150,
      rating: 4.9,
      tags: ['Launch', 'Preparation', 'Business Setup'],
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      id: 5,
      title: 'Financial Planning Worksheets',
      description: 'Track your business finances with these easy-to-use templates.',
      category: 'templates',
      type: 'Excel Templates',
      downloads: 890,
      rating: 4.6,
      tags: ['Finance', 'Planning', 'Budgeting'],
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    },
    {
      id: 6,
      title: 'Legal Requirements for Women Entrepreneurs',
      description: 'Complete guide to legal requirements and registrations in Pakistan.',
      category: 'guides',
      type: 'Legal Guide',
      downloads: 567,
      rating: 4.8,
      tags: ['Legal', 'Registration', 'Compliance'],
      image: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg'
    }
  ];

  const filteredResources = resources.filter(resource => {
    const matchesTab = activeTab === 'all' || resource.category === activeTab;
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            Resources & <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Guides</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Everything you need to launch and grow your business - templates, guides, video tutorials, and checklists curated specifically for Pakistani women entrepreneurs.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
            <input
              type="text"
              placeholder="Search resources, guides, templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {resourceCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  activeTab === category.id
                    ? 'bg-primary text-baby-powder shadow-lg'
                    : 'bg-glass-bg backdrop-blur-sm border border-secondary/20 text-text hover:bg-secondary/20'
                }`}
              >
                <category.icon size={20} />
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-text">
              {filteredResources.length} Resources Found
            </h2>
            <div className="text-sm text-text/60">
              Showing {activeTab === 'all' ? 'all categories' : resourceCategories.find(c => c.id === activeTab)?.label}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-glass-shadow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={resource.image}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-accent1/40 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-glass-bg backdrop-blur-sm rounded-full text-xs font-medium text-text">
                      {resource.type}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1 bg-glass-bg backdrop-blur-sm rounded-full px-3 py-1">
                      <Download className="text-primary" size={14} />
                      <span className="text-xs font-medium text-text">{resource.downloads}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-text group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-text/70 text-sm leading-relaxed line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {resource.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(resource.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-text/60">{resource.rating} ({resource.downloads} downloads)</span>
                  </div>

                  {/* Download Button */}
                  <button className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105">
                    <Download size={16} />
                    <span>Download Free</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">No Resources Found</h3>
              <p className="text-text/60 mb-6">Try adjusting your search terms or browse different categories</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}
                className="bg-primary text-baby-powder px-6 py-3 rounded-xl hover:bg-primary-light transition-colors"
              >
                Show All Resources
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary/5 to-accent2/5 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-text mb-4">Need More Support?</h2>
            <p className="text-text/70 mb-6 max-w-2xl mx-auto">
              Join our community to get personalized guidance, connect with mentors, and access exclusive resources for your entrepreneurial journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300">
                Join Community
              </button>
              <button className="bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text px-8 py-4 rounded-2xl font-semibold hover:bg-secondary/20 transition-all duration-300">
                Book 1-on-1 Session
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResourcesPage;
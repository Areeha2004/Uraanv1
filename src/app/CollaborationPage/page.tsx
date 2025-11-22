"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  MessageCircle,
  Heart,
} from "lucide-react";
interface PortfolioItem {
  title: string;
  serviceType: string;
  url: string;
  image?: string;
}
interface Collaborator {
  id: string;
  userId: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  image: string;
  rating: number;
  reviewsCount: number;
  completedProjects: number;
  responseTime: string;
  startingPrice: string;
  category: string;
  skills: string[];
  portfolio: PortfolioItem[];
  verified: boolean;
  topRated: boolean;
}

const CollaborationPage: React.FC = () => {
  // fetching state
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // filter controls
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  // static dropdown options
  const categories = [
    { id: "all", label: "All Services" },
    { id: "design", label: "Design & Branding" },
    { id: "marketing", label: "Marketing & Social Media" },
    { id: "development", label: "Web Development" },
    { id: "content", label: "Content Writing" },
    { id: "photography", label: "Photography" },
    { id: "consulting", label: "Business Consulting" },
    { id: "finance", label: "Finance & Accounting" },
  ];

  const locations = [
    { id: "all", label: "All Pakistan" },
    { id: "karachi", label: "Karachi" },
    { id: "lahore", label: "Lahore" },
    { id: "islamabad", label: "Islamabad" },
    { id: "faisalabad", label: "Faisalabad" },
    { id: "remote", label: "Remote Only" },
  ];

  // fetch from API on mount
  useEffect(() => {
    const controller = new AbortController();

    async function loadCollaborators() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/collaborators", {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        interface ApiCollaboratorResponse {
          id: string;
          userId: string;
          title: string;
          location: string;
          avatar: string;
          rating: number;
          reviewsCount: number;
          completedProjects?: number;
          responseTime: string;
          startingPrice: string;
          category: string;
          skills: string[];
          portfolio: PortfolioItem[];
          verified: boolean;
          topRated: boolean;
          user?: {
            name?: string;
            image?: string;
          };
        }
        
        const data: ApiCollaboratorResponse[] = await res.json();
       const mapped: Collaborator[] = data.map((entry) => ({
  id: entry.id,
  name: entry.user?.name || "", // ⬅️ grab from nested user
  title: entry.title,
  userId: entry.userId,
  image: entry.user?.image || "/default-profile.png",
  location: entry.location,
  avatar: entry.avatar,
  rating: entry.rating,
  reviewsCount: entry.reviewsCount,
  completedProjects: entry.completedProjects || 0,
  responseTime: entry.responseTime,
  startingPrice: entry.startingPrice,
  category: entry.category,
  skills: entry.skills || [],
  portfolio: entry.portfolio,
  verified: entry.verified,
  topRated: entry.topRated,
}));
        setCollaborators(mapped);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message || "Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }

    loadCollaborators();
    return () => {
      controller.abort();
    };
  }, []);

  // client‐side filtering
 const filteredCollaborators = collaborators.filter((c) => {
  const term = searchTerm.trim().toLowerCase();

  // Safely extract fields with fallbacks
  const name = c.name ?? "";
  const title = c.title ?? "";
  const location = c.location ?? "";
  const skills = Array.isArray(c.skills) ? c.skills : [];

  // 1. Search match
  const matchesSearch =
    !term ||
    name.toLowerCase().includes(term) ||
    title.toLowerCase().includes(term) ||
    skills.some((skill) =>
      (skill ?? "").toLowerCase().includes(term)
    );

  // 2. Category match
  const matchesCategory =
    selectedCategory === "all" ||
    c.category === selectedCategory;

  // 3. Location match (allow “remote” alias)
  const locLower = location.toLowerCase();
  const matchesLocation =
    selectedLocation === "all" ||
    locLower === selectedLocation ||
    (selectedLocation === "remote" && locLower === "remote");

  return matchesSearch && matchesCategory && matchesLocation;
});


  // ...return JSX below


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
                className="group bg-glass-bg backdrop-blur-sm border border-secondary/80 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 hover:shadow-xl hover:shadow-glass-shadow"
              >
                {/* Header */}
                <div  className="relative h-32 bg-cover bg-center"
  style={{
    backgroundImage: `url(${collaborator.avatar})`,
  }}>
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
  src={collaborator.image || "/default-profile.png"}
  alt={`${collaborator.name}'s profile`}
  className="w-16 h-16 rounded-full object-cover"
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
                      <p className="text-xs text-text/60">0 reviews</p>
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
  {collaborator.portfolio?.length > 0 && collaborator.portfolio[0]?.image ? (
    <img
      src={collaborator.portfolio[0].image}
      alt={collaborator.portfolio[0].title || `${collaborator.name} portfolio`}
      className="w-full h-24 object-cover"
    />
  ) : collaborator.portfolio?.length > 0 && collaborator.portfolio[0]?.url ? (
    <img
      src={collaborator.portfolio[0].url}
      alt={collaborator.portfolio[0].title || `${collaborator.name} portfolio`}
      className="w-full h-24 object-cover"
    />
  ) : (
    <div className="w-full h-24 bg-gray-100 flex items-center justify-center">
      <p className="text-sm text-gray-400">No portfolio image</p>
    </div>
  )}
</div>


                  {/* CTA */}
                  <button className="w-full bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
                    onClick={() => window.location.href = `/CollaboratorProfilePage/${collaborator.userId}`}>
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
              <button className="bg-baby-powder text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder/90 transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => window.location.href = "/BecomeCollaboratorPage"}>
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
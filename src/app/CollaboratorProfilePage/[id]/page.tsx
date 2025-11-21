"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Award,
  MessageCircle,
  Heart,
  Download,
  ExternalLink,
  Calendar,
  DollarSign,
} from "lucide-react";
import HireCollaboratorModal from "../../../components/collaboration/HireCollaboratorModal";
interface Review {
  id: number;
  client: string;
  rating: number;
  comment: string;
  project: string;
  date: string;
  avatar: string;
}
interface Package {
  name: string;
  price: string;
  deliveryTime: string;
  features: string[];
}

interface PortfolioItem {
  id: number;
  title: string;
  image: string;
  category: string;
}

interface Collaborator {
 id: string;      // was number
  userId: string;
  name: string;
  title: string;
  location: string;
  avatar: string;
  image: string;
  rating: number;
  reviewsCount: number;
  completedProjects?: number;
  responseTime: string;
  startingPrice: string;
  category?: string;
  skills: string[];
  portfolio: PortfolioItem[];
  verified: boolean;
  topRated: boolean;
}
 const CollaboratorProfilePage: React.FC = () => {
  const { id } = useParams();
  const [showHireModal, setShowHireModal] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");
  const [collaborator, setCollaborator] = useState<any>(null);
  const [loading, setLoading] = useState(true);
const { data: session, status } = useSession();

// Only calculate when both are loaded
const userIsHiring =
  status === "authenticated" &&
  collaborator?.userId && // ensures collaborator is defined
  session.user.id !== collaborator.userId;

  const staticReviews = [
     {
      id: 1,
      client: 'Fatima Ahmed',
      rating: 5,
      comment: 'Sana created the perfect logo for my boutique...',
      project: 'Logo Design',
      date: '2 weeks ago',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
    },
    {
      id: 2,
      client: 'Ayesha Khan',
      rating: 5,
      comment: 'Professional, creative, and delivered on time...',
      project: 'Brand Identity Package',
      date: '1 month ago',
      avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
    },
    {
      id: 3,
      client: 'Zara Butt',
      rating: 4,
      comment: 'Great communication and beautiful designs...',
      project: 'Social Media Graphics',
      date: '2 months ago',
      avatar: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
    },
  ];
  const languages = ['English', 'Urdu', 'Punjabi'];
  const staticPackages = [
     {
        name: 'Basic Logo',
        price: '₨15,000',
        deliveryTime: '3 days',
        features: ['1 Logo concept', '3 revisions', 'High-res files', 'Basic brand colors']
      },
      {
        name: 'Standard Brand',
        price: '₨35,000',
        deliveryTime: '7 days',
        features: ['3 Logo concepts', 'Unlimited revisions', 'Brand guidelines', 'Social media kit', 'Print-ready files']
      },
      {
        name: 'Premium Identity',
        price: '₨65,000',
        deliveryTime: '14 days',
        features: ['5 Logo concepts', 'Complete brand identity', 'Marketing materials', 'Website mockups', '6 months support']
      }
  ];

  useEffect(() => {
  async function fetchData() {
    try {
      const res = await fetch(`/api/collaborators/${id}`);
      if (!res.ok) throw new Error("Failed to fetch collaborator");

      const entry = await res.json();

      const mapped: Collaborator = {
        id: String(entry.id || entry.id,),
       userId: String(entry.userId || entry.user?.id || ""),
        name: entry.user?.name || "",
        title: entry.title || "",
        location: entry.location || entry.user?.location || "",
        avatar: entry.avatar || entry.user?.image || "",
        image: entry.user.image || entry.user?.avatar || "",
        rating: entry.rating || 0,
        reviewsCount: entry.reviewsCount || 0,
        responseTime: entry.responseTime || "",
        startingPrice: entry.startingPrice || "",
        skills: entry.skills || [],
      portfolio: (entry.portfolio || []).map((p: any) => ({
  title: p.title || "",
  serviceType: p.serviceType || "",
  url: p.url || "",
  image: (p.image && p.image.trim() !== "") ? p.image : p.url || "", // fallback to url
})),


        verified: !!entry.verified,
        topRated: !!entry.topRated,
      };

      setCollaborator(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (id) fetchData();
}, [id]);

if (loading) {
  return <div className="p-6 text-center">Loading...</div>;
}

if (!collaborator) {
  return <div className="p-6 text-center text-red-500">Collaborator not found</div>;
}

  return (
    
    <div className="pt-16 min-h-screen bg-gradient-to-br from-base to-baby-powder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/CollaborationPage"
          className="inline-flex items-center space-x-2 text-text/70 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={20} />
          <span>Back to Collaborators</span>
        </Link>

        {/* Header Section */}
        <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden mb-8">
          {/* Cover Image */}
          
          <div className="relative h-48 md:h-64">
            <img
              src={collaborator.avatar}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent1/60 to-transparent"></div>
            
            {/* Badges */}
            <div className="absolute top-6 right-6 flex space-x-2">
              {collaborator.verified && (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <CheckCircle size={14} />
                  <span>Verified</span>
                </span>
              )}
              {collaborator.topRated && (
                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                  <Award size={14} />
                  <span>Top Rated</span>
                </span>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
              {/* Avatar */}
              <div className="relative">
                <img
                  src={collaborator.image}
                  alt={collaborator.name}
                  className="w-32 h-32 rounded-3xl border-4 border-baby-powder object-cover shadow-xl"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-baby-powder"></div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-text mb-2">{collaborator.name}</h1>
                  <p className="text-lg text-text/70 mb-3">{collaborator.title}</p>
                  <div className="flex items-center space-x-4 text-sm text-text/60">
                    <div className="flex items-center space-x-1">
                      <MapPin size={14} className="text-primary" />
                      <span>{collaborator.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} className="text-primary" />
                      <span>Joined {collaborator.joinedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  <div className="text-center p-3 bg-baby-powder/50 rounded-xl">
    <div className="flex items-center justify-center space-x-1 mb-1">
      <Star className="text-yellow-400" size={16} fill="currentColor" />
      <span className="font-bold text-text">{collaborator.rating}</span>
    </div>
    <p className="text-xs text-text/60">{collaborator.totalReviews} reviews</p>
  </div>
  <div className="text-center p-3 bg-baby-powder/50 rounded-xl">
    <div className="flex items-center justify-center mb-1">
      <CheckCircle className="text-green-500" size={16} />
    </div>
    <p className="text-xs text-text/60">{collaborator.completedProjects} projects</p>
  </div>
  <div className="text-center p-3 bg-baby-powder/50 rounded-xl">
    <div className="flex items-center justify-center space-x-1 mb-1">
      <Clock className="text-primary" size={16} />
      <span className="font-bold text-text text-sm">{collaborator.responseTime}</span>
    </div>
    <p className="text-xs text-text/60">Response time</p>
  </div>
  <div className="text-center p-3 bg-baby-powder/50 rounded-xl">
    <div className="flex items-center justify-center space-x-1 mb-1">
      <DollarSign className="text-primary" size={16} />
      <span className="font-bold text-text text-sm">{collaborator.startingPrice}</span>
    </div>
    <p className="text-xs text-text/60">Starting at</p>
  </div>
</div>

              </div>

              {/* CTA */}
              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => setShowHireModal(true)}
                  className="bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105"
                >
                  Hire Collaborator
                </button>
                <button className="bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text px-8 py-3 rounded-2xl font-medium hover:bg-secondary/20 transition-all duration-300">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Navigation Tabs */}
            <div className="flex space-x-4 border-b border-secondary/20">
              {[
                { id: 'portfolio', label: 'Portfolio' },
                { id: 'about', label: 'About' },
                { id: 'reviews', label: 'Reviews' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 font-medium transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-text/70 hover:text-primary'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Portfolio Tab */}
{activeTab === 'portfolio' && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-text">Portfolio</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {collaborator.portfolio.map((item: PortfolioItem, index: number) => {
        const imageSrc = item.image && item.image.trim() !== '' 
          ? item.image 
          : '/placeholder-image.jpg'; // fallback placeholder

        return (
          <div
            key={item.id ?? `${item.title}-${index}`}
            className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative h-48">
              <img
                src={imageSrc}
                alt={item.title || 'Portfolio item'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent1/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="w-10 h-10 bg-baby-powder rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                  <ExternalLink size={16} className="text-primary" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-semibold text-text mb-1">{item.title}</h4>
              <p className="text-sm text-primary">{item.category}</p>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-text mb-4">About Me</h3>
                  <p className="text-text/70 leading-relaxed">{collaborator.bio}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-text mb-3">Skills & Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {collaborator.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-text mb-3">Languages</h4>
                  <div className="flex space-x-4">
                    {languages.map((language: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-secondary/20 text-text rounded-lg text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-text">Client Reviews</h3>
                <div className="space-y-6">
                  {staticReviews.map((review: Review) => (
                    <div
                      key={review.id}
                      className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6"
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={review.avatar}
                          alt={review.client}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h5 className="font-semibold text-text">{review.client}</h5>
                              <p className="text-sm text-text/60">{review.project} • {review.date}</p>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                              ))}
                            </div>
                          </div>
                          <p className="text-text/70">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Packages */}
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-text mb-4">Service Packages</h3>
              <div className="space-y-4">
                {staticPackages.map((pkg : Package, index: number) => (
                  <div
                    key={index}
                    className="border border-secondary/20 rounded-2xl p-4 hover:border-primary/30 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-text">{pkg.name}</h4>
                      <span className="text-primary font-bold">{pkg.price}</span>
                    </div>
                    <p className="text-sm text-text/60 mb-3">{pkg.deliveryTime} delivery</p>
                    <ul className="space-y-1">
                      {pkg.features.map((feature: string, idx: number) => (
                        <li key={idx} className="text-sm text-text/70 flex items-center space-x-2">
                          <CheckCircle size={12} className="text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-text mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-text/70">Response Rate</span>
                  <span className="font-semibold text-text">100%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">On-time Delivery</span>
                  <span className="font-semibold text-text">98%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Repeat Clients</span>
                  <span className="font-semibold text-text">85%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text/70">Average Rating</span>
                  <span className="font-semibold text-text">{collaborator.rating}/5.0</span>
                </div>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="bg-gradient-to-br from-primary/5 to-accent2/5 rounded-3xl p-6">
              <h3 className="text-lg font-bold text-text mb-4">Trust & Safety</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-text/70">Identity Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-text/70">Payment Protected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="text-green-500" size={16} />
                  <span className="text-sm text-text/70">Quality Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     
{showHireModal && (
  <HireCollaboratorModal
    collaborator={{
      id: String(collaborator.userId), // 🔥 this must be a valid User.id
      name: collaborator.name,
      title: collaborator.title,
      avatar: collaborator.avatar,
      startingPrice: collaborator.startingPrice,
    }}
    role={userIsHiring ? "requester" : "receiver"} // ✅ API enum
    onClose={() => setShowHireModal(false)}
    onSubmit={async ({
      id,
      role,
      projectTitle,
      projectDescription,
      budget,
      deadline,
      contactMethod,
      additionalInfo,
    }) => {
      try {
        const res = await fetch("/api/collaborations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id, // ✅ collaborator User.id
            role, // "requester" | "receiver"
            projectTitle,
            projectDescription,
            budget,
            deadline, // ISO or null
            contactMethod,
            additionalInfo: additionalInfo?.trim() || null,
          }),
        });

        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error || "Failed to create collaboration");
        }

        alert("Collaboration request sent successfully!");
        setShowHireModal(false);
      } catch (error) {
        console.error("Error creating collaboration:", error);
        alert(
          error instanceof Error
            ? error.message
            : "Failed to send request. Please try again."
        );
      }
    }}
  />
)}


      
    </div>
  );
};

export default CollaboratorProfilePage;
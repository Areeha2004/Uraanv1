"use client"
import React, { useState } from 'react';
import { MessageCircle, Users, Award, TrendingUp, Heart, Share2, Calendar, MapPin } from 'lucide-react';

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  const communityStats = [
    {
      icon: Users,
      number: '2,500+',
      label: 'Active Members',
      color: 'from-primary to-primary-light'
    },
    {
      icon: MessageCircle,
      number: '15,000+',
      label: 'Discussions',
      color: 'from-accent2 to-accent2-light'
    },
    {
      icon: Award,
      number: '500+',
      label: 'Success Stories',
      color: 'from-secondary to-primary-light'
    },
    {
      icon: TrendingUp,
      number: '₨50L+',
      label: 'Revenue Generated',
      color: 'from-primary-light to-accent1'
    }
  ];

  const recentPosts = [
    {
      id: 1,
      author: {
        name: 'Fatima Khan',
        avatar: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
        location: 'Karachi',
        badge: 'Verified Entrepreneur'
      },
      content: 'Just hit ₨2 lakh in monthly revenue with my online boutique! 🎉 Thank you URAAN community for all the support and guidance. Special thanks to the marketing workshop last month!',
      timestamp: '2 hours ago',
      likes: 156,
      comments: 28,
      tags: ['Success Story', 'Fashion Business'],
      image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg'
    },
    {
      id: 2,
      author: {
        name: 'Ayesha Malik',
        avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
        location: 'Lahore',
        badge: 'Community Helper'
      },
      content: 'Looking for recommendations for reliable packaging suppliers in Punjab. Need eco-friendly options for my handmade soap business. Any suggestions?',
      timestamp: '4 hours ago',
      likes: 43,
      comments: 15,
      tags: ['Question', 'Suppliers', 'Eco-friendly'],
      image: null
    },
    {
      id: 3,
      author: {
        name: 'Zara Ahmed',
        avatar: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
        location: 'Islamabad',
        badge: 'Rising Star'
      },
      content: 'Free webinar tomorrow: "Social Media Marketing for Pakistani Businesses" 📱 I\'ll be sharing strategies that helped me grow from 0 to 10K followers in 3 months!',
      timestamp: '6 hours ago',
      likes: 89,
      comments: 22,
      tags: ['Event', 'Social Media', 'Free Workshop'],
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Women Entrepreneur Meetup - Karachi',
      date: 'March 15, 2025',
      time: '6:00 PM - 9:00 PM',
      location: 'Pearl Continental Hotel, Karachi',
      attendees: 156,
      type: 'In-Person',
      image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
    },
    {
      id: 2,
      title: 'Digital Marketing Masterclass',
      date: 'March 18, 2025',
      time: '7:00 PM - 8:30 PM',
      location: 'Online via Zoom',
      attendees: 234,
      type: 'Virtual',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'
    },
    {
      id: 3,
      title: 'Financial Planning Workshop',
      date: 'March 22, 2025',
      time: '5:00 PM - 7:00 PM',
      location: 'Online via Zoom',
      attendees: 189,
      type: 'Virtual',
      image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    }
  ];

  const successStories = [
    {
      id: 1,
      name: 'Sana Rashid',
      business: 'Artisan Jewelry',
      revenue: '₨3L+ monthly',
      story: 'Started with ₨15,000 investment, now selling internationally',
      image: 'https://images.pexels.com/photos/3771124/pexels-photo-3771124.jpeg',
      timeframe: '8 months'
    },
    {
      id: 2,
      name: 'Nadia Shah',
      business: 'Online Tutoring',
      revenue: '₨1.5L+ monthly',
      story: 'Teaching mathematics to 50+ students online',
      image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
      timeframe: '6 months'
    },
    {
      id: 3,
      name: 'Rubina Ali',
      business: 'Home Bakery',
      revenue: '₨80K+ monthly',
      story: 'From hobby to business, now catering events',
      image: 'https://images.pexels.com/photos/3992538/pexels-photo-3992538.jpeg',
      timeframe: '1 year'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            Join Our <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Community</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed mb-8">
            Connect with 2,500+ Pakistani women entrepreneurs. Share experiences, get support, find collaborators, and celebrate successes together.
          </p>
          
          <button className="bg-gradient-to-r from-primary to-primary-light text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300 hover:scale-105">
            Join Community Free
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityStats.map((stat, index) => (
              <div
                key={index}
                className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon size={28} className="text-baby-powder" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-text/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              { id: 'feed', label: 'Community Feed' },
              { id: 'events', label: 'Events' },
              { id: 'stories', label: 'Success Stories' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-primary text-baby-powder shadow-lg'
                    : 'bg-glass-bg backdrop-blur-sm border border-secondary/20 text-text hover:bg-secondary/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Community Feed */}
          {activeTab === 'feed' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                {recentPosts.map(post => (
                  <div
                    key={post.id}
                    className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6 hover:shadow-lg hover:shadow-glass-shadow transition-all duration-300"
                  >
                    {/* Author */}
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-text">{post.author.name}</h3>
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                            {post.author.badge}
                          </span>
                        </div>
                        <p className="text-sm text-text/60">{post.author.location} • {post.timestamp}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <p className="text-text mb-4">{post.content}</p>

                    {/* Image */}
                    {post.image && (
                      <div className="mb-4 rounded-2xl overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-secondary/20 text-text rounded-full text-sm"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-secondary/20">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-text/60 hover:text-primary transition-colors">
                          <Heart size={20} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-2 text-text/60 hover:text-primary transition-colors">
                          <MessageCircle size={20} />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <button className="flex items-center space-x-2 text-text/60 hover:text-primary transition-colors">
                        <Share2 size={20} />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Join CTA */}
                <div className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-6 text-baby-powder text-center">
                  <h3 className="text-xl font-bold mb-2">New Here?</h3>
                  <p className="text-baby-powder/90 text-sm mb-4">
                    Join our supportive community and start your entrepreneurial journey!
                  </p>
                  <button className="bg-baby-powder text-primary px-6 py-3 rounded-xl font-semibold hover:bg-baby-powder/90 transition-colors">
                    Join Now
                  </button>
                </div>

                {/* Trending Topics */}
                <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                  <h3 className="text-lg font-bold text-text mb-4">Trending Topics</h3>
                  <div className="space-y-3">
                    {[
                      '#OnlineBusiness',
                      '#SocialMediaMarketing',
                      '#WomenEntrepreneurs',
                      '#BusinessTips',
                      '#SuccessStory'
                    ].map((topic, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-primary font-medium">{topic}</span>
                        <span className="text-xs text-text/60">{150 - index * 20} posts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Events Tab */}
          {activeTab === 'events' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-text mb-4">Upcoming Events</h2>
                <p className="text-text/70">Join workshops, meetups, and networking events</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {upcomingEvents.map(event => (
                  <div
                    key={event.id}
                    className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="relative h-48">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.type === 'Virtual' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="text-lg font-bold text-text">{event.title}</h3>
                      
                      <div className="space-y-2 text-sm text-text/70">
                        <div className="flex items-center space-x-2">
                          <Calendar size={16} className="text-primary" />
                          <span>{event.date} • {event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin size={16} className="text-primary" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users size={16} className="text-primary" />
                          <span>{event.attendees} attending</span>
                        </div>
                      </div>

                      <button className="w-full bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300">
                        Join Event
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Success Stories Tab */}
          {activeTab === 'stories' && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-text mb-4">Success Stories</h2>
                <p className="text-text/70">Get inspired by real stories from our community members</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {successStories.map(story => (
                  <div
                    key={story.id}
                    className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
                  >
                    <div className="relative h-64">
                      <img
                        src={story.image}
                        alt={story.business}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-accent1/60 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-baby-powder">
                        <h3 className="text-lg font-bold">{story.name}</h3>
                        <p className="text-baby-powder/90">{story.business}</p>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-primary font-bold">{story.revenue}</span>
                        <span className="text-sm text-text/60">in {story.timeframe}</span>
                      </div>
                      
                      <p className="text-text/70 text-sm">{story.story}</p>

                      <button className="w-full bg-secondary/20 text-text py-2 rounded-xl font-medium hover:bg-secondary/30 transition-colors">
                        Read Full Story
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunityPage;
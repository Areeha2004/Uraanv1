"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Heart, Users } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Get in touch via email',
      value: 'hello@uraan.com',
      action: 'mailto:hello@uraan.com'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak with our team',
      value: '+92 21 1234 5678',
      action: 'tel:+92211234567'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      description: 'Our office location',
      value: 'Karachi, Pakistan',
      action: '#'
    },
    {
      icon: Clock,
      title: 'Support Hours',
      description: 'When we\'re available',
      value: '9 AM - 6 PM (PKT)',
      action: '#'
    }
  ];

  const faqItems = [
    {
      question: 'How does the AI business analysis work?',
      answer: 'Our AI analyzes your skills, interests, time availability, and investment capacity to recommend the most suitable business ideas for your unique situation.'
    },
    {
      question: 'Is URAAN really free?',
      answer: 'Yes! URAAN is completely free to use. We believe in empowering Pakistani women entrepreneurs without financial barriers.'
    },
    {
      question: 'What kind of support do I get?',
      answer: 'You get access to detailed roadmaps, starter kits, community support, and can connect with skilled collaborators to help build your business.'
    },
    {
      question: 'Can I change my business idea later?',
      answer: 'Absolutely! You can retake the quiz anytime and explore different business ideas. Many entrepreneurs try multiple paths before finding their perfect fit.'
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: 'Community Support',
      description: 'Connect with other women entrepreneurs',
      action: 'Join Community',
      link: '/CommunityPage',
      color: 'from-primary to-primary-light'
    },
    {
      icon: Users,
      title: 'Find Collaborators',
      description: 'Get professional help for your business',
      action: 'Browse Experts',
      link: '/CollaborationPage',
      color: 'from-accent2 to-accent2-light'
    },
    {
      icon: Heart,
      title: 'Success Stories',
      description: 'Get inspired by other entrepreneurs',
      action: 'Read Stories',
      link: '/CommunityPage',
      color: 'from-secondary to-primary-light'
    }
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-text mb-6">
            Get in <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-text/80 max-w-3xl mx-auto leading-relaxed">
            Have questions about starting your business? Need help with your entrepreneurial journey? 
            We're here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.action}
                className="group bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6 text-center hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-glass-shadow"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <info.icon size={28} className="text-baby-powder" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">{info.title}</h3>
                <p className="text-text/60 text-sm mb-2">{info.description}</p>
                <p className="text-primary font-semibold">{info.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Support Options */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-text mb-6">Send us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-2xl">
                  <p className="text-green-700">Thank you! Your message has been sent successfully.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-2xl">
                  <p className="text-red-700">There was an error sending your message. Please try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text/70 mb-2">
                      Your Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text/70 mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text/70 mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="business">Business Guidance</option>
                    <option value="collaboration">Collaboration Inquiry</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text/70 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isSubmitting
                      ? 'bg-text/20 text-text/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:shadow-lg hover:shadow-result-cta-shadow hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-text/20 border-t-text/40 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Support Options & FAQ */}
            <div className="space-y-8">
              {/* Other Support Options */}
              <div>
                <h2 className="text-2xl font-bold text-text mb-6">Other Ways to Get Support</h2>
                <div className="space-y-4">
                  {supportOptions.map((option, index) => (
                    <a
                      key={index}
                      href={option.link}
                      className="group block p-6 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl hover:scale-105 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <option.icon size={24} className="text-baby-powder" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text group-hover:text-primary transition-colors">
                            {option.title}
                          </h3>
                          <p className="text-text/70 text-sm">{option.description}</p>
                        </div>
                        <div className="text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                          {option.action} →
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="text-2xl font-bold text-text mb-6">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div
                      key={index}
                      className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6"
                    >
                      <h3 className="font-bold text-text mb-3">{faq.question}</h3>
                      <p className="text-text/70 text-sm leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-baby-powder to-base">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-primary via-primary-light to-accent2 rounded-3xl p-8 md:p-12 text-baby-powder relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-baby-powder rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 border border-baby-powder rounded-full"></div>
            </div>

            <div className="relative space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Ready to Start Your Business Journey?
              </h2>
              <p className="text-lg text-baby-powder/90 max-w-2xl mx-auto">
                Take our AI quiz to discover your perfect business idea and get a personalized roadmap to success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/QuizPage"
                  className="bg-baby-powder text-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder/90 transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  Take Quiz Now
                </a>
                <a
                  href="/ExplorePage"
                  className="border-2 border-baby-powder text-baby-powder px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-baby-powder hover:text-primary transition-all duration-300"
                >
                  Browse Ideas
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-accent1 text-baby-powder mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-light rounded-lg flex items-center justify-center">
                <span className="text-baby-powder font-bold text-lg">U</span>
              </div>
              <span className="text-2xl font-bold">URAAN</span>
            </div>
            <p className="text-baby-powder/80 text-sm leading-relaxed">
              Empowering Pakistani women to launch successful businesses with AI-powered guidance and community support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-baby-powder/60 hover:text-primary-light transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-baby-powder/60 hover:text-primary-light transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-baby-powder/60 hover:text-primary-light transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-baby-powder/60 hover:text-primary-light transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-baby-powder mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/AboutPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">About Us</Link></li>
              <li><Link href="/HowItWorksPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">How It Works</Link></li>
              <li><Link href="/ExplorePage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Business Ideas</Link></li>
              <li><Link href="/ResourcesPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Resources</Link></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-baby-powder mb-4">Community</h3>
            <ul className="space-y-2">
              <li><Link href="/CommunityPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Join Community</Link></li>
              <li><Link href="/CollaborationPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Find Collaborators</Link></li>
              <li><a href="#" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Success Stories</a></li>
              <li><a href="#" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Events</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-baby-powder mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/ContactPage" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Contact Us</Link></li>
              <li><a href="#" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-baby-powder/80 hover:text-primary-light transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-baby-powder/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-baby-powder/60 text-sm">
            © 2025 URAAN. All rights reserved.
          </p>
          <p className="text-baby-powder/60 text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={16} className="mx-1 text-primary-light" /> for Pakistani women entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
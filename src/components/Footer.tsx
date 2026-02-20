import React from 'react';
import Link from 'next/link';
import { Facebook, Heart, Instagram, Mail, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-primary/12 bg-baby-powder/72 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/35 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-light">
                <span className="text-sm font-bold text-baby-powder">U</span>
              </div>
              <span className="font-display text-xl text-text">URAAN</span>
            </div>
            <p className="text-sm leading-relaxed text-text/72">
              Empowering women in Pakistan to launch stronger businesses with clear strategy, premium execution, and supportive community.
            </p>
            <div className="flex gap-2">
              <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 text-text/70 transition-colors hover:text-primary">
                <Facebook size={16} />
              </a>
              <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 text-text/70 transition-colors hover:text-primary">
                <Instagram size={16} />
              </a>
              <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 text-text/70 transition-colors hover:text-primary">
                <Twitter size={16} />
              </a>
              <a href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-primary/15 text-text/70 transition-colors hover:text-primary">
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-text/70">Explore</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/AboutPage" className="text-text/72 transition-colors hover:text-primary">About Us</Link></li>
              <li><Link href="/HowItWorksPage" className="text-text/72 transition-colors hover:text-primary">How It Works</Link></li>
              <li><Link href="/ExplorePage" className="text-text/72 transition-colors hover:text-primary">Business Ideas</Link></li>
              <li><Link href="/ResourcesPage" className="text-text/72 transition-colors hover:text-primary">Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-text/70">Community</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/CommunityPage" className="text-text/72 transition-colors hover:text-primary">Join Community</Link></li>
              <li><Link href="/CollaborationPage" className="text-text/72 transition-colors hover:text-primary">Find Collaborators</Link></li>
              <li><a href="#" className="text-text/72 transition-colors hover:text-primary">Success Stories</a></li>
              <li><a href="#" className="text-text/72 transition-colors hover:text-primary">Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-text/70">Support</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/ContactPage" className="text-text/72 transition-colors hover:text-primary">Contact Us</Link></li>
              <li><a href="#" className="text-text/72 transition-colors hover:text-primary">Help Center</a></li>
              <li><a href="#" className="text-text/72 transition-colors hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-text/72 transition-colors hover:text-primary">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-primary/10 pt-6 text-sm md:flex-row">
          <p className="text-text/60">(c) {year} URAAN. All rights reserved.</p>
          <p className="flex items-center text-text/60">
            Made with <Heart size={15} className="mx-1 text-primary" /> for Pakistani women entrepreneurs
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

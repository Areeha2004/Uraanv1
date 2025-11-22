
  "use client" // ✅ Required for Next.js App Router

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { CheckCircle } from 'lucide-react';
import { signIn } from 'next-auth/react';

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  bio: '',
  location: '',
  image: ''
});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const { login } = useAuth();
  const router = useRouter(); // ✅ Next.js hook

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      newErrors.terms = 'Please accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      

const res = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    password: formData.password,
    bio: formData.bio,
    location: formData.location,
    image: formData.image
  }),
});


  if (!res.ok) {
    const { error } = await res.json();
    setErrors({ general: error || 'Registration failed.' });
    return;
  }

  const { user } = await res.json();

  // Optional: You can log in the user or redirect
  login({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar || '' // optional
  });

  router.push('/QuizPage');
 // ✅ Next.js redirect
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };


  const benefits = [
    'AI-powered business recommendations',
    'Access to 50+ curated business ideas',
    'Step-by-step roadmaps and starter kits',
    'Join community of 2,500+ women entrepreneurs',
    'Free resources and templates',
    'Connect with skilled collaborators'
  ];

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/10 to-primary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Benefits */}
          <div className="space-y-8">
            <div>
              <Link href="/" className="inline-flex items-center space-x-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center">
                  <span className="text-baby-powder font-bold text-xl">U</span>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">
                  URAAN
                </span>
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
                Start Your <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Entrepreneurial Journey</span>
              </h1>
              <p className="text-lg text-text/70 leading-relaxed">
                Join thousands of Pakistani women who are building successful businesses with URAAN&apos;s AI-powered guidance and supportive community.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-text">What you&apos;ll get:</h3>
              <div className="grid grid-cols-1 gap-3">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="text-primary mt-0.5" size={20} />
                    <span className="text-text/70">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6">
              <h4 className="font-bold text-text mb-2">Join 2,500+ Success Stories</h4>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[
                    'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
                    'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg',
                    'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg',
                    'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`Member ${i + 1}`}
                      className="w-10 h-10 rounded-full border-2 border-baby-powder object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-medium text-text">₨50L+ revenue generated</p>
                  <p className="text-xs text-text/60">by our community members</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="max-w-md mx-auto w-full">
            <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-text mb-2">Create Account</h2>
                <p className="text-text/70">Start your free journey today</p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-2xl">
                  <p className="text-red-700 text-sm">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text/70 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.name 
                          ? 'border-red-300 focus:ring-red-200' 
                          : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="Enter your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text/70 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.email 
                          ? 'border-red-300 focus:ring-red-200' 
                          : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text/70 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.password 
                          ? 'border-red-300 focus:ring-red-200' 
                          : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="Create a password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-text/70 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full pl-12 pr-12 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                        errors.confirmPassword 
                          ? 'border-red-300 focus:ring-red-200' 
                          : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                      }`}
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text/40 hover:text-text transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>
<div>
  <label htmlFor="bio" className="block text-sm font-medium text-text/70 mb-2">Short Bio</label>
  <input
    id="bio"
    name="bio"
    type="text"
    value={formData.bio}
    onChange={handleChange}
    placeholder="Tell us a bit about you"
    className="w-full px-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 border-secondary/30 focus:ring-primary/20"
  />
</div>
<div>
  <label htmlFor="location" className="block text-sm font-medium text-text/70 mb-2">Location</label>
  <input
    id="location"
    name="location"
    type="text"
    value={formData.location}
    onChange={handleChange}
    placeholder="e.g. Karachi, Lahore"
    className="w-full px-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 border-secondary/30 focus:ring-primary/20"
  />
</div>
<div>
  <label htmlFor="image" className="block text-sm font-medium text-text/70 mb-2">Profile Image URL (optional)</label>
  <input
    id="image"
    name="image"
    type="text"
    value={formData.image}
    onChange={handleChange}
    placeholder="Paste image URL"
    className="w-full px-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 border-secondary/30 focus:ring-primary/20"
  />
</div>

                {/* Terms & Conditions */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="h-4 w-4 text-primary focus:ring-primary border-secondary/30 rounded mt-1"
                    />
                    <span className="ml-3 text-sm text-text/70">
                      I agree to the{' '}
                      <Link href="/terms" className="text-primary hover:text-primary-light">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="/privacy" className="text-primary hover:text-primary-light">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group w-full flex items-center justify-center space-x-2 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                    isLoading
                      ? 'bg-text/20 text-text/40 cursor-not-allowed'
                      : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:shadow-lg hover:shadow-result-cta-shadow hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-text/20 border-t-text/40 rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-secondary/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-glass-bg text-text/60">or sign up with</span>
                  </div>
                </div>

                {/* Social Signup Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                  onClick={() => signIn('google', { callbackUrl: "/DashboardPage" })}
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-secondary/30 rounded-2xl bg-baby-powder/50 hover:bg-baby-powder transition-colors"
                  >
                    <img
                      src="https://www.google.com/favicon.ico"
                      alt="Google"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm font-medium text-text">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center px-4 py-3 border border-secondary/30 rounded-2xl bg-baby-powder/50 hover:bg-baby-powder transition-colors"
                  >
                    <img
                      src="https://www.facebook.com/favicon.ico"
                      alt="Facebook"
                      className="w-5 h-5 mr-2"
                    />
                    <span className="text-sm font-medium text-text">Facebook</span>
                  </button>
                </div>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-text/70">
                  Already have an account?{' '}
                  <Link
                    href="/LoginPage"
                    className="text-primary hover:text-primary-light font-medium transition-colors"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
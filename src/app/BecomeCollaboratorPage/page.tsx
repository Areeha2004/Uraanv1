'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  ArrowLeft,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  MapPin,
  Plus,
  Star,
  Upload,
  User,
  X,
} from 'lucide-react';

interface FormData {
  title: string;
  skills: string[];
  portfolio: PortfolioItem[];
  startingPrice: string;
  responseTime: string;
  location: string;
  avatar: string;
}

interface PortfolioItem {
  title: string;
  serviceType: string;
  url: string;
  image?: string;
}

const BecomeCollaboratorPage: React.FC = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    title: '',
    skills: [],
    portfolio: [],
    startingPrice: '',
    responseTime: '',
    location: '',
    avatar: '',
  });

  const [newSkill, setNewSkill] = useState('');
  const [newPortfolio, setNewPortfolio] = useState<PortfolioItem>({
    title: '',
    serviceType: '',
    url: '',
    image: '',
  });

  const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (!avatarFile) {
      setAvatarPreview(formData.avatar);
      return;
    }

    const objectUrl = URL.createObjectURL(avatarFile);
    setAvatarPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [avatarFile, formData.avatar]);

  const uploadAvatar = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload-avatar', { method: 'POST', body: form });
    const data = await res.json();
    return data.url;
  };

  const uploadPortfolioImage = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append('file', file);
    const res = await fetch('/api/upload-portfolio', { method: 'POST', body: form });
    const data = await res.json();
    return data.url;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill('');
      setErrors((prev) => ({ ...prev, skills: '' }));
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }));
  };

  const addPortfolioItem = async () => {
    if (!newPortfolio.title.trim() || !newPortfolio.serviceType.trim() || !newPortfolio.url.trim()) {
      return;
    }

    let imageUrl = newPortfolio.image;
    if (portfolioImageFile) {
      imageUrl = await uploadPortfolioImage(portfolioImageFile);
    }

    setFormData((prev) => ({
      ...prev,
      portfolio: [...prev.portfolio, { ...newPortfolio, image: imageUrl }],
    }));

    setNewPortfolio({ title: '', serviceType: '', url: '', image: '' });
    setPortfolioImageFile(null);
  };

  const removePortfolioItemByIndex = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      portfolio: prev.portfolio.filter((_, index) => index !== indexToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Professional title is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.startingPrice.trim()) newErrors.startingPrice = 'Starting price is required';
    if (!formData.responseTime.trim()) newErrors.responseTime = 'Response time is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);

    if (file && errors.avatar) {
      setErrors((prev) => ({ ...prev, avatar: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      let avatarUrl = formData.avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      const payload = { ...formData, avatar: avatarUrl };

      const res = await fetch('/api/collaborators', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to create collaborator');
      }

      setSubmitStatus('success');
      router.push('/CollaborationPage');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      console.error('Submission error:', message);
      setSubmitStatus('error');
      setErrors((prev) => ({ ...prev, form: message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestedSkills = [
    'Graphic Design',
    'Web Development',
    'Content Writing',
    'Social Media Marketing',
    'Photography',
    'Video Editing',
    'UI/UX Design',
    'Digital Marketing',
    'Copywriting',
    'Brand Design',
    'WordPress',
    'E-commerce',
  ];

  const responseTimeOptions = [
    'Within 1 hour',
    'Within 2-4 hours',
    'Within 24 hours',
    'Within 2-3 days',
    'Within a week',
  ];

  const locationOptions = [
    'Karachi',
    'Lahore',
    'Islamabad',
    'Faisalabad',
    'Rawalpindi',
    'Multan',
    'Peshawar',
    'Quetta',
    'Sialkot',
    'Remote Only',
  ];

  const inputClass =
    'w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-4 py-3 text-sm text-text placeholder:text-text/45 focus:border-primary/45 focus:outline-none focus:ring-2 focus:ring-primary/20';
  const avatarInitial = formData.title?.trim()?.[0]?.toUpperCase() || 'U';
  const completionScore = useMemo(() => {
    const checks = [
      !!formData.title.trim(),
      formData.skills.length > 0,
      !!formData.startingPrice.trim(),
      !!formData.responseTime.trim(),
      !!formData.location.trim(),
    ];
    const completed = checks.filter(Boolean).length;
    return Math.round((completed / checks.length) * 100);
  }, [formData.title, formData.skills.length, formData.startingPrice, formData.responseTime, formData.location]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden px-4 pb-12 pt-8 sm:px-6 lg:px-8">
      <div className="aurora-bg absolute inset-0" />
      <div className="luxury-grid absolute inset-0 opacity-[0.16]" />
      <div className="pointer-events-none absolute -left-24 top-24 h-80 w-80 rounded-full bg-primary/20 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute -right-24 top-36 h-96 w-96 rounded-full bg-accent2/20 blur-3xl animate-float-delayed" />

      <div className="relative mx-auto max-w-6xl">
        <Link
          href="/CollaborationPage"
          className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-baby-powder/85 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary transition-colors hover:border-primary/35"
        >
          <ArrowLeft size={14} />
          Back to Collaboration
        </Link>

        <section className="premium-card mt-5 rounded-[2rem] border border-primary/20 p-6 sm:p-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Join the collaborator network</p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-text sm:text-5xl">
              Build a premium collaborator profile
            </h1>
            <p className="mx-auto mt-3 max-w-3xl text-base leading-relaxed text-text/72 sm:text-lg">
              Showcase your expertise, set your rates, and start receiving high-intent collaboration requests.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <DollarSign size={18} />
              </div>
              <p className="mt-2 text-sm font-semibold text-text">Set your rates</p>
              <p className="text-xs text-text/60">Flexible pricing and scope</p>
            </article>
            <article className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Clock size={18} />
              </div>
              <p className="mt-2 text-sm font-semibold text-text">Control your schedule</p>
              <p className="text-xs text-text/60">Choose projects that match</p>
            </article>
            <article className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-4 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-primary/12 text-primary">
                <Star size={18} />
              </div>
              <p className="mt-2 text-sm font-semibold text-text">Grow reputation</p>
              <p className="text-xs text-text/60">Attract better opportunities</p>
            </article>
          </div>
        </section>

        {submitStatus === 'success' && (
          <div className="mt-6 rounded-2xl border border-emerald-300/40 bg-emerald-100/70 p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="mt-0.5 text-emerald-700" size={20} />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-emerald-800">Application submitted</h3>
                <p className="text-sm text-emerald-700">Your profile was submitted successfully and is now under review.</p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mt-6 rounded-2xl border border-red-300/45 bg-red-100/70 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 text-red-700" size={20} />
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-red-800">Submission failed</h3>
                <p className="text-sm text-red-700">Please check the form details and try again.</p>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <section className="premium-card rounded-3xl border border-primary/15 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <User size={14} />
                Profile Identity
              </div>
              <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.35fr_0.65fr]">
                <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-text/60">Profile Photo</p>
                  <div className="mt-3 flex justify-center">
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt="Avatar preview"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '/default-profile.png';
                        }}
                        className="h-28 w-28 rounded-2xl object-cover ring-1 ring-primary/20"
                      />
                    ) : (
                      <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-primary/10 text-3xl font-semibold uppercase text-primary ring-1 ring-primary/20">
                        {avatarInitial}
                      </div>
                    )}
                  </div>
                  <label className="mt-4 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-primary/20 bg-baby-powder px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/35">
                    <Upload size={13} />
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleAvatarFileChange} className="hidden" />
                  </label>
                  <p className="mt-2 text-center text-[11px] text-text/55">Or paste direct image URL</p>
                  <input
                    type="text"
                    name="avatar"
                    value={formData.avatar}
                    onChange={handleInputChange}
                    placeholder="https://example.com/avatar.jpg"
                    className="mt-2 w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2 text-xs text-text placeholder:text-text/45 focus:border-primary/45 focus:outline-none"
                  />
                  {errors.avatar && <p className="mt-2 text-xs text-red-600">{errors.avatar}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">
                    Professional Title
                  </label>
                  <div className="relative">
                    <Briefcase className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text/45" size={16} />
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g., Brand Designer and Visual Strategist"
                      className={`${inputClass} pl-10 ${errors.title ? 'border-red-300 focus:border-red-400 focus:ring-red-200/50' : ''}`}
                    />
                  </div>
                  {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                </div>
              </div>
            </section>

            <section className="premium-card rounded-3xl border border-primary/15 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Star size={14} />
                Skills and Expertise
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  placeholder="Add a skill..."
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder transition-colors hover:bg-primary-light"
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-text/55">Suggested skills</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        if (!formData.skills.includes(skill)) {
                          setFormData((prev) => ({ ...prev, skills: [...prev.skills, skill] }));
                          setErrors((prev) => ({ ...prev, skills: '' }));
                        }
                      }}
                      className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary transition-colors hover:border-primary/35"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-baby-powder px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)} className="text-primary/70 hover:text-primary">
                      <X size={13} />
                    </button>
                  </span>
                ))}
              </div>
              {errors.skills && <p className="mt-2 text-xs text-red-600">{errors.skills}</p>}
            </section>

            <section className="premium-card rounded-3xl border border-primary/15 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Briefcase size={14} />
                Portfolio Highlights
              </div>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <input
                  value={newPortfolio.title}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
                  placeholder="Project title"
                  className={inputClass}
                />
                <input
                  value={newPortfolio.serviceType}
                  onChange={(e) => setNewPortfolio({ ...newPortfolio, serviceType: e.target.value })}
                  placeholder="Service type"
                  className={inputClass}
                />
              </div>
              <input
                value={newPortfolio.url}
                onChange={(e) => setNewPortfolio({ ...newPortfolio, url: e.target.value })}
                placeholder="Project URL"
                className={`${inputClass} mt-3`}
              />
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-primary/20 bg-baby-powder px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/35">
                  <Upload size={13} />
                  Add Project Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPortfolioImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-text/55">
                  {portfolioImageFile ? portfolioImageFile.name : 'No image selected'}
                </span>
              </div>

              <button
                type="button"
                onClick={addPortfolioItem}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-baby-powder transition-colors hover:bg-secondary/85"
              >
                <Plus size={13} />
                Add Portfolio Item
              </button>

              {formData.portfolio.length > 0 && (
                <div className="mt-4 space-y-3">
                  {formData.portfolio.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-3 shadow-[0_8px_22px_rgba(80,61,63,0.05)]"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-text">{item.title}</p>
                          <p className="text-xs uppercase tracking-[0.08em] text-primary">{item.serviceType}</p>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 block truncate text-xs text-text/60 hover:text-primary"
                          >
                            {item.url}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => removePortfolioItemByIndex(index)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/15 text-text/60 transition-colors hover:border-red-300 hover:text-red-600"
                          aria-label="Remove portfolio item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/default-profile.png';
                          }}
                          className="mt-3 h-24 w-24 rounded-lg object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="premium-card rounded-3xl border border-primary/15 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Clock size={14} />
                Rates and Availability
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">Starting Price</label>
                  <div className="relative">
                    <DollarSign className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text/45" size={16} />
                    <input
                      name="startingPrice"
                      value={formData.startingPrice}
                      onChange={handleInputChange}
                      placeholder="e.g., PKR 15,000 per project"
                      className={`${inputClass} pl-10 ${errors.startingPrice ? 'border-red-300 focus:border-red-400 focus:ring-red-200/50' : ''}`}
                    />
                  </div>
                  {errors.startingPrice && <p className="mt-1 text-xs text-red-600">{errors.startingPrice}</p>}
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">Response Time</label>
                  <div className="relative">
                    <Clock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text/45" size={16} />
                    <select
                      name="responseTime"
                      value={formData.responseTime}
                      onChange={handleInputChange}
                      className={`${inputClass} pl-10 ${errors.responseTime ? 'border-red-300 focus:border-red-400 focus:ring-red-200/50' : ''}`}
                    >
                      <option value="">Select response time</option>
                      {responseTimeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.responseTime && <p className="mt-1 text-xs text-red-600">{errors.responseTime}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">Location</label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text/45" size={16} />
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={`${inputClass} pl-10 ${errors.location ? 'border-red-300 focus:border-red-400 focus:ring-red-200/50' : ''}`}
                  >
                    <option value="">Select your location</option>
                    {locationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.location && <p className="mt-1 text-xs text-red-600">{errors.location}</p>}
              </div>
            </section>

            {errors.form && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errors.form}
              </div>
            )}

            <section className="premium-card rounded-3xl border border-primary/15 p-5">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`group inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                  isSubmitting
                    ? 'cursor-not-allowed bg-text/15 text-text/45'
                    : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(175,130,137,0.3)]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-baby-powder/40 border-t-baby-powder" />
                    Submitting Application
                  </>
                ) : (
                  <>
                    Join as Collaborator
                    <CheckCircle size={16} className="transition-transform group-hover:scale-110" />
                  </>
                )}
              </button>
              <p className="mt-3 text-center text-xs text-text/62">
                By submitting, you agree to our{' '}
                <Link href="/terms" className="font-medium text-primary hover:text-primary-light">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="font-medium text-primary hover:text-primary-light">
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </form>

          <aside className="space-y-6">
            <article className="premium-card rounded-3xl border border-primary/15 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-primary">Profile completion</p>
              <p className="mt-2 font-display text-3xl text-text">{completionScore}%</p>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent2 transition-all duration-500"
                  style={{ width: `${completionScore}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-text/68">
                Add core details to improve trust and get higher quality collaboration requests.
              </p>
            </article>

            <article className="premium-card rounded-3xl border border-primary/15 p-5">
              <h3 className="font-display text-2xl text-text">What happens next</h3>
              <div className="mt-4 space-y-3">
                {[
                  { step: '1', title: 'Review', text: 'Your application is reviewed by our team.' },
                  { step: '2', title: 'Approval', text: 'Approved profiles are activated in the marketplace.' },
                  { step: '3', title: 'Requests', text: 'Start receiving collaboration opportunities.' },
                ].map((item) => (
                  <div key={item.step} className="rounded-2xl border border-primary/15 bg-baby-powder/90 p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-semibold text-baby-powder">
                        {item.step}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-text">{item.title}</p>
                        <p className="text-xs text-text/66">{item.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BecomeCollaboratorPage;

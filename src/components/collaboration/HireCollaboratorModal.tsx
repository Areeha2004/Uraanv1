'use client';

import React, { useState } from 'react';
import { CheckCircle2, Clock, DollarSign, FileText, MessageSquare, Send, ShieldCheck, X } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  title: string;
  avatar: string;
  startingPrice: string;
}

interface HirePayload {
  id: string;
  role: 'requester' | 'receiver';
  projectTitle: string;
  projectDescription: string;
  budget: string;
  deadline: string | null;
  contactMethod: string;
  additionalInfo: string | null;
}

interface HireCollaboratorModalProps {
  collaborator: Collaborator;
  role: 'requester' | 'receiver';
  onClose: () => void;
  onSubmit: (payload: HirePayload) => Promise<void>;
}

const HireCollaboratorModal: React.FC<HireCollaboratorModalProps> = ({
  collaborator,
  role,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    projectTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    contactMethod: 'platform',
    additionalInfo: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const avatarSrc = collaborator.avatar || '/default-profile.png';
  const initials = collaborator.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const fieldBaseClass =
    'w-full rounded-xl border border-primary/20 bg-baby-powder/90 px-4 py-3 text-sm text-text placeholder:text-text/45 focus:border-primary/45 focus:outline-none focus:ring-2 focus:ring-primary/20';
  const fieldErrorClass = 'border-red-300 focus:border-red-400 focus:ring-red-200/50';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.projectTitle.trim()) newErrors.projectTitle = 'Project title is required';
    if (!formData.projectDescription.trim()) newErrors.projectDescription = 'Description is required';
    if (!formData.budget) newErrors.budget = 'Budget is required';
    if (!formData.timeline) newErrors.timeline = 'Timeline is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const timelineToDeadlineISO = (timeline: string): string | null => {
    const now = new Date();
    switch (timeline) {
      case 'asap':
        now.setDate(now.getDate() + 3);
        return now.toISOString();
      case '1-week':
        now.setDate(now.getDate() + 7);
        return now.toISOString();
      case '2-weeks':
        now.setDate(now.getDate() + 14);
        return now.toISOString();
      case '1-month':
        now.setMonth(now.getMonth() + 1);
        return now.toISOString();
      case 'flexible':
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors((prev) => ({ ...prev, submit: '' }));

    try {
      await onSubmit({
        id: collaborator.id,
        role,
        projectTitle: formData.projectTitle,
        projectDescription: formData.projectDescription,
        budget: formData.budget,
        deadline: timelineToDeadlineISO(formData.timeline),
        contactMethod: formData.contactMethod,
        additionalInfo: formData.additionalInfo.trim() || null,
      });
      setIsSuccess(true);
    } catch (error: unknown) {
      console.error('Error submitting collaboration request:', error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting. Please try again.';
      setErrors((prev) => ({ ...prev, submit: errorMessage }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-text/50 backdrop-blur-sm" />
        <div className="relative w-full max-w-md overflow-hidden rounded-[1.6rem] border border-primary/20 bg-baby-powder shadow-[0_30px_80px_rgba(25,3,87,0.28)]">
          <div className="bg-gradient-to-r from-primary/15 to-accent2/15 px-6 py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <CheckCircle2 size={30} />
            </div>
            <h3 className="font-display mt-4 text-3xl text-text">Request Sent</h3>
            <p className="mt-2 text-sm text-text/72">
              Your collaboration request was sent to {collaborator.name}. You will be notified when they respond.
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-light px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-baby-powder"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-6">
      <div className="absolute inset-0 bg-text/55 backdrop-blur-md" onClick={onClose} />

      <div className="relative my-4 flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-[1.7rem] border border-primary/20 bg-baby-powder/95 shadow-[0_30px_90px_rgba(25,3,87,0.28)] sm:my-6 sm:max-h-[calc(100vh-3rem)]">
        <div className="relative shrink-0 overflow-hidden border-b border-primary/15 bg-gradient-to-r from-primary/12 via-accent2/10 to-primary/12 px-6 py-5">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-primary/20 bg-baby-powder/90 text-primary transition-colors hover:border-primary/35"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="rounded-2xl bg-baby-powder p-1.5 shadow-lg ring-1 ring-primary/15">
              {avatarSrc ? (
                <img
                  src={avatarSrc}
                  alt={collaborator.name}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/default-profile.png';
                  }}
                  className="h-14 w-14 rounded-xl object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-lg font-semibold uppercase text-primary">
                  {initials || 'U'}
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Premium Collaboration Request</p>
              <h2 className="font-display truncate text-2xl text-text">Hire {collaborator.name}</h2>
              <p className="truncate text-sm text-text/66">{collaborator.title}</p>
            </div>

            <div className="rounded-xl border border-primary/20 bg-baby-powder/90 px-3 py-2 text-right">
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-text/55">Starting Price</p>
              <p className="text-sm font-semibold text-primary">{collaborator.startingPrice}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="min-h-0 space-y-5 overflow-y-auto overscroll-contain p-6">
          <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              <FileText size={14} />
              Project Brief
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="projectTitle" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">
                  Project Title
                </label>
                <input
                  id="projectTitle"
                  name="projectTitle"
                  type="text"
                  value={formData.projectTitle}
                  onChange={handleChange}
                  className={`${fieldBaseClass} ${errors.projectTitle ? fieldErrorClass : ''}`}
                  placeholder="e.g., Brand identity for a boutique"
                />
                {errors.projectTitle && <p className="mt-1 text-xs text-red-600">{errors.projectTitle}</p>}
              </div>

              <div>
                <label htmlFor="projectDescription" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  rows={4}
                  value={formData.projectDescription}
                  onChange={handleChange}
                  className={`${fieldBaseClass} resize-none ${errors.projectDescription ? fieldErrorClass : ''}`}
                  placeholder="Describe goals, deliverables, brand context, and expected outcomes."
                />
                {errors.projectDescription && (
                  <p className="mt-1 text-xs text-red-600">{errors.projectDescription}</p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <DollarSign size={14} />
                Budget
              </div>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={`${fieldBaseClass} ${errors.budget ? fieldErrorClass : ''}`}
              >
                <option value="">Select budget range</option>
                <option value="under-15k">Under PKR 15,000</option>
                <option value="15k-30k">PKR 15,000 - PKR 30,000</option>
                <option value="30k-50k">PKR 30,000 - PKR 50,000</option>
                <option value="50k-100k">PKR 50,000 - PKR 100,000</option>
                <option value="over-100k">Over PKR 100,000</option>
              </select>
              {errors.budget && <p className="mt-1 text-xs text-red-600">{errors.budget}</p>}
            </div>

            <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
                <Clock size={14} />
                Timeline
              </div>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                className={`${fieldBaseClass} ${errors.timeline ? fieldErrorClass : ''}`}
              >
                <option value="">Select timeline</option>
                <option value="asap">ASAP (rush job)</option>
                <option value="1-week">Within 1 week</option>
                <option value="2-weeks">Within 2 weeks</option>
                <option value="1-month">Within 1 month</option>
                <option value="flexible">Flexible</option>
              </select>
              {errors.timeline && <p className="mt-1 text-xs text-red-600">{errors.timeline}</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-baby-powder/85 p-4 sm:p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-primary">
              <MessageSquare size={14} />
              Communication
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="contactMethod" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">
                  Preferred Method
                </label>
                <select
                  id="contactMethod"
                  name="contactMethod"
                  value={formData.contactMethod}
                  onChange={handleChange}
                  className={fieldBaseClass}
                >
                  <option value="platform">URAAN platform messages</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone call</option>
                </select>
              </div>

              <div>
                <label htmlFor="additionalInfo" className="mb-1 block text-xs font-semibold uppercase tracking-[0.08em] text-text/60">
                  Additional Info
                </label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  rows={3}
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  className={`${fieldBaseClass} resize-none`}
                  placeholder="References, special requirements, or preferred meeting time."
                />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-300/35 bg-emerald-100/50 px-4 py-3 text-sm text-emerald-800">
            <p className="inline-flex items-start gap-2">
              <ShieldCheck size={16} className="mt-0.5" />
              Final pricing and delivery terms will be confirmed directly with the collaborator before work starts.
            </p>
          </div>

          {errors.submit && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center justify-center rounded-xl border border-primary/20 bg-baby-powder px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/35"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-[0.08em] transition-all duration-300 ${
                isSubmitting
                  ? 'cursor-not-allowed bg-text/15 text-text/45'
                  : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(175,130,137,0.3)]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-baby-powder/40 border-t-baby-powder" />
                  Sending Request
                </>
              ) : (
                <>
                  <Send size={14} />
                  Send Collaboration Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HireCollaboratorModal;

"use client";
import React, { useState } from "react";
import { DollarSign, FileText, User, Clock } from "lucide-react";
import { CheckCircle } from "lucide-react";
import { X } from "lucide-react";

interface Collaborator {
  id: string;
  name: string;
  title: string;
  avatar: string;
  startingPrice: string;
}

interface HirePayload {
  id: string;
  role: "requester" | "receiver";
  projectTitle: string;
  projectDescription: string;
  budget: string;
  deadline: string | null;
  contactMethod: string;
  additionalInfo: string | null;
}

interface HireCollaboratorModalProps {
  collaborator: Collaborator;
  role: "requester" | "receiver"; // must match backend
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
    projectTitle: "",
    projectDescription: "",
    budget: "",
    timeline: "",
    contactMethod: "platform",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.projectTitle.trim()) newErrors.projectTitle = "Project title is required";
    if (!formData.projectDescription.trim()) newErrors.projectDescription = "Description is required";
    if (!formData.budget) newErrors.budget = "Budget is required";
    if (!formData.timeline) newErrors.timeline = "Timeline is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const timelineToDeadlineISO = (timeline: string): string | null => {
  const now = new Date();
  switch (timeline) {
    case "asap":
      now.setDate(now.getDate() + 3);
      return now.toISOString();
    case "1-week":
      now.setDate(now.getDate() + 7);
      return now.toISOString();
    case "2-weeks":
      now.setDate(now.getDate() + 14);
      return now.toISOString();
    case "1-month":
      now.setMonth(now.getMonth() + 1);
      return now.toISOString();
    case "flexible":
    default:
      return null;
  }
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  setIsSubmitting(true);
  setErrors((prev) => ({ ...prev, submit: "" }));

  try {
    await onSubmit({
      id: collaborator.id, // ✅ matches schema
      role, // "requester" | "receiver"
      projectTitle: formData.projectTitle,
      projectDescription: formData.projectDescription,
      budget: formData.budget,
      deadline: timelineToDeadlineISO(formData.timeline), // ISO or null
      contactMethod: formData.contactMethod,
      additionalInfo: formData.additionalInfo.trim() || null, // avoids empty string
    });

    setIsSuccess(true);
    onClose();
  } catch (error: unknown) {
    console.error("Error submitting form:", error);
    const errorMessage = error instanceof Error ? error.message : 'Something went wrong while submitting. Please try again.';
    setErrors((prev) => ({
      ...prev,
      submit: errorMessage,
    }));
  } finally {
    setIsSubmitting(false);
  }
};





  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-[#afa3c9]/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle size={40} className="text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#190357] mb-2">Request Sent Successfully!</h3>
              <p className="text-[#190357]">
                Your collaboration request has been sent to {collaborator.name}. 
                You'll receive a notification when they respond.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-primary to-primary-light text-baby-powder py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Continue Browsing
              </button>
              <button
                onClick={onClose}
                className="w-full bg-glass-bg backdrop-blur-sm border border-secondary/30 text-[#190357] py-3 rounded-2xl font-medium hover:bg-secondary/20 transition-all duration-300"
              >
                View My Collaborations
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#afa3c9]/50 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-secondary/20">
          <div className="flex items-center space-x-4">
            <img
              src={collaborator.avatar}
              alt={collaborator.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h2 className="text-xl font-bold text-[#190357]">Hire {collaborator.name}</h2>
              <p className="text-[#190357]">{collaborator.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary/20 rounded-full transition-colors"
          >
            <X size={20} className="text-[#190357]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
  {/* Project Title */}
  <div className="space-y-2">
    <label htmlFor="projectTitle" className="block text-sm font-medium text-[#190357]">
      Project Title *
    </label>
    <div className="relative">
      <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-[#190357]" size={18} />
      <input
        id="projectTitle"
        name="projectTitle"
        type="text"
        value={formData.projectTitle}
        onChange={handleChange}
        className={`w-full pl-12 pr-4 py-3 bg-baby-powder/50 border rounded-2xl text-[#190357] placeholder-text/50 focus:outline-none focus:ring-2 transition-all ${
          errors.projectTitle 
            ? 'border-red-300 focus:ring-red-200' 
            : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
        }`}
        placeholder="e.g., Logo design for my boutique"
      />
    </div>
    {errors.projectTitle && <p className="text-sm text-red-600">{errors.projectTitle}</p>}
  </div>

  {/* Project Description */}
  <div className="space-y-2">
    <label htmlFor="projectDescription" className="block text-sm font-medium text-[#190357]">
      Project Description *
    </label>
    <textarea
      id="projectDescription"
      name="projectDescription"
      rows={4}
      value={formData.projectDescription}
      onChange={handleChange}
      className={`w-full px-4 py-3 bg-baby-powder/50 border rounded-2xl text-[#190357] placeholder-text/50 focus:outline-none focus:ring-2 transition-all resize-none ${
        errors.projectDescription 
          ? 'border-red-300 focus:ring-red-200' 
          : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
      }`}
      placeholder="Describe your project in detail..."
    />
    {errors.projectDescription && <p className="text-sm text-red-600">{errors.projectDescription}</p>}
  </div>

  {/* Budget and Timeline */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="space-y-2">
      <label htmlFor="budget" className="block text-sm font-medium text-[#190357]">
        Budget Range *
      </label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-[#190357]" size={18} />
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`w-full pl-12 pr-4 py-3 bg-baby-powder/50 border rounded-2xl text-[#190357] focus:outline-none focus:ring-2 transition-all ${
            errors.budget 
              ? 'border-red-300 focus:ring-red-200' 
              : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
          }`}
        >
          <option value="">Select budget range</option>
          <option value="under-15k">Under ₨15,000</option>
          <option value="15k-30k">₨15,000 - ₨30,000</option>
          <option value="30k-50k">₨30,000 - ₨50,000</option>
          <option value="50k-100k">₨50,000 - ₨100,000</option>
          <option value="over-100k">Over ₨100,000</option>
        </select>
      </div>
      {errors.budget && <p className="text-sm text-red-600">{errors.budget}</p>}
    </div>

    <div className="space-y-2">
      <label htmlFor="timeline" className="block text-sm font-medium text-[#190357]">
        Timeline *
      </label>
      <div className="relative">
        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#190357]" size={18} />
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className={`w-full pl-12 pr-4 py-3 bg-baby-powder/50 border rounded-2xl text-[#190357] focus:outline-none focus:ring-2 transition-all ${
            errors.timeline 
              ? 'border-red-300 focus:ring-red-200' 
              : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
          }`}
        >
          <option value="">Select timeline</option>
          <option value="asap">ASAP (Rush job)</option>
          <option value="1-week">Within 1 week</option>
          <option value="2-weeks">Within 2 weeks</option>
          <option value="1-month">Within 1 month</option>
          <option value="flexible">I'm flexible</option>
        </select>
      </div>
      {errors.timeline && <p className="text-sm text-red-600">{errors.timeline}</p>}
    </div>
  </div>

  {/* Contact Method */}
  <div className="space-y-2">
    <label htmlFor="contactMethod" className="block text-sm font-medium text-[#190357]">
      Preferred Contact Method
    </label>
    <div className="relative">
      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-[#190357]" size={18} />
      <select
        id="contactMethod"
        name="contactMethod"
        value={formData.contactMethod}
        onChange={handleChange}
        className="w-full pl-12 pr-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-[#190357] focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
      >
        <option value="platform">URAAN Platform Messages</option>
        <option value="whatsapp">WhatsApp</option>
        <option value="email">Email</option>
        <option value="phone">Phone Call</option>
      </select>
    </div>
  </div>

  {/* Additional Info */}
  <div className="space-y-2">
    <label htmlFor="additionalInfo" className="block text-sm font-medium text-[#190357]">
      Additional Information
    </label>
    <textarea
      id="additionalInfo"
      name="additionalInfo"
      rows={3}
      value={formData.additionalInfo}
      onChange={handleChange}
      className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-[#190357] placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none"
      placeholder="Any additional details, references, or special requirements?"
    />
  </div>

  {/* Pricing Info */}
  <div className="bg-baby-powder/50 border border-secondary/30 rounded-2xl p-4">
    <div className="flex items-center space-x-2 mb-2">
      <DollarSign className="text-primary" size={16} />
      <span className="text-sm font-medium text-primary">Pricing Information</span>
    </div>
    <p className="text-sm text-[#190357]">
      {collaborator.name} starts at {collaborator.startingPrice}. Final pricing will be discussed based on your project requirements.
    </p>
  </div>

  {/* Submit Buttons */}
  <div className="flex space-x-4 pt-4">
    <button
      type="button"
      onClick={onClose}
      className="flex-1 bg-glass-bg backdrop-blur-sm border border-secondary/30 text-[#190357] py-3 rounded-2xl font-medium hover:bg-secondary/20 transition-all duration-300"
    >
      Cancel
    </button>
    {errors.submit && <p className="text-sm text-red-600">{errors.submit}</p>}

    <button
      type="submit"
      disabled={isSubmitting}
      className={`flex-1 py-3 rounded-2xl font-semibold transition-all duration-300 ${
        isSubmitting
          ? 'bg-text/20 text-[#190357]/40 cursor-not-allowed'
          : 'bg-gradient-to-r from-primary to-primary-light text-baby-powder hover:shadow-lg hover:shadow-result-cta-shadow hover:scale-105'
      }`}
    >
      {isSubmitting ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="w-5 h-5 border-2 border-text/20 border-t-text/40 rounded-full animate-spin"></div>
          <span>Sending Request...</span>
        </div>
      ) : (
        'Send Collaboration Request'
      )}
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default HireCollaboratorModal;
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Upload,
  X,
  Plus,
  MapPin,
  Clock,
  DollarSign,
  User,
  Briefcase,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

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
    title: "",
    skills: [],
    portfolio: [],
    startingPrice: "",
    responseTime: "",
    location: "",
    avatar: "",
  });

  const [newSkill, setNewSkill] = useState("");
  const [newPortfolio, setNewPortfolio] = useState<PortfolioItem>({
  title: "",
  serviceType: "",
  url: "",
  image: ""
});
const [portfolioImageFile, setPortfolioImageFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
const [avatarFile, setAvatarFile] = useState<File | null>(null);
const uploadAvatar = async (file: File): Promise<string> => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload-avatar", { method: "POST", body: form });
    const data = await res.json();
    return data.url;
  };
  const uploadPortfolioImage = async (file: File): Promise<string> => {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/upload-portfolio", { method: "POST", body: form });
  const data = await res.json();
  return data.url;
};

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addSkill = () => {
    const skill = newSkill.trim();
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }));
      setNewSkill("");
      if (errors.skills) {
        setErrors((prev) => ({ ...prev, skills: "" }));
      }
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
    return; // You could set errors here if needed
  }

  let imageUrl = newPortfolio.image;
  if (portfolioImageFile) {
    imageUrl = await uploadPortfolioImage(portfolioImageFile);
  }

  setFormData((prev) => ({
    ...prev,
    portfolio: [...prev.portfolio, { ...newPortfolio, image: imageUrl }]
  }));

  // Reset inputs
  setNewPortfolio({ title: "", serviceType: "", url: "", image: "" });
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

    if (!formData.title.trim()) {
      newErrors.title = "Professional title is required";
    }
    if (formData.skills.length === 0) {
      newErrors.skills = "At least one skill is required";
    }
    if (!formData.startingPrice.trim()) {
      newErrors.startingPrice = "Starting price is required";
    }
    if (!formData.responseTime.trim()) {
      newErrors.responseTime = "Response time is required";
    }
    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file && errors.avatar) {
      setErrors((prev) => ({ ...prev, avatar: "" }));
    }
  };

  // Common input handler
 
 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // 1) Upload file if present
      let avatarUrl = formData.avatar;
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile);
      }

      // 2) Build payload with final avatar URL
      const payload = { ...formData, avatar: avatarUrl };

      // 3) Send to API
      const res = await fetch("/api/collaborators", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to create collaborator");
      }

      setSubmitStatus("success");
      router.push("/CollaborationPage");
    } catch (err: any) {
      console.error("Submission error:", err);
      setSubmitStatus("error");
      setErrors((prev) => ({ ...prev, form: err.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const suggestedSkills = [
    "Graphic Design",
    "Web Development",
    "Content Writing",
    "Social Media Marketing",
    "Photography",
    "Video Editing",
    "UI/UX Design",
    "Digital Marketing",
    "Copywriting",
    "Brand Design",
    "WordPress",
    "E-commerce",
  ];

  const responseTimeOptions = [
    "Within 1 hour",
    "Within 2-4 hours",
    "Within 24 hours",
    "Within 2-3 days",
    "Within a week",
  ];

  const locationOptions = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Faisalabad",
    "Rawalpindi",
    "Multan",
    "Peshawar",
    "Quetta",
    "Sialkot",
    "Remote Only",
  ];

  // …return JSX below


  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-base via-baby-powder to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/10 to-primary/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-4xl mx-auto py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/CollaborationPage"
            className="inline-flex items-center space-x-2 text-text/70 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            <span>Back to Collaboration</span>
          </Link>

          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-3">
              <Star className="text-primary" size={20} />
              <span className="text-primary font-medium">Join Our Expert Network</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
              Become a <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Collaborator</span>
            </h1>
            
            <p className="text-lg text-text/70 max-w-2xl mx-auto leading-relaxed">
              Share your expertise with Pakistani women entrepreneurs and help them build successful businesses while growing your own freelance career.
            </p>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-2">
                  <DollarSign size={20} className="text-baby-powder" />
                </div>
                <h3 className="font-semibold text-text text-sm">Earn More</h3>
                <p className="text-xs text-text/60">Set your own rates</p>
              </div>
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-4">
                <div className="w-10 h-10 bg-gradient-to-br from-accent2 to-accent2-light rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Clock size={20} className="text-baby-powder" />
                </div>
                <h3 className="font-semibold text-text text-sm">Work Flexibly</h3>
                <p className="text-xs text-text/60">Choose your schedule</p>
              </div>
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-4">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-primary-light rounded-xl flex items-center justify-center mx-auto mb-2">
                  <User size={20} className="text-baby-powder" />
                </div>
                <h3 className="font-semibold text-text text-sm">Make Impact</h3>
                <p className="text-xs text-text/60">Empower women</p>
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="mb-8 p-6 bg-green-100 border border-green-300 rounded-3xl">
            <div className="flex items-center space-x-3">
              <CheckCircle className="text-green-600" size={24} />
              <div>
                <h3 className="font-bold text-green-800">Application Submitted Successfully!</h3>
                <p className="text-green-700">We'll review your profile and get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="mb-8 p-6 bg-red-100 border border-red-300 rounded-3xl">
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-red-600" size={24} />
              <div>
                <h3 className="font-bold text-red-800">Submission Failed</h3>
                <p className="text-red-700">Please try again or contact support if the problem persists.</p>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-glass-bg backdrop-blur-lg border border-secondary/20 rounded-3xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
           {/* Avatar Upload */}
<div>
  <label className="block text-sm font-medium text-text/70 mb-4">
    Profile Picture (Optional)
  </label>
  <div className="flex items-center space-x-6">
    {/* Preview Box */}
    <div className="w-24 h-24 bg-gradient-to-br from-secondary/20 to-primary/10 rounded-2xl flex items-center justify-center border-2 border-dashed border-secondary/30">
      {avatarFile ? (
        <img
          src={URL.createObjectURL(avatarFile)}
          alt="Avatar preview"
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : formData.avatar ? (
        <img
          src={formData.avatar}
          alt="Avatar preview"
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <User size={32} className="text-text/40" />
      )}
    </div>

    {/* File Input & URL Input */}
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-text
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-primary file:text-baby-powder
                   hover:file:bg-primary-light"
      />

      <input
        type="text"
        name="avatar"
        value={formData.avatar}
        onChange={handleInputChange}
        placeholder="Or paste image URL"
        className="w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      <p className="text-xs text-text/60">
        Upload a file or paste a URL
      </p>

      {errors.avatar && (
        <p className="mt-2 text-sm text-red-600">{errors.avatar}</p>
      )}
    </div>
  </div>
</div>


            {/* Professional Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-text/70 mb-2">
                Professional Title *
              </label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all ${
                    errors.title 
                      ? 'border-red-300 focus:ring-red-200' 
                      : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                  }`}
                  placeholder="e.g., Graphic Designer & Brand Specialist"
                />
              </div>
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-text/70 mb-2">
                Skills & Expertise *
              </label>
              
              {/* Add Skill Input */}
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl text-text placeholder-text/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <button
                  type="button"
                  onClick={addSkill}
                  className="px-4 py-3 bg-primary text-baby-powder rounded-2xl hover:bg-primary-light transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>

              {/* Suggested Skills */}
              <div className="mb-4">
                <p className="text-xs text-text/60 mb-2">Suggested skills:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedSkills.map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => {
                        if (!formData.skills.includes(skill)) {
                          setFormData(prev => ({
                            ...prev,
                            skills: [...prev.skills, skill]
                          }));
                          if (errors.skills) {
                            setErrors(prev => ({ ...prev, skills: '' }));
                          }
                        }
                      }}
                      className="px-3 py-1 bg-secondary/20 text-text text-xs rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Skills */}
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="hover:text-primary-light"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              
              {errors.skills && (
                <p className="mt-2 text-sm text-red-600">{errors.skills}</p>
              )}
            </div>

           {/* Portfolio */}
<div>
  <label className="block text-sm font-medium text-text/70 mb-2">Portfolio (Optional)</label>

  {/* Title */}
  <input
    type="text"
    value={newPortfolio.title}
    onChange={(e) => setNewPortfolio({ ...newPortfolio, title: e.target.value })}
    placeholder="Portfolio Title (e.g., Social Media Campaign)"
    className="mb-2 w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl"
  />

  {/* Service Type */}
  <input
    type="text"
    value={newPortfolio.serviceType}
    onChange={(e) => setNewPortfolio({ ...newPortfolio, serviceType: e.target.value })}
    placeholder="Service Type (e.g., Social Media)"
    className="mb-2 w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl"
  />

  {/* URL */}
  <input
    type="url"
    value={newPortfolio.url}
    onChange={(e) => setNewPortfolio({ ...newPortfolio, url: e.target.value })}
    placeholder="Portfolio URL..."
    className="mb-2 w-full px-4 py-3 bg-baby-powder/50 border border-secondary/30 rounded-2xl"
  />

  {/* Image */}
  <input
    type="file"
    accept="image/*"
    onChange={(e) => setPortfolioImageFile(e.target.files?.[0] || null)}
    className="mb-4 w-full"
  />

  {/* Add Button */}
  <button
    type="button"
    onClick={addPortfolioItem}
    className="px-4 py-3 bg-secondary text-baby-powder rounded-2xl hover:bg-secondary/80 transition-colors"
  >
    <Plus size={20} />
  </button>

  {/* Portfolio List */}
  {formData.portfolio.length > 0 && (
    <div className="mt-4 space-y-2">
      {formData.portfolio.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-3 bg-baby-powder/50 rounded-xl border border-secondary/20">
          <div className="flex-1">
            <p className="font-medium">{item.title} - <span className="text-sm">{item.serviceType}</span></p>
            <a href={item.url} className="text-primary text-sm truncate block">{item.url}</a>
            {item.image && <img src={item.image} alt={item.title} className="mt-2 w-16 h-16 object-cover rounded" />}
          </div>
          <button
            type="button"
            onClick={() => removePortfolioItemByIndex(index)}
            className="ml-2 text-text/40 hover:text-red-500 transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )}
</div>


            {/* Starting Price & Response Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="startingPrice" className="block text-sm font-medium text-text/70 mb-2">
                  Starting Price *
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                  <input
                    id="startingPrice"
                    name="startingPrice"
                    type="text"
                    value={formData.startingPrice}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text placeholder-text/50 focus:outline-none focus:ring-2 transition-all ${
                      errors.startingPrice 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                    }`}
                    placeholder="e.g., ₨15,000 per project"
                  />
                </div>
                {errors.startingPrice && (
                  <p className="mt-2 text-sm text-red-600">{errors.startingPrice}</p>
                )}
              </div>

              <div>
                <label htmlFor="responseTime" className="block text-sm font-medium text-text/70 mb-2">
                  Response Time *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                  <select
                    id="responseTime"
                    name="responseTime"
                    value={formData.responseTime}
                    onChange={handleInputChange}
                    className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text focus:outline-none focus:ring-2 transition-all ${
                      errors.responseTime 
                        ? 'border-red-300 focus:ring-red-200' 
                        : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                    }`}
                  >
                    <option value="">Select response time</option>
                    {responseTimeOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                {errors.responseTime && (
                  <p className="mt-2 text-sm text-red-600">{errors.responseTime}</p>
                )}
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-text/70 mb-2">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text/40" size={20} />
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-4 bg-baby-powder/50 border rounded-2xl text-text focus:outline-none focus:ring-2 transition-all ${
                    errors.location 
                      ? 'border-red-300 focus:ring-red-200' 
                      : 'border-secondary/30 focus:border-primary focus:ring-primary/20'
                  }`}
                >
                  <option value="">Select your location</option>
                  {locationOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              {errors.location && (
                <p className="mt-2 text-sm text-red-600">{errors.location}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6">
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
                  <>
                    <div className="w-6 h-6 border-2 border-text/20 border-t-text/40 rounded-full animate-spin"></div>
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Join as Collaborator</span>
                    <CheckCircle size={20} className="group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Terms */}
            <div className="text-center text-sm text-text/60">
              By submitting this application, you agree to our{' '}
              <Link href="/terms" className="text-primary hover:text-primary-light">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-primary hover:text-primary-light">
                Privacy Policy
              </Link>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-accent2/5 rounded-3xl p-8">
            <h3 className="text-xl font-bold text-text mb-4">What Happens Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-baby-powder font-bold">1</span>
                </div>
                <h4 className="font-semibold text-text">Review</h4>
                <p className="text-sm text-text/70">We'll review your application within 24 hours</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-accent2 to-accent2-light rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-baby-powder font-bold">2</span>
                </div>
                <h4 className="font-semibold text-text">Approval</h4>
                <p className="text-sm text-text/70">Get approved and set up your profile</p>
              </div>
              <div className="space-y-2">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary-light rounded-xl flex items-center justify-center mx-auto">
                  <span className="text-baby-powder font-bold">3</span>
                </div>
                <h4 className="font-semibold text-text">Start Earning</h4>
                <p className="text-sm text-text/70">Begin receiving collaboration requests</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeCollaboratorPage;
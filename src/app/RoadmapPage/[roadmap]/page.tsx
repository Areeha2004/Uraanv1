"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle,
  Download,
  Play,
  ArrowLeft,
  Clock,
  Users,
  DollarSign,
  Star,
} from "lucide-react";

interface StepType {
  stepTitle: string;
  description: string;
  duration: string;
  tasks?: string[];
  downloadables?: string[];
  videoTutorial?: string | null;
}

interface RoadmapDataType {
  title: string;
  description: string;
  image: string;
  timeline: string;
  investment: string;
  difficulty: string;
  successRate: string;
  steps?: StepType[];
}

export default function RoadmapPage() {
  const params = useSearchParams();
  const roadmapParam = params.get("roadmap");
  const [roadmap, setRoadmap] = useState<RoadmapDataType | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // parse the URL-encoded JSON
  useEffect(() => {
    if (!roadmapParam) return;
    try {
      const decoded = decodeURIComponent(roadmapParam);
      const parsed: RoadmapDataType = JSON.parse(decoded);

      // ensure steps is always an array
      parsed.steps = Array.isArray(parsed.steps) ? parsed.steps : [];
      setRoadmap(parsed);
    } catch (err) {
      console.error("Failed to parse roadmap param:", err);
    }
  }, [roadmapParam]);

  if (!roadmap) {
    return <div className="p-8 text-center">Loading roadmap…</div>;
  }

  const {
    title,
    description,
    image,
    timeline,
    investment,
    difficulty,
    successRate,
    steps = [],
  } = roadmap;

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const completionPercentage = steps.length
    ? Math.round((completedSteps.length / steps.length) * 100)
    : 0;

  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto py-12">
        {/* Back Button */}
        <Link
          href="/results"
          className="inline-flex items-center space-x-2 text-text/70 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          <span>Back to Results</span>
        </Link>

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-text">
                <span className="text-primary text-bold"> {title}</span>
              </h1>
              <p className="text-lg text-text/70 text-bold leading-relaxed">
                {description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[ 
                { icon: <Clock className="w-8 h-8 text-primary mx-auto mb-2"/>, label:"Timeline", value: timeline },
                { icon: <DollarSign className="w-8 h-8 text-primary mx-auto mb-2"/>, label:"Investment", value: investment },
                { icon: <Users className="w-8 h-8 text-primary mx-auto mb-2"/>, label:"Difficulty", value: difficulty },
                { icon: <Star className="w-8 h-8 text-primary mx-auto mb-2"/>, label:"Success Rate", value: successRate }
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-4 text-center"
                >
                  {stat.icon}
                  <p className="text-xs text-text/60">{stat.label}</p>
                  <p className="font-semibold text-text">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent1/40 to-transparent" />
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-text">Your Progress</h3>
            <span className="text-primary font-semibold">
              {completionPercentage}% Complete
            </span>
          </div>
          <div className="w-full bg-secondary/20 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary to-primary-light h-full rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <p className="text-sm text-text/60 mt-2">
            {completedSteps.length} of {steps.length} steps completed
          </p>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const tasks = Array.isArray(step.tasks) ? step.tasks : [];
            const files = Array.isArray(step.downloadables)
              ? step.downloadables
              : [];
            const videoUrl = step.videoTutorial ?? "";

            return (
              <div
                key={index}
                className={`relative ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  {/* Step Content */}
                  <div
                    className={`lg:col-span-2 ${
                      index % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <div
                      className={`bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8 transition-all duration-300 ${
                        isCompleted ? "border-primary/50 bg-primary/5" : ""
                      }`}
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg ${
                              isCompleted
                                ? "bg-primary text-baby-powder"
                                : "bg-secondary/20 text-text"
                            }`}
                          >
                            {isCompleted ? (
                              <CheckCircle size={24} />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-text mb-2">
                              {step.stepTitle}
                            </h3>
                            <p className="text-text/70 mb-2">
                              {step.description}
                            </p>
                            <div className="flex items-center space-x-2 text-sm text-primary">
                              <Clock size={16} />
                              <span>{step.duration}</span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => toggleStep(index)}
                          className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                            isCompleted
                              ? "bg-primary text-baby-powder"
                              : "bg-secondary/20 text-text hover:bg-primary hover:text-baby-powder"
                          }`}
                        >
                          {isCompleted ? "Completed" : "Mark Done"}
                        </button>
                      </div>

                      {/* Tasks */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-text mb-3">Tasks:</h4>
                        <ul className="space-y-2">
                          {tasks.map((t, i) => (
                            <li
                              key={i}
                              className="flex items-start space-x-3 text-text/70"
                            >
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Downloads & Video */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-text mb-3">
                            Downloads:
                          </h4>
                          <div className="space-y-2">
                            {files.map((file, i) => (
                              <button
                                key={i}
                                className="flex items-center space-x-2 w-full p-3 bg-baby-powder/50 hover:bg-baby-powder rounded-xl transition-colors text-left"
                              >
                                <Download size={16} className="text-primary" />
                                <span className="text-sm text-text">{file}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-text mb-3">
                            Video Tutorial:
                          </h4>
                          <button className="flex items-center space-x-2 w-full p-3 bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors">
                            <Play size={16} className="text-primary" />
                            <span className="text-sm text-primary">
                              {videoUrl}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step Image */}
                  <div
                    className={`relative ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden">
                      <img
                        src={`https://images.pexels.com/photos/${
                          3184292 + index
                        }/pexels-photo-${3184292 + index}.jpeg`}
                        alt={step.stepTitle}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-accent1/30 to-transparent" />
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-px" />
                )}
              </div>
            );
          })}
        </div>
          <div className="mt-16 text-center">
          <div className="bg-gradient-to-br from-primary/5 to-accent2/5 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-text mb-4">Ready to Launch Your Business?</h3>
            <p className="text-text/70 mb-6 max-w-2xl mx-auto">
              Complete all steps and join our community of successful women entrepreneurs. 
              We're here to support you every step of the way!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/CommunityPage"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-light text-baby-powder px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-result-cta-shadow transition-all duration-300"
              >
                <Users size={20} />
                <span>Join Community</span>
              </Link>
              <Link
                href="/DashboardPage"
                className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/30 text-text px-6 py-3 rounded-xl font-semibold hover:bg-secondary/20 transition-all duration-300"
              >
                <span>Go to Dashboard</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

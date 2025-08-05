"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import {
  TrendingUp,
  Download,
  Users,
  Award,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  BookOpen,
  Target,
  Calendar,
  MessageCircle,
} from "lucide-react";

type StepWithProgress = {
  id: string;
  stepNumber: number;
  title: string;
  content: string;
  resources?: string | null;
  userProgress: { status: string }[];
};

type UserRoadmap = {
  id: string;
  roadmap: {
    id: string;
    title: string;
    image?: string;
    steps: StepWithProgress[];
  };
};
type Tab =
  | "overview"
  | "progress"
  | "achievements"
  | "activity"
  | "resources"
  | "events";

// 2) Create a typed array of your tabs for rendering buttons
const NAV_TABS: { id: Tab; label: string }[] = [
  { id: "overview",     label: "Overview" },
  { id: "progress",     label: " My Progress" },
  { id: "achievements", label: "Achievements" },
  { id: "resources",    label: "My Resources" },
];
const DashboardPage: React.FC = () => {
 const router = useRouter();

  // 1) require an authenticated session, else redirect to /LoginPage
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/LoginPage");
    },
  });

  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [userRoadmaps, setUserRoadmaps] = useState<UserRoadmap[]>([]);

  // 2) Once authenticated, fetch roadmaps
  useEffect(() => {
    if (status !== "authenticated") return;

    // force-useSession() to revalidate the cookie if needed
    // router.replace(router.pathname);

    fetch("/api/user/roadmaps")
      .then((res) => res.json())
      .then((data: UserRoadmap[]) => setUserRoadmaps(data))
      .catch(console.error);
  }, [status]);

  // 3) show a loading state while NextAuth is doing its thing
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // 2) Pick the first roadmap as the "primary" project
  const primary = userRoadmaps.length > 0 ? userRoadmaps[0].roadmap : null;

  // 5) Build the userData object
  const userData = {
    name: session.user.name || "User",
    avatar: session.user.image || "/fallback-avatar.png",
    businessIdea: primary ? primary.title : "No roadmap yet",
    roadmapId: primary?.id || "",
    joinDate: "January 2025",
    level: "Rising Star",
    points: 750,
  };
  // 4) Derive progressData from the primary roadmap's steps
  let progressData = {
    currentStep: 0,
    totalSteps: 0,
    stepTitle: "Not started",
    completedTasks: 0,
    totalTasks: 0,
    nextMilestone: "Start your journey",
  };

  if (primary) {
   const steps = primary.steps;
const doneCount = steps.filter(
  s => s.userProgress[0]?.status === "done"
).length;
const nextStep = steps.find(s => s.userProgress[0]?.status !== "done");

progressData = {
  currentStep: doneCount,
  totalSteps: steps.length,
  stepTitle: nextStep ? nextStep.title : "All steps completed",
  completedTasks: doneCount,
  totalTasks: steps.length,
  nextMilestone: nextStep ? nextStep.title : "Congratulations!",
};
  }
  const userId = session.user.id; // Get user ID from session

  const achievements = [
    {
      id: 1,
      title: 'Quiz Master',
      description: 'Completed AI business analysis',
      icon: Star,
      earned: true,
      date: 'Jan 15, 2025'
    },
    {
      id: 2,
      title: 'Goal Setter',
      description: 'Set up your business roadmap',
      icon: Target,
      earned: true,
      date: 'Jan 16, 2025'
    },
    {
      id: 3,
      title: 'Community Member',
      description: 'Joined the URAAN community',
      icon: Users,
      earned: true,
      date: 'Jan 16, 2025'
    },
    {
      id: 4,
      title: 'Resource Collector',
      description: 'Downloaded 5 starter kits',
      icon: Download,
      earned: false,
      progress: '3/5'
    },
    {
      id: 5,
      title: 'Collaborator',
      description: 'Hired your first collaborator',
      icon: Users,
      earned: false,
      progress: 'Locked'
    },
    {
      id: 6,
      title: 'Business Launcher',
      description: 'Completed your roadmap',
      icon: Award,
      earned: false,
      progress: 'Locked'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'progress',
      title: 'Completed market research tasks',
      description: 'Step 1: Market Research & Planning',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'download',
      title: 'Downloaded Brand Identity Kit',
      description: 'Resources for Step 2',
      timestamp: '1 day ago',
      icon: Download,
      color: 'text-primary'
    },
    {
      id: 3,
      type: 'community',
      title: 'Liked a success story',
      description: 'Sana\'s jewelry business milestone',
      timestamp: '2 days ago',
      icon: MessageCircle,
      color: 'text-accent2'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Earned "Goal Setter" badge',
      description: 'Roadmap setup completed',
      timestamp: '3 days ago',
      icon: Award,
      color: 'text-yellow-500'
    }
  ];

  const savedResources = [
    {
      id: 1,
      title: 'Business Plan Template',
      type: 'Template',
      category: 'Foundation',
      downloadDate: 'Jan 16, 2025'
    },
    {
      id: 2,
      title: 'Social Media Marketing Guide',
      type: 'Guide',
      category: 'Marketing',
      downloadDate: 'Jan 15, 2025'
    },
    {
      id: 3,
      title: 'Brand Identity Kit',
      type: 'Template Pack',
      category: 'Branding',
      downloadDate: 'Jan 14, 2025'
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Digital Marketing Workshop',
      date: 'March 18, 2025',
      time: '7:00 PM',
      type: 'Virtual'
    },
    {
      id: 2,
      title: 'Women Entrepreneur Meetup',
      date: 'March 22, 2025',
      time: '6:00 PM',
      type: 'In-Person'
    }
  ];
const overallProgress = progressData.totalSteps
  ? Math.round((progressData.currentStep / progressData.totalSteps) * 100)
  : 0;
  return (
    <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-base to-baby-powder">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Image
        src={userData.avatar}
        width={100}
        height={100}
        alt={session.user.name || "User avatar"}
        className="rounded-full"
      />
                <div>
                  <h1 className="text-2xl font-bold text-text">Welcome back, {userData.name}!</h1>
                  <p className="text-text/70">Building your {userData.businessIdea}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Award className="text-primary" size={16} />
                      <span className="text-sm text-primary font-medium">{userData.level}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="text-yellow-500" size={16} />
                      <span className="text-sm text-text">{userData.points} points</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-text/60">Member since</p>
                <p className="font-semibold text-text">{userData.joinDate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
       <div className="flex flex-wrap gap-4 mb-8">
  {NAV_TABS.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}    // tab.id is now typed as Tab
      className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
        activeTab === tab.id
          ? "bg-primary text-baby-powder shadow-lg"
          : "bg-glass-bg backdrop-blur-sm border border-secondary/20 text-text hover:bg-secondary/20"
      }`}
    >
      {tab.label}
    </button>
  ))}
</div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Progress Card */}
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text">Your Progress</h2>
                  <Link
                    href={`/roadmaps/${userData.roadmapId}`}
                    className="text-primary hover:text-primary-light transition-colors text-sm font-medium"
                  >
                    View Full Roadmap →
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">Current Step: {progressData.stepTitle}</span>
                    <span className="text-primary font-semibold">
                      Step {progressData.currentStep} of {progressData.totalSteps}
                    </span>
                  </div>
                  
                  <div className="w-full bg-secondary/20 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-primary to-primary-light h-full rounded-full transition-all duration-500"
                      style={{ width: `${(progressData.currentStep / progressData.totalSteps) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-text/60">
                      {progressData.completedTasks} of {progressData.totalTasks} tasks completed
                    </span>
                    <span className="text-primary font-medium">
                      Next: {progressData.nextMilestone}
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-text mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href={`/roadmaps/${userData.roadmapId}`}
                    className="group p-4 bg-baby-powder/50 hover:bg-baby-powder rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <BookOpen className="text-primary group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <h3 className="font-semibold text-text">Continue Roadmap</h3>
                        <p className="text-xs text-text/60">Resume where you left off</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/ResourcesPage"
                    className="group p-4 bg-baby-powder/50 hover:bg-baby-powder rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Download className="text-primary group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <h3 className="font-semibold text-text">Browse Resources</h3>
                        <p className="text-xs text-text/60">Get templates & guides</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/CommunityPage"
                    className="group p-4 bg-baby-powder/50 hover:bg-baby-powder rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="text-primary group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <h3 className="font-semibold text-text">Join Discussion</h3>
                        <p className="text-xs text-text/60">Connect with community</p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/CollaborationPage"
                    className="group p-4 bg-baby-powder/50 hover:bg-baby-powder rounded-2xl transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="text-primary group-hover:scale-110 transition-transform" size={20} />
                      <div>
                        <h3 className="font-semibold text-text">Find Collaborators</h3>
                        <p className="text-xs text-text/60">Get professional help</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                <h2 className="text-xl font-bold text-text mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {recentActivity.map(activity => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-xl bg-baby-powder/50 flex items-center justify-center ${activity.color}`}>
                        <activity.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-text">{activity.title}</h3>
                        <p className="text-sm text-text/60">{activity.description}</p>
                        <p className="text-xs text-text/50 mt-1">{activity.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-text mb-4">Your Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">Progress</span>
                    <span className="font-semibold text-primary">50%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">Resources Downloaded</span>
                    <span className="font-semibold text-text">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">Community Posts</span>
                    <span className="font-semibold text-text">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text/70">Days Active</span>
                    <span className="font-semibold text-text">12</span>
                  </div>
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-text mb-4">Upcoming Events</h3>
                <div className="space-y-4">
                  {upcomingEvents.map(event => (
                    <div key={event.id} className="p-3 bg-baby-powder/50 rounded-2xl">
                      <h4 className="font-semibold text-text text-sm">{event.title}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar size={12} className="text-primary" />
                        <span className="text-xs text-text/60">{event.date} • {event.time}</span>
                      </div>
                      <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs ${
                        event.type === 'Virtual' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {event.type}
                      </span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/CommunityPage"
                  className="inline-flex items-center space-x-1 text-primary hover:text-primary-light text-sm font-medium mt-4"
                >
                  <span>View all events</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-br from-primary/10 to-accent2/10 rounded-3xl p-6">
                <h3 className="text-lg font-bold text-text mb-2">Need Help?</h3>
                <p className="text-text/70 text-sm mb-4">
                  Our community is here to support you every step of the way.
                </p>
                <Link
                  href="/ContactPage"
                  className="inline-flex items-center space-x-2 bg-primary text-baby-powder px-4 py-2 rounded-xl font-medium hover:bg-primary-light transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Get Support</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Progress Tab */}
      
{activeTab === 'progress' && (
  <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
    <h2 className="text-2xl font-bold text-text mb-6">
      Your Business Journey
    </h2>

    <div className="space-y-8">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-baby-powder/50 rounded-2xl">
          <div className="text-3xl font-bold text-primary mb-2">
            {overallProgress}%
          </div>
          <div className="text-text/70">Overall Progress</div>
        </div>
        <div className="text-center p-6 bg-baby-powder/50 rounded-2xl">
          <div className="text-3xl font-bold text-primary mb-2">
            {progressData.currentStep}/{progressData.totalSteps}
          </div>
          <div className="text-text/70">Steps Completed</div>
        </div>
        <div className="text-center p-6 bg-baby-powder/50 rounded-2xl">
          <div className="text-3xl font-bold text-primary mb-2">
            {progressData.completedTasks}/{progressData.totalTasks}
          </div>
          <div className="text-text/70">Current Step Tasks</div>
        </div>
      </div>

      {/* Current Step & Roadmap Progress */}
      <div>
        <h3 className="text-xl font-bold text-text mb-2">
          Current Step: {progressData.stepTitle}
        </h3>
        <p className="text-text/70 mb-4">
          Next Milestone: {progressData.nextMilestone}
        </p>
        <Link
          href={primary ? `/roadmaps/${primary.id}` : "#"}
          className="inline-flex items-center space-x-2 bg-primary text-baby-powder px-6 py-3 rounded-xl font-semibold hover:bg-primary-light transition-colors"
        >
          <BookOpen size={20} />
          <span>Continue Your Roadmap</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
)}


        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-text">My Resources</h2>
              <Link
                href="/ResourcesPage"
                className="text-primary hover:text-primary-light transition-colors font-medium"
              >
                Browse All Resources →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResources.map(resource => (
                <div
                  key={resource.id}
                  className="p-6 bg-baby-powder/50 rounded-2xl hover:bg-baby-powder transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <Download className="text-primary" size={20} />
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="font-semibold text-text mb-2">{resource.title}</h3>
                  <p className="text-sm text-text/60 mb-3">Category: {resource.category}</p>
                  <p className="text-xs text-text/50">Downloaded: {resource.downloadDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-text mb-6">Your Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-2xl border-2 transition-all duration-200 ${
                    achievement.earned
                      ? 'bg-primary/10 border-primary/30'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                      achievement.earned 
                        ? 'bg-primary text-baby-powder' 
                        : 'bg-gray-300 text-gray-500'
                    }`}>
                      <achievement.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-text">{achievement.title}</h3>
                      {achievement.earned && (
                        <p className="text-xs text-primary">Earned {achievement.date}</p>
                      )}
                    </div>
                  </div>
                  <p className="text-text/70 text-sm mb-3">{achievement.description}</p>
                  {!achievement.earned && achievement.progress && (
                    <p className="text-xs text-text/60">Progress: {achievement.progress}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
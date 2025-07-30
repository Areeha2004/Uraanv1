"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResultCard from "../../components/results/ResultCard";
import Link from "next/link";
import { parseQuizData } from "../../utils/parseQuizData";
import { ArrowRight, Clock, Users, TrendingUp, Star } from "lucide-react";
interface BusinessIdea {
  id: string;
  title: string;
  description: string;
  match: number;
  timeline: string;
  investment: string;
  potential: string;
  platforms: string[];
  benefits: string[];
  image: string;
  keywords: string[];
  roadmap: any;
}

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [error, setError] = useState<string | null>(null);

const fetchIdeas = async () => {
  setLoading(true);
  setError(null);

  const rawParsed = searchParams.get("parsed");
  const parsed = parseQuizData(rawParsed ?? "");

  const promptVariables = {
    investment: parsed.investment,
    goals: parsed.goals,
    time: parsed.time,
    experience: parsed.experience,
    personality: parsed.personality,
    interests: parsed.interests,
    constraints: parsed.constraints,
  };

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...promptVariables,
        response_format: "json", // 🔥 Important for OpenAI function-calling
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Error Response:", errorData); // ⛔ log non-2xx response
      throw new Error(errorData.error || `API error: ${res.status}`);
    }

    const data = await res.json();
    console.log("✅ Full AI response:", data); // 🧠 LOG THE RAW RESPONSE HERE

  if (!data.businessCard || !data.roadmap || !data.roadmap.steps) {
  throw new Error("AI returned malformed structure.");
}


   const idea: BusinessIdea = {
  id: data.businessCard.title.toLowerCase().replace(/\s+/g, "-"),
  title: data.businessCard.title,
  description: data.businessCard.description,
  match: 95,
  timeline: data.businessCard.timeline,
  investment: data.businessCard.investment,
  potential: data.businessCard.potential,
  platforms: data.businessCard.keyPlatforms || [],
  benefits: [data.businessCard.whyThisWorksForYou],
  keywords: data.businessCard.keywords || ["business"],
  image: `https://source.unsplash.com/featured/?${data.businessCard.keywords?.[0] || "business"}`,
  roadmap: data.roadmap?.steps || []
};


    setIdeas([idea]);
  } catch (err: any) {
    console.error("❌ Error generating ideas:", err);
    setError(
      err.message?.includes("JSON") || err.message?.includes("structure")
        ? "AI returned malformed data. Try again."
        : err.message || "Failed to generate business ideas."
    );
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchIdeas();
  }, [searchParams]);

  if (loading) return <p className="text-center mt-10">Generating ideas...</p>;

  if (error) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchIdeas}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

return (
  <div className="min-h-screen pt-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-7xl mx-auto py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-full px-6 py-3 mb-6">
          <Star className="text-primary" size={20} />
          <span className="text-primary font-medium">AI Analysis Complete</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-text mb-4">
          Your Perfect <span className="bg-gradient-to-r from-primary to-accent1 bg-clip-text text-transparent">Business Matches</span>
        </h1>
        <p className="text-lg text-text/70 max-w-2xl mx-auto">
          Based on your skills, interests, and goals, we've found the perfect business opportunities for you. Each comes with a detailed roadmap to get you started.
        </p>
      </div>

      {/* Result Cards */}
      <div className="p-4 max-w-6xl mx-auto space-y-8">
        {ideas.map((idea, idx) => {
          const encodedRoadmap = encodeURIComponent(
            JSON.stringify({
              title: idea.title + " Roadmap",
              description: `Launch your ${idea.title} business step-by-step`,
              steps: idea.roadmap,
            })
          );

          return (
            <Link
              key={idea.id}
              href={`/RoadmapPage/online?roadmap=${encodedRoadmap}`}
              className="block hover:shadow-md transition rounded-md"
            >
              <ResultCard result={idea} index={idx} />
            </Link>
          );
        })}
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-primary/5 to-accent2/5 rounded-3xl p-8 mb-12 mt-16">
        <div className="text-center space-y-6">
          <h2 className="text-2xl font-bold text-text">Ready to Take the Next Step?</h2>
          <p className="text-text/70 max-w-2xl mx-auto">
            Join our community of successful women entrepreneurs and get access to exclusive resources, mentorship, and support.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 text-center">
              <Users className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text mb-2">Join Community</h3>
              <p className="text-sm text-text/60">Connect with 2,500+ women entrepreneurs</p>
              <Link 
                href="/CommunityPage"
                className="inline-flex items-center space-x-1 text-primary hover:text-primary-light mt-3 text-sm font-medium"
              >
                <span>Learn More</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 text-center">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text mb-2">Get Resources</h3>
              <p className="text-sm text-text/60">Access guides, templates, and tools</p>
              <Link 
                href="/ResourcesPage"
                className="inline-flex items-center space-x-1 text-primary hover:text-primary-light mt-3 text-sm font-medium"
              >
                <span>Browse Now</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="bg-glass-bg backdrop-blur-sm border border-secondary/20 rounded-2xl p-6 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-text mb-2">Track Progress</h3>
              <p className="text-sm text-text/60">Monitor your journey with our dashboard</p>
              <Link 
                href="/SignupPage"
                className="inline-flex items-center space-x-1 text-primary hover:text-primary-light mt-3 text-sm font-medium"
              >
                <span>Sign Up Free</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link
          href="/QuizPage"
          className="inline-flex items-center space-x-2 text-primary hover:text-primary-light font-medium"
        >
          <span>Want different results? Retake the quiz</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </div>
);

  
}

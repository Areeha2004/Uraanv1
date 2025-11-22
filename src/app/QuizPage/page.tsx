'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles } from 'lucide-react';

import ScenarioQuestion from '@/components/quiz/ScenarioQuestion';
import QuizProgress from '@/components/quiz/QuizProgress';
import ReflectionArea from '@/components/quiz/ReflectionArea';

const QuizPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Example navigation usage:
  const goBack = () => router.back();


  const scenarios = [
   {
  id: 'morning_energy',
  title: 'Sunday Morning Energy',
  scenario: "It's a quiet Sunday morning. Everyone's still asleep, and you're not in a rush. You finally have a day to yourself. What are you most likely to *instinctively* lean toward — no planning, just your natural pull?",
  icon: '🌤️',
  color: 'from-orange-300/20 to-rose-400/20',
  type: "single-choice" as const,
  options: [
    {
      id: 'creative_project',
      text: 'Picking up a creative hobby or side project',
      subtext: 'You feel alive when expressing yourself freely — whether that’s writing, designing, or crafting.'
    },
    {
      id: 'organize_space',
      text: 'Redecorating, organizing, or improving your space',
      subtext: 'You enjoy bringing order, calm, and beauty into your surroundings — maybe even with a Pinterest board nearby.'
    },
    {
      id: 'deep_dive_learning',
      text: 'Getting lost in a YouTube rabbit hole or a new course',
      subtext: 'You love feeding your curiosity — researching, discovering tools, or just understanding how things work.'
    },
    {
      id: 'connecting_with_others',
      text: 'Checking in on someone or helping with a small task',
      subtext: 'You’re naturally drawn to being someone’s safe space, helper, or guide — even with small gestures.'
    }
  ]
}
,
   {
  id: 'problem_solving',
  title: 'Your Natural Helping Instinct',
  scenario: "A close friend opens up to you about something they’re struggling with — they’re overwhelmed and don’t know where to start. Without thinking too hard, what’s the first thing you naturally do?",
  icon: '💡',
  color: 'from-yellow-300/20 to-amber-500/20',
  type: "single-choice" as const,
  options: [
    {
      id: 'listen_empathize',
      text: 'Listen deeply and hold space for their feelings',
      subtext: 'You instinctively offer warmth, safety, and emotional understanding first.'
    },
    {
      id: 'research_solutions',
      text: 'Gather info or break down the issue into steps',
      subtext: 'You’re wired to analyze the situation and come up with grounded, doable actions.'
    },
    {
      id: 'connect_people',
      text: 'Think of someone in your circle who could help',
      subtext: 'You’re great at recognizing the right person for the right moment — and making connections.'
    },
    {
      id: 'brainstorm_creative',
      text: 'Sit with them and throw around creative ideas',
      subtext: 'You enjoy thinking outside the box and co-creating fresh approaches together.'
    }
  ]
}


,
   {
  id: 'ideal_workspace',
  title: 'Your Ideal Work Vibe',
  scenario: "Picture yourself doing meaningful work — the kind that excites you and feels aligned. What kind of environment brings out your best self?",
  icon: '🏡',
  color: 'from-green-400/20 to-emerald-500/20',
  type: "single-choice" as const,
  options: [
    {
      id: 'home_comfort',
      text: 'Cozy and calm — working from home in comfort',
      subtext: 'You thrive with flexibility, quiet, and familiar surroundings.'
    },
    {
      id: 'collaborative_space',
      text: 'A buzzing space with inspiring women around',
      subtext: 'You feed off shared energy, support, and collaboration.'
    },
    {
      id: 'quiet_focused',
      text: 'Minimal noise, clean desk, full focus',
      subtext: 'You shine in distraction-free zones where deep work flows.'
    },
    {
      id: 'dynamic_changing',
      text: 'New cafés, co-working spots, changing scenes',
      subtext: 'You’re most alive with variety, motion, and fresh experiences.'
    }
  ]
}
,
   {
  id: 'time_availability',
  title: 'Your Daily Rhythm & Time Reality',
  scenario: "Let’s be honest — building something meaningful takes time. Based on your current routine and responsibilities, how much time can you actually dedicate?",
  icon: '⏰',
  color: 'from-blue-400/20 to-cyan-400/20',
  type: "single-choice" as const,
  options: [
    {
      id: 'few_hours_daily',
      text: 'Just 1–3 hours daily, in small chunks',
      subtext: 'You’re balancing a lot, but have pockets of time.'
    },
    {
      id: 'flexible_schedule',
      text: 'My schedule changes — some days more, some less',
      subtext: 'Time varies depending on life’s flow.'
    },
    {
      id: 'dedicated_blocks',
      text: '4–6 hour blocks a few times a week',
      subtext: 'You can dive deep when needed.'
    },
    {
      id: 'full_commitment',
      text: 'I can treat this like a full-time job',
      subtext: 'You’re ready to commit big time.'
    }
  ]
}
,
   {
  id: 'financial_comfort',
  title: 'Your Investment Comfort Zone',
  scenario: "Everyone starts from a different place — and that’s okay. How much are you realistically comfortable investing to get started?",
  icon: '💰',
  color: 'from-purple-400/20 to-violet-400/20',
  type: "single-choice" as const,
  options: [
    {
      id: 'minimal_risk',
      text: 'A small, safe start (₨5,000 – ₨15,000)',
      subtext: 'Just testing the waters, no big risk.'
    },
    {
      id: 'moderate_investment',
      text: 'A sensible start (₨15,000 – ₨50,000)',
      subtext: 'Willing to invest if it feels right.'
    },
    {
      id: 'substantial_commitment',
      text: 'A bold start (₨50,000 – ₨1,00,000)',
      subtext: 'Ready to take a confident leap.'
    },
    {
      id: 'significant_investment',
      text: 'As much as it takes (₨1,00,000+)',
      subtext: 'I fully believe in my journey.'
    }
  ]
}
,
   {
  id: 'passion_areas',
  title: 'What Truly Lights You Up',
  scenario: "When you dream of making an impact, which areas excite your heart the most?",
  icon: '✨',
  color: 'from-pink-400/20 to-rose-400/20',
  type: "multiple-choice" as const,
  maxSelections: 3,
  options: [
    {
      id: 'fashion_beauty',
      text: 'Fashion, beauty & personal style',
      subtext: 'Helping others feel confident and radiant'
    },
    {
      id: 'food_hospitality',
      text: 'Food, cooking & warm hospitality',
      subtext: 'Bringing joy and connection through flavors'
    },
    {
      id: 'education_growth',
      text: 'Teaching, mentoring & growth',
      subtext: 'Inspiring minds and nurturing potential'
    },
    {
      id: 'health_wellness',
      text: 'Health, wellness & self-care',
      subtext: 'Helping people feel whole and well'
    },
    {
      id: 'technology_innovation',
      text: 'Tech & smart solutions',
      subtext: 'Solving real-world problems with innovation'
    },
    {
      id: 'arts_creativity',
      text: 'Art, crafts & creativity',
      subtext: 'Expressing beauty and imagination'
    }
  ]
}
,
{
  id: 'self_belief',
  title: 'Your Inner Readiness',
  scenario: "Everyone starts from a different place emotionally too. Which of these statements feels most like you *right now*?",
  icon: '🧠',
  color: 'from-yellow-100/20 to-orange-300/20',
  type: 'single-choice' as const,
  options: [
    {
      id: 'unsure_need_handholding',
      text: 'I believe I *can*, but I still feel unsure and need step-by-step guidance',
      subtext: 'You’re willing, but confidence is still growing'
    },
    {
      id: 'cautious_hopeful',
      text: 'I’m hopeful, but afraid of failure or judgment',
      subtext: 'You have dreams, but fear can slow you down'
    },
    {
      id: 'ready_to_try',
      text: 'I’m ready to try, even if it’s messy or slow',
      subtext: 'Courage over perfection'
    },
    {
      id: 'confident_committed',
      text: 'I know I can do it — just need the right path',
      subtext: 'You’re mentally all-in and hungry to start'
    }
  ]
}
,
{
  id: 'life_constraints',
  title: 'Your Life Realities',
  scenario: "Everyone's journey is different. Which of these describe your current situation?",
  icon: '🧩',
  color: 'from-gray-400/20 to-neutral-400/20',
  type: "multiple-choice" as const,
  maxSelections: 4,
  options: [
    {
      id: 'limited_budget',
      text: 'Tight budget or no startup money',
      subtext: 'I need low- or no-investment options'
    },
    {
      id: 'time_constraints',
      text: 'Limited time in a day',
      subtext: 'I have family or job duties to juggle'
    },
    {
      id: 'no_support',
      text: 'Little support from others',
      subtext: 'I’m doing this on my own without help'
    },
    {
      id: 'tech_challenges',
      text: 'Not very tech-savvy',
      subtext: 'I need simple, beginner-friendly tools'
    },
    {
      id: 'rural_or_remote',
      text: 'Live in a rural or remote area',
      subtext: 'Internet or mobility is sometimes an issue'
    },
    {
      id: 'health_limits',
      text: 'Health or energy limitations',
      subtext: 'I may need more flexible, restful options'
    }
  ]
}
,
{
  id: 'past_experience',
  title: 'Your Quiet Superpowers',
  scenario: "Sometimes we don’t even realize we’ve been ‘doing business’ already. Which of these have you done before — even casually?",
  icon: '📦',
  color: 'from-teal-200/20 to-lime-300/20',
  type: 'multiple-choice' as const,
  maxSelections: 3,
  options: [
    {
      id: 'sold_products',
      text: 'Sold a product or service (online or offline)',
      subtext: 'Even once counts — clothes, food, tutoring, etc.'
    },
    {
      id: 'taught_shared_knowledge',
      text: 'Taught someone or created helpful content',
      subtext: 'Even just helping a cousin with school counts'
    },
    {
      id: 'managed_home_events',
      text: 'Planned or organized something smoothly',
      subtext: 'Like a wedding, trip, or home-based event'
    },
    {
      id: 'none_yet',
      text: 'Haven’t done anything like this yet',
      subtext: 'And that’s totally okay — this is your beginning'
    }
  ]
}

,
    {
  id: 'success_vision',
  title: 'Your Vision of Success',
  scenario: "When you see your dream business thriving, what truly matters most to you?",
  icon: '🌟',
  color: 'from-indigo-400/20 to-blue-400/20',
  type: "multiple-choice" as "multiple-choice",
  options: [
    {
      id: 'financial_freedom',
      text: 'Financial freedom and stability',
      subtext: 'Earning well, living well, sleeping in peace'
    },
    {
      id: 'flexible_lifestyle',
      text: 'Freedom to live on your terms',
      subtext: 'Time for family, health, and what you love'
    },
    {
      id: 'creative_fulfillment',
      text: 'Creative expression and purpose',
      subtext: 'Work that lights a fire in your soul'
    },
    {
      id: 'community_impact',
      text: 'Positive change in your community',
      subtext: 'Leaving a mark that helps others rise'
    },
    {
      id: 'personal_growth',
      text: 'Lifelong growth and learning',
      subtext: 'Evolving into your most powerful self'
    },
    {
      id: 'recognition_respect',
      text: 'Respect and recognition',
      subtext: 'Being seen, heard, and valued for your gifts'
    }
  ]
}

  ];

  const totalSteps = scenarios.length + 2; // +2 for reflection areas
  const reflectionSteps = [3, 6]; // Show reflection after questions 3 and 6
      const handleAnswer = (questionId: string, answer: string | string[]) => {
      setAnswers(prev => ({ ...prev, [questionId]: answer }));
      };


      const handleReflection = (stepIndex: number, reflection: string) => {
      setReflections(prev => ({ ...prev, [`reflection_${stepIndex}`]: reflection }));
      };


      const handleNext = () => {
      if (currentStep < totalSteps - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
      setCurrentStep(prev => prev + 1);
      setIsTransitioning(false);
      }, 300);
      return;
      }


      const parsed = {
      investment: answers['financial_comfort'] || '',
      goals: (answers['success_vision'] as string[] | undefined) || [],
      time: answers['time_availability'] || '',
      experience: (answers['past_experience'] as string[] | undefined) || [],
      personality: [answers['morning_energy'], answers['problem_solving'], answers['ideal_workspace'], answers['self_belief']].filter(Boolean).join(', '),
      interests: (answers['passion_areas'] as string[] | undefined) || [],
      constraints: (answers['life_constraints'] as string[] | undefined) || [],
      reflections: [reflections['reflection_4'] || 'N/A', reflections['reflection_8'] || 'N/A']
      };


      router.push(`/ResultsPage?parsed=${encodeURIComponent(JSON.stringify(parsed))}`);
      };


      const handlePrevious = () => {
      if (currentStep > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
      setCurrentStep(prev => prev - 1);
      setIsTransitioning(false);
      }, 300);
      }
      };


      const getCurrentContent = ():
      | { type: 'reflection'; title: string; subtitle: string }
      | { type: 'scenario'; scenario: typeof scenarios[number] } => {
      if (currentStep === 4) {
      return { type: 'reflection', title: 'Take a Moment to Reflect', subtitle: 'Want to express something that doesn\'t fit the choices?' };
      }
      if (currentStep === 8) {
      return { type: 'reflection', title: 'Your Thoughts Matter', subtitle: 'Share anything else that feels important to your journey' };
      }
      const scenarioIndex = currentStep > 4 ? currentStep - 1 : currentStep;
      const adjustedIndex = currentStep > 8 ? currentStep - 2 : scenarioIndex;
      return { type: 'scenario', scenario: scenarios[adjustedIndex] };
      };


      const content = getCurrentContent();


      const isAnswered = content.type === 'scenario'
      ? !!answers[content.scenario.id]
      : reflections[`reflection_${currentStep}`] !== undefined;


      const isLastStep = currentStep === totalSteps - 1;


     return (
       <div className="min-h-screen bg-gradient from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
         {/* Background Elements */}
         <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-accent2/20 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
         <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-pink-300/30 to-purple-300/30 rounded-full blur-2xl"></div>

         {/* Floating Elements */}
         <div className="absolute top-1/4 right-1/4 text-primary/30 text-6xl animate-pulse">✨</div>
         <div className="absolute bottom-1/3 left-1/4 text-secondary/40 text-4xl animate-pulse">🌙</div>
         <div className="absolute top-1/3 left-1/5 text-pink-400/30 text-3xl animate-bounce">💫</div>
         <div className="absolute bottom-1/4 right-1/3 text-purple-400/30 text-2xl animate-pulse">🦋</div>

         <div className="relative min-h-screen flex flex-col">
           {/* Header */}
           <div className="flex items-center justify-between p-6">
             <button
               onClick={() => router.push('/')}
               className="flex items-center space-x-2 text-text/70 hover:text-primary transition-all duration-300 hover:scale-105"
             >
               <ArrowLeft size={20} />
               <span className="hidden sm:inline">Back to Home</span>
             </button>

             <div className="text-center">
               <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent2 bg-clip-text text-transparent">Discover Your Path</h1>
               <p className="text-sm text-text/70">Let your heart guide the way ✨</p>
             </div>

             <div className="w-20"></div> {/* Spacer for centering */}
           </div>

           {/* Progress */}
           <QuizProgress current={currentStep + 1} total={totalSteps} />

           {/* Main Content */}
           <div className="flex-1 flex items-center justify-center px-4 py-8">
             <div className={`w-full max-w-2xl transition-all duration-300 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
               {content.type === 'reflection' ? (
                 <ReflectionArea
                   title={content.title!}
                   subtitle={content.subtitle!}
                   value={reflections[`reflection_${currentStep}`] || ''}
                   onChange={(value: string) => handleReflection(currentStep, value)}
                 />
               ) : (
                 <ScenarioQuestion
                   scenario={content.scenario!}
                   value={answers[content.scenario!.id]}
                   onChange={(value: any) => handleAnswer(content.scenario!.id, value)}
                 />
               )}
             </div>
           </div>

           {/* Navigation */}
           <div className="p-6">
             <div className="max-w-2xl mx-auto flex justify-between items-center">
               <button
                 onClick={handlePrevious}
                 disabled={currentStep === 0}
                 className={`px-6 py-3 rounded-2xl font-medium transition-all duration-200 ${
                   currentStep === 0
                     ? 'text-text/30 cursor-not-allowed'
                     : 'text-text bg-white/70 backdrop-blur-sm border border-primary/20 hover:bg-primary/10 hover:scale-105 shadow-lg'
                 }`}
               >
                 Previous
               </button>

               <div className="text-center">
                 <p className="text-sm text-text/60">
                   {currentStep + 1} of {totalSteps}
                 </p>
               </div>

               <button
                 onClick={handleNext}
                 disabled={!isAnswered}
                 className={`group px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                   isAnswered
                     ? 'bg-gradient-to-r from-primary via-primary-light to-accent2 text-baby-powder hover:shadow-xl hover:shadow-primary/30 hover:scale-110 transform'
                     : 'bg-text/10 text-text/40 cursor-not-allowed'
                 }`}
               >
                 {isLastStep ? (
                   <div className="flex items-center space-x-2">
                     <Sparkles size={20} />
                     <span>Reveal My Path</span>
                   </div>
                 ) : (
                   'Continue'
                 )}
               </button>
             </div>
           </div>

           {/* Stats Cards */}
           <div className="px-6 pb-8">
             <div className="max-w-4xl mx-auto">
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 {/* 5 min completion time */}
                 <div className="group relative overflow-hidden bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-teal-500/10 backdrop-blur-sm border border-blue-200/30 rounded-3xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-blue-200/20">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-xl"></div>
                   <div className="relative">
                     <div className="text-3xl mb-2">⏱️</div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-1">5 min</div>
                     <div className="text-sm text-blue-700/80 font-medium">Average completion time</div>
                   </div>
                 </div>

                 {/* 50+ business ideas */}
                 <div className="group relative overflow-hidden bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10 backdrop-blur-sm border border-purple-200/30 rounded-3xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-purple-200/20">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
                   <div className="relative">
                     <div className="text-3xl mb-2">💡</div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-1">50+</div>
                     <div className="text-sm text-purple-700/80 font-medium">Business ideas to explore</div>
                   </div>
                 </div>

                 {/* 95% accuracy rate */}
                 <div className="group relative overflow-hidden bg-gradient-to-br from-emerald-500/10 via-green-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-200/30 rounded-3xl p-6 hover:scale-105 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-200/20">
                   <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-400/20 to-green-400/20 rounded-full blur-xl"></div>
                   <div className="relative">
                     <div className="text-3xl mb-2">🎯</div>
                     <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent mb-1">95%</div>
                     <div className="text-sm text-emerald-700/80 font-medium">Accuracy rate</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         </div>
       </div>
     );
      };


      export default QuizPage;
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
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [reflections, setReflections] = useState<Record<string, string>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goBack = () => router.back();

  const scenarios = [
    {
      id: 'morning_energy',
      title: 'Sunday Morning Energy',
      scenario: "It's a quiet Sunday morning. Everyone's still asleep, and you're not in a rush. You finally have a day to yourself. What are you most likely to *instinctively* lean toward — no planning, just your natural pull?",
      icon: '🌤️',
      color: 'from-orange-300/20 to-rose-400/20',
      type: 'single-choice' as const,
      options: [
        { id: 'creative_project', text: 'Picking up a creative hobby or side project', subtext: 'You feel alive when expressing yourself freely — whether that’s writing, designing, or crafting.' },
        { id: 'organize_space', text: 'Redecorating, organizing, or improving your space', subtext: 'You enjoy bringing order, calm, and beauty into your surroundings — maybe even with a Pinterest board nearby.' },
        { id: 'deep_dive_learning', text: 'Getting lost in a YouTube rabbit hole or a new course', subtext: 'You love feeding your curiosity — researching, discovering tools, or just understanding how things work.' },
        { id: 'connecting_with_others', text: 'Checking in on someone or helping with a small task', subtext: 'You’re naturally drawn to being someone’s safe space, helper, or guide — even with small gestures.' }
      ]
    },
    {
      id: 'problem_solving',
      title: 'Your Natural Helping Instinct',
      scenario: "A close friend opens up to you about something they’re struggling with — they’re overwhelmed and don’t know where to start. Without thinking too hard, what’s the first thing you naturally do?",
      icon: '💡',
      color: 'from-yellow-300/20 to-amber-500/20',
      type: 'single-choice' as const,
      options: [
        { id: 'listen_empathize', text: 'Listen deeply and hold space for their feelings', subtext: 'You instinctively offer warmth, safety, and emotional understanding first.' },
        { id: 'research_solutions', text: 'Gather info or break down the issue into steps', subtext: 'You’re wired to analyze the situation and come up with grounded, doable actions.' },
        { id: 'connect_people', text: 'Think of someone in your circle who could help', subtext: 'You’re great at recognizing the right person for the right moment — and making connections.' },
        { id: 'brainstorm_creative', text: 'Sit with them and throw around creative ideas', subtext: 'You enjoy thinking outside the box and co-creating fresh approaches together.' }
      ]
    },
    // Repeat the same 'as const' fix for all other scenario objects
  ];

  const totalSteps = scenarios.length + 2;
  const reflectionSteps = [3, 6];

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
    } else {
      const parsed = {
        investment: answers['financial_comfort'] || '',
        goals: answers['success_vision'] || [],
        time: answers['time_availability'] || '',
        experience: answers['past_experience'] || [],
        personality: [answers['morning_energy'], answers['problem_solving'], answers['ideal_workspace'], answers['self_belief']].filter(Boolean).join(', '),
        interests: answers['passion_areas'] || [],
        constraints: answers['life_constraints'] || [],
        reflections: [reflections['reflection_4'] || 'N/A', reflections['reflection_8'] || 'N/A']
      };
      router.push(`/ResultsPage?parsed=${encodeURIComponent(JSON.stringify(parsed))}`);
    }
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

  const getCurrentContent = () => {
    if (currentStep === 4) return { type: 'reflection', title: 'Take a Moment to Reflect', subtitle: 'Want to express something that doesn't fit the choices?' };
    if (currentStep === 8) return { type: 'reflection', title: 'Your Thoughts Matter', subtitle: 'Share anything else that feels important to your journey' };
    const scenarioIndex = currentStep > 4 ? currentStep - 1 : currentStep;
    const adjustedIndex = currentStep > 8 ? currentStep - 2 : scenarioIndex;
    return { type: 'scenario', scenario: scenarios[adjustedIndex] };
  };

  const content = getCurrentContent();
  const isAnswered = content.type === 'scenario' ? answers[content.scenario?.id || ''] : reflections[`reflection_${currentStep}`] !== undefined;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="min-h-screen bg-gradient from-purple-50 via-pink-50 to-orange-50 relative overflow-hidden">
      {/* ... rest of JSX remains unchanged ... */}
    </div>
  );
};

export default QuizPage;
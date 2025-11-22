import React from 'react';
import { Check } from 'lucide-react';

interface ScenarioOption {
  id: string;
  text: string;
  subtext: string;
}

interface ScenarioQuestionProps {
  scenario: {
    id: string;
    title: string;
    scenario: string;
    icon: string;
    color?: string;
    type: 'single-choice' | 'multiple-choice';
    options: ScenarioOption[];
    maxSelections?: number;
  };
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const ScenarioQuestion: React.FC<ScenarioQuestionProps> = ({ scenario, value, onChange }) => {
  const handleSingleChoice = (optionId: string) => {
    onChange(optionId);
  };

  const handleMultipleChoice = (optionId: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    const maxSelections = scenario.maxSelections || scenario.options.length;
    
    if (currentValues.includes(optionId)) {
      // Remove option
      onChange(currentValues.filter((v: string) => v !== optionId));
    } else if (currentValues.length < maxSelections) {
      // Add option
      onChange([...currentValues, optionId]);
    }
  };

  const isSelected = (optionId: string) => {
    return scenario.type === 'single-choice' 
      ? value === optionId 
      : (Array.isArray(value) ? value : []).includes(optionId);
  };

  const isDisabled = (optionId: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    return scenario.type === 'multiple-choice' && 
      scenario.maxSelections && 
      currentValues.length >= scenario.maxSelections && 
      !isSelected(optionId);
  };

  return (
    <div className="space-y-8">
      {/* Scenario Header */}
      <div className="text-center space-y-6">
        <div className={`relative inline-block p-6 rounded-3xl bg-gradient-to-br ${scenario.color || 'from-primary/10 to-accent2/10'} backdrop-blur-sm border border-white/20 shadow-xl`}>
          <div className="text-6xl ">{scenario.icon}</div>
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-text via-primary to-accent2 bg-clip-text text-transparent">{scenario.title}</h2>
          <div className="bg-white/60 backdrop-blur-sm border border-primary/20 rounded-3xl p-6 max-w-xl mx-auto shadow-lg">
            <p className="text-lg text-text/90 leading-relaxed italic font-medium">
              "{scenario.scenario}"
            </p>
          </div>
        </div>
        
        {scenario.maxSelections && (
          <p className="text-sm text-primary bg-gradient-to-r from-primary/20 to-accent2/20 rounded-full px-6 py-3 inline-block font-semibold border border-primary/30 shadow-md">
            Choose up to {scenario.maxSelections} that resonate with you
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-4">
        {scenario.options.map((option) => {
          const selected = isSelected(option.id);
          const disabled = isDisabled(option.id);

          return (
            <button
              key={option.id}
              onClick={() => {
                if (disabled) return;
                scenario.type === 'single-choice' 
                  ? handleSingleChoice(option.id)
                  : handleMultipleChoice(option.id);
              }}
              disabled={!!disabled}
              className={`group w-full p-6 rounded-3xl border-2 text-left transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-xl ${
                selected
                  ? 'border-primary bg-gradient-to-r from-primary/20 via-primary/10 to-accent2/10 shadow-xl shadow-primary/30 transform scale-[1.02]'
                  : disabled
                  ? 'border-text/20 bg-text/5 text-text/40 cursor-not-allowed'
                  : 'border-primary/20 bg-white/70 backdrop-blur-sm hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent2/10 hover:shadow-xl hover:shadow-primary/20'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <h3 className={`font-semibold text-lg leading-relaxed ${
                    selected ? 'text-primary font-bold' : disabled ? 'text-text/40' : 'text-text'
                  }`}>
                    {option.text}
                  </h3>
                  <p className={`text-sm ${
                    selected ? 'text-primary/80 font-medium' : disabled ? 'text-text/30' : 'text-text/70'
                  }`}>
                    {option.subtext}
                  </p>
                </div>
                
                <div className={`ml-4 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selected
                    ? 'border-primary bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30 scale-110'
                    : disabled
                    ? 'border-text/20 bg-text/5'
                    : 'border-primary/30 group-hover:border-primary/70 group-hover:bg-primary/10'
                }`}>
                  {selected && (
                    <Check size={18} className="text-baby-powder font-bold" />
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selection Counter for Multiple Choice */}
      {scenario.type === 'multiple-choice' && scenario.maxSelections && (
        <div className="text-center">
          <div className="inline-flex items-center space-x-3 bg-white/70 backdrop-blur-sm border border-primary/30 rounded-full px-6 py-3 shadow-lg">
            <div className="flex space-x-1">
              {Array.from({ length: scenario.maxSelections }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < (value || []).length ? 'bg-gradient-to-r from-primary to-accent2 shadow-md' : 'bg-secondary/40'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-text/70 font-medium">
              {(value || []).length} of {scenario.maxSelections} selected
            </span>
          </div>
        </div>
      )}

      {/* None of these option */}
      <div className="text-center pt-4">
        <button
          onClick={() => onChange(scenario.type === 'single-choice' ? 'none_fit' : ['none_fit'])}
          className={`text-sm px-6 py-3 rounded-full border transition-all duration-300 hover:scale-105 ${
            (scenario.type === 'single-choice' ? value === 'none_fit' : (value || []).includes('none_fit'))
              ? 'border-accent2 bg-gradient-to-r from-accent2/20 to-accent2/10 text-accent2 font-semibold shadow-md'
              : 'border-text/30 text-text/60 hover:border-accent2/50 hover:text-accent2 hover:bg-accent2/10'
          }`}
        >
          None of these quite fit me
        </button>
      </div>
    </div>
  );
};

export default ScenarioQuestion;
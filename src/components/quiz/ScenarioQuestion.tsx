import React from 'react';
import { Check, Sparkles } from 'lucide-react';

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
  const currentValues = Array.isArray(value) ? value : [];
  const maxSelections = scenario.maxSelections || scenario.options.length;

  const isSelected = (optionId: string) => {
    return scenario.type === 'single-choice'
      ? value === optionId
      : currentValues.includes(optionId);
  };

  const isDisabled = (optionId: string) => {
    return (
      scenario.type === 'multiple-choice' &&
      currentValues.length >= maxSelections &&
      !isSelected(optionId)
    );
  };

  const handleSingleChoice = (optionId: string) => {
    onChange(optionId);
  };

  const handleMultipleChoice = (optionId: string) => {
    if (optionId === 'none_fit') {
      onChange(['none_fit']);
      return;
    }

    const baseValues = currentValues.filter((v) => v !== 'none_fit');

    if (baseValues.includes(optionId)) {
      onChange(baseValues.filter((v) => v !== optionId));
      return;
    }

    if (baseValues.length < maxSelections) {
      onChange([...baseValues, optionId]);
    }
  };

  const handleOptionClick = (optionId: string, disabled: boolean) => {
    if (disabled) return;

    if (scenario.type === 'single-choice') {
      handleSingleChoice(optionId);
      return;
    }

    handleMultipleChoice(optionId);
  };

  const isNoneFitSelected =
    scenario.type === 'single-choice' ? value === 'none_fit' : currentValues.includes('none_fit');

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="mx-auto w-fit rounded-3xl border border-primary/20 bg-baby-powder/75 p-4 backdrop-blur-xl">
          <div
            className={`rounded-2xl bg-gradient-to-br ${
              scenario.color || 'from-primary/20 to-accent2/20'
            } p-5 shadow-[0_22px_40px_-26px_rgba(46,30,74,0.8)]`}
          >
            <div className="text-4xl sm:text-5xl">{scenario.icon}</div>
          </div>
        </div>

        <h2 className="font-display mt-5 text-3xl leading-tight text-text md:text-4xl">{scenario.title}</h2>
        <div className="premium-card mx-auto mt-4 max-w-3xl rounded-3xl p-5 sm:p-6">
          <p className="text-base leading-relaxed text-text/80 md:text-lg">&quot;{scenario.scenario}&quot;</p>
        </div>

        {scenario.type === 'multiple-choice' && scenario.maxSelections && (
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
            <Sparkles size={14} />
            Choose up to {scenario.maxSelections}
          </div>
        )}
      </div>

      <div className="space-y-3">
        {scenario.options.map((option) => {
          const selected = isSelected(option.id);
          const disabled = isDisabled(option.id);

          return (
            <button
              key={option.id}
              onClick={() => handleOptionClick(option.id, disabled)}
              disabled={disabled}
              className={`group w-full rounded-2xl border p-4 text-left transition-all duration-300 sm:p-5 ${
                selected
                  ? 'border-primary/55 bg-gradient-to-r from-primary/14 to-accent2/14 shadow-[0_18px_35px_-24px_rgba(138,31,74,0.9)]'
                  : disabled
                  ? 'border-text/10 bg-text/5 text-text/40 cursor-not-allowed'
                  : 'border-primary/15 bg-baby-powder/80 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-baby-powder'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3
                    className={`text-base font-semibold leading-relaxed sm:text-lg ${
                      selected ? 'text-primary' : disabled ? 'text-text/40' : 'text-text'
                    }`}
                  >
                    {option.text}
                  </h3>
                  <p
                    className={`mt-1 text-sm leading-relaxed ${
                      selected ? 'text-primary/80' : disabled ? 'text-text/35' : 'text-text/70'
                    }`}
                  >
                    {option.subtext}
                  </p>
                </div>

                <div
                  className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    selected
                      ? 'border-primary bg-primary text-baby-powder'
                      : disabled
                      ? 'border-text/20 bg-text/5'
                      : 'border-primary/35 bg-baby-powder group-hover:border-primary/60'
                  }`}
                >
                  {selected && <Check size={14} />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {scenario.type === 'multiple-choice' && scenario.maxSelections && (
        <div className="flex items-center justify-center">
          <div className="rounded-full border border-primary/15 bg-baby-powder/80 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-text/65">
              {currentValues.filter((item) => item !== 'none_fit').length} / {scenario.maxSelections} selected
            </p>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={() => onChange(scenario.type === 'single-choice' ? 'none_fit' : ['none_fit'])}
          className={`rounded-full border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
            isNoneFitSelected
              ? 'border-accent2/30 bg-accent2/15 text-accent2'
              : 'border-text/20 text-text/60 hover:border-accent2/30 hover:text-accent2'
          }`}
        >
          None of these fit me
        </button>
      </div>
    </div>
  );
};

export default ScenarioQuestion;

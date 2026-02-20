import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mx-auto mt-5 w-full max-w-4xl">
      <div className="premium-card rounded-2xl px-4 py-4 sm:px-5">
        <div className="mb-3 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-text/60">
          <span>Progress</span>
          <span>
            Step {current} of {total}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-secondary/25">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent2 transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between">
          {Array.from({ length: total }, (_, index) => (
            <span
              key={index}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index < current ? 'w-6 bg-primary' : 'w-3 bg-text/20'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;

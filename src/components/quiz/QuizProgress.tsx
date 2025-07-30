import React from 'react';

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress: React.FC<QuizProgressProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="px-6 py-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-gradient-to-r from-secondary/20 via-primary/10 to-accent2/20 rounded-full overflow-hidden shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-primary via-primary-light to-accent2 rounded-full transition-all duration-700 ease-out shadow-lg"
              style={{ width: `${percentage}%` }}
            />
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-between mt-4">
            {Array.from({ length: total }, (_, index) => (
              <div
                key={index}
                className={`relative transition-all duration-500 ${
                  index < current 
                    ? 'transform scale-125' 
                    : index === current - 1
                    ? 'transform scale-150' 
                    : ''
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full transition-all duration-500 shadow-lg ${
                    index < current 
                      ? 'bg-gradient-to-br from-primary to-primary-light shadow-xl shadow-primary/40' 
                      : index === current - 1
                      ? 'bg-gradient-to-br from-primary via-primary-light to-accent2 shadow-xl shadow-primary/50 animate-pulse' 
                      : 'bg-gradient-to-br from-secondary/40 to-secondary/20'
                  }`}
                />
                {index === current - 1 && (
                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-br from-primary/40 to-accent2/40 rounded-full animate-ping" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-center mt-4">
          <p className="text-sm text-text/70 font-medium">
            Step {current} of {total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;
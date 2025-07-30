// types/quiz.ts

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  type: 'single-choice' | 'multiple-choice';
  options: string[];
  maxSelections?: number;
}

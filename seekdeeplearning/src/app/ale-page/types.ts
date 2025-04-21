export interface QuizQuestion {
    id: string;
    definition: string;
    options: string[];
    correctAnswer: string;
  }
  
  export interface QuizResult {
    score: number;
    total: number;
    correctAnswers: string[];
  }
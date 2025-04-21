import React from 'react';
import AnswerOption from './AnswerOption'; // Adjust path if needed

interface QuestionCardProps {
  question: string;
  answers: string[];
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

function QuestionCard({ question, answers, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg text-black w-full max-w-2xl">
      <h2 className="text-2xl font-semibold text-center mb-6">{question}</h2>
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <AnswerOption
            key={index}
            text={answer}
            isSelected={selectedAnswer === answer}
            onSelect={() => onAnswerSelect(answer)}
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
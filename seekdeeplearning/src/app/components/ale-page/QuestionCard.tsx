import React from 'react';
import AnswerOption from './AnswerOption'; // Adjust path if needed

// Props:
// - question: The text of the question to display
// - answers: Array of answer options
// - selectedAnswer: The currently selected answer (null if none selected)
// - onAnswerSelect: Function to handle answer selection
interface QuestionCardProps {
  question: string;
  answers: string[];
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

function QuestionCard({ question, answers, selectedAnswer, onAnswerSelect }: QuestionCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg text-black w-full max-w-2xl">
      {/* Display the question */}
      <h2 className="text-2xl font-semibold text-center mb-6">{question}</h2>

      {/* Render the list of answer options */}
      <div className="grid grid-cols-2 gap-4">
        {answers.map((answer, index) => (
          <AnswerOption
            key={index} // Use a unique key for each answer (index is fine for static lists)
            text={answer} // The answer text to display
            isSelected={selectedAnswer === answer} // Highlight if this is the selected answer
            onSelect={() => onAnswerSelect(answer)} // Call the parent's selection handler
          />
        ))}
      </div>
    </div>
  );
}

export default QuestionCard;
import React from 'react';
import AnswerOption from './AnswerOption'; // Adjust path if needed
import '../styles/QuestionCard.css'; // Corresponding styles

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
    <div className="question-card">
      {/* Display the question */}
      <h2 className="question-text">{question}</h2>

      {/* Render the list of answer options */}
      <div className="answers-container">
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
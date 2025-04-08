import React from 'react';
import '../styles/AnswerOption.css';

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

function AnswerOption({ text, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <div
      className={`answer-option ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {text}
    </div>
  );
}

export default AnswerOption;
import React from 'react';

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

function AnswerOption({ text, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <div
      className={`bg-[#F5F5F5] hover:bg-gray-200 rounded-md text-center  answer-option ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      {text}
    </div>
  );
}

export default AnswerOption;
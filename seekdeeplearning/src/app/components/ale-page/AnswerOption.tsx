import React from "react";

interface AnswerOptionProps {
  text: string;
  isSelected: boolean;
  onSelect: () => void;
}

function AnswerOption({ text, isSelected, onSelect }: AnswerOptionProps) {
  return (
    <div
      className={`cursor-pointer px-4 py-3 rounded-lg text-center font-medium shadow-md transition-all duration-200 ${
        isSelected
          ? "bg-[#D4DCFF] text-black"
          : "bg-[#E0E4F5] text-black hover:bg-[#d0d6e6]"
      }`}
      onClick={onSelect}
    >
      {text}
    </div>
  );
}

export default AnswerOption;
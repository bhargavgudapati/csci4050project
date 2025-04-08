import React, { useState } from "react";

interface FlashcardProps {
  term: string;
  definition: string;
  focused?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ term, definition, focused }) => {
  const [flipped, setFlipped] = useState(false); // State to handle the flip

  const handleClick = () => {
    if (focused) {
      setFlipped(!flipped); // Toggle flip only if the card is focused
    }
  };

  return (
    <div
      className={`relative mx-auto p-6 rounded-2xl shadow-md transition-transform ${
        focused ? "scale-110 w-[400px] h-[250px]" : "w-[300px] h-[200px]"
      }`}
      onClick={handleClick}
      style={{ perspective: "1000px" }} // Set perspective for the 3D effect
    >
      {/* Container for the flip effect */}
      <div
        className={`w-full h-full transform transition-all duration-500 ${
          flipped && focused ? "rotate-x-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side (Term) */}
        <div
          className={`absolute w-full h-full bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-center ${
            flipped && focused ? "hidden" : ""
          }`}
        >
          <h2 className="text-black text-2xl font-medium">{term}</h2>
        </div>

        {/* Back Side (Definition) */}
        <div
          className={`absolute w-full h-full bg-[#F5F5F5] rounded-2xl flex items-center justify-center text-center ${
            flipped && focused ? "" : "hidden"
          }`}
          style={{
            transform: flipped && focused ? "rotateX(180deg)" : "",
          }}
        >
          <p className="text-black text-sm px-4">{definition}</p>
        </div>
      </div>
    </div>
  );
};

const FlashcardList: React.FC<{ term: string; definition: string }> = ({
  term,
  definition,
}) => {
  return (
    <div className="bg-[#F5F5F5] rounded-xl p-4 shadow-md flex items-center space-x-4">
      <div className="flex-1">
        <h2 className="text-black text-xl">{term}</h2>
      </div>
      <div
        className="flex-1"
        style={{
          backgroundColor: "#859AD4",
          transform: "skewX(-10deg)",
          height: "100%",
          margin: "0 12px",
        }}
      />
      <div className="flex-1">
        <p className="text-black text-sm">{definition}</p>
      </div>
    </div>
  );
};

export { Flashcard, FlashcardList };

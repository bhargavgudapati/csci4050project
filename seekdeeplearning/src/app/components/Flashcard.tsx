import React, { useState } from "react";

interface FlashcardProps {
  term: string;
  definition: string;
  focused?: boolean;
}

const Flashcard: React.FC<FlashcardProps> = ({ term, definition, focused }) => {
  const [flipped, setFlipped] = useState(false); // State to handle the flip
  const [showDefinition, setShowDefinition] = useState(false); // State to control when to show the definition

  const handleClick = () => {
    if (focused) {
      setFlipped(true); // Start the flip animation
      setTimeout(() => {
        setShowDefinition(true); // Show the definition after the animation completes
      }, 200); // Match the duration of the flip animation (500ms in this case)
    }
  };

  const handleReset = () => {
    setFlipped(false); // Reset the flip animation
    setTimeout(() => {
      setShowDefinition(false); // Show the definition after the animation completes
    }, 200); // Reset to show the term
  };

  return (
    <div
      className={`relative mx-auto p-6 rounded-2xl shadow-md transition-transform ${
        focused ? "scale-110 w-[500px] h-[300px]" : "w-[400px] h-[250px]"
      }`}
      onClick={flipped ? handleReset : handleClick} // Toggle between flip and reset
      style={{ perspective: "1000px" }} // Set perspective for the 3D effect
    >
      {/* Container for the flip effect */}
      <div
        className={`absolute inset-0 transform transition-all duration-500 ${
          flipped && focused ? "rotate-x-180" : ""
        }`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front Side (Term) */}
        <div
          className={`absolute w-full h-full bg-[#F5F5F5] rounded-2xl ${
            flipped && focused ? "hidden" : ""
          }`}
          style={{ transform: showDefinition ? "rotateX(180deg)" : "" }}
        >
          <div className="flex items-center justify-center text-center w-full h-full overflow-y-auto overflow-x-hidden p-6">
            <h2 className="text-black text-2xl font-medium break-words whitespace-pre-wrap">{!showDefinition ? term : definition}</h2>
          </div>
        </div>

        {/* Back Side (Definition) */}
        <div
          className={`absolute w-full h-full bg-[#F5F5F5] rounded-2xl ${
            flipped && focused ? "" : "hidden"
          }`}
          style={{ transform: showDefinition ? "rotateX(180deg)" : "" }}
        >
          <div className="flex items-center justify-center text-center w-full h-full overflow-y-auto overflow-x-hidden p-6">
            <p className="text-black text-2xl break-words whitespace-pre-wrap">{showDefinition ? definition : term}</p>
          </div>
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
      {/* Term section (20%) */}
      <div className="w-[20%]">
        <h2 className="text-black text-xl break-words overflow-hidden">{term}</h2>
      </div>
      
      <div className="w-[2px] bg-[#859AD4] self-stretch rounded" /> {/* Divider */}
      <div className="flex-1 overflow-hidden">
        <p className="text-black text-sm break-words">{definition}</p>
      </div>
    </div>
  );
};

export { Flashcard, FlashcardList };

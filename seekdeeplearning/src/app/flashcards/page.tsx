"use client";

import React, { useState } from "react";
import { Flashcard, FlashcardList } from "../../components/Flashcard";

const initialFlashcards = [
  {
    term: "Linear Process Flow",
    definition:
      "A sequential approach where each phase of the software development life cycle is completed one after the other without revisiting previous stages.",
  },
  {
    term: "CASE Tools",
    definition:
      "Automated or semi-automated support for the software development process.",
  },
  // Add more flashcards here
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev < flashcards.length - 1 ? prev + 1 : prev
    );
  };

  const [flashcards, setFlashcards] = useState(initialFlashcards); // State to manage flashcards
  const [newTerm, setNewTerm] = useState(""); // State for new term
  const [newDefinition, setNewDefinition] = useState(""); // State for new definition
  const [editing, setEditing] = useState(false); // State to manage edit mode

  // Handle adding a new flashcard
  const handleAddFlashcard = () => {
    if (newTerm && newDefinition) {
      const newCard = { term: newTerm, definition: newDefinition };
      setFlashcards([...flashcards, newCard]); // Add the new card to the list
      setNewTerm(""); // Clear input fields
      setNewDefinition("");
    }
  };

  // Handle deleting a flashcard
  const handleDeleteFlashcard = (index: number) => {
    const updatedCards = flashcards.filter((_, i) => i !== index);
    setFlashcards(updatedCards); // Remove the card from the list
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    setEditing(!editing); // Toggle between edit and view modes
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-center text-3xl text-black">
        Final Review: CSCI 4050
      </h1>

      {/* Edit Button / Done Button */}
      <div className="flex justify-center">
        <button
          onClick={toggleEditMode}
          className="bg-[#D4DCFF] text-black px-4 py-2 rounded-full"
        >
          {editing ? "Done" : "Edit"}
        </button>
      </div>

      {/* Focused Card */}
      <div className="relative flex items-center justify-center">
        <button
          className="absolute left-4 bg-[#E0E4F5] rounded-full p-3 shadow"
          onClick={handlePrev}
        >
          ←
        </button>
        <Flashcard
          term={flashcards[currentIndex].term}
          definition={flashcards[currentIndex].definition}
          focused
        />
        <button
          className="absolute right-4 bg-[#E0E4F5] rounded-full p-3 shadow"
          onClick={handleNext}
        >
          →
        </button>
      </div>

        {/* Add New Flashcard Form */}
        {editing && (
            <div className="space-y-4">
            <h2 className="text-center text-2xl">Add a New Flashcard</h2>
            <div className="flex flex-col space-y-2">
                <input
                type="text"
                placeholder="Term"
                value={newTerm}
                onChange={(e) => setNewTerm(e.target.value)}
                className="p-2 rounded border border-gray-300"
                />
                <textarea
                placeholder="Definition"
                value={newDefinition}
                onChange={(e) => setNewDefinition(e.target.value)}
                className="p-2 rounded border border-gray-300"
                />
            </div>
            <button
                onClick={handleAddFlashcard}
                className="bg-[#D4DCFF] text-[#859AD4] px-4 py-2 rounded"
            >
                Add Flashcard
            </button>
            </div>
        )}

        {/* All Flashcards */}
        <div className="bg-[#E0E4F5] rounded-xl p-4">
            <h2 className="text-lg text-black mb-4">
            Flashcards ({flashcards.length})
            </h2>
            <div className="space-y-4">
                {flashcards.map((card, i) => (
                <div key={i} className="relative">
                    <FlashcardList term={card.term} definition={card.definition} />
                    {editing && (
                    <div className="absolute top-2 right-2 space-x-2">
                        {/* Add Button */}
                        <button
                        onClick={handleAddFlashcard}
                        className="bg-[#D4DCFF] text-[#859AD4] rounded-full p-3"
                        >
                        +
                        </button>
                        {/* Delete Button */}
                        <button
                        onClick={() => handleDeleteFlashcard(i)}
                        className="bg-[#D4DCFF] text-[#859AD4] rounded-full p-3"
                        >
                        -
                        </button>
                    </div>
                    )}
                </div>
                ))}
            </div>
        </div>
    </div>
    );
    }
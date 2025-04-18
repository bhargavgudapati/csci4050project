'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Flashcard, FlashcardList } from "../components/Flashcard";
import NavBar from '../components/NavBar';

interface FlashcardType {
  term: string;
  definition: string;
}

export default function FlashcardsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isNew = searchParams.get('new') === 'true';
  const queryTitle = searchParams.get('topic');
  const [title, setTitle] = useState(queryTitle || '');
  const [tempTitle, setTempTitle] = useState(queryTitle || ''); 
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newTerm, setNewTerm] = useState('');
  const [newDefinition, setNewDefinition] = useState('');
  const [editing, setEditing] = useState(isNew); // auto-edit mode if creating

  const toggleEditMode = () => setEditing(!editing);
  const handleAddFlashcard = async () => {
    if (newTerm && newDefinition && title) {
      const newCard = { term: newTerm, definition: newDefinition };
      setFlashcards([...flashcards, newCard]);
      setNewTerm('');
      setNewDefinition('');
  
      // POST to the API
      try {
        const response = await fetch('./api/flashcards', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            term: newCard.term,
            definition: newCard.definition,
            groupTitle: title,
            count: flashcards.length + 1,
          }),
        });
  
        const data = await response.json();
        if (!response.ok) {
          console.error('Failed to save flashcard:', data.message);
        }
      } catch (error) {
        console.error('Error adding flashcard:', error);
      }
    }
  };
  
  const handleDeleteFlashcard = (index: number) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleNext = () => setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));

  const handleTitleSubmit = () => {
    if (title.trim()) {
      router.push(`/flashcards?topic=${encodeURIComponent(title.trim())}`);
    }
  };
  
  useEffect(() => {
    const fetchFlashcards = async () => {
      if (title) {
        try {
          const response = await fetch(`/api/flashcards/${encodeURIComponent(title)}`);
          const data = await response.json();
          setFlashcards(data.items.map((card: any) => ({
            term: card.term,
            definition: card.definition,
          })));
        } catch (error) {
          console.error('Failed to fetch flashcards:', error);
        }
      }
    };
  
    fetchFlashcards();
  }, [title]);
  

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6"> 
        <div className="p-6 space-y-6">
          {!title ? (
          <div className="text-center space-y-4">
            <h1 className="text-2xl">Name Your New Set</h1>
            <input
              type="text"
              value={tempTitle} // use tempTitle here
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setTempTitle(e.target.value);
                }
              }}
              className="p-2 border rounded w-full max-w-md"
              placeholder="Enter set title (max 50 characters)"
            />
            <button
              onClick={() => {
                if (tempTitle.trim()) {
                  setTitle(tempTitle.trim()); // set title only on submit
                  router.push(`/flashcards?topic=${encodeURIComponent(tempTitle.trim())}`);
                }
              }}
              className="bg-[#D4DCFF] text-black px-4 py-2 rounded-full disabled:opacity-50"
              disabled={!tempTitle.trim()}
            >
              Save Title
            </button>
            </div>
          ) : (
            <>
              <h1 className="text-center text-3xl text-black">{title}</h1>

              <div className="flex justify-center">
                <button
                  onClick={toggleEditMode}
                  className="bg-[#D4DCFF] text-black px-4 py-2 rounded-full"
                >
                  {editing ? "Done" : "Edit"}
                </button>
              </div>

              {flashcards.length > 0 && (
                <div className="relative flex items-center justify-center">
                  <button className="absolute left-4 bg-[#E0E4F5] rounded-full p-3 shadow" onClick={handlePrev}>←</button>
                  <Flashcard
                    term={flashcards[currentIndex].term}
                    definition={flashcards[currentIndex].definition}
                    focused
                  />
                  <button className="absolute right-4 bg-[#E0E4F5] rounded-full p-3 shadow" onClick={handleNext}>→</button>
                </div>
              )}

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

              <div className="bg-[#E0E4F5] rounded-xl p-4">
                <h2 className="text-lg text-black mb-4">Flashcards ({flashcards.length})</h2>
                <div className="space-y-4">
                  {flashcards.map((card, i) => (
                    <div key={i} className="relative">
                      <FlashcardList term={card.term} definition={card.definition} />
                      {editing && (
                        <div className="absolute top-2 right-2 space-x-2">
                          <button onClick={handleAddFlashcard} className="bg-[#D4DCFF] text-[#859AD4] rounded-full p-3">+</button>
                          <button onClick={() => handleDeleteFlashcard(i)} className="bg-[#D4DCFF] text-[#859AD4] rounded-full p-3">-</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
    </main>
    </>
  );
}

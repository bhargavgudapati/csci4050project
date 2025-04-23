'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Flashcard, FlashcardList } from "../components/Flashcard";
import NavBar from '../components/NavBar';

interface FlashcardType {
  term: string;
  definition: string;
}

export default function FlashcardsStudyPage() {
  const searchParams = useSearchParams();
  const topic = searchParams.get('topic') || '';
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (topic) {
        try {
          const response = await fetch(`/api/flashcards/${encodeURIComponent(topic)}`);
          const data = await response.json();
          setFlashcards(data.items.map((card: any) => ({
            term: card.term,
            definition: card.definition,
          })));
        } catch (error) {
          console.error('Failed to load flashcards:', error);
        }
      }
    };

    fetchFlashcards();
  }, [topic]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < flashcards.length - 1 ? prev + 1 : prev));
  };

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6 space-y-6">
        {topic ? (
          <>
            <h1 className="text-3xl text-center text-black mt-12">{topic}</h1>
            
            {flashcards.length > 0 ? (
              <>
                <div className="relative flex items-center justify-center mt-8">
                  <button 
                    onClick={handlePrev} 
                    className="absolute left-100 bg-[#E0E4F5] hover:bg-[#D4DCFF] w-14 h-14 rounded-full shadow flex items-center justify-center text-3xl font-bold text-[#859AD4] transition-colors duration-200"
                  >
                    &lt;
                  </button>
                  <Flashcard
                    term={flashcards[currentIndex].term}
                    definition={flashcards[currentIndex].definition}
                    focused
                  />
                  <button 
                    onClick={handleNext} 
                    className="absolute right-100 bg-[#E0E4F5] hover:bg-[#D4DCFF] w-14 h-14 rounded-full shadow flex items-center justify-center text-3xl font-bold text-[#859AD4] transition-colors duration-200"
                  >
                    &gt;
                  </button>
                </div>

                {/* Flashcard list below current card */}
                <div className="bg-[#E0E4F5] rounded-xl p-4 mt-12">
                  <h2 className="text-lg text-black mb-4">Flashcards ({flashcards.length})</h2>
                  <div className="space-y-4">
                    {flashcards.map((card, i) => (
                      <div key={i} className="relative">
                        <FlashcardList term={card.term} definition={card.definition} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <p className="text-center text-gray-500 mt-8">No flashcards found for this set.</p>
            )}
          </>
        ) : (
          <p className="text-center text-gray-500">Please specify a topic in the URL.</p>
        )}
      </main>
    </>
  );
}
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import './SetList.css';
import NavBar from '../components/NavBar';
import { Search } from 'lucide-react';

interface FlashcardSet {
  groupTitle: string;
  count?: number;
}

interface GroupedFlashcards {
  _id: string;
  groupTitle: string;
  count: number;
  lastStudied: Date;
}

function formatLastStudied(date: Date): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  return diffDays <= 6
    ? `${diffDays} Day${diffDays !== 1 ? 's' : ''} Ago`
    : `${Math.round(diffDays / 7)} Week${Math.round(diffDays / 7) !== 1 ? 's' : ''} Ago`;
}

export default function SetList() {
  const router = useRouter();
  const [flashcardSets, setFlashcardSets] = useState<FlashcardSet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [titleInputVisible, setTitleInputVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  useEffect(() => {
    fetch('/api/flashcardSet')
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          setFlashcardSets(data.items);
        }
      });
  }, []);

  const handleCreateSet = async () => {
    if (!newTitle.trim()) return;

    const newSet = {
      count: 0,
      groupTitle: newTitle,
    };

    const res = await fetch('/api/flashcardSet', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newSet),
    });

    if (res.ok) {
      const refreshed = await fetch('/api/flashcardSet').then((r) => r.json());
      setFlashcardSets(refreshed.items);
      setNewTitle('');
      setTitleInputVisible(false);
    }
  };

  const handleTakeQuiz = (groupTitle: string) => {
    router.push(`/ale-page?setId=${encodeURIComponent(groupTitle)}`);
  };

  const handleStudySet = (groupTitle: string) => {
    router.push(`/flashcards?topic=${encodeURIComponent(groupTitle)}`);
  };

  const filteredSets = flashcardSets.filter((set) =>
    set.groupTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6">
        <div className="p-6 space-y-6">
          <div className="main">
            <div className="flex items-center justify-between mb-6">
              <h1 className="header-title">Your Topics</h1>
                <button
                  onClick={() => router.push('/flashcardsEdit')}
                  className="bg-[#D4DCFF] text-black px-6 py-3 rounded-full shadow hover:bg-[#c3d2ff]"
                >
                  ➕ Create New Set
              </button>
            </div>

            <div className="flex items-center justify-center mb-6 relative w-full max-w-md mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Topics..."
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-4">
              {filteredSets.map((set) => (
                <div key={set.groupTitle} className="p-4 border rounded-lg shadow bg-white">
                  <h2 className="text-lg font-semibold">{set.groupTitle}</h2>
                  <p className="text-sm text-gray-600">Terms: {set.count}</p>
                  <p className="text-xs text-gray-400 italic">
                    Last Studied: {formatLastStudied(new Date(set.lastStudied))}
                  </p>
                  <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleStudySet(set.groupTitle)}
                    className="bg-[#D4DCFF] text-black px-4 py-2 rounded-lg shadow hover:bg-[#c3d2ff] text-sm"
                  >
                    Study Set
                  </button>
                    <button
                      onClick={() => handleTakeQuiz(set.groupTitle)}
                      className="ml-2 bg-[#D4DCFF] text-black px-4 py-2 rounded-lg shadow hover:bg-[#c3d2ff] text-sm"
                    >
                      Take Quiz
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

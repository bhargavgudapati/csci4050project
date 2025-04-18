'use client';

import React, { useEffect, useState } from 'react';
import './SetList.css';
import NavBar from '../components/NavBar';
import { Search } from 'lucide-react';

interface FlashcardSet {
  _id: string;
  groupTitle: string;
  count: number;
  retrieve: string;
  createdAt?: string;
}

function formatLastStudied(date: Date): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  return diffDays <= 6
    ? `${diffDays} Day${diffDays !== 1 ? 's' : ''} Ago`
    : `${Math.round(diffDays / 7)} Week${Math.round(diffDays / 7) !== 1 ? 's' : ''} Ago`;
}

export default function SetList() {
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
                onClick={() => setTitleInputVisible(true)}
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

            {titleInputVisible && (
              <div className="mb-6 flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Enter new set title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border px-4 py-2 rounded w-full"
                />
                <button
                  onClick={handleCreateSet}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            )}

            <div className="grid gap-4">
              {filteredSets.map((set) => (
                <div key={set._id} className="p-4 border rounded-lg shadow bg-white">
                  <h2 className="text-lg font-semibold">{set.groupTitle}</h2>
                  <p className="text-sm text-gray-600">Terms: {set.count}</p>
                  {/* You can add a "last studied" placeholder if needed */}
                  <p className="text-xs text-gray-400 italic">
                    Last Studied: {formatLastStudied(new Date(set._id.toString().slice(0, 8) + '000'))}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

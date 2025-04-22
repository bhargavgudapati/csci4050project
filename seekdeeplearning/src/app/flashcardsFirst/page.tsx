'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavBar from '../components/NavBar';

export default function FlashcardsFirstPage() {
  const router = useRouter();
  const [tempTitle, setTempTitle] = useState('');
  const [titleInputVisible, setTitleInputVisible] = useState(false);

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6 h-screen">
        <div className="p-6 space-y-6 h-full">
          {!titleInputVisible && (
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-semibold">What would you like to do?</h1>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setTitleInputVisible(true)}
                  className="bg-[#D4DCFF] text-black px-6 py-3 rounded-full shadow hover:bg-[#c3d2ff]"
                >
                  ➕ Create New Flashcard Set
                </button>
                <button
                  onClick={() => router.push('/SetList')}
                  className="bg-[#E0E4F5] text-black px-6 py-3 rounded-full shadow hover:bg-[#d0d6e6]"
                >
                  📂 View Existing Sets
                </button>
              </div>
            </div>
          )}

          {titleInputVisible && (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <h1 className="text-4xl font-semibold text-center">Name Your New Set</h1>
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => {
                  if (e.target.value.length <= 50) {
                    setTempTitle(e.target.value);
                  }
                }}
                className="p-2 border rounded w-full max-w-md text-center"
                placeholder="Enter set title (max 50 characters)"
              />
              <button
                onClick={() => {
                  const trimmed = tempTitle.trim();
                  if (trimmed) {
                    router.push(`/flashcardsEdit?topic=${encodeURIComponent(trimmed)}`);
                  }
                }}
                className="bg-[#D4DCFF] text-black px-6 py-3 rounded-full shadow hover:bg-[#c3d2ff] disabled:opacity-50"
                disabled={!tempTitle.trim()}
              >
                Save Title
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

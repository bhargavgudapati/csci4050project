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
      <main className="ml-16 h-screen flex items-center justify-center p-6">
        {!titleInputVisible ? (
          <div className="flex w-full max-w-6xl justify-between items-center space-x-10">
            {/* Left Side - Greeting Text */}
            <div className="flex-1 text-left space-y-4">
              <h1 className="text-4xl font-extrabold">Hi there! Let’s get started!</h1>
              <p className="text-2xl font-semibold">Select an option!</p>
            </div>

            {/* Right Side - Buttons */}
            <div className="flex flex-col space-y-4 w-80">
              <button
                onClick={() => setTitleInputVisible(true)}
                className="bg-[#D4DCFF] text-black px-6 py-3 rounded-2xl shadow hover:bg-[#c3d2ff] font-medium w-full"
              >
                Create New Flashcard Set
              </button>
              <button
                onClick={() => router.push('/SetList')}
                className="bg-[#D4DCFF] text-black px-6 py-3 rounded-2xl shadow hover:bg-[#c3d2ff] font-medium w-full"
              >
                Select From Existing Sets
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full space-y-6 max-w-lg mx-auto">
            <h1 className="text-4xl font-semibold text-center">Name Your New Set</h1>
            <input
              type="text"
              value={tempTitle}
              onChange={(e) => {
                if (e.target.value.length <= 50) {
                  setTempTitle(e.target.value);
                }
              }}
              className="p-3 border rounded-xl w-full text-center text-lg"
              placeholder="Enter set title (max 50 characters)"
            />
            <button
              onClick={() => {
                const trimmed = tempTitle.trim();
                if (trimmed) {
                  router.push(`/flashcardsEdit?topic=${encodeURIComponent(trimmed)}`);
                }
              }}
              className="bg-[#D4DCFF] text-black px-6 py-3 rounded-2xl shadow hover:bg-[#c3d2ff] disabled:opacity-50 font-medium"
              disabled={!tempTitle.trim()}
            >
              Save Title
            </button>
          </div>
        )}
      </main>
    </>
  );
}

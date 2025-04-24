'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NavBar from './components/NavBar';

const HomePage = () => {
  const router = useRouter();

  return (
    <>
      <NavBar />
      <main className="ml-16 h-screen flex">
        {/* Left Section */}
        <div className="relative flex flex-col justify-center items-start bg-[#E0E4F5] w-1/2 px-16">
          <h1 className="text-6xl font-extrabold text-black leading-tight mb-6">
            WELCOME<br />TO<br />
            <span className="group">
              {'SEEKDEEPLEARNING'.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block transition-colors duration-300 group-hover:text-[#5D52E9]"
                >
                  {char}
                </span>
              ))}
            </span>
          </h1>

          <div className="mt-4">
            <img src="./Dolphin.png" alt="Dolphin" className="w-40 h-auto" />
          </div>

          {/* Vertical Purple Bar */}
          <div className="absolute top-0 right-0 h-full w-4 bg-[#5D52E9]" />
        </div>

        {/* Right Section */}
        <div className="flex flex-col justify-center items-center w-1/2 gap-10">
          <button
            className="bg-[#E0E4F5] text-black text-2xl font-semibold px-14 py-6 rounded-2xl shadow hover:bg-[#c3d2ff] transition"
            onClick={() => router.push('/flashcardsFirst')}
          >
            Flashcards
          </button>
          <button
            className="bg-[#E0E4F5] text-black text-2xl font-semibold px-14 py-6 rounded-2xl shadow hover:bg-[#c3d2ff] transition"
            onClick={() => router.push('/seekhoot/sh-player')}
          >
            SeekHoot
          </button>
          <button
            className="bg-[#E0E4F5] text-black text-2xl font-semibold px-14 py-6 rounded-2xl shadow hover:bg-[#c3d2ff] transition"
            onClick={() => router.push('/SetList')}
          >
            Study Sets
          </button>
        </div>
      </main>
    </>
  );
};

export default HomePage;
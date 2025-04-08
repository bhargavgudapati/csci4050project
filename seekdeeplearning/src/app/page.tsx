"use client";

import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
 
 const HomePage = () => {
   const router = useRouter(); // Initialize router
 
   const navigateToFlashcards = () => {
     router.push('/flashcards'); // Navigate to /flashcards page
   };

   const navigateToALEPage = () => {
      router.push('/ale-page'); // Navigate to /ale page
   };


   return (
    <div className="p-6 space-y-6">
      <h1 className="text-center text-3xl font-semibold text-black">
        Welcome to the Main Page!
      </h1>
      <button
        className="bg-[#E0E4F5] text-black p-4 rounded-xl shadow"
        onClick={navigateToFlashcards} // On button click, navigate to flashcards page
      >
        Go to Flashcards
      </button>
      <button
      className="bg-[#E0E4F5] text-black p-4 rounded-xl shadow"
      onClick={navigateToALEPage} // On button click, navigate to flashcards page
      >
        Go to ALE Page
      </button>
      </div>
   );
};
 
 export default HomePage;
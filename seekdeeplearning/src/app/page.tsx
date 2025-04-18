'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search } from 'lucide-react'; // <-- import Search icon
import NavBar from './components/NavBar';

const allSetTitles = [
  "CSCI 4050",
  "CSCI 4720",
  "STAT 4210",
  "PEDB 1930",
  "FHCE 3200"
];

const HomePage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTitles = allSetTitles.filter(title =>
    title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (title: string) => {
    setSearchTerm('');
    router.push(`/${title}`);
  };

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6">
        <div className="p-6 space-y-6">
          <h1 className="text-center text-4xl font-bold text-black">
            Welcome to SeekDeepLearning
          </h1>

          {/* Search Bar with Icon */}
          <div className="flex items-center justify-center mt-6 relative w-full max-w-md mx-auto">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search your SetList titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {/* Autocomplete Dropdown */}
              {searchTerm && (
                <ul className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-md shadow z-10">
                  {filteredTitles.length > 0 ? (
                    filteredTitles.map((title) => (
                      <li
                        key={title}
                        className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
                        onClick={() => handleSelect(title)}
                      >
                        {title}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-gray-400">No matches found</li>
                  )}
                </ul>
              )}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-6 flex-wrap">
            <button
              className="bg-[#E0E4F5] text-black px-6 py-3 rounded-xl shadow hover:bg-[#d7dced]"
              onClick={() => router.push('/flashcardsFirst')}
            >
              Go to Flashcards
            </button>
            <button
              className="bg-[#E0E4F5] text-black px-6 py-3 rounded-xl shadow hover:bg-[#d7dced]"
              onClick={() => router.push('/ale-page')}
            >
              Go to ALE Page
            </button>
            <button
              className="bg-[#E0E4F5] text-black px-6 py-3 rounded-xl shadow hover:bg-[#d7dced]"
              onClick={() => router.push('/SetList')}
            >
              Go to Set List
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HomePage;

'use client';

import React, { useState } from 'react';
import './SetList.css';
import NavBar from '../components/NavBar';
import { Search } from 'lucide-react'; // Adjust based on your icon setup

const topics = [
  { title: "CSCI 4050", terms: 50, lastStudied: new Date(Date.now() - 1 * 86400000) },
  { title: "CSCI 4720", terms: 20, lastStudied: new Date(Date.now() - 4 * 86400000) },
  { title: "STAT 4210", terms: 106, lastStudied: new Date(Date.now() - 6 * 86400000) },
  { title: "PEDB 1930", terms: 23, lastStudied: new Date(Date.now() - 28 * 86400000) },
  { title: "FHCE 3200", terms: 47, lastStudied: new Date(Date.now() - 49 * 86400000) },
];

function formatLastStudied(date: Date): string {
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);
  return diffDays <= 6
    ? `${diffDays} Day${diffDays !== 1 ? 's' : ''} Ago`
    : `${Math.round(diffDays / 7)} Week${Math.round(diffDays / 7) !== 1 ? 's' : ''} Ago`;
}

export default function SetList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [titleInputVisible, setTitleInputVisible] = useState(false);

  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6">
        <div className="p-6 space-y-6">
          <div className="main">
            <div className="header">
            </div>

            {/* Create New Flashcard Set Button */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="header-title">Your Topics</h1>
              <button
                onClick={() => setTitleInputVisible(true)}
                className="bg-[#D4DCFF] text-black px-6 py-3 rounded-full shadow hover:bg-[#c3d2ff]"
              >
                ➕ Create New Set
              </button>
            </div>


            {/* Search Bar with Icon */}
            <div className="flex items-center justify-center mb-6 relative w-full max-w-md mx-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for flashcard sets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Topic List */}
            <div className="topic-list">
              {filteredTopics.map((topic, index) => (
                <a key={index} href={'/' + topic.title}>
                  <div className="topic-card">
                    <span className="topic-title">{topic.title}</span>
                    <div className="topic-meta">
                      <div>{topic.terms} Terms</div>
                      <div className="topic-meta-italic">
                        Last Studied: {formatLastStudied(topic.lastStudied)}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

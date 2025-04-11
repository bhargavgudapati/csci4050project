import React from 'react';

// Define your topics with actual Date objects
const topics = [
  { title: "CSCI 4050", terms: 50, lastStudied: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },  // 1 day ago
  { title: "CSCI 4720", terms: 20, lastStudied: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },  // 4 days ago
  { title: "STAT 4210", terms: 106, lastStudied: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) }, // 6 days ago
  { title: "PEDB 1930", terms: 23, lastStudied: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000) }, // 4 weeks ago
  { title: "FHCE 3200", terms: 47, lastStudied: new Date(Date.now() - 49 * 24 * 60 * 60 * 1000) }, // 7 weeks ago
];

// Helper to compute human-readable text
function formatLastStudied(date: Date): string {
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays <= 6) {
    return `${diffDays} Day${diffDays !== 1 ? 's' : ''} Ago`;
  } else {
    const weeks = Math.round(diffDays / 7);
    return `${weeks} Week${weeks !== 1 ? 's' : ''} Ago`;
  }
}

export default function SetList() {
  return (
    <div className="flex h-screen bg-black p-1">
      <div className="w-16 bg-white flex flex-col items-center py-4">
        <div className="w-10 h-10 rounded-full bg-indigo-400" />
      </div>

      <div className="flex-1 bg-white rounded-md p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-black">Your Topics</h1>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-300 rounded-xl p-4 shadow"
            >
              <span className="text-lg font-medium text-black">{topic.title}</span>
              <div className="text-right text-sm text-black">
                <div>{topic.terms} Terms</div>
                <div className="italic">
                  Last Studied: {formatLastStudied(topic.lastStudied)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import './SetList.css';
import NavBar from '../components/NavBar';

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
  return (
    <>
    <NavBar />
    <main className="ml-16 p-6">
      <div className="p-6 space-y-6">
          <div className="main">
            <div className="header">
              <h1 className="header-title">Your Topics</h1>
            </div>

            <div className="topic-list">
              {topics.map((topic, index) => (
                <a href={'/' + topic.title}>
                  <div key={index} className="topic-card">
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

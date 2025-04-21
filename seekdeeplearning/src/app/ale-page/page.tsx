"use client";

import React, { useState, useEffect } from "react";
import QuestionCard from "../components/ale-page/QuestionCard"; // Adjust path based on folder structure
import Button from "../components/ale-page/Button"; // Adjust path based on folder structure
import NavBar from "../components/NavBar";

interface QuestionType {
  term: string;
  definition: string;
}

function ALEPage() {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Use hardcoded sample data
  useEffect(() => {
    const sampleQuestions: QuestionType[] = [
      { term: "Term 1", definition: "Definition of Term 1" },
      { term: "Term 2", definition: "Definition of Term 2" },
      { term: "Term 3", definition: "Definition of Term 3" },
      { term: "Term 4", definition: "Definition of Term 4" },
    ];

    setQuestions(sampleQuestions);

    // Shuffle questions and answers
    const shuffled = sampleQuestions.map((q) => {
      const shuffledAnswers = [...sampleQuestions]
        .map((item) => item.term)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3); // Pick 3 random terms
      shuffledAnswers.push(q.term); // Add the correct answer
      return {
        ...q,
        answers: shuffledAnswers.sort(() => Math.random() - 0.5), // Shuffle answers
      };
    }).sort(() => Math.random() - 0.5); // Shuffle questions

    setShuffledQuestions(shuffled);
  }, []);

  const handleNextQuestion = () => {
    if (selectedAnswer === shuffledQuestions[currentQuestion].term) {
      setScore(score + 1);
    }
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer for the next question
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null); // Reset selected answer for the previous question
    }
  };

  if (shuffledQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold text-center">ALE Quiz</h1>
            <p className="text-center text-lg font-medium">Score: {score}</p>
            <div>
              <QuestionCard
                question={shuffledQuestions[currentQuestion].definition} // Show the definition
                answers={shuffledQuestions[currentQuestion].answers} // Show the randomized terms
                selectedAnswer={selectedAnswer}
                onAnswerSelect={setSelectedAnswer}
              />
            </div>
            <div className="flex justify-between mt-6">
              <Button
                label="Previous Question"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion <= 0}
                className="bg-[#E0E4F5] text-black px-6 py-3 rounded-full shadow hover:bg-[#d0d6e6] disabled:opacity-50"
              />
              <Button
                label="Next Question"
                onClick={handleNextQuestion}
                disabled={currentQuestion >= shuffledQuestions.length - 1}
                className="bg-[#D4DCFF] text-black px-6 py-3 rounded-full shadow hover:bg-[#c3d2ff] disabled:opacity-50"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ALEPage;

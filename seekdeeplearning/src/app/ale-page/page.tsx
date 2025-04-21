"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import QuestionCard from "../components/ale-page/QuestionCard"; // Adjust path if needed
import Button from "../components/ale-page/Button"; // Adjust path if needed
import NavBar from "../components/NavBar";

interface QuizQuestion {
  id: string;
  definition: string;
  options: string[];
  correctAnswer: string;
}

function ALEPage() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("setId"); // Get the setId from the URL query parameters
  const router = useRouter();

  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      if (!setId) {
        console.error("setId is missing in the URL");
        return;
      }

      try {
        const response = await fetch(`/api/ale-page?setId=${encodeURIComponent(setId)}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('No questions available for this set');
        }

        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [setId]);

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return; // Prevent changing the answer after selection

    setSelectedAnswer(answer);
    const isCorrect = answer === questions[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsAnswerCorrect(null);
    }
  };

  const handleFinishQuiz = () => {
    router.push('/SetList'); // Adjust the path if your SetList page has a different route
  };

  if (loading) {
    return (
      <>
        <NavBar />
        <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">Loading quiz questions...</p>
          </div>
        </main>
      </>
    );
  }

  if (!setId) {
    return (
      <>
        <NavBar />
        <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-red-600">Error: No quiz set selected</p>
          </div>
        </main>
      </>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <>
        <NavBar />
        <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl">No questions available for this set.</p>
          </div>
        </main>
      </>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <>
        <NavBar />
        <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-red-600">Error: Question not found</p>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <main className="ml-16 p-6 h-screen bg-[#F9FAFB]">
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4">
            <h1 className="text-3xl font-bold text-center">Quiz</h1>
            <p className="text-center text-lg font-medium">Score: {score}</p>
            <QuestionCard
              question={currentQuestion.definition}
              answers={currentQuestion.options}
              selectedAnswer={selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
            />
            {selectedAnswer && (
              <p
                className={`text-center text-lg font-medium ${
                  isAnswerCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isAnswerCorrect ? "Correct!" : "Incorrect!"}
              </p>
            )}
            <div className="flex justify-between mt-6">
              <Button
                label="Next Question"
                onClick={handleNextQuestion}
                disabled={!selectedAnswer || currentQuestionIndex >= questions.length - 1}
              />
              {selectedAnswer && currentQuestionIndex >= questions.length - 1 && (
                <Button
                  label="Finish Quiz"
                  onClick={handleFinishQuiz}
                  className="bg-green-500 hover:bg-green-600"
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ALEPage;

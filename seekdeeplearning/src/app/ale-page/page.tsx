"use client";

import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard'; // Adjust path based on folder structure
import Button from '../components/Button'; // Adjusted path based on folder structure
import questions from './questions'; // Local question data

function ALEPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
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

    return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-white text-black mg-4 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4">
            <h1 className="font-bold">ALE Quiz</h1>
            <div>
                <QuestionCard
                question={questions[currentQuestion].question}
                answers={questions[currentQuestion].answers}
                selectedAnswer={selectedAnswer}
                onAnswerSelect={setSelectedAnswer}
                />
            </div>
            <div className="flex flex-row justify-between p-4 mt-4 rounded-lg shadow-lg space-x-8">
                <Button
                label="Previous Question"
                onClick={handlePreviousQuestion}
                disabled={currentQuestion <= 0}
                />
                <Button
                label="Next Question"
                onClick={handleNextQuestion}
                disabled={currentQuestion >= questions.length - 1}
                />
            </div>
        </div>
    </div>
    );
}

export default ALEPage;

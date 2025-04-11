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
        if (currentQuestion >= 0) {
            setCurrentQuestion(currentQuestion - 1);
            setSelectedAnswer(null); // Reset selected answer for the next question
        }
    };

    return (
    <div className="p-6 space-y-6">
        <h1 className="text-center text-3xl text-black">ALE Quiz</h1>
        {/*<div className="flex flex-col items-center justify-center h-screen p-4 rounded-lg shadow">*/}
                <div className="w-[600px] mx-auto">
                    <QuestionCard
                        question={questions[currentQuestion].question}
                        answers={questions[currentQuestion].answers}
                        selectedAnswer={selectedAnswer}
                        onAnswerSelect={setSelectedAnswer}
                    />
                </div>
                <div className="flex justify-between mt-4 p-4">
                    <div className="text-blue-900 mt-4 max-w-md bg-white p-4 rounded-lg shadow">
                        <Button
                        label="Previous"
                        onClick={handlePreviousQuestion}
                        disabled={currentQuestion == 0}
                        />
                    </div>
                    <div className="text-blue-900 mt-4 max-w-md bg-white p-4 rounded-lg shadow">
                        <Button
                        label="Next"
                        onClick={handleNextQuestion}
                        disabled={currentQuestion >= questions.length - 1}
                        />
                    </div>
            {/*</div>*/}
        </div>
    </div>
    );
}

export default ALEPage;

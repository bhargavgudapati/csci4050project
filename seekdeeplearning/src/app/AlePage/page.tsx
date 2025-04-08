"use client";

import React, { useState } from 'react';
import QuestionCard from '../components/QuestionCard'; // Adjust path based on folder structure
import Button from '../components/Button'; // Adjusted path based on folder structure
import questions from './questions'; // Local question data
import './ALEPage.css';

function ALEPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

    const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null); // Reset selected answer for the next question
    }
    };

    return (
    <div className="ale-page">
        <h1>ALE Quiz</h1>
        <QuestionCard
        question={questions[currentQuestion].question}
        answers={questions[currentQuestion].answers}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
        />
        <Button
        label="Next Question"
        onClick={handleNextQuestion}
        disabled={currentQuestion >= questions.length - 1}
        />
    </div>
    );
}

export default ALEPage;

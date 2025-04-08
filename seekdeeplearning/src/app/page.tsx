 import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import questions from './data/questions';
import './App.css'; // Optional global styles

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <QuestionCard
        question={questions[currentQuestion].question}
        answers={questions[currentQuestion].answers}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={setSelectedAnswer}
      />
      <button onClick={() => setCurrentQuestion(currentQuestion + 1)} disabled={currentQuestion >= questions.length - 1}>
        Next Question
      </button>
    </div>
  );
}

export default App;
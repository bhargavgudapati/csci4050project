
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/seekhoot/hostbody.module.css';
import Question from '@/app/components/seekhoot/question';
import Answers from '@/app/components/seekhoot/answers';
import PlayerRankings from '@/app/components/seekhoot/playerrankings';

interface playerAndAnswer {
    playerName: string,
    playerID: string,
    answer: string,
    score: number,
    answercorrect: boolean
    gotresponse: boolean
}

interface seekhootquestion {
    question: string,
    correctAnswer: string,
    wronganswer1: string,
    wronganswer2: string,
    wronganswer3: string
}

interface params {
    elements: seekhootquestion[],
    setState: (arg0: string) => void,
    state: string,
    sendResultsHandler: (arg0: string, arg1: any) => void,
    currentCorrectAnswer: (arg0: string) => void,
    sendOffAnswers: () => void,
    resetPlayerAnswers: () => void
    players: playerAndAnswer[]
}

type letterchoices = ("a" | "b" | "c" | "d");

const HostBody: React.FC<params> = ({ elements, setState, state, sendResultsHandler, currentCorrectAnswer, sendOffAnswers, resetPlayerAnswers, players}) => {
    const [poppedElement, setPoppedElement] = useState<boolean>(false);
    const letters:  letterchoices[] = ["a", "b", "c", "d"];
    const [rightLetter, setRightLetter] = useState<letterchoices | null>(null);
    
    //showplayers, showquestion, allowanswers, showanswer, showrank, showfinalrank
    if (state == "showplayers") {
	const onclick = () => {
	    setState("showquestion");
	    setPoppedElement(false);
	    sendResultsHandler("readques", "");
	    resetPlayerAnswers();
	}
	return (
	    <div>
		<button onClick={onclick}>go to first question...</button>
	    </div>
	);
    } else if (state == "showquestion") {
	let currentquestion = elements.at(-1) || null;

	const onclick = () => {
	    sendResultsHandler("answerques", "");
	    setState("allowanswers");
	    const x = letters[Math.floor(Math.random() * letters.length)];
	    setRightLetter(x);
	    currentCorrectAnswer(x);
	}
	
	return (
	    <div>
		<Question inputQuestion={currentquestion?.question || ""} />
		<button onClick={onclick}>move on...</button>
	    </div>
	);
    } else if (state == "allowanswers") {
	let currentquestion = elements.at(-1) || null;

	const onclick = () => {
	    setState("showanswer");
	    sendOffAnswers();
	}
	
	return (
	    <div>
		<Question inputQuestion={currentquestion?.question || ""} />
		<Answers correctAnswer={currentquestion?.correctAnswer || ""} wronganswer1={currentquestion?.wronganswer1 || ""}
		    wronganswer3={currentquestion?.wronganswer3 || ""} wronganswer2={currentquestion?.wronganswer2 || ""} rightLetter={rightLetter || null} highlightAnswer={false} />
		<button onClick={onclick}>show answer...</button>
	    </div>
	);
    } else if (state == "showanswer") {
	let currentquestion: seekhootquestion | null = elements.at(-1) || null;

	if (currentquestion == null) {
	    setState("showfinalrank");
	}
	const onclick = () => {
	    setState("showrank");
	}

	return (
	    <div>
		<Question inputQuestion={currentquestion?.question || ""} />
		<Answers correctAnswer={currentquestion?.correctAnswer || ""} wronganswer1={currentquestion?.wronganswer1 || ""}
		    wronganswer3={currentquestion?.wronganswer3 || ""} wronganswer2={currentquestion?.wronganswer2 || ""} rightLetter={rightLetter || null} highlightAnswer={true} />
		<button onClick={onclick}>show the scores</button>
	    </div>
	);
    } else if (state == "showrank") {
	if (!poppedElement) {
	    elements.pop();
	    setPoppedElement(true);
	}

	const onclick = () => {
	    if (elements.length > 0) {
		setState("showquestion");
		sendResultsHandler("readques", "");
		setPoppedElement(false);
		resetPlayerAnswers();
	    } else {
		setState("getfinalrank");
	    }
	}
	return (
	    <div>
		<span>here are the scores</span>
		<PlayerRankings players={players} />
		<button onClick={onclick}>go to next question</button>
	    </div>
	);
    } else if (state == "getfinalrank") {
	return (
	    <div>
		<span>the quiz is done</span>
	    </div>
	);
    } else {
	return (
	    <div>
		<span>loading</span>
	    </div>
	);
    }
}

export default HostBody;

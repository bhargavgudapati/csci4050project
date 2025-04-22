
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

type letterchoices = ("a" | "b" | "c" | "d");

interface params {
    elements: seekhootquestion[],
    setPoint: (arg0: string) => void,
    state: string,
    sendResultsHandler: (arg0: string, arg1: any) => void,
    sendOffAnswers: () => void,
    resetPlayerAnswers: () => void
    players: playerAndAnswer[],
    rightLetter: letterchoices
}

const HostBody: React.FC<params> = ({ elements, setPoint, state, sendResultsHandler, sendOffAnswers, resetPlayerAnswers, players, rightLetter }) => {
    const [poppedElement, setPoppedElement] = useState<boolean>(false);
    
    //showplayers, showquestion, allowanswers, showanswer, showrank, showfinalrank
    if (state == "showplayers") {
	const onclick = () => {
	    setPoint("showquestion");
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
	    setPoint("allowanswers");
	    sendResultsHandler("answerques", "");
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
	    setPoint("showanswer");
	    sendOffAnswers();
	}
	
	return (
	    <div>
		<Question inputQuestion={currentquestion?.question || ""} />
		<Answers correctAnswer={currentquestion?.correctAnswer || ""} wronganswer1={currentquestion?.wronganswer1 || ""}
		    wronganswer3={currentquestion?.wronganswer3 || ""} wronganswer2={currentquestion?.wronganswer2 || ""} rightLetter={rightLetter} highlightAnswer={false} />
		<button onClick={onclick}>show answer...</button>
	    </div>
	);
    } else if (state == "showanswer") {
	let currentquestion: seekhootquestion | null = elements.at(-1) || null;

	if (currentquestion == null) {
	    setPoint("showfinalrank");
	}
	const onclick = () => {
	    setPoint("showrank");
	}

	return (
	    <div>
		<Question inputQuestion={currentquestion?.question || ""} />
		<Answers correctAnswer={currentquestion?.correctAnswer || ""} wronganswer1={currentquestion?.wronganswer1 || ""}
		    wronganswer3={currentquestion?.wronganswer3 || ""} wronganswer2={currentquestion?.wronganswer2 || ""} rightLetter={rightLetter == "a" ? "a" :
			(rightLetter == "b" ? "b" : (rightLetter == "c" ? "c" : (rightLetter == "d" ? "d" : null)))} highlightAnswer={true} />
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
		setPoint("showquestion");
		sendResultsHandler("readques", "");
		setPoppedElement(false);
		resetPlayerAnswers();
	    } else {
		setPoint("getfinalrank");
	    }
	}
	return (
	    <div>
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
	    </div>
	);
    }
}

export default HostBody;

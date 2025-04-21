
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/seekhoot/hostbody.module.css';
import { socket } from "@/socket";

interface playerAndAnswer {
    playerName: string,
    playerID: string,
    answer: string | null
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
    joinedroom: boolean
}

const HostBody: React.FC<params> = ({ elements, setState, state, joinedroom }) => {
    const [poppedElement, setPoppedElement] = useState<boolean>(false);
    
    //showplayers, showquestion, allowanswers, showanswer, showrank, showfinalrank
    if (state == "showplayers") {
	const onclick = () => {
	    setState("showquestion");
	    setPoppedElement(false);
	}
	return (
	    <div>
		<button onClick={onclick}>go to first question...</button>
	    </div>
	);
    } else if (state == "showquestion") {
	let currentquestion = elements.at(-1) || null;

	const onclick = () => {
	    setState("allowanswers");
	}
	
	return (
	    <div>
		<div>{currentquestion?.question}</div>
		<button onClick={onclick}>move on...</button>
	    </div>
	);
    } else if (state == "allowanswers") {
	let currentquestion = elements.at(-1) || null;

	const onclick = () => {
	    setState("showanswer");
	}
	
	return (
	    <div>
		<div>{currentquestion?.question}</div>
		<div>{currentquestion?.correctAnswer}</div>
		<div>{currentquestion?.wronganswer1}</div>
		<div>{currentquestion?.wronganswer2}</div>
		<div>{currentquestion?.wronganswer3}</div>
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
		<span>the answer was {currentquestion?.correctAnswer}</span>
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
		setPoppedElement(false);
	    } else {
		setState("getfinalrank");
	    }
	}
	return (
	    <div>
		<span>here are the scores</span>
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

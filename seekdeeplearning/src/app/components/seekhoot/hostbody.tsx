
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/seekhoot/hostbody.module.css';

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
    gotElements: boolean
}

const HostBody: React.FC<params> = ({ elements, setState, state, gotElements }) => {
    //showplayers, showquestion, allowanswers, showanswer, showrank, showfinalrank
    if (state == "showplayers") {
	const onclick = () => {
	    setState("showquestion")
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
	let currentquestion: seekhootquestion = elements.at(-1);

	const onclick = () => {
	    setState("showscore");
	}

	return (
	    <div>
		<span>the answer was {currentquestion.correctAnswer}</span>
		<button onClick={onclick}>show the scores</button>
	    </div>
	);
    } else if (state == "showscore") {
	elements.pop();

	const onclick = () => {
	    setState("showquestion");
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

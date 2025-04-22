
import React, { useState, useEffect } from 'react';
import styles from '@/app/components/seekhoot/answers.module.css';

type letterchoices = ("a" | "b" | "c" | "d");

interface params {
    correctAnswer: string,
    wronganswer1: string,
    wronganswer2: string,
    wronganswer3: string,
    rightLetter: letterchoices | null,
    highlightAnswer: boolean
}

interface answerAndLetter {
    answer: string,
    letter: letterchoices
}

const Answers: React.FC<params> = ({ correctAnswer, wronganswer1, wronganswer2, wronganswer3, rightLetter, highlightAnswer}) => {
    
    const wrongAnswers: string[] = [wronganswer1, wronganswer2, wronganswer3];

    if (rightLetter != null) {
	const answersAndLetters: answerAndLetter[] = [
	    {
		answer: rightLetter == "a" ? correctAnswer : (wrongAnswers.pop() || ""),
		letter: "a",
	    },
	    {
		answer: rightLetter == "b" ? correctAnswer : (wrongAnswers.pop() || ""),
		letter: "b"
	    },
	    {
		answer: rightLetter == "c" ? correctAnswer : (wrongAnswers.pop() || ""),
		letter: "c"
	    },
	    {
		answer: rightLetter == "d" ? correctAnswer : (wrongAnswers.pop() || ""),
		letter: "d"
	    }
	];
	
	return (
	    <div className={styles.choicegrid}>
		{answersAndLetters.map((x, index) => {
		    return (
			<div key={index} className={styles.answerboxes + " " + ((highlightAnswer && x.letter == rightLetter) ? styles.greenback : styles.greyback)}>
			    <p className={styles.answers}><b>{x.letter}</b> {x.answer}</p>
			</div>
		    );
		})}
	    </div>
	);
    } else {
	return (
	    <div>
	    </div>
	);
    }
}

export default Answers;

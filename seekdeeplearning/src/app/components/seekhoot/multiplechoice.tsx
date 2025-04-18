
"use client";

import styles from './multiplechoice.module.css';

interface params {
    answerHook: (arg0: string) => void
}

const MultipleChoiceSelector: React.FC<params> = ({ answerHook }) => {

    const onpressA = () => {
	answerHook("a");
    }

    const onpressB = () => {
	answerHook("b");
    }
    
    const onpressC = () => {
	answerHook("c");
    }
    
    const onpressD = () => {
	answerHook("d");
    }
    
    return (
	<div className={styles.buttonholder}>
	    <button className={styles.button27} onClick={onpressA}>A</button>
	    <button className={styles.button27} onClick={onpressB}>B</button>
	    <button className={styles.button27} onClick={onpressC}>C</button>
	    <button className={styles.button27} onClick={onpressD}>D</button>
	</div>
    );
}

export default MultipleChoiceSelector;

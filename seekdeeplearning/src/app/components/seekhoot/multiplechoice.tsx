
"use client";

import styles from './multiplechoice.module.css';

interface params {
    answerHook: (arg0: string) => void,
    setStateHook: (arg0: string) => void
}

const MultipleChoiceSelector: React.FC<params> = ({ answerHook, setStateHook }) => {

    const setPlayerState = () => {
	setStateHook("waitforresult");
    }

    const onpressA = () => {
	answerHook("a");
	setPlayerState();
    }

    const onpressB = () => {
	answerHook("b");
	setPlayerState();
    }
    
    const onpressC = () => {
	answerHook("c");
	setPlayerState();
    }
    
    const onpressD = () => {
	answerHook("d");
	setPlayerState();
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

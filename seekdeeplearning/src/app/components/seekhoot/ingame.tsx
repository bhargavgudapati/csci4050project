
import React from 'react';
import styles from '@/app/components/seekhoot/ingame.module.css';

interface params {
    state: "waitforstart" | "seeboard" | "waitforscore" | "getscore"
    score?: number,
    correct?: boolean
}

const InGame: React.FC<params> = ({ state, score, correct }) => {
    if (state == "waitforstart") {
	return (
	    <div>
		<div className={styles.wholeform}><p className={styles.text}><b>you are in the game</b></p></div>
		<div className={styles.wholeform}>
		    <div><p>wait for the instructor to continue</p></div>
		</div>
	    </div>
	);
    } else if (state == "seeboard") {
	return (
	    <div className={styles.wholeform}>
		<p className={styles.text}><b>read the question on the board</b></p>
	    </div>
	);
    } else if (state == "waitforscore") {
	return (
	    <div>
		<div className={styles.wholeform}><p className={styles.text}><b>Answered...</b></p></div>
		<div className={styles.wholeform}>
		    <div><p>did you get it right?</p></div>
		</div>
	    </div>
	);
    } else if (state == "getscore") {
	return (
	    <div>
		<div className={correct ? styles.greenback : styles.redback}>
		    <div className={styles.wholeform}>
			<p className={styles.text}><b>{correct ? "correct!" : "wrong!"}</b></p>
		    </div>
		    <div className={styles.wholeform}>
			<p>your score: {score}</p>
		    </div>
		</div>
	    </div>
	);
    }
}

export default InGame;


import React, { useState, useEffect } from 'react';
import styles from '@/app/components/seekhoot/playerrankings.module.css';

interface playerAndAnswer {
    playerName: string,
    playerID: string,
    answer: string,
    score: number,
    answercorrect: boolean
    gotresponse: boolean
}

interface params {
    players: playerAndAnswer[]
}

const PlayerRankings: React.FC<params> = ({ players }) => {
    
    return (
	<div>
	    <div className={styles.miniheaderbox}>
		<p className={styles.miniheader}>scores...</p>
	    </div>
	    <div className={styles.playersbox}>
		{players.map((x, index) => {
			return (
			    <div className={styles.playerbox} key={index}>
				<p className={styles.playertext}>{x.playerName}</p><p className={styles.playertext}>{x.score}</p>
			    </div>
			);
		    })}
	    </div>
	</div>
    );
}

export default PlayerRankings;

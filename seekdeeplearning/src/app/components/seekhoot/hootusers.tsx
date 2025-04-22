
import React from 'react';
import styles from './hootusers.module.css';

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

const HootUsers: React.FC<params> = ({ players }) => {
    return (
	<div className={styles.userlist}>
	    {players.map((x, index) => {
		return (
		    <div key={index}>
			<span>{x.playerName} {x.gotresponse ? "responded" : ""}</span>
		    </div>
		);
	    })}
	</div>
    )
}

export default HootUsers;

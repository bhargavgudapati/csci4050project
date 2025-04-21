
import React from 'react';
import styles from './hootusers.module.css';

interface playerAndAnswer {
    playerID: string,
    playerName: string,
    answer: string | null
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
			<span>{x.playerName}</span>
		    </div>
		);
	    })}
	</div>
    )
}

export default HootUsers;

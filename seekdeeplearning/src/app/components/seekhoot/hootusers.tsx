
import React from 'react';
import styles from './hootusers.module.css';

interface playerAndAnswer {
    playerName: string,
    playerID: string,
    answer: string,
    score: number,
    answercorrect: boolean,
    gotresponse: boolean,
    setresponse: boolean
}

interface params {
    players: playerAndAnswer[],
    roomcode: string
}

const HootUsers: React.FC<params> = ({ players, roomcode }) => {
    return (
	<div className={styles.hootusers}>
	    <p className={styles.miniheader}>room number: {roomcode}</p>
	    <p className={styles.miniheader}><b>current players...</b></p>
	    <div className={styles.userlist}>
		{players.map((x, index) => {
		    return (
			<div key={index} className={x.setresponse ? styles.green : styles.clear}>
			    <span className={styles.user}>{x.playerName}</span>
			</div>
		    );
		})}
	    </div>
	</div>
		  )
}

export default HootUsers;

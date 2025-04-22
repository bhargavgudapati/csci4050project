
import React, { useState } from 'react';
import styles from '@/app/components/seekhoot/nameentry.module.css';

interface params {
    setName: (arg0: string) => void,
    onSubmit: () => void,
    roomcode: string
}

const NameEntry: React.FC<params> = ({ setName, onSubmit, roomcode }) => {
    return (
	<div>
	    <p className={styles.headertext}><b>you are in room {roomcode}</b></p>
	    <div className={styles.wholeform}>
		<div className={styles.joinbox}>
		    <input className={styles.joininput} onChange={e => setName(e.target.value)} placeholder="enter name here"></input>
		    <button className={styles.joinbutton} onClick={onSubmit}>confirm name</button>
		</div>
	    </div>
	</div>
    );
}

export default NameEntry;


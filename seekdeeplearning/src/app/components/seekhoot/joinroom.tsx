
"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styles from './joinroom.module.css';

const JoinRoom: React.FC<{}> = () => {
    const router = useRouter();
    
    const [roomcode, setRoomcode] = useState<string>("");
    const [errorText, setErrorText] = useState<string>("");
    const [errorColor, setErrorColor] = useState<string>("");

    const onClick = async () => {
	if (roomcode != "") {
	    setErrorColor(styles.blackError);
	    setErrorText("loading");
	    const response = await fetch("/api/shinstance/" + roomcode, {
		method: "GET",
		headers: {
		    'Content-Type': 'application/json'
		}
	    });
	    let { item } = await response.json();
	    console.log(item);
	    if (item == null) {
		setErrorText("that room doesnt exist");
		setErrorColor(styles.redError);
	    } else {
		setErrorColor(styles.blackError);
		setErrorText("taking you to your room...");
		router.push("/seekhoot/sh-player/" + roomcode);
	    }
	}
    }
    
    return (
	<div>
	    <h1 className={styles.prompt}><b>Enter a roomcode below to join a SeekHoot</b></h1>
	    <div className={styles.wholeform}>
		<div className={styles.joinbox}>
		    <input className={styles.joininput} placeholder="enter room number" onChange={e => setRoomcode(e.target.value)} />
		    <button className={styles.joinbutton} onClick={onClick}>enter room</button>
		    <h2 className={errorColor + " " + styles.errorText}>{errorText}</h2>
		</div>
	    </div>
	</div>
    );
}

export default JoinRoom;


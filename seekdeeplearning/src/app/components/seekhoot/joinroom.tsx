
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
		<div className={styles.container}>
		  <div className={styles.card}>
			<h1 className={styles.title}>
			  Enter a room code to <br /> join a <span>SeekHoot</span> lobby!
			</h1>
			<div className={styles.formRow}>
			  <input
				className={styles.joininput}
				placeholder="Enter a room code"
				onChange={(e) => setRoomcode(e.target.value)}
			  />
			  <button className={styles.joinbutton} onClick={onClick}>
				Join room
			  </button>
			</div>
			<h2 className={`${styles.errorText} ${errorColor}`}>{errorText}</h2>
		  </div>
		</div>
	  );
	};

export default JoinRoom;


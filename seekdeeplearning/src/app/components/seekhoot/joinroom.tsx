
"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styles from './joinroom.module.css';

const JoinRoom: React.FC<{}> = () => {
    const router = useRouter();
    
    const [roomcode, setRoomcode] = useState<string>("");
    
    const changeRoom = () => {
	router.push("/seekhoot/sh-player/" + roomcode);
    }
    
    return (
	<div>
	    <input placeholder="enter room number" onChange={e => setRoomcode(e.target.value)} />
	    <button className={styles.button7} onClick={changeRoom}>enter room</button>
	</div>
    );
}

export default JoinRoom;


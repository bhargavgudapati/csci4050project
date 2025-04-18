
"use client"

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { socket } from '@/socket';
import Seekhootjoin from "@/app/components/seekhoot/seekhootjoin";
import HootUser from "@/app/components/seekhoot/hootusers";

export default function seekhoot() {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [counter, setCounter] = useState<number>(0);
    const [newRoom, setNewRoom] = useState<string>("");
    const router = useRouter();

    useEffect(() => {
	const onConnect = () => {
	    setIsConnected(true);
	    setTransport(socket.io.engine.transport.name);
	    socket.io.engine.on("upgrade", (newtransport) => {
		setTransport(newtransport.name);
	    });
	}

	const onDisconnect = () => {
	    setIsConnected(false);
	    setTransport("N/A");
	}
	
	if (socket.connected) {
	    onConnect();
	}

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	socket.on("number", (input) => {
	    setCounter(input);
	});

	return () => {
	    socket.off("connect", onConnect);
	    socket.off("disconnect", onDisconnect);
	};
	
    }, []);

    const onClick = () => {
	const x = counter + 1;
	setCounter(x);
	socket.emit("number", x);
    }

    const onChangeRoom = () => {
	socket.emit("joinroom", newRoom);
    }
    
    return (
	<div>
	    <Seekhootjoin qrcodeURL={"https://i.imgur.com/jYjaWdX.png"} />
	    <h1>this is page</h1>
	    <div>
		<p>Status: {isConnected ? "connected" : "disconnected"}</p>
		<p>Transport: {transport}</p>
		
	    </div>
	    <button className="flex flex-row justify-between p-4 mt-4 rounded-lg shadow-lg space-x-8" onClick={onClick}>click</button>
	    <input defaultValue="type room here" onChange={e => setNewRoom(e.target.value)}></input>
	    <button className="flex flex-row justify-between p-4 mt-4 rounded-lg shadow-lg space-x-8" onClick={onChangeRoom}>changeroom</button>
	    <div>
		{counter}
	    </div>
	    <HootUser />
	</div>
    );
}



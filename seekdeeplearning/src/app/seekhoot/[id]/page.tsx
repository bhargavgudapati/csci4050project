
"use client"

import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { socket } from '@/socket';
import Seekhootjoin from "@/app/components/seekhootjoin/seekhootjoin";
import HootUser from "@/app/components/seekhootjoin/hootusers";


export default function seekhoot() {
    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");    
    const router = useRouter();
    const params = useParams();

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

	return () => {
	    socket.off("connect", onConnect);
	    socket.off("disconnect", onDisconnect);
	};
	
    }, []);
    
    return (
	<div>
	    <Seekhootjoin qrcodeURL={"https://i.imgur.com/jYjaWdX.png"} />
	    <h1>this is page {params.id}</h1>
	    <div>
		<p>Status: {isConnected ? "connected" : "disconnected"}</p>
		<p>Transport: {transport}</p>
	    </div>
	    <HootUser />
	</div>
    );
}



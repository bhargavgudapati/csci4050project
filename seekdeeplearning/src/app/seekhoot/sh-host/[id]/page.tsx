
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';

export default function page() {
    const { id } = useParams();
    const router = useRouter();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    
    
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

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	socket.emit("joinroom", id);
    }, []);
    
    return (
	<div>
		 you are on page {id}
	</div>
    );
}

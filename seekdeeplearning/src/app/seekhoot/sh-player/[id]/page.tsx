
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';
import MultipleChoiceSelector from '@/app/components/seekhoot/multiplechoice';

export default function PlayerInGame() {
    const router = useRouter();
    const { id } = useParams();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [answer, setAnswer] = useState<string>("");
    
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

	const onStartgame = () => {
	    
	}

	const onSendAnswer = () => {
	    
	}
	
	if (socket.connected) {
	    onConnect();
	}

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	socket.emit("joinroom", id);
	
	socket.on("startgame", onStartgame);
	
    }, []);
    
    return (
	<div>
		 you are in {id}
	    <MultipleChoiceSelector answerHook={setAnswer} />
	</div>
    );
}

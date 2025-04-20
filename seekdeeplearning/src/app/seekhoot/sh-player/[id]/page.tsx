
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
    const [onQuestion, setOnQuestion] = useState<boolean>(false); //potentially remove
    const [playerState, setPlayerState] = useState<string>(""); // start, readques, answerques, waitforresult, getresult, getfinalrank
    
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

	const onReadQuestion = () => {
	    
	}

	const onAnswerQuestion = () => {
	    
	}

	const onSendAnswer = () => {
	    
	}

	const onResult = () => {
	    
	}

	const onEndGame = () => {
	    
	}
	
	if (socket.connected) {
	    onConnect();
	}

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	socket.emit("joinroom", id);
	
	socket.on("startgame", onStartgame);
	socket.on("readquestion", onReadQuestion);
	socket.on("answerquestion", onAnswerQuestion);
	socket.on("sendanswer", onSendAnswer);
	socket.on("questionresult", onResult);
	socket.on("end", onEndGame);
	
	
    }, []);
    
    return (
	<div>
	    <h2>you are in {id}</h2>
	    <MultipleChoiceSelector answerHook={setAnswer} />
	</div>
    );
}

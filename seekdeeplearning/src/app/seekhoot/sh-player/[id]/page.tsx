
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';
import MultipleChoiceSelector from '@/app/components/seekhoot/multiplechoice';

interface playerAndAnswer {
    playerID: string,
    playerName: string,
    answer: string | null
}

export default function PlayerInGame() {
    const router = useRouter();
    const { id } = useParams();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [name, setName] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [onQuestion, setOnQuestion] = useState<boolean>(false); //potentially remove
    const [playerState, setPlayerState] = useState<string>(""); // start, readques, answerques, waitforresult, getresult, getfinalrank
    const [sentNewPlayerRequest, setSentNewPlayerRequest] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(); //false is incorrect, true is correct
    const [score, setScore] = useState<number>();
    
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
	
	socket.emit("joinroom", id);
	if (!sentNewPlayerRequest) {
	    const x: playerAndAnswer = {
		playerName: name,
		playerID: socket.io.engine.id,
		answer: null
	    };
	    socket.emit("newplayer", x);
	    setSentNewPlayerRequest(true);
	}

	socket.on("getresult", (input: number) => {
	    console.log("setting new score");
	    setPlayerState("getresult");
	    setScore(input);
	});

	socket.on("getfinalrank", () => {
	    console.log("ending quiz");
	    setPlayerState("getfinalrank");
	});

	socket.on("readques", () => {
	    console.log("moving on to next question");
	    setPlayerState("readques");
	});

	socket.on("answerques", () => {
	    console.log("can answer question now");
	    setPlayerState("answerques");
	})
	
    }, []);

    const onSendAnswer = (input: string) => {
	const x: playerAndAnswer  = {
	    playerName: name,
	    playerID: socket.io.engine.id,
	    answer: answer
	};
	socket.emit("playeranswer", x);
    }
    
    // start, readques, answerques, waitforresult, getresult, getfinalrank
    if (playerState == "start") {
	return (
	    <div>
		<span>you are in the game</span>
	    </div>
	);
    } else if (playerState == "readques") {
	return (
	    <div>
		<span>read the question on the board</span>
	    </div>
	)
    } else if (playerState == "answerques") {
	return (
	    <div>
		<MultipleChoiceSelector answerHook={onSendAnswer} setStateHook={setPlayerState}/>
	    </div>
	);
    } else if (playerState == "waitforresult") {
	return (
	    <div>
		<span>wait for results</span>
	    </div>
	);
    } else if (playerState == "getresult") {
	return (
	    <div>
		<span>your score is {score} </span>
		<span>answered the question correctly: {result}</span>
	    </div>
	);
    } else if (playerState == "getfinalrank") {
	return (
	    <div>
		<span>your final score is {score}</span>
	    </div>
	);
    } else {
	return (
	    <div>
		<span>loading...</span>
	    </div>
	);
    }
}

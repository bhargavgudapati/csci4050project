
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';

interface question {
    ques: string,
    ans: string,
    done: boolean
}

interface quizElements {
    questionsWithAnswers: question[] | null,
    answers: string[] | null
}

async function getElements(roomcode: string): Promise<quizElements> {
    const response = await fetch("/api/shinstance/" + roomcode, {
	method: "GET",
	headers: {
	    'Content-Type': 'application/json'
	}
    });
    let { item } = await response.json();
    if (item == null) {
	return {
	    questionsWithAnswers: null,
	    answers: null
	};
    } else {
	const questionsresponse = await fetch("/api/flashcards/" + item.groupTitle, {
	    method: "GET",
	    headers: {
		'Content-Type': 'application/json'
	    }
	});
	const { items } = await questionsresponse.json();
	let seekQuestions: question[] = items.map((x: any) => {
	    return {
		ques: x.term,
		ans: x.definition,
		done: false,
	    };
	});
	let seekAnswers: string[] = seekQuestions.map((x) => {
	    return x.ans;
	});
	return {
	    questionsWithAnswers: seekQuestions,
	    answers: seekAnswers
	}
    }
}

interface playerAndAnswer {
    playerID: string,
    answer: string | null
}

export default function page() {
    const { id } = useParams();
    const router = useRouter();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [quizState, setQuizState] = useState<string>("showplayers");
    const [elements, setElements] = useState<quizElements>({
	questionsWithAnswers: null,
	answers: null
    });
    const [gotElements, setGotElements] = useState<boolean>(false);
    const [playercount, setPlayercount] = useState<number>(0);
    const [playersAndAnswers, setPlayerAnswer] = useState<playerAndAnswer[]>([]);
    
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

	const fetchData = async () => {
	    let retrievedelements: quizElements = await getElements((id || "").toString());
	    setElements(retrievedelements);
	    setGotElements(true);
	    console.log(retrievedelements);

	    
	    
	}
	fetchData();
	
	const onShowPlayers = () => {
	    
	}

	const onQuestionDisplay = () => {
	    
	}

	const onAllowAnswers = () => {
	    
	}

	const onShowAnswer = () => {
	    
	}

	const onShowStatus = () => {
	    
	}

	const onFinalResults = () => {
	    
	}

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	socket.emit("joinroom", id);
	
	socket.on("playercountupdate", (input) => {
	    console.log("updating count");
	    setPlayercount(Number(input));
	});

	socket.on("newPlayer", (input) => {
	    let x = playersAndAnswers;
	    playersAndAnswers.push({
		playerID: input,
		answer: null
	    });
	    setPlayerAnswer(x);
	});

	socket.on("playerAnswer", (input: playerAndAnswer) => {
	    console.log("setting player answer");
	    let x = playersAndAnswers;
	    playersAndAnswers.forEach((x) => {
		if (x.playerID == input.playerID) {
		    x.answer = input.answer;
		}
	    });
	    setPlayerAnswer(x);
	});	
    }, []);

    
    return (
	<div>
	    <span>you are on page {id}</span>
	    <span>the player count is {playercount}</span>
	</div>
    );
}

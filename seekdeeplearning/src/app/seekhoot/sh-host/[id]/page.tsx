
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';
import HostBody from '@/app/components/seekhoot/hostbody';
import HootUsers from '@/app/components/seekhoot/hootusers';

interface question {
    ques: string,
    ans: string,
    done: boolean
}

interface quizElements {
    questionsWithAnswers: question[],
    answers: string[]
}

interface seekhootquestion {
    question: string,
    correctAnswer: string,
    wronganswer1: string,
    wronganswer2: string,
    wronganswer3: string
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
	    questionsWithAnswers: [],
	    answers: []
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
    playerName: string,
    playerID: string,
    answer: string,
    score: number,
    answercorrect: boolean,
    gotresponse: boolean
}

export default function page() {
    const { id } = useParams();
    const router = useRouter();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [quizState, setQuizState] = useState<string>("showplayers"); //showplayers, showquestion, allowanswers, showanswer, showrank, showfinalrank
    const [elements, setElements] = useState<seekhootquestion[]>([]);
    const [gotElements, setGotElements] = useState<boolean>(false);
    const [playercount, setPlayercount] = useState<number>(0);
    const [playersAndAnswers, setPlayerAnswer] = useState<playerAndAnswer[]>([]);
    const [joinedroom, setJoinedroom] = useState<boolean>(false);
    const [currentcorrectanswer, setCurrentcorrectanswer] = useState<string>("");
    
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
	    console.log(retrievedelements);
	    

	    const getRandomAnswer = (ignore: string) => {
		const x = Math.floor(Math.random() * (retrievedelements.answers.length));
		if ((retrievedelements.answers[x]) == ignore) {
		    return retrievedelements.answers[retrievedelements.answers.length - x - 1];
		} else {
		    return retrievedelements.answers[x];
		}
	    }

	    let seekquestions: seekhootquestion[] = retrievedelements.questionsWithAnswers?.map((x) => {
		return {
		    question: x.ques,
		    correctAnswer: x.ans,
		    wronganswer1: getRandomAnswer(x.ans),
		    wronganswer2: getRandomAnswer(x.ans),
		    wronganswer3: getRandomAnswer(x.ans)
		}
	    }) || [];
	    setElements(seekquestions);
	    console.log(seekquestions);
	    setGotElements(true);
	}
	fetchData();

	socket.on("connect", onConnect);
	socket.on("disconnect", onDisconnect);
	if (!joinedroom) {
	    socket.emit("joinroom", id);
	    setJoinedroom(true);
	}
	
	socket.on("playercountupdate", (input) => {
	    console.log("updating count to " + input);
	    setPlayercount(Number(input));
	});

	socket.on("newplayer", (input: playerAndAnswer) => {
	    setPlayerAnswer((prevanswer) => {
		return [...prevanswer, {
		    playerName: input.playerName,
		    playerID: input.playerID,
		    answer: "",
		    score: 0,
		    answercorrect: false,
		    gotresponse: false
		}];
	    });
	    console.log("added player " + input.playerName);
	    console.log("their id:" + input.playerID);
	});

	socket.on("echoback", (input) => {
	    console.log(input);
	});

	socket.on("removeplayer", (input) => {
	    console.log(input);
	    setPlayerAnswer((prev) => {
		return prev.filter((x) => {
		    return (x.playerID != input);
		});
	    });
	});
	
    }, []);

    socket.on("playeranswer", (input: playerAndAnswer) => {
	if (currentcorrectanswer != "") {
	    console.log("setting player answer " + input.playerName + " " + input.answer);
	    setPlayerAnswer((prev) => {
		return prev.map((x) => {
		    if (x.playerID == input.playerID && !x.gotresponse) {
			console.log("found player, correct ans should be " + currentcorrectanswer + " the player answered " + input.answer);
			x.answercorrect = (input.answer == currentcorrectanswer);
			x.score = x.answercorrect ? (x.score + 20) : x.score;
			x.gotresponse = true;
		    }
		    return x;
		});
	    });
	}
    });


    const socketCommunicator = (label: string, data: any) => {
	socket.emit(label, data);
    }

    const sendOffAnswersHandler = () => {
	playersAndAnswers.forEach((x) => {
	    console.log("sending to player " + x.playerName);
	    socketCommunicator("sendresult", x);
	    x.gotresponse = false;
	});
	setCurrentcorrectanswer("");
    }

    const resetPlayerAnswers = () => {
	playersAndAnswers.forEach((x) => {
	    x.gotresponse = false;
	})
    }

    const setRightLetter = (input: string) => {
	setCurrentcorrectanswer(input);
    }
    
    if (gotElements && joinedroom) {
	return (
	    <div>
		<HostBody elements={elements} setState={setQuizState} state={quizState} resetPlayerAnswers={resetPlayerAnswers} sendResultsHandler={socketCommunicator}
		    currentCorrectAnswer={setRightLetter} sendOffAnswers={sendOffAnswersHandler} players={playersAndAnswers} />
		<HootUsers players={playersAndAnswers} />
	    </div>
	);
    } else {
	return (
	    <div>
	    </div>
	);
    }
}

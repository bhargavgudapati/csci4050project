
"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { socket } from '@/socket';
import MultipleChoiceSelector from '@/app/components/seekhoot/multiplechoice';
import NavBar from '@/app/components/NavBar';
import NameEntry from '@/app/components/seekhoot/nameentry';
import InGame from '@/app/components/seekhoot/ingame';

interface playerAndAnswer {
    playerID: string,
    playerName: string,
    answer: string,
    score: number,
    answercorrect: boolean
}

export default function page() {
    const router = useRouter();
    const { id } = useParams();

    const [isConnected, setIsConnected] = useState<boolean>(false);
    const [transport, setTransport] = useState<string>("N/A");
    const [name, setName] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [clearedanswer, setClearedanswer] = useState<boolean>(false);
    const [playerState, setPlayerState] = useState<string>("entername"); // start, readques, answerques, waitforresult, getresult, getfinalrank + entername;
    const [sentNewPlayerRequest, setSentNewPlayerRequest] = useState<boolean>(false);
    const [result, setResult] = useState<boolean>(false); //false is incorrect, true is correct
    const [score, setScore] = useState<number>(0);
    const [joinedgame, setJoinedgame] = useState<boolean>(false);
    const [isinroom, setIsinroom] = useState<boolean>(false);
    const [sentAnswer, setSentAnswer] = useState<boolean>(false);
    
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

	if (!isinroom) {
	    socket.emit("joinroom", id);
	    setIsinroom(true);
	}

	socket.on("getresult", (input: playerAndAnswer) => {
	    if (input.playerID == socket.id) {
		console.log("setting new score");
		setResult(input.answercorrect);
		setScore(input.score);
	    }
	    setPlayerState("getresult");
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
	});
	
    }, []);

    const onSendAnswer = (input: string) => {
	if (!sentAnswer) {
	    const x: playerAndAnswer  = {
		playerName: name,
		playerID: socket.id || "",
		answer: input,
		answercorrect: true,
		score: score
	    };
	    socket.emit("playeranswer", x);
	    setSentAnswer(true);
	}
    }
    
    // start, readques, answerques, waitforresult, getresult, getfinalrank
    if (playerState == "entername") {
	if (isinroom) {
	    const onclick = () => {
		const x: playerAndAnswer = {
		    playerName: name,
		    playerID: socket.id || "",
		    answer: "",
		    answercorrect: false,
		    score: score
		};
		socket.emit("newplayer", x);
		setSentNewPlayerRequest(true);
		setPlayerState("start");

		socket.on("echo", () => {
		    const x: playerAndAnswer = {
			playerID: socket.io.engine.id,
			playerName: name,
			answer: "",
			answercorrect: false,
			score: score
		    }
		    console.log("echoing back");
		    socket.emit("echoback", x);
		});
	    }
	    return (
		<div>
		    <NavBar />
		    <main className={"ml-16 p-6"}>
			<NameEntry onSubmit={onclick} setName={setName} roomcode={id?.toString() || ""} />
		    </main>
		</div>
	    );
	} else {
	    return (
		<div>
		    <NavBar />
		    <main className={"ml-16 p-6"}>
			<span>joining room</span>
		    </main>
		</div>
	    );
	}
    } else if (playerState == "start") {
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <InGame state={"waitforstart"}/>
		</main>
	    </div>
	);
    } else if (playerState == "readques") {
	if (clearedanswer) {
	    setClearedanswer(false);
	}
	if (sentAnswer) {
	    setSentAnswer(false);
	}
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <InGame state={"seeboard"} />
		</main>
	    </div>
	)
    } else if (playerState == "answerques") {
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <MultipleChoiceSelector answerHook={onSendAnswer} setStateHook={setPlayerState}/>
		</main>
	    </div>
	);
    } else if (playerState == "waitforresult") {
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <InGame state="waitforscore" />
		</main>
	    </div>
	);
    } else if (playerState == "getresult") {
	if (!clearedanswer) {
	    setAnswer("");
	    setClearedanswer(true);
	}
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <InGame state={"getscore"} score={score} correct={result} />
		</main>
	    </div>
	);
    } else if (playerState == "getfinalrank") {
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <span>your final score is {score}</span>
		</main>
	    </div>
	);
    } else {
	return (
	    <div>
		<NavBar />
		<main className={"ml-16 p-6"}>
		    <span>loading...</span>
		</main>
	    </div>
	);
    }
}

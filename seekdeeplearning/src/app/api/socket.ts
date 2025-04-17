
import { NextRequest, NextResponse } from 'next/server';
import { Server } from 'socket.io';

export default function handler(res: any, req: any) {
    if (!res.socket.server.io) {
	console.log("starting server socket");
	const io = new Server(res.socket.server);
	res.socket.server.io = io;

	io.on("connection", (socket) => {
	    console.log("a client is connected");

	    socket.on("message", (msg) =>  {
		socket.broadcast.emit("message", msg);
	    });

	    socket.on("disconnect", () => {
		console.log("the client " + socket.id + " is disconnected");
	    });
	});

	res.end();
    }
}

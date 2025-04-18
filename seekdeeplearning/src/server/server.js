
import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import { Server } from 'socket.io';
 
const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
 
app.prepare().then(() => {
    const httpServer = createServer((req, res) => {
	const parsedUrl = parse(req.url, true)
	handle(req, res, parsedUrl)
    }).listen(port);

    const io = new Server(httpServer);

    io.on("connection", (socket) => {
	console.log("there is a conneciton");
	socket.on("number", (input) => {
	    const rooms = Array.from(socket.rooms);
	    if (socket.lastRoom) {
		socket.to(socket.lastRoom).emit("number", input);
	    }
	    console.log("there is a number " + input);
	    console.log("broadcasted to " + rooms);
	});
	
	socket.on("joinroom", (input) => {
	    if (socket.lastRoom) {
		socket.leave(socket.lastRoom);
		socket.lastRoom = null;
	    }
	    socket.join(input);
	    socket.lastRoom = input;
	    console.log("changed room of " + socket.id + " to " + input);
	});
	
    });
 
    console.log(`> Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});

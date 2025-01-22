import express from "express"
import { Server } from "socket.io"
import http from "http";

const app = express();
const server = http.createServer(app)
const io_server = new Server(server)

app.use(express.static("public"))

io_server.on("connection", (socket) =>  {
    console.log("User Connected! (server) ✅", socket.id);

    socket.on("message", new_message => {
        console.log(new_message)
        io_server.emit("message", new_message)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected ❌');
    });    
}
)

const PORT = 3000
server.listen(PORT, () => {
    console.log("Server Running on PORT: " + PORT);
})


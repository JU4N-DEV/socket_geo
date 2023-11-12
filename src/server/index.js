
import express from "express";
import http from "http";
import morgan from "morgan";
import logger from "morgan";
import { Server } from "socket.io";
import { createServer } from "node:http";

const port = process.env.PORT ?? 3000;

const app = express();
app.use(logger('dev'));

const server =  createServer(app);

const io = new Server(server);

app.get("/", (req,res) => {
    res.sendFile(process.cwd() + '/src/client/index.html');
})


io.on('connection', (socket) => {
    console.log("Usuario conectado");

    socket.on('mensaje',(data, targetUID ) =>{

        io.to(targetUID).emit(data, {senderID:socket.id,data});
        console.log("Mensaje del cliente:", data);
    })

    socket.on('disconnect', ()=>{
        console.log('user disconnect')
    })

})

server.listen(port,() =>{
    console.log("Servidor en marcha...")
})
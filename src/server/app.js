import socket from "socket.io";
import express from "express";
import http from "http";
import morgan from "morgan";


const app = express();
const sever =  http.createServer(app);
const io = socket(sever);

app.get("/", (req,res) => {
    res.send("OK");
})

io.on('connection', (socket) => {
    console.log("Usuario conectado");

    socket.on('Chat', (msg) => {
        io.emit('Chat',msg);
    })

    socket.on('disconnect', () => {
        console.log("Usuario desconectado");
    })
})

sever.listen(3000,() =>{
    console.log("Servidor en marcha...")
})
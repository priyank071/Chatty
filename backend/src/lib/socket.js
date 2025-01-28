import {Server} from 'socket.io'
import http from 'http'
import express from 'express'
const app= express();
const server =http.createServer(app);
const io=new Server(server,{
    cors: {
        origin: ['http://localhost:5173'],
        methods: ['GET', 'POST'],
        credentials: true
    }
});
const userSocketMap={};
io.on('connection',(socket)=>{
    console.log("user connected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId)
        userSocketMap[userId]=socket.id;
    io.emit("UserOnlineEvent",Object.keys(userSocketMap));
socket.on('disconnect',()=>{
    console.log("User disconnected",socket.id);
    delete userSocketMap[userId];
    io.emit("UserOnlineEvent",Object.keys(userSocketMap));
})
});
export {io,app,server};
import { Server } from "socket.io";
import express from 'express'
import http from 'http'
import { log } from "console";
import cookieParser from "cookie-parser";
import { verify } from './../utils/jwt.js'


const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: { origin: 'http://localhost:5173', credentials: true },
    connectionStateRecovery: {}
})


const onlineUsers = {};

io.use(async (socket, next) => {

    const req = socket.request;
    try {
        let fn = cookieParser()

        fn(req, {}, () => { });

        let token = req.cookies.jwt;

        const userId = await verify(token);

        req.userId = userId;

        next();
    } catch (error) {
        socket.disconnect();
    }
});


io.on('connection', async (socket) => {
    try {

        const userId = socket.request.userId;

        if (!onlineUsers[userId]) onlineUsers[userId] = 0;

        onlineUsers[userId]++;

        socket.join(userId);

        socket.on('disconnect', () => {
            onlineUsers[userId]--;
            if (onlineUsers[userId] <= 0) {
                delete onlineUsers[userId];
            }
            console.log(`🔴socket disconnect cuurnet online: ${io.engine.clientsCount}`);
        })

        socket.emit('onlineUsers', Object.keys(onlineUsers));

        console.log(`✅new socket connection current online: ${io.engine.clientsCount}`);

    } catch (error) {
        socket.disconnect(true);
        console.log(`🔴socket disconnect (failure to authorize) cuurnet online: ${io.engine.clientsCount}`);
    }
})


export { io, app, server };





import "dotenv/config";
import express from 'express'
import authRouter from './routes/auth.router.js'
import chatRouter from './routes/chat.router.js'
import userRouter from './routes/user.router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { io, app, server } from './lib/socket.js'


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(cookieParser());

app.use(express.json());

app.use('/auth', authRouter);

app.use('/app', chatRouter);

app.use('/user', userRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
})

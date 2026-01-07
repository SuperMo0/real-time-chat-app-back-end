import "dotenv/config";
import express from 'express'
import authRouter from './routes/auth.router.js'
import appRouter from './routes/app.router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json());

app.use('/auth', authRouter);

app.use('/app', appRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is listening on port:${PORT}`);
})

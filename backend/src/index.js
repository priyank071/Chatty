import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authenticationRoute from './routes/auth.route.js'
import {connectDB} from "./lib/db.js"
import messageRoute from "./routes/message.route.js"
import {app,server} from "./lib/socket.js"
//.env file connect krne ke liye

dotenv.config()
const PORT=process.env.PORT || 5000;


//middleware ::::
//backend me data hndle krne ke liye
app.use(express.json());
app.use(cookieParser());

//allowing cors for frontend and backend kyuki hm ek port se dusre port me request bhej re hai
app.use(cors({
    origin: "http://localhost:5173",
    // allow the cookies or autharization headers to be sent with the request
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin'], // Allowed headers
}))
//sign in log in authentication vale routes ko handle krne ke liye
app.use("/api/auth",authenticationRoute);
app.use("/api/messages",messageRoute);

server.listen(PORT,()=>{
    console.log("Server is running on port: "+PORT);
    connectDB();
})
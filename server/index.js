import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

//DB Connecting Function
import connectDB from "./db/dbConnect.js";

//routes
import auth from './route/auth/user.auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/user', auth);

const PORT = 4000;

// http://localhost:4000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started @ ${PORT}`);
});
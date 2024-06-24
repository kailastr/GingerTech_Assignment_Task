import express from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

//DB Connecting Function
import connectDB from "./db/dbConnect.js";

//routes
import auth from './route/auth/user.auth.js';
import project from './route/project/project.route.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/user', auth);
app.use('/project', project);

const PORT = 4000;

// http://localhost:4000
app.listen(PORT, () => {
    connectDB();
    console.log(`Server started @ ${PORT}`);
});
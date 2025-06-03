import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRoute from './routes/authRoute.js';
import eventRoute from './routes/eventRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: 'https://digitalplanner.nathanc.me', credentials: true, methods: "GET,HEAD,PUT,PATCH,POST,DELETE" }));
app.options('/api', (req, res) => {
    res.header('Access-Control-Allow-Origins', 'https://digitalplanner.nathanc.me');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.sendStatus(200);
});
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoute);
app.use('/api/events', eventRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

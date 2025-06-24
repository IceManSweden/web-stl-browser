import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import ejs from 'ejs';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/download', (req, res) => {
    res.download('./public/css/style.css');
})

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})

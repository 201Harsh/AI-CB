const express = require('express');
const ConnectTDB = require('./config/db');
ConnectTDB();
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/users', userRouter);


module.exports = app
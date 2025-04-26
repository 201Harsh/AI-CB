const express = require('express');
const ConnectTDB = require('./config/db');
ConnectTDB();
const userRouter = require('./routes/user.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);


module.exports = app
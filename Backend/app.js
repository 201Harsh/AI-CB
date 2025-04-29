const express = require("express");
const ConnectTDB = require("./config/db");
ConnectTDB();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const aiRouter = require("./routes/ai.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, 
  })
);
app.use(cookieParser());
app.use("/users", userRouter);
app.use("/ai", aiRouter);

module.exports = app;

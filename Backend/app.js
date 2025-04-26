const express = require("express");
const ConnectTDB = require("./config/db");
ConnectTDB();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);
app.use(cookieParser());
app.use("/users", userRouter);

module.exports = app;

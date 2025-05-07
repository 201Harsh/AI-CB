const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
    })
    .catch((err) => {
    });
};

module.exports = connectDB;
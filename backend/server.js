require("dotenv").config()

const studentsRoute = require("./routes/studentsRoute");

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect(DATABASE_URL)
    .then(() => {
        console.log("Connected to Database");
    })
    .catch((err) => {
        console.log(err);
    });

// Middlewares
app.use(express.json());

app.use("/students", studentsRoute);

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
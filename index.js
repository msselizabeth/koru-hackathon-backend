import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import {router as userRouter} from "./routes/api/users.js";

dotenv.config();
const { DB_HOST, PORT } = process.env;

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.static('public'));



app.get("/", (req, res) => {
    res.json({
        message: "Hello from Koru Hackathon Server!"
    })
})

app.use("/api/users", userRouter)

// Handling non-existent routes (404)
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found."
    })
})

// Global error handling
app.use((err, req, res, next) => {
    const { status = 500, message = "Server error." } = err;
    res.status(status).json({
        message
    })
})

// Start server and connecting to DB
mongoose.connect(DB_HOST)
    .then(() => {
        app.listen(PORT)
        console.log("Connect success")
    })
    .catch(error => {
        console.log(error.message)
        process.exit(1);
    })
;
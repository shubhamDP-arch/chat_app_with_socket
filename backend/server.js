import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/index.js";

dotenv.config();
connectDB();
const app = express();
app.get("/", (req, res) => {
res.send("API Running!");
 });


app.listen(process.env.PORT, console.log("THe server is running at port " + process.env.PORT))
app.use(express.json()); 
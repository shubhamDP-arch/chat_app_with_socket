import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./database/index.js";
import cors from "cors"
import userRoutes from "./routes/user.routes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json()); 
app.use(cors());
app.use("/api/user", userRoutes);


app.listen(process.env.PORT, console.log("THe server is running at port " + process.env.PORT))

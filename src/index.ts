import express, { Express, Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import router from "./routes/index";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8090;

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// Middleware for parsing JSON bodies
app.use(express.json());

// Enable CORS
app.use(cors());

// Use the router for handling routes
app.use(router);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

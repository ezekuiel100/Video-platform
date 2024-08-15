import express from "express";
const app = express();

import cors from "cors";
import { createUser, createVideo, getVideos } from "./db/db.js";

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json({ limit: "1000mb" }));
app.use("/videos", express.static("./videos"));

app.post("/register", createUser);

app.post("/upload", createVideo);

app.get("/", getVideos);

app.listen("3000", () => console.log("Server is running on port 3000"));

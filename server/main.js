import express from "express";
const app = express();

import cors from "cors";
import {
  checkAuth,
  createUser,
  createVideo,
  getVideos,
  handleLogout,
  login,
} from "./db/db.js";
import authenticateToken from "./middleware.js";

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/auth/check-session", authenticateToken, checkAuth);

app.use("/videos", express.static("./videos"));
app.use("/thumbnails", express.static("./thumbnails"));

app.post("/register", createUser);

app.post("/login", login);

app.post("/logout", handleLogout);

app.post("/upload", createVideo);

app.get("/", getVideos);

app.listen("3000", () => console.log("Server is running on port 3000"));

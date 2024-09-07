import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import {
  registerUser,
  uploadVideo,
  getVideos,
  logoutUser,
  login,
  getVideoId,
  getChannel,
  createChannel,
  incrementViews,
} from "./db/db.js";
import authenticateToken from "./middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/auth/check-session", authenticateToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

app.use("/data", express.static(join(__dirname, "data")));

app.post("/login", login);
app.post("/register", registerUser);
app.post("/logout", logoutUser);

app.post("/createchannel", createChannel);
app.get("/channel/:id", getChannel);

app.get("/", getVideos);
app.use("/thumbnails", express.static("./thumbnails"));
app.post("/upload", authenticateToken, uploadVideo);

app.get("/api/video/:id", getVideoId);
app.post("/api/views/:id", incrementViews);

app.listen("3000", () => console.log("Server is running on port 3000"));

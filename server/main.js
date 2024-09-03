import express from "express";
import cors from "cors";
import {
  registerUser,
  uploadVideo,
  getVideos,
  logoutUser,
  login,
  getVideoId,
  getChannel,
} from "./db/db.js";
import authenticateToken from "./middleware.js";

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/auth/check-session", authenticateToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

app.use("/videos", express.static("./videos"));

app.post("/login", login);
app.post("/register", registerUser);
app.post("/logout", logoutUser);

app.get("/channel/:id", getChannel);

app.get("/", getVideos);
app.use("/thumbnails", express.static("./thumbnails"));
app.post("/upload", authenticateToken, uploadVideo);

app.get("/api/video/:id", getVideoId);

app.listen("3000", () => console.log("Server is running on port 3000"));

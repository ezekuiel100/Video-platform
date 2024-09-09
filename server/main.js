import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { getVideos, getChannel, incrementViews } from "./db/db.js";
import authenticateToken from "./middleware/middleware.js";
import loginUser from "./controllers/loginUser.js";
import registerUser from "./controllers/registerUser.js";
import checkIsAuthenticated from "./middleware/checkIsAuthenticated.js";
import logoutUser from "./controllers/logoutUser.js";
import uploadVideo from "./controllers/uploadVideo.js";
import getVideoId from "./controllers/getVideoId.js";
import createChannel from "./controllers/createChannel.js";
import subscribe from "./controllers/subscribe.js";
import unsubscribe from "./controllers/unsubscribe.js";
import { prisma } from "./lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "1000mb" }));

app.get("/auth/check-session", authenticateToken, (req, res) => {
  res.status(200).json({ isAuthenticated: true });
});

app.use("/data", express.static(join(__dirname, "data")));

app.get("/", getVideos);

app.post("/login", loginUser);
app.post("/register", checkIsAuthenticated, registerUser);
app.post("/logout", logoutUser);

app.post("/createchannel", authenticateToken, createChannel);
app.get("/channel/:id", getChannel);
app.post("/upload", authenticateToken, uploadVideo);

app.post("/subscribe", subscribe);
app.delete("/unsubscribe", unsubscribe);

app.post("/api/views/:id", incrementViews);
app.get("/api/video/:id", getVideoId);

app.get("/me", authenticateToken, async (req, res) => {
  const { email } = req.user;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { channel: true, subscriptions: true },
  });

  res.status(200).send({ ...user, password: "" });
});

app.listen("3000", () => console.log("Server is running on port 3000"));

import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

dotenv.config();
const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

async function getVideos(req, res) {
  const videos = await prisma.video.findMany();

  res.json(videos);
}

async function createUser(req, res) {
  const { name, email, password, profilePic } = req.body;

  async function hashPassword() {
    try {
      const hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (error) {
      console.error("Error encrypting password:", error);
    }
  }

  const hashedPassword = await hashPassword();

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic,
      },
    });

    res.json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(409).json({ error: "Email already in use." });
      return;
    }
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return res.status(401).send({ message: "Wrong credentials" });

  const hash = user.password;
  const match = await bcrypt.compare(password, hash);

  const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
    expiresIn: "10h",
  });

  if (!match) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 36000000,
  });

  res.status(200).json({ id: user.id, name: user.name, email: user.email });
}

function handleLogout(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: 0,
  });

  res.status(200).json({ message: "Logout successful" });
}

async function createVideo(req, res) {
  const { authorId, file, fileName, title, thumbnail, thumbName } = req.body;

  const filePath = `./videos/${fileName}`;
  const fileBuffer = Buffer.from(file, "base64");

  let VideoThumb = "";

  if (thumbnail) {
    const thumbPath = `./thumbnails/${thumbName}`;
    const thumbBuffer = Buffer.from(thumbnail, "base64");

    fs.writeFile(thumbPath, thumbBuffer, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao salvar imagem" });
      }
    });

    VideoThumb = "http://localhost:3000/thumbnails/" + thumbName;
  }

  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar vídeo" });
    }
  });

  const newVideo = await prisma.video.create({
    data: {
      title,
      content: "",
      authorId,
      thumbnail: VideoThumb,
      url: "http://localhost:3000/videos/" + fileName,
    },
  });

  res.send(newVideo);
}

export { getVideos, createUser, createVideo, login, handleLogout };

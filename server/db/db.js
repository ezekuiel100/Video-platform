import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

async function getVideos(req, res) {
  const videos = await prisma.video.findMany();

  res.json(videos);
}

async function registerUser(req, res) {
  const { name, email, password, confirmPassword, profilePic } = req.body;

  if (password != confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePic,
      },
    });

    res.json({ message: "User created successfully!" });
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
    include: { channel: true },
  });

  if (!user)
    return res
      .status(401)
      .send({ isAuthenticated: false, message: "Wrong credentials" });

  const hash = user.password;
  const match = await bcrypt.compare(password, hash);

  const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  if (!match) {
    return res
      .status(401)
      .json({ isAuthenticated: false, error: "Invalid credentials" });
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24, //1 day,
  });

  res.status(200).json({
    isAuthenticated: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      channel: user.channel,
    },
  });
}

function logoutUser(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: 0,
  });

  res.status(200).json({ message: "Logout successful" });
}

async function uploadVideo(req, res) {
  const { authorId, file, fileName, title, thumbnail, thumbName } = req.body;

  const filePath = path.resolve(__dirname, "../videos", fileName);
  const fileBuffer = Buffer.from(file, "base64");

  if (thumbnail) {
    const thumbPath = path.resolve(__dirname, "../thumbnails", thumbName);
    const thumbBuffer = Buffer.from(thumbnail, "base64");

    await fs.promises.writeFile(thumbPath, thumbBuffer);
  }

  await fs.promises.writeFile(filePath, fileBuffer);

  const newVideo = await prisma.video.create({
    data: {
      title,
      content: "",
      authorId,
      thumbnail: thumbnail
        ? `http://localhost:3000/thumbnails/${thumbName}`
        : null,
      url: "http://localhost:3000/videos/" + fileName,
    },
  });

  res.send(newVideo);
}

async function getVideoId(req, res) {
  const { id } = req.params;

  const video = await prisma.video.findUnique({ where: { id: parseInt(id) } });

  res.send(video);
}

async function getChannel(req, res) {
  const authorId = req.params.id;

  const user = await prisma.user.findUnique({
    where: {
      id: Number(authorId),
    },
    include: { videos: true },
  });

  res.send({ ...user, password: "" });
}

async function createChannel(req, res) {
  const { userId, username, base64Image, imageFileName } = req.body;

  const existingChannel = await prisma.channel.findUnique({
    where: { userId },
  });

  if (existingChannel) {
    return res.status(400).json({ message: "User already has a channel" });
  }

  let profileImagePath;

  if (!imageFileName) {
    profileImagePath = path.resolve(
      __dirname,
      "../profileImage",
      "/src/image/profile.jpg"
    );
  } else {
    profileImagePath = path.resolve(
      __dirname,
      "../profileImage",
      imageFileName
    );
  }

  try {
    await fs.promises.writeFile(profileImagePath, base64Image, {
      encoding: "base64",
    });

    await prisma.channel.create({
      data: {
        name: username,
        userId,
        profilePic: profileImagePath,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      profilePic: profileImagePath,
    },
  });

  res.status(200).send({ message: "Channel created." });
}

export {
  getVideos,
  registerUser,
  uploadVideo,
  login,
  logoutUser,
  getVideoId,
  getChannel,
  createChannel,
};

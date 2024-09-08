import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const prisma = new PrismaClient();

async function getVideos(req, res) {
  const videos = await prisma.video.findMany({ include: { channel: true } });

  res.json(videos);
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
  const { file, fileName, title, thumbnail, thumbName, channel } = req.body;

  if (!title || !file) {
    return res
      .status(400)
      .send({ message: "Title and video file are required." });
  }

  const filePath = path.resolve(__dirname, "../data/videos", fileName);
  const fileBuffer = Buffer.from(file, "base64");

  if (thumbnail) {
    const thumbPath = path.resolve(__dirname, "../data/thumbnails", thumbName);
    const thumbBuffer = Buffer.from(thumbnail, "base64");

    await fs.promises.writeFile(thumbPath, thumbBuffer);
  }

  await fs.promises.writeFile(filePath, fileBuffer);

  const newVideo = await prisma.video.create({
    data: {
      title,
      content: "",

      thumbnail: thumbnail
        ? `http://localhost:3000/data/thumbnails/${thumbName}`
        : null,
      url: "http://localhost:3000/data/videos/" + fileName,
      channelId: channel,
    },
  });

  res.send(newVideo);
}

async function getVideoId(req, res) {
  const { id } = req.params;

  const video = await prisma.video.findUnique({
    where: { id: parseInt(id) },
    include: { channel: true },
  });

  res.send(video);
}

async function getChannel(req, res) {
  const id = req.params.id;

  const channel = await prisma.channel.findUnique({
    where: {
      id: id,
    },
    include: { videos: true },
  });

  res.send({ ...channel });
}

async function createChannel(req, res) {
  const { userId, username, base64Image, imageFileName } = req.body;

  try {
    const existingChannel = await prisma.channel.findUnique({
      where: { userId },
    });

    if (existingChannel) {
      return res.status(400).json({ message: "User already has a channel" });
    }
  } catch (error) {
    console.log(error);
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
      "../data/profileImage",
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
        profileImage:
          "http://localhost:3000/data/profileImage/" + imageFileName,
      },
    });
  } catch (error) {
    console.log(error.message);
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      profileImage: "http://localhost:3000/data/profileImage/" + imageFileName,
    },
    include: { channel: true },
  });

  res.status(200).send({ ...updatedUser, password: "" });
}

async function incrementViews(req, res) {
  const videoId = req.params.id;

  await prisma.video.update({
    where: {
      id: Number(videoId),
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  res.status(200).send();
}

export {
  getVideos,
  uploadVideo,
  logoutUser,
  getVideoId,
  getChannel,
  createChannel,
  incrementViews,
};

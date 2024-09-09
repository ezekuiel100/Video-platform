import { prisma } from "../lib/prisma.js";
import { __filename, __dirname } from "../utils/pathUtils.js";
import fs from "fs";
import path from "path";

export default async function uploadVideo(req, res) {
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

import { prisma } from "../lib/prisma.js";
import { __filename, __dirname } from "../utils/pathUtils.js";
import fs from "fs";
import path from "path";

export default async function createChannel(req, res) {
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

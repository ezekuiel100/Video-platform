import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import fs from "fs";

const prisma = new PrismaClient();

async function getVideos(req, res) {
  const videos = await prisma.video.findMany();
  res.json(videos);
}

async function createUser(req, res) {
  const { name, email, password } = req.body;

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

  const user = await prisma.user.findUnique({
    where: { email },
  });

  const hash = user.password;
  const match = await bcrypt.compareSync(password, hash);

  if (match) {
    res.status(200).send();
  }
}

async function createVideo(req, res) {
  const { authorId, file, fileName } = req.body;

  const filePath = `./videos/${fileName}`;

  const fileBuffer = Buffer.from(file, "base64");

  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar vídeo" });
    }
  });

  const newVideo = await prisma.video.create({
    data: {
      title: "teste",
      content: "",
      authorId,
      url: "http://localhost:3000/videos/" + fileName,
    },
  });

  res.send(newVideo);
}

export { getVideos, createUser, createVideo, login };

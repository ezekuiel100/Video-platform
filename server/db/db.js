import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function getVideos(req, res) {
  const videos = await prisma.video.findMany();
  res.json(videos);
}

async function createUser(req, res) {
  const { name, email } = req.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  res.json(newUser);
}

async function createVideo(req, res) {
  const { title, content, authorId, url, file, fileName } = req.body;

  const filePath = `./videos/${fileName}`;

  const fileBuffer = Buffer.from(file, "base64");

  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao salvar vídeo" });
    }
  });

  const newVideo = prisma.video.create({
    data: {
      title,
      content,
      authorId,
      url,
    },
  });

  res.send(newVideo);
}

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

export { getVideos, createUser, createVideo };

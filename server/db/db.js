import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

const prisma = new PrismaClient();

async function getVideos(req, res) {
  const videos = await prisma.video.findMany({
    include: { channel: true },
  });

  res.json(videos);
}

async function getChannel(req, res) {
  const id = req.params.id;

  const channel = await prisma.channel.findUnique({
    where: {
      id: id,
    },
    include: {
      videos: true,
      _count: {
        select: { subscription: true },
      },
    },
  });

  res.send({ ...channel });
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

export { getVideos, getChannel, incrementViews };

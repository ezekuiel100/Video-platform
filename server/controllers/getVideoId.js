import { prisma } from "../lib/prisma.js";

export default async function getVideoId(req, res) {
  const { id } = req.params;

  const video = await prisma.video.findUnique({
    where: { id: parseInt(id) },
    include: { channel: true },
  });

  res.send(video);
}

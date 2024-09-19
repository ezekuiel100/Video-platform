import { prisma } from "../lib/prisma.js";

export async function getVideoService(id) {
  const video = await prisma.video.findUnique({
    where: { id: parseInt(id) },
    include: { channel: true },
  });

  return video;
}

import { prisma } from "../lib/prisma.js";

export default async function createVideoService(
  title,
  thumbnail,
  videoUploadResponse,
  channel
) {
  const newVideo = await prisma.video.create({
    data: {
      title,
      content: "",
      thumbnail: null,
      url: videoUploadResponse,
      channelId: channel,
    },
  });

  return newVideo;
}

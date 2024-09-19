import { prisma } from "../lib/prisma.js";

export async function createChannelService(username, userId, profileImageURL) {
  const doesChannelExiste = await prisma.channel.findUnique({
    where: { userId },
  });

  if (doesChannelExiste) {
    throw new Error("User already has a channel");
  }

  await prisma.channel.create({
    data: {
      name: username,
      userId,
      ...(profileImageURL && { profileImage: profileImageURL }),
    },
  });

  return { message: "Channel created." };
}

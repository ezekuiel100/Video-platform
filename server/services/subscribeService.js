import { prisma } from "../lib/prisma.js";

export default async function subscribeService(userId, channelId) {
  await prisma.subscription.create({
    data: { userId, channelId },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { channel: true, subscriptions: true },
  });

  return { user };
}

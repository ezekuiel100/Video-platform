import { prisma } from "../lib/prisma.js";

export default async function unsubscribeService(userId, channelId) {
  await prisma.subscription.delete({
    where: {
      userId_channelId: {
        userId,
        channelId,
      },
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: { channel: true, subscriptions: true },
  });

  return { user };
}

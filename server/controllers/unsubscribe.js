import { prisma } from "../lib/prisma.js";

export default async function unsubscribe(req, res) {
  const { userId, channelId } = req.body;

  try {
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

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao desinscrever-se do canal" });
  }
}

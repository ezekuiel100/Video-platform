import { prisma } from "../lib/prisma.js";

export default async function subscribe(req, res) {
  const { userId, channelId } = req.body;

  try {
    await prisma.subscription.create({
      data: { userId, channelId },
    });

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { channel: true, subscriptions: true },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao se inscrever no canal" });
  }
}

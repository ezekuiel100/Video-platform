import { describe, expect, it, vi } from "vitest";
import { prisma } from "../lib/prisma";
import unsubscribeService from "./unsubscibeService";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    subscription: {
      delete: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("UnsubscribeService", () => {
  it("Should unsubscribe from a channel", async () => {
    prisma.subscription.delete.mockResolvedValue({
      userId: 1,
      channelId: 3,
    });

    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      channel: {},
      subscriptions: {},
    });

    const { user } = await unsubscribeService(1, 3);

    expect(prisma.subscription.delete).toBeCalledWith({
      where: {
        userId_channelId: {
          userId: 1,
          channelId: 3,
        },
      },
    });

    expect(prisma.user.findUnique).toBeCalledWith({
      where: {
        id: 1,
      },
      include: { channel: true, subscriptions: true },
    });

    expect(user).toEqual({ id: 1, channel: {}, subscriptions: {} });
  });
});

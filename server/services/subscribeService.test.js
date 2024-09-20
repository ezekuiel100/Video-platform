import { describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import subscribeService from "./subscribeService";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    subscription: {
      create: vi.fn(),
    },
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Subscribe a user to a channel", () => {
  it("Should subscribe to a channel", async () => {
    const mockUser = {
      id: 1,
      channel: {},
      subscriptions: {},
    };

    prisma.subscription.create.mockResolvedValue({
      userId: 1,
      channelId: 3,
    });

    prisma.user.findUnique.mockResolvedValue(mockUser);

    const { user } = await subscribeService(1, 3);

    expect(prisma.subscription.create).toBeCalledWith({
      data: { userId: 1, channelId: 3 },
    });

    expect(prisma.user.findUnique).toBeCalledWith({
      where: {
        id: 1,
      },
      include: { channel: true, subscriptions: true },
    });

    expect(user).toEqual(mockUser);
  });
});

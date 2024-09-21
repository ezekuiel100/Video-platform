import { beforeEach, describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import { createChannelService } from "./createChannelService";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    channel: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe("createChannelService", () => {
  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    vi.clearAllMocks();
  });

  it("should create a new channel if it does not exist", async () => {
    prisma.channel.findUnique.mockResolvedValue(null);

    prisma.channel.create.mockResolvedValue({
      name: "myChannel",
      userId: "1",
    });

    await createChannelService("myChannel", "1");

    expect(prisma.channel.create).toBeCalledWith({
      data: {
        name: "myChannel",
        userId: "1",
      },
    });
  });

  it("should throw an error if the channel already exists", async () => {
    prisma.channel.findUnique.mockResolvedValue({
      id: "5",
      name: "existingChannel",
    });

    await expect(createChannelService("existingChannel", "5")).rejects.toThrow(
      "User already has a channel"
    );

    expect(prisma.channel.create).not.toBeCalled();
  });
});

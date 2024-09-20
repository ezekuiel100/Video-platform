import { describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import { getVideoService } from "./getVideoService";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    video: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Get video service", () => {
  it("Should find a video by de Id", async () => {
    const mockVideo = {
      id: 1,
      title: "Meu video",
      content: "",
      thumbnail: null,
      createdAt: "2024-09-07T02:16:03.302Z",
      views: 4,
      url: "http://localhost:3000/data/videos/",
      channelId: 5,
      channel: {},
    };

    prisma.video.findUnique.mockResolvedValue(mockVideo);

    const video = await getVideoService(1);

    expect(prisma.video.findUnique).toBeCalledWith({
      where: { id: 1 },
      include: { channel: true },
    });

    expect(video).toEqual(mockVideo);
  });
});

import { describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import createVideoService from "./createVideoService";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    video: {
      create: vi.fn(),
    },
  },
}));

describe("createVideoService", () => {
  it("Should upload a new video", async () => {
    prisma.video.create.mockResolvedValue({
      title: "My video",
      content: "",
      thumbnail: null,
      url: `https://s3.amazonaws.com/`,
      channelId: "1",
    });

    await createVideoService(
      "My video",
      null,
      `https://s3.amazonaws.com/`,
      "1"
    );

    expect(prisma.video.create).toBeCalledWith({
      data: {
        title: "My video",
        content: "",
        thumbnail: null,
        url: `https://s3.amazonaws.com/`,
        channelId: "1",
      },
    });
  });
});

import { describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import { authenticate } from "./authenticate";
import bcrypt from "bcrypt";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Login use case", () => {
  it("Should authenticate user", async () => {
    const hashedPassword = await bcrypt.hash("12345", 6);

    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "bruno@gmail.com",
      password: hashedPassword,
      channel: {},
      subscriptions: [],
    });

    const { user } = await authenticate("bruno@gmail.com", "12345");

    expect(prisma.user.findUnique).toBeCalledWith({
      where: {
        email: "bruno@gmail.com",
      },
      include: { channel: true, subscriptions: true },
    });

    expect(user).toEqual({
      id: 1,
      email: "bruno@gmail.com",
      password: hashedPassword,
      channel: {},
      subscriptions: [],
    });
  });

  it("Should no be able to authenticate with wrong email", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(authenticate("xxx@gmail.com", "12345")).rejects.toThrow(
      "Invalid credentials"
    );

    expect(prisma.user.findUnique).toBeCalledWith({
      where: {
        email: "xxx@gmail.com",
      },
      include: { channel: true, subscriptions: true },
    });
  });
});

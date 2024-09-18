import { describe, expect, it, vi } from "vitest";

import { prisma } from "../lib/prisma";
import { authenticate } from "./autenticate";
import bcrypt from "bcrypt";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("Login use case", () => {
  it("Shoud login user", async () => {
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
});

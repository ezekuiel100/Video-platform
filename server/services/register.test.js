import { describe, expect, it, vi } from "vitest";
import { registerUseCase } from "./register";
import { prisma } from "../lib/prisma";

import bcrypt from "bcrypt";

vi.mock("../lib/prisma.js", () => ({
  prisma: {
    user: {
      create: vi.fn(),
    },
  },
}));

describe("Register use case", () => {
  it("Should hash password and create user", async () => {
    const hashedPassword = await bcrypt.hash("12345", 6);

    prisma.user.create.mockResolvedValue({
      id: 1,
      name: "Bruno",
      email: "bruno@gmail.com",
      password: hashedPassword,
    });

    const { user } = await registerUseCase("Bruno", "bruno@gmail.com", "12345");

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: "Bruno",
        email: "bruno@gmail.com",
        password: expect.any(String),
      },
    });

    const isPasswordHashed = await bcrypt.compare("12345", user.password);
    expect(isPasswordHashed).toBe(true);
  });
});

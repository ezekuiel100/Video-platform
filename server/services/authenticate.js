import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function authenticate(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { channel: true, subscriptions: true },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const passwordHash = user.password;
  const doesPasswordMatch = await bcrypt.compare(password, passwordHash);

  if (!doesPasswordMatch) {
    throw new Error("Invalid credentials");
  }

  return { user };
}

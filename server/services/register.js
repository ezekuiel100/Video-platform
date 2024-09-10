import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

export async function registerUseCase(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { user };
}

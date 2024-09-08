import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.js";

export default async function registerUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(409).json({ error: "Email already in use." });
      return;
    }
  }
}

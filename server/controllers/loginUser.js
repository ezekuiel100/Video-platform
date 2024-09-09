import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) return;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { channel: true, subscriptions: true },
  });

  if (!user)
    return res
      .status(401)
      .send({ isAuthenticated: false, message: "Wrong credentials" });

  const hash = user.password;
  const match = await bcrypt.compare(password, hash);

  const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  if (!match) {
    return res
      .status(401)
      .json({ isAuthenticated: false, error: "Invalid credentials" });
  }

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 1000 * 60 * 60 * 24, //1 day,
  });

  res.status(200).json({
    isAuthenticated: true,
    user: { ...user, password: "" },
  });
}

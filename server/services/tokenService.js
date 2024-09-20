import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

export default function generateToken(user, email) {
  const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  return token;
}

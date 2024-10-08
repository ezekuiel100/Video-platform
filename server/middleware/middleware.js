import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authenticateToken(req, res, next) {
  const token = req.headers.cookie?.split("token=")[1];

  if (!token) {
    return res.status(401).json({ isAuthenticated: false });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ isAuthenticated: false, message: "Token inválido" });
    }

    req.user = user;
    next();
  });
}

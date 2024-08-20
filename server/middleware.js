import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function authenticateToken(req, res, next) {
  const token = req.headers.cookie;
  console.log(token);

  if (!token || token === "null") {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    console.log(user);
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

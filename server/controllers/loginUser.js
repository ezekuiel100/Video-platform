import { authenticate } from "../services/authenticate.js";
import generateToken from "../services/tokenService.js";

export default async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Email and password are required." });
  }

  try {
    const { user } = await authenticate(email, password);

    const token = generateToken(user, email);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 1000 * 60 * 60 * 24, //1 day,
    });

    const { password: userPassword, ...userWithoutPassword } = user;

    res.status(200).json({
      isAuthenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    res.status(401).json({ isAuthenticated: false, message: error.message });
  }
}

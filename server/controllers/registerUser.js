import { registerUseCase } from "../services/register.js";

export default async function registerUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match!" });
  }

  try {
    await registerUseCase(name, email, password);

    res.json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(409).json({ error: "Email already in use." });
      return;
    }

    res.status(409).json({ message: error.message });
  }
}

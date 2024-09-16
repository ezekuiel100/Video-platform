import { registerUseCase } from "../services/register.js";

export default async function registerUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password != confirmPassword) {
    console.log("password not");
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    await registerUseCase(name, email, password);

    res.json({ message: "User created successfully!" });
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ message: "Email already in use." });
    }

    res.status(500).json({ message: error.message });
  }
}

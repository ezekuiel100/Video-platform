import { describe, expect, it, vi } from "vitest";
import jwt from "jsonwebtoken";
import generateToken from "./tokenService";
const SECRET_KEY = process.env.JWT_SECRET_KEY;

describe("token service", () => {
  it("Should generate a valid JWT token", () => {
    const user = { id: 1 };
    const email = "test@example.com";

    const token = generateToken(user, email);

    const decoded = jwt.verify(token, SECRET_KEY);

    expect(decoded.userId).toBe(user.id);
    expect(decoded.email).toBe(email);
  });

  it("should have an expiration of 1 day", () => {
    const user = { id: 1 };
    const email = "test@example.com";

    const token = generateToken(user, email);

    const decoded = jwt.decode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    expect(decoded.exp).toBeGreaterThan(currentTime + 86300);
    expect(decoded.exp).toBeLessThan(currentTime + 86500);
  });
});

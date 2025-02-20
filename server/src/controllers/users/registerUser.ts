import { Request, Response } from "express"; 
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../../db"; 

const JWT_SECRET = "your_secret_key";
const COOKIE_NAME = "auth_token";


export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, username } = req.body;
    console.log("Registering user:", { username, email });

    if (!username || !email || !password) {
      res.status(400).json({ error: "All fields are required" });
      return;
    }

    // Check if user already exists
    const [existingUser]: any[] = await pool.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into MySQL database with "pending" status
    await pool.execute(
      "INSERT INTO users (username, email, password, status, dateTime) VALUES (?, ?, ?, ?, NOW())",
      [username, email, hashedPassword, "pending"]
    );

    console.log("✅ User registered successfully. Waiting for admin approval.");

    res.status(201).json({ message: "Registration successful. Waiting for admin approval." });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

// 🔹 Hash Password (bcrypt)
export async function getBcryptPass(password: string): Promise<string> {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("❌ Error hashing password:", error);
    throw new Error("Password hashing failed");
  }
}

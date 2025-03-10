import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt1 from "jwt-simple";
import pool from "../../db"; // Import MySQL2 connection pool
import { cookieName, secret } from "./serviceFunction";

// 🔹 User Registration with MySQL2
export async function register(req: Request, res: Response): Promise<void> {
  try {
    const { email, password, username, role = "Passenger"} = req.body;
   
    console.log(
      "register username,email,pass,role",
      username,
      email,
      password,
      role
    );

    // Check if user already exists
    const checkUserSql = `SELECT * FROM users WHERE email = ?`;
    const [existingUser] = await pool.execute(checkUserSql, [email]);

    if ((existingUser as any[]).length > 0) {
      console.log("User already exists");
      res.status(400).json({ error: "User already exists" });
      return;
    }

    // Hash password
    const hashedPassword = await getBcryptPass(password);

    // Insert user into MySQL database
    const insertUserSql = `INSERT INTO users (email, password, username, role, dateTime) VALUES (?, ?, ?, ?, NOW())`;
    const [result] = await pool.execute(insertUserSql, [
      email,
      hashedPassword,
      username,
      role,
    ]);

    console.log("User inserted");
    // Fetch newly created user
    const newUserSql = `SELECT * FROM users WHERE email = ?`;
    const [newUserRows] = await pool.execute(newUserSql, [email]);
    const newUser = (newUserRows as any[])[0];

    if (!newUser) {
      res.status(500).json({ error: "User registration failed" });
      return;
    }

    // Generate JWT Token
    const payload = {
      userId: newUser.id,
      email: newUser.email,
      username: newUser.username,
      role: newUser.role,
    };

    const payloadJWT = jwt1.encode(payload, secret());

    res.cookie(cookieName, payloadJWT, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    });

    res
      .status(200)
      .send({ ok: true, payload, token: payloadJWT, date: new Date() });
  } catch (error) {
    console.error("❌ Error registering user:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

// 🔹 Hash Password (bcrypt)
export async function getBcryptPass(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (err: any) {
    throw new Error(err);
  }
}

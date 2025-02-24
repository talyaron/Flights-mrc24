import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt1 from "jwt-simple";
import pool from "../../db"; // Import MySQL2 connection pool
import { cookieName, secret } from "./serviceFunction";



// 🔹 User Login with MySQL2
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    console.log('login email,pass', email,password)
    const sql = `SELECT * FROM users WHERE email = ?`;
    
    const [rows] = await pool.execute(sql, [email]);
    const user = (rows as any[])[0]; // Extract user from result
    
    if (!user) {
      console.log("❌ User not found");
      res.status(400).json({ error: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password.trim());
    if (!isMatch) {
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // Generate JWT Token
    const payload = {
      userId: user.id, // MySQL uses `id`, not `_id`
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const payloadJWT = jwt1.encode(payload, secret());

    res.cookie(cookieName, payloadJWT, {
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      sameSite: "lax",
      secure: false,
    });

    res.status(200).send({ ok: true, payload, token: payloadJWT, date: user.dateTime });
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

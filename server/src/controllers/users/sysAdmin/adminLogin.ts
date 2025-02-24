import { Request, Response } from "express";
import pool from "../../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// ✅ Correctly typed Express handler
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }

    try {
        const [rows]: any = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);

        if (rows.length === 0) {
            res.status(404).json({ error: "Admin not found" });
            return;
        }

        const user = rows[0];

        if (user.role !== "admin") {
            res.status(403).json({ error: "Unauthorized access" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ error: "Invalid password" });
            return;
        }

        // ✅ Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: "admin" },
            "your_secret_key",
            { expiresIn: "1h" }
          );

          
        res.json({ message: "Login successful", token });
    } catch (error: any) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

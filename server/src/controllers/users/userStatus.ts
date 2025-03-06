import { Request, Response } from "express";
import pool from "../../db";
import jwt from "jsonwebtoken";

export const getUserStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const decoded: any = jwt.verify(token, "your_secret_key");
        const [rows]: any = await pool.execute(
            "SELECT status FROM users WHERE email = ?",
            [decoded.email]
        );

        if (rows.length === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ status: rows[0].status }); // ✅ Ensure response is sent correctly
    } catch (error: any) {
        console.error("Error fetching user status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
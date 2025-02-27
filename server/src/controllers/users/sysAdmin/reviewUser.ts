import { Request, Response } from "express";
import pool from "../../../db";

// ✅ Properly typed Express handler
export const reviewUser = async (req: Request, res: Response): Promise<void> => {
    const { userId, action } = req.body;

    if (!userId || !["approved", "rejected"].includes(action)) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    try {
        await pool.execute("UPDATE users SET status = ? WHERE id = ?", [action, userId]);

        res.json({ message: `User has been ${action}.` });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error updating user status" });
    }
};

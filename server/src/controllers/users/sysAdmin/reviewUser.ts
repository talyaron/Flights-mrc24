import { Request, Response } from "express"; 
import pool from "../../../db";

// ✅ Properly typed Express handler
export const reviewUser = async (req: Request, res: Response): Promise<void> => {
    const { email, action } = req.body;

    if (!email || !["approved", "rejected"].includes(action)) {
        res.status(400).json({ error: "Invalid request" });
        return;
    }

    try {
        const [result]: any = await pool.execute(
            "UPDATE users SET status = ? WHERE email = ?",
            [action, email]
        );

        if (result.affectedRows === 0) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        res.json({ message: `User has been ${action}.` });
    } catch (error: any) {
        console.error(error);
        res.status(500).json({ error: "Error updating user status" });
    }
};


import { Request, Response } from "express";
import pool from "../../db"; 
import { IUser } from "../../model/users/userModel"; 

// 🔹 Get a Single User by ID (Converted from Mongoose to MySQL2)
export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // Get userId from request parameters
        console.log("🔍 Fetching User ID:", userId);
        const user = await getUserViaId(userId);
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("❌ Error fetching user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const getUserViaId = async (userId:any) =>{
    const sql = `SELECT * FROM users WHERE id = ?`;
    const [rows] = await pool.execute(sql, [userId]);
    const user = (rows as IUser[])[0]; // Extract the first row as user
    return user;
}
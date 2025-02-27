import { Request, Response } from "express";
import pool from "../../db"; 

export const updateUserRole = async (req: any, res: any) => {

  const { userId, role } = req.body;

  
  const validRoles = ["Passenger", "Employee", "SysAdmin", "Waiting", "Not_Active"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role provided" });
  }
  if (!userId || isNaN(Number(userId))) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const [result] = await pool.query(
      "UPDATE users SET role = ? WHERE id = ?",
      [role, userId]
    );

    if ((result as any).affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: `User role updated to ${role} successfully` });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

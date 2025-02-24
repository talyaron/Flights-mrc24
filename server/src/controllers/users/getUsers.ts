import { Request, Response } from "express";
import pool from "../../db"; 

export const getUsers = async (req: any, res: any) => {
  try {
    
    const [users] = await pool.query(
      "SELECT id, username, email, role, dateTime FROM users"
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

import { Request, Response } from "express";
import { cookieName, getUserById, secret } from "./serviceFunction";
import jwt from "jwt-simple";

export const getUserDataViaCookie = async (req: any, res: any) => {
  try {
    const cookies = req.cookies;
    const cookie = cookies[cookieName];
    
    if (!cookie) {
      return res.status(401).json({ message: "Cookie is not found" });
    }

    const decoded = jwt.decode(cookie, secret());
    if (!decoded.userId) {
      return res.status(401).json({ message: "User Id is not found" });
    }
    
    const user = await getUserById(decoded.userId);
    res.status(200).json(user);
    
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

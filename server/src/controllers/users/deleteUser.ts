import { Request, Response } from "express";
import { deleteUser } from "./serviceFunction";



// 🔹 Delete User
export const deleteUserViaMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    const result = await deleteUser(email);
    console.log('delete email,pass', email)
    
    if (!result) {
      console.log("❌ User not found");
      res.status(400).json({ error: "User not found" });
      return;
    }
    res.status(200).send({ ok: true, message:'successfully deleted'});
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

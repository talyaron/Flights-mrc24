import { Request, Response } from "express";
import { updateUser } from "./serviceFunction";
import { IUser } from "../../model/users/userModel";



// 🔹 Update User
export const updateUserViaMail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email,username,password, role } = req.body;
    
    const user: IUser = { email, username, password, role };
    const result = await updateUser(email, user);
    console.log('update email', email)
    
    if (!result) {
      console.log("❌ User not found");
      res.status(400).json({ error: "User not found" });
      return;
    }
    res.status(200).send({ ok: true, message:'successfully updated'});
  } catch (error) {
    console.error("❌ Error logging in:", error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

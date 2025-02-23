import { NextFunction } from "express";
import { IUser } from "../../model/users/userModel";
import { getUserViaId } from "../users/getUser";

export async function checkUser(req: any, res: any, next: NextFunction) {
  try {
    // extract userId from cookies
    const { userId } = req.cookies;
    console.log("req.cookies", req.cookies);
    console.log(userId);

    const userDB = await getUserViaId(userId);
    if (!userDB) {
      res.status(401).send({ error: "User not found" });
      return;
    }
    req.user = userDB;
    next();
  } catch (error) {
    console.error(error);
    res.send(error);
  }
}

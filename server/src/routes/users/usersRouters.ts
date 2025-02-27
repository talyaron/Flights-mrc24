import express from "express";
import { login } from "../../controllers/users/loginUser";
import { register } from "../../controllers/users/registerUser";
import { getUserById } from "../../controllers/users/getUser";
import { deleteUserViaMail } from "../../controllers/users/deleteUser";
import { updateUserViaMail } from "../../controllers/users/updateUser";
import { getUsers } from "../../controllers/users/getUsers";
import {updateUserRole} from '../../controllers/users/updateUserRole'
const router = express.Router();

router
  .post("/login", login)
  .post("/register", register)
  .post("/getUser/:id", getUserById)
  .delete("/deleteUser", deleteUserViaMail)
  .put("/updateUser", updateUserViaMail)
  .get("/getUsers",getUsers)
  .put("/updateUserRole",updateUserRole);


export default router;

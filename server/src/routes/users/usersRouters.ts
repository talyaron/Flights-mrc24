import express from "express";
import { login } from "../../controllers/users/loginUser";
import { register } from "../../controllers/users/registerUser";
import { getUserById } from "../../controllers/users/getUser";
import { deleteUserViaMail } from "../../controllers/users/deleteUser";
import { updateUserViaMail } from "../../controllers/users/updateUser";
import { getUsers } from "../../controllers/users/getUsers";
import {updateUserRole} from '../../controllers/users/updateUserRole'
import { getUserTickets } from "../../controllers/tickets/getUserTickets";
const router = express.Router();

router
  .post("/login", login)
  .post("/register", register)
  .post("/getUser/:id", getUserById)
  .delete("/deleteUser", deleteUserViaMail)
  .put("/updateUser", updateUserViaMail)
  .get("/getUsers",getUsers)
  .put("/updateUserRole",updateUserRole)
  .get("/tickets/:userId", getUserTickets);


export default router;

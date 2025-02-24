import express from "express";
import { login } from "../../controllers/users/loginUser";
import { register } from "../../controllers/users/registerUser";


 export const router = express.Router();

router
  .post("/login", login)
  .post("/register", register)
  
  

export default router;
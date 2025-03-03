import express from "express";
import { adminLogin } from "../../controllers/users/sysAdmin/adminLogin";
import { reviewUser } from "../../controllers/users/sysAdmin/reviewUser";

 export const router = express.Router();

router
  .post("/admin-login",adminLogin)
  .post("/review-user",reviewUser)

  export default router;
import { Router } from "express";
import {
  loginUserLocal,
  registerUserLocal,
} from "../controllers/user.controllers.js";

const userRouter = Router();

userRouter.route("/register").post(registerUserLocal);
userRouter.route("/login").post(loginUserLocal);

export default userRouter;

import {
  getAllUser,
  getUser,
  getOtherUser,
} from "../controllers/user.controller.js";

import Authorization from "../middlewares/authorization.middleware.js";

import express from "express";

const userRouter = express.Router();

userRouter.get("/get-user", Authorization, getUser);

userRouter.get("/get-all-user", Authorization, getAllUser);

userRouter.get("/get-other-user/:userId", Authorization, getOtherUser);

export default userRouter;

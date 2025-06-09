import express from "express";
import { Register, Login, Logout } from "../controllers/auth.controller.js";
import Authorization from "../middlewares/authorization.middleware.js";
import { userUplaod } from "../middlewares/multer.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", userUplaod.single("profile"), Register);
authRoutes.post("/login", Login);
authRoutes.post("/logout", Authorization, Logout);

export default authRoutes;

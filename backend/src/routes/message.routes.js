import { sendMessage, getMessages } from "../controllers/message.controller.js";
import Authorization from "../middlewares/authorization.middleware.js";

import express from "express";

const messageRoutes = express.Router();

messageRoutes.post("/send-message/:receiver", Authorization, sendMessage);

messageRoutes.get("/receiver-message:receiver", Authorization, getMessages);

export default messageRoutes;

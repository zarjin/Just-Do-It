import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

import connectedb from "./configs/connectedb.config.js";

import authRouter from "./routes/auth.routes.js";
import messageRouter from "./routes/message.routes.js";

import userRouter from "./routes/user.routes.js";

const app = express();

connectedb();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/message", messageRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

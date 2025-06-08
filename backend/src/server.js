import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";

import connectedb from "./configs/connectedb.config.js";

const app = express();

connectedb();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running http://localhost:${PORT}`);
});

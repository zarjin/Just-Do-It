import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../configs/cloudinary.config.js";

const userStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "users",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const messageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "messages",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

export const userUplaod = multer({ storage: userStorage });

export const messageUpload = multer({ storage: messageStorage });

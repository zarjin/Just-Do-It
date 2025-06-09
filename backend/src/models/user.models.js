import { Schema, model } from "mongoose";

const userSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
});

const userModels = model("User", userSchema);

export default userModels;

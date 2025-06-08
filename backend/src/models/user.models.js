import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profile: { type: String },
});

const userModels = mongoose.model("User", userSchema);

export default userModels;

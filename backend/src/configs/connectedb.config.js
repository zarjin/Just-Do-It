import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI;
const connectedb = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("mongodb connected");
  } catch (error) {
    console.log(`mongodb: ${error}`);
  }
};

export default connectedb;

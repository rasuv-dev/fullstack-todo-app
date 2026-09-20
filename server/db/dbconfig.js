import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  try {
    await mongoose.connect(uri);
    console.log("Mongodb Connected Successfully.........");
  } catch (error) {
    console.error("Mongodb connection Error: " + error);
  }
};

export default connectDB;
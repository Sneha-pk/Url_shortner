import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.CONNECTION_STRING) {
      throw new Error(
        "CONNECTION_STRING is not defined in the environment variables."
      );
    }
    const connect = await mongoose.connect(`${process.env.CONNECTION_STRING}`);
    console.log(
      "Database connected:",
      process.env.CONNECTION_STRING,
      connect.connection.host,
      connect.connection.name
    );
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectDB;

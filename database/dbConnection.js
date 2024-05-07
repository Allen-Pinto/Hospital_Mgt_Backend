import mongoose from "mongoose";

let retries = 0;
const maxRetries = 5; // Adjust as needed

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    });
    console.log("Connected to Database");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err}`);
    retries++;

    if (retries < maxRetries) {
      const delay = Math.pow(2, retries) * 1000; // Exponential backoff
      console.log(`Retrying connection in ${delay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      await dbConnection(); // Retry connection
    } else {
      console.error("Failed to connect to MongoDB after retries. Exiting process.");
      process.exit(1); // Exit with an error code
    }
  }
};

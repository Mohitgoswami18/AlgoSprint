import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({path:"../.env"});

const ConnectToDatabase = async() => {
    try {
        console.log(
          "The mongoDbUri is :",
          process.env.DATABASE_URI
        );
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to the database successfully");
    } catch (err) {
        console.log("an error occur while connecting to the database", err);
    }
}

export default ConnectToDatabase;
import mongoose from "mongoose";

const ConnectToDatabase = async() => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Connected to the database successfully");
    } catch (err) {
        console.log("an error occur while connecting to the database", err);
    }
}

export default ConnectToDatabase;
import ConnectToDatabase from "./Database/database.js";
import dotenv from "dotenv";
import app from "./app.js";


dotenv.config();

const port = process.env.PORT || 3000

const connectingDatabase = async () => {
  await ConnectToDatabase();
};

connectingDatabase();

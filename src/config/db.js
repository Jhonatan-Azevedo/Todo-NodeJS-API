import mongoose from "mongoose";
import { config } from "dotenv";
config();

const mongooseDb = mongoose;

const url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/todo`;

console.log("url: ", url);
mongooseDb.connect(url, { useNewUrlParser: true });

export default mongooseDb;

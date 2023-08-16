import mongoose from "mongoose";

const mongooseDb = mongoose;

const url = "mongodb://localhost:27017/todo";

mongooseDb.connect(url, { useNewUrlParse: true });

export default mongooseDb;

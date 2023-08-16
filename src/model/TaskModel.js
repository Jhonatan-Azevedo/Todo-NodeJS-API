import mongooseDb from "../config/db.js";

const Schema = mongooseDb.Schema;

// Create table for task
const TaskSchema = new Schema({
  macaddress: { type: String, required: true },
  type: { type: Number, required: true },
  title: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  when: { type: Date, required: true },
  done: { type: Boolean, default: false },
  created: { type: Date, default: Date.now() },
});

export default mongooseDb.model("Task", TaskSchema);

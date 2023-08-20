import express from "express";
import cors from "cors";
import TaskRoutes from "./routes/TaskRoutes.js";

const server = express();
server.use(cors());
server.use(express.json());
server.use("/task", TaskRoutes);

server.listen(3333, () => {
  console.log("🚀 Api online");
});

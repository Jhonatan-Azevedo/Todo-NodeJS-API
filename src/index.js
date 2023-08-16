import express from "express";
import TaskRoutes from "./routes/TaskRoutes.js";

const server = express();
server.use(express.json());
server.use("/task", TaskRoutes);

server.listen(3000, () => {
  console.log("🚀 Api online");
});

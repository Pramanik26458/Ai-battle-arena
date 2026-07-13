import express from "express";
import  useGraph  from "./service/graph.ai.service.js";
const app = express();
app.get("/health", (req, res) => {
  res
    .status(200)
    .json({
      status: "success",
      message: "Welcome to the AI Battle Arena API!",
    });
});

app.post("/use-graph",async (req, res) => {
  await useGraph("write an factorial function in js");
  res.status(200).json({ status: "success", message: "Graph invoked successfully!" });
});
export default app;

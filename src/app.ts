import express from "express";
import runGraph from "./ai/graph.ai.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the AI Battle Arena API!",
  });
});

app.post("/use-graph", async (req, res) => {
  try {
    const result = await runGraph("write a factorial function in js");

    res.status(200).json({
      status: "success",
      message: "Graph invoked successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

export default app;
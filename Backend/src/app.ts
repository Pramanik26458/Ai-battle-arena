import express from "express";
import runGraph from "./ai/graph.ai.js";
import cors from "cors";

const app = express();

app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL.replace(/\/$/, "")] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser requests (e.g. mobile apps, curl, server-to-server health checks)
    if (!origin) return callback(null, true);

    // Allow localhost, configured FRONTEND_URL, or any *.vercel.app domain (production & previews)
    const isVercel = origin.endsWith(".vercel.app");
    if (allowedOrigins.includes(origin) || isVercel || !process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the ModelBench AI API!",
  });
});

// AI Graph workflow invocation route
app.post("/invoke", async (req, res) => {
  try {
    const { prompt } = req.body; 

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: "Prompt parameter is missing from request body." 
      });
    }

    const result = await runGraph(prompt);

    res.status(200).json({
      message: "Graph executed successfully",
      success: true,
      data: result 
    });
  } catch (error) {
    console.error("Error executing AI graph handler:", error);
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Internal Server Error",
    });
  }
});

// Testing route
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
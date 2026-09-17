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
    const isVercel = /^https:\/\/[a-zA-Z0-9-]+\.vercel\.app$/.test(origin);
    if (allowedOrigins.includes(origin) || isVercel || !process.env.FRONTEND_URL) {
      return callback(null, true);
    }
    return callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  methods: ["GET", "POST"],
  credentials: true,
}));

// 1. Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to the AI Battle Arena API!",
  });
});

// 2. The dynamic route linked to your AI Graph workflow
app.post("/invoke", async (req, res) => {
  try {
    // FIX: Changed from 'input' to 'prompt' to match the Axios request body perfectly
    const { prompt } = req.body; 

    if (!prompt) {
      return res.status(400).json({ 
        success: false, 
        message: "Prompt parameter is missing from request body." 
      });
    }

    // Call your graph processing engine
    const result = await runGraph(prompt);

    // FIX: Encapsulated response matching what App.jsx expects (res.success && res.data)
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

// 3. Testing route placeholder
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

// ALWAYS keep export default at the absolute end of the file structure
export default app;
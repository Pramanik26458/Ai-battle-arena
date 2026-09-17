import app from "./src/app.js";
import { config } from "dotenv";
config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 ModelBench AI Server live at http://0.0.0.0:${PORT}`);
});
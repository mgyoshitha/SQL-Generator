import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generate from "./generate.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3005;

app.post("/generate", async (req, res) => {
  console.log("✅ Reached /generate");
  console.log("📦 Body:", req.body);

  const queryDescription = req.body.queryDescription;

  if (!queryDescription) {
    return res.status(400).json({ error: "Missing queryDescription" });
  }

  try {
    const sqlQuery = await generate(queryDescription);
    res.json({ response: sqlQuery });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

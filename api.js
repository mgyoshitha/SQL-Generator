import express from "express";
import cohere from "cohere-ai";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-sql", async (req, res) => {
  const prompt = req.body.prompt;

  try {
      cohere.init(process.env.COHERE_API_KEY); // ✅ Initialize once

  const response = await cohere.generate({
  model: "command",
  prompt: `Generate SQL query for: ${prompt}`,
  max_tokens: 100,
  temperature: 0.3,
});


    res.json({ sql: response.body.generations[0].text });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating SQL");
  }
});

app.listen(3000, () => console.log("Cohere server running on port 3000"));

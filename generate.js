import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
dotenv.config();

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY,
});

const generate = async (queryDescription) => {
  try {
    const response = await cohere.generate({
      model: "command",
      prompt: `Generate SQL query for: ${queryDescription}`,
      maxTokens: 100,
      temperature: 0.3,
    });

    const sql = response.generations[0].text.trim();
    return sql;
  } catch (error) {
    console.error("❌ Cohere Error:", error.message);
    throw error;
  }
};

export default generate;

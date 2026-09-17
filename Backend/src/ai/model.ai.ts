import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";
import dotenv from "dotenv";
dotenv.config();

export const geminiModel = new ChatGoogle({
  model: "gemini-3.6-flash",
  apiKey: config.GEMINI_API_KEY,
  temperature: 0.2,
  maxOutputTokens: 1024,
});

export const mistralModel = new ChatMistralAI({
  model: "open-mistral-7b",
  apiKey: config.MISTRAL_API_KEY,
  temperature: 0.4,
  maxTokens: 1024,
});

export const cohereModel = new ChatCohere({
  model: "command-r-08-2024",
  apiKey: config.COHERE_API_KEY,
  temperature: 0.4,
  maxTokens: 1024,
});

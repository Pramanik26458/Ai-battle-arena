import {config} from "dotenv";
config();

/**
 * GEMINI_API_KEY: The API key for accessing Google services. This key is used to authenticate requests to various Google APIs.
 * MISTRAL_API_KEY: The API key for accessing Mistral services. This key is used to authenticate requests to Mistral's APIs.
 * COHERE_API_KEY: The API key for accessing Cohere services. This key is used to authenticate requests to Cohere's APIs.
*/

type CONFIG={
   readonly PORT: number;
   readonly FRONTEND_URL: string;
   readonly GEMINI_API_KEY: string;
   readonly MISTRAL_API_KEY: string;
   readonly COHERE_API_KEY: string;
}

const configValues: CONFIG = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  FRONTEND_URL: process.env.FRONTEND_URL || "",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  MISTRAL_API_KEY: process.env.MISTRAL_API_KEY || "",
  COHERE_API_KEY: process.env.COHERE_API_KEY || "",
};

export default configValues;
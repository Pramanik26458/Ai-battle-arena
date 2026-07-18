// import { geminiModel, mistralModel } from "./model.service.js";
// import { HumanMessage } from "@langchain/core/messages";
// import { createAgent, providerStrategy } from "langchain";
// import {
//   StateSchema,
//   MessagesValue,
//   type GraphNode,
//   StateGraph,
//   START,
//   END,
//   ReducedValue,
// } from "@langchain/langgraph";

// import { z } from "zod";
// import { cohereModel } from "./model.service.js";

// const State = new StateSchema({
//   messages: MessagesValue,

//   solution_1: new ReducedValue(
//     z.string().default(""),
//     {
//       reducer: (_, next) => next,
//     }
//   ),

//   solution_2: new ReducedValue(
//     z.string().default(""),
//     {
//       reducer: (_, next) => next,
//     }
//   ),

//  judge_recommendation: new ReducedValue(
//   z.object({
//     winner: z.enum(["solution_1", "solution_2"]),
//     solution_1_score: z.number(),
//     solution_2_score: z.number(),
//   }).default({
//     winner: "solution_1",
//     solution_1_score: 0,
//     solution_2_score: 0,
//   }),
//   {
//     reducer: (_, next) => next,
//   }
// ),

// })


// const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
//   console.log("Generating solutions...");

//   const [mistral_solution, cohere_solution] = await Promise.all([
//     mistralModel.invoke(state.messages[0].content),
//     cohereModel.invoke(state.messages[0].content),
//   ]);

//   return {
//     solution_1: mistral_solution.text,
//     solution_2: cohere_solution.text,
//   };
// };

// const judgementNode: GraphNode<typeof State> = async (state: typeof State) => {
//   console.log("Invoking Judge with state");

//   const { solution_1, solution_2 } = state;

//   const judge = createAgent({
//     model: geminiModel,
//     tools: [],
//     responseFormat: providerStrategy(
//       z.object({
//         winner: z.enum(["solution_1", "solution_2"]),
//         solution_1_score: z.number().min(0).max(10),
//         solution_2_score: z.number().min(0).max(10),
//       })
//     ),
//   });

//   try {
//     const judgeResponse = await judge.invoke({
//       messages: [
//         new HumanMessage(`
// You are an impartial AI judge.

// Your task is to evaluate two responses to the same user prompt.

// User Prompt:
// ${state.messages[0].content}

// Response 1:
// ${solution_1}

// Response 2:
// ${solution_2}

// Evaluate both responses based on:
// - Accuracy and correctness
// - Relevance to the user's prompt
// - Completeness
// - Clarity and coherence
// - Helpfulness
// - Overall quality

// Give each response a score from 0 to 10, where:
// - 0 = Completely incorrect, irrelevant, or unhelpful.
// - 10 = Excellent, accurate, complete, and highly helpful.

// Then decide which response is better overall.

// Return ONLY valid JSON in the following format:

// {
//   "winner": "solution_1",
//   "solution_1_score": 8,
//   "solution_2_score": 9
// }

// Do not include any explanations, markdown, or additional text.
// Return only the JSON object.
//         `),
//       ],
//     });

//     console.log("Judge Response:", judgeResponse);
//     console.log("Structured Response:", judgeResponse.structuredResponse);

//     const result = judgeResponse.structuredResponse;

//     return {
//     judge_recommendation : result,
//     };
//   } catch (error) {
//     console.error("Error while invoking judge:", error);
//     throw error;
//   }
// };

// const graph = new StateGraph(State)
//   .addNode("solutionNode", solutionNode)
//   .addNode("judge",judgementNode)
//   .addEdge(START, "solutionNode")
//   .addEdge("solutionNode", "judge")
//   .addEdge("judge", END)

//   .compile();


// type JUDGEMENT = {
//   winner: "solution_1" | "solution_2";
//   solution_1_score: number;
//   solution_2_score: number;
// };

// type AIBATTLESTATE = {
//   messages: typeof MessagesValue;
//   solution_1: string;
//   solution_2: string;
//   judgement: JUDGEMENT;
// };

// const state: AIBATTLESTATE = {
//   messages: MessagesValue,
//   solution_1: "",
//   solution_2: "",
//   judgement: {
//     winner: "solution_1",
//     solution_1_score: 0,
//     solution_2_score: 0,
//   },
// };

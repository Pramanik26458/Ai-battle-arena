<h1 align="center">
  ⚔️ ModelBench AI
</h1>

<p align="center">
  <strong>Autonomous LLM Benchmarking & Head-to-Head Evaluation</strong><br/>
  Submit any engineering problem — watch two AI models duel — let an AI judge crown the winner.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite" />
  <img src="https://img.shields.io/badge/Node.js-Express-green?style=flat-square&logo=express" />
  <img src="https://img.shields.io/badge/LangGraph-Workflow-orange?style=flat-square" />
  <img src="https://img.shields.io/badge/TypeScript-7-3178C6?style=flat-square&logo=typescript" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat-square&logo=tailwindcss" />
</p>

---

## 📋 Table of Contents

1. [Overview](#-overview)
2. [Live Demo & Screenshots](#-live-demo--screenshots)
3. [Wireframes](#-wireframes)
4. [System Architecture](#-system-architecture)
5. [Project Structure](#-project-structure)
6. [Tech Stack](#-tech-stack)
7. [AI Models & Workflow](#-ai-models--workflow)
8. [API Reference](#-api-reference)
9. [Getting Started](#-getting-started)
   - [Prerequisites](#prerequisites)
   - [Backend Setup](#backend-setup)
   - [Frontend Setup](#frontend-setup)
10. [Environment Variables](#-environment-variables)
11. [Component Reference](#-component-reference)
12. [LangGraph Execution Flow](#-langgraph-execution-flow)
13. [State Machine](#-state-machine)
14. [Deployment](#-deployment)
15. [Contributing](#-contributing)

---

## 🌟 Overview

**ModelBench AI** is a full-stack AI benchmarking platform that pits two Large Language Models head-to-head on any engineering problem you submit. A third AI model then acts as an autonomous judge — scoring and critiquing both responses to declare the champion.

### Key Features

| Feature | Description |
|---|---|
| ⚡ **Parallel Inference** | Mistral AI & Cohere run simultaneously via `Promise.all` — no sequential waiting |
| ⚖️ **Autonomous AI Judge** | Google Gemini evaluates both outputs and returns structured scores (0–10) |
| 📝 **Rich Markdown Rendering** | Code blocks with syntax highlighting, tables, lists — fully rendered |
| 🏆 **Winner Declaration** | Gold trophy UI highlights the winning model with score differential |
| 🌗 **Dark / Light Mode** | System-preference aware, persisted to localStorage |
| 📋 **One-Click Copy** | Copy any solution to clipboard instantly |
| 🔄 **Skeleton Loading** | Live loading state with shimmer animations while models generate |
| 💡 **Example Prompts** | Pre-built benchmarks across Algorithm, Frontend, Architecture, and Utility categories |

---

## 📸 Live Demo & Screenshots

> The app defaults to **dark mode** and detects your OS preference automatically.

### Hero / Empty State
The landing view presents the dual-engine "Model A vs Model B" badge, hero headline, and 4 clickable example benchmark prompts.

### Results View
After submission, the problem is shown at top, followed by two side-by-side solution cards and a full judge panel at the bottom with score bars and per-model reasoning.

### Loading State
An animated "Battle in Progress" banner with shimmer skeleton cards is shown while the AI models generate responses in parallel.

---

## 🖼️ Wireframes

### View 1 — Hero / Empty State

```
┌─────────────────────────────────────────────────────┐
│  ⚔️ ModelBench AI          [New Benchmark] ● [🌙]   │  ← Sticky Header
├─────────────────────────────────────────────────────┤
│                                                     │
│         [ 🤖 Model A ]  VS  [ 🖥️ Model B ]          │  ← Dual Engine Badge
│                                                     │
│      Two AI Models Enter.                           │
│      One Champion Solution.                         │  ← Hero Headline
│                                                     │
│   ── Select an example to run a benchmark ──        │
│  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │ ⚡ ALGORITHM    │  │ 💡 FRONTEND             │  │
│  │ Binary search   │  │ React useEffect pitfalls │  │  ← Example Cards (2x2 grid)
│  └─────────────────┘  └─────────────────────────┘  │
│  ┌─────────────────┐  ┌─────────────────────────┐  │
│  │ 🏗️ ARCHITECTURE │  │ 🔧 UTILITY              │  │
│  │ Distributed RL  │  │ Debounce utility in JS  │  │
│  └─────────────────┘  └─────────────────────────┘  │
│                                                     │
│  ✨ Side-by-Side  •  ⚖️ AI Judge  •  📊 Scoring    │  ← Feature Chips
│                                                     │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐  [Send]  │  ← Fixed Input Dock
│  │ Ask anything — compare two AI solut…  │          │
│  └───────────────────────────────────────┘          │
│  ModelBench AI benchmarks independent LLMs.         │
└─────────────────────────────────────────────────────┘
```

### View 2 — Results View

```
┌─────────────────────────────────────────────────────┐
│  ⚔️ ModelBench AI          [New Benchmark] ● [🌙]   │  ← Sticky Header
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐    │
│  │ 📝 Problem Statement                        │    │  ← ProblemCard
│  │ "Binary search in TypeScript with edge…"   │    │
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  CANDIDATE SOLUTIONS          Side-by-Side Eval     │
│  ┌──────────────────┐  ┌──────────────────────┐     │
│  │ 🏆 Judge's Choice│  │                      │     │
│  │ 🤖 Model A  9/10 │  │ 🖥️ Model B  7/10    │     │  ← SolutionCard x2
│  │ [Copy]           │  │ [Copy]               │     │
│  │ ─────────────── │  │ ──────────────────── │     │
│  │ ```typescript    │  │ ```typescript        │     │
│  │ function bSearch │  │ const binarySearch   │     │
│  │ ...              │  │ ...                  │     │
│  └──────────────────┘  └──────────────────────┘     │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ 🏆 Official Judge Verdict    +2 pt advantage │    │  ← JudgePanel Header
│  │ Model A Declared the Winner                 │    │
│  │ ──────────────────────────────────────────  │    │
│  │ 🤖 Model A ████████████████░░░ 9/10 WINNER  │    │  ← Score Bars
│  │ 🖥️ Model B ██████████████░░░░░ 7/10         │    │
│  │ ──────────────────────────────────────────  │    │
│  │  Model A Evaluation    │  Model B Evaluation │   │  ← Reasoning Cards
│  │  "Excellent clarity…"  │  "Good approach…"   │   │
│  └─────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────┤
│  ┌───────────────────────────────────────┐  [Send]  │  ← Fixed Input Dock
│  │ Ask another prompt to run a new…      │          │
│  └───────────────────────────────────────┘          │
└─────────────────────────────────────────────────────┘
```

### View 3 — Loading State

```
┌─────────────────────────────────────────────────────┐
│  ⚔️ ModelBench AI          [New Benchmark] ● [🌙]   │
├─────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────┐    │
│  │ 📝 [Your submitted problem]                 │    │  ← ProblemCard
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ ⚔️ Battle in Progress  ●  Awaiting outputs… │    │  ← Battle Banner
│  └─────────────────────────────────────────────┘    │
│                                                     │
│  ┌──────────────────┐  ┌──────────────────────┐     │
│  │ 🤖 Model A       │  │ 🖥️ Model B           │     │
│  │ Generating… ⏳   │  │ Generating… ⏳       │     │  ← Skeleton Cards
│  │ ░░░░░░░░░░░░░    │  │ ░░░░░░░░░░░░░        │     │
│  │ ░░░░░░░░░        │  │ ░░░░░░░░░            │     │
│  └──────────────────┘  └──────────────────────┘     │
│                                                     │
│  ┌─────────────────────────────────────────────┐    │
│  │ ░░░░ Judge evaluating… (shimmer skeleton)   │    │  ← Judge Skeleton
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## 🏗️ System Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                         ModelBench AI                                │
│                                                                      │
│  ┌───────────────────────────┐    HTTP POST /invoke                  │
│  │  Frontend (React + Vite)  │ ─────────────────────►  ┌──────────┐ │
│  │                           │ ◄─────────────────────  │ Express  │ │
│  │  App.jsx (state machine)  │    JSON response         │  :3000   │ │
│  │  Header                   │                          └────┬─────┘ │
│  │  ChatInput                │                               │       │
│  │  ProblemCard              │                         LangGraph     │
│  │  SolutionCard (×2)        │                         StateGraph    │
│  │  JudgePanel               │                               │       │
│  │  LoadingState             │               ┌───────────────┤       │
│  │  MarkdownRenderer         │               │               │       │
│  └───────────────────────────┘          ┌────▼────┐    ┌────▼────┐  │
│                                         │ Mistral │    │ Cohere  │  │
│                                         │  7B     │    │Command-R│  │
│                                         │(Sol. 1) │    │(Sol. 2) │  │
│                                         └─────────┘    └─────────┘  │
│                                              └──────────┐            │
│                                                    ┌────▼────┐       │
│                                                    │ Gemini  │       │
│                                                    │ Flash   │       │
│                                                    │ (Judge) │       │
│                                                    └─────────┘       │
└──────────────────────────────────────────────────────────────────────┘
```

### Request / Response Data Flow

```
User Types Prompt
       │
       ▼
  ChatInput.jsx → handleSubmit(prompt)
       │
       ▼  POST /invoke { prompt }
  mockApi.js (axios) ──────────────► Express /invoke route
       │                                      │
       │                              runGraph(prompt)
       │                                      │
       │                          ┌───────────┴──────────┐
       │                          │    solutionNode       │
       │                          │  (parallel execution) │
       │                    ┌─────▼──────┐  ┌────────────▼─┐
       │                    │ Mistral AI │  │  Cohere AI   │
       │                    │ solution_1 │  │  solution_2  │
       │                    └─────┬──────┘  └──────┬───────┘
       │                          └────────┬────────┘
       │                                   │
       │                          ┌────────▼────────┐
       │                          │   judge_node    │
       │                          │  Gemini Flash   │
       │                          │ scores + reason │
       │                          └────────┬────────┘
       │                                   │
       ◄─────── JSON { problem, solution_1, solution_2, judge } ─────────
       │
  App.jsx → setResult(data) → setStatus("done")
       │
  ResultsView:
    ProblemCard + SolutionCard×2 + JudgePanel
```

---

## 📂 Project Structure

```
Ai_Battle_Arena/
├── README.md                       # This file
│
├── Backend/                        # Node.js + Express + LangGraph
│   ├── server.ts                   # Entry point — binds to 0.0.0.0:PORT
│   ├── src/
│   │   ├── app.ts                  # Express app, CORS, route definitions
│   │   ├── ai/
│   │   │   ├── model.ai.ts         # AI model instantiation (Gemini, Mistral, Cohere)
│   │   │   └── graph.ai.ts         # LangGraph StateGraph workflow
│   │   └── config/
│   │       └── config.ts           # Environment variable validation & exports
│   ├── .env.example                # Required environment variables template
│   ├── package.json
│   └── tsconfig.json
│
└── Frontend/                       # React 19 + Vite 7 + TailwindCSS 4
    ├── index.html                  # Root HTML (FOUC prevention, Google Fonts)
    ├── vite.config.js              # Vite + React + Tailwind plugin config
    ├── vercel.json                 # Vercel SPA routing config
    ├── src/
    │   ├── main.jsx                # React DOM root mount
    │   ├── index.css               # Design tokens, Tailwind layers, animations
    │   ├── app/
    │   │   └── App.jsx             # Root component + state machine
    │   ├── components/
    │   │   ├── Header.jsx          # Sticky nav, brand, theme toggle, new benchmark
    │   │   ├── ChatInput.jsx       # Prompt textarea with submission logic
    │   │   ├── ProblemCard.jsx     # Displays the submitted problem statement
    │   │   ├── SolutionCard.jsx    # Model output card (score badge, copy, markdown)
    │   │   ├── JudgePanel.jsx      # Score bars, winner declaration, reasoning cards
    │   │   ├── LoadingState.jsx    # Shimmer skeleton loading UI
    │   │   └── MarkdownRenderer.jsx # react-markdown + syntax highlighting
    │   └── lib/
    │       └── mockApi.js          # Axios client → backend API calls
    ├── .env.example
    └── package.json
```

---

## 🛠️ Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| **React** | 19 | UI component library |
| **Vite** | 7 | Build tool & dev server |
| **TailwindCSS** | 4 | Utility-first CSS framework |
| **react-markdown** | 10 | Markdown rendering |
| **react-syntax-highlighter** | 16 | Code block syntax highlighting |
| **lucide-react** | 1.25 | Icon library |
| **axios** | 1.18 | HTTP client |
| **Inter + JetBrains Mono** | — | Typography (Google Fonts) |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| **Node.js** | 20+ | JavaScript runtime |
| **Express** | 5 | HTTP server framework |
| **TypeScript** | 7 | Type safety |
| **tsx** | 4 | TypeScript execution + hot reload |
| **LangGraph** | 1.4 | AI workflow orchestration (StateGraph) |
| **LangChain Core** | 1.2 | Base AI abstractions |
| **@langchain/mistralai** | 1.2 | Mistral AI integration |
| **@langchain/cohere** | 1.1 | Cohere AI integration |
| **@langchain/google** | 0.2 | Google Gemini integration |
| **Zod** | 4 | Schema validation & structured output |
| **dotenv** | 17 | Environment variable loading |
| **cors** | 2.8 | Cross-origin request handling |

---

## 🤖 AI Models & Workflow

### Models Used

| Role | Model | Provider | Parameters |
|---|---|---|---|
| **Contestant A** | `open-mistral-7b` | Mistral AI | `temp: 0.4`, `maxTokens: 1024` |
| **Contestant B** | `command-r-08-2024` | Cohere | `temp: 0.4` |
| **Judge** | `gemini-3.6-flash` | Google | `temp: 0.2`, `maxOutputTokens: 1024` |

### Why These Models?

- **Mistral 7B** — Fast, capable open-weight model. Great baseline for coding tasks.
- **Cohere Command-R** — Enterprise-grade retrieval-augmented model with strong reasoning.
- **Gemini Flash** — Google's fast reasoning model used as the arbiter. Low temperature ensures consistent, structured evaluations.

### Judge Scoring Criteria

The Gemini judge evaluates each solution on:

| Criterion | Description |
|---|---|
| ✅ **Correctness** | Does it solve the problem accurately? |
| 📖 **Clarity** | Is it well-explained and readable? |
| ⚡ **Performance** | Are there any efficiency concerns? |
| 🏗️ **Best Practices** | Does it follow language/framework conventions? |

Scores are returned as a **Zod-validated structured object** (0–10 per model), ensuring no hallucinated formats.

---

## 📡 API Reference

### Base URL

```
http://localhost:3000
```

### Endpoints

#### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "success",
  "message": "Welcome to the ModelBench AI API!"
}
```

---

#### `POST /invoke`

Runs the full AI battle workflow — generates two solutions in parallel and returns judge scores.

**Request Body:**
```json
{
  "prompt": "Write a binary search function in TypeScript with edge cases"
}
```

**Success Response `200`:**
```json
{
  "message": "Graph executed successfully",
  "success": true,
  "data": {
    "problem": "Write a binary search function in TypeScript with edge cases",
    "solution_1": "## Binary Search in TypeScript\n\n```typescript\nfunction binarySearch...",
    "solution_2": "Here's a clean binary search implementation...",
    "judge": {
      "solution_1_score": 9,
      "solution_2_score": 7,
      "solution_1_reasoning": "Excellent type safety and handles null arrays gracefully...",
      "solution_2_reasoning": "Good approach but misses the case where target is undefined..."
    }
  }
}
```

**Error Response `400` — Missing Prompt:**
```json
{
  "success": false,
  "message": "Prompt parameter is missing from request body."
}
```

**Error Response `500` — Internal Error:**
```json
{
  "success": false,
  "message": "Error description"
}
```

---

#### `POST /use-graph` *(Development Only)*

Runs the graph with a hardcoded test prompt (`"write a factorial function in js"`). Use this to verify the AI workflow is working without needing the frontend.

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Node.js** `>= 20.x` — [nodejs.org](https://nodejs.org)
- **npm** `>= 9.x` (comes with Node.js)
- API keys for:
  - [Google AI Studio](https://aistudio.google.com/) — Gemini (Judge)
  - [Mistral AI Console](https://console.mistral.ai/) — Mistral 7B (Contestant A)
  - [Cohere Dashboard](https://dashboard.cohere.com/) — Command-R (Contestant B)

---

### Backend Setup

```bash
# 1. Navigate to the Backend directory
cd Backend

# 2. Install dependencies
npm install

# 3. Create your environment file from the template
cp .env.example .env
# On Windows: copy .env.example .env

# 4. Edit .env and fill in your API keys (see Environment Variables section)

# 5. Start the development server (with hot reload via tsx)
npm run dev
```

The backend starts at: **`http://localhost:3000`**

Verify it's running:
```bash
curl http://localhost:3000/health
# → { "status": "success", "message": "Welcome to the ModelBench AI API!" }
```

---

### Frontend Setup

Open a **new terminal** in the project root:

```bash
# 1. Navigate to the Frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create your environment file from the template
cp .env.example .env
# On Windows: copy .env.example .env

# 4. (Optional) Edit .env — set VITE_API_BASE_URL if your backend is on a different port

# 5. Start the Vite dev server
npm run dev
```

The frontend starts at: **`http://localhost:5173`**

---

### Running Both Services

Use two terminal windows side by side:

| Terminal 1 (Backend) | Terminal 2 (Frontend) |
|---|---|
| `cd Backend && npm run dev` | `cd Frontend && npm run dev` |
| Starts at `:3000` | Starts at `:5173` |

Open `http://localhost:5173` in your browser.

---

## 🔑 Environment Variables

### Backend — `Backend/.env`

```env
# Server Configuration
PORT=3000
FRONTEND_URL=http://localhost:5173

# AI Provider API Keys
GEMINI_API_KEY=your_gemini_api_key_here
MISTRAL_API_KEY=your_mistral_api_key_here
COHERE_API_KEY=your_cohere_api_key_here
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `PORT` | No | `3000` | Server listening port |
| `FRONTEND_URL` | No | — | Allowed CORS origin. Set to your deployed frontend URL in production. |
| `GEMINI_API_KEY` | **Yes** | — | Google AI Studio API key (Judge model) |
| `MISTRAL_API_KEY` | **Yes** | — | Mistral AI API key (Contestant A) |
| `COHERE_API_KEY` | **Yes** | — | Cohere API key (Contestant B) |

### Frontend — `Frontend/.env`

```env
# Backend API URL
VITE_API_BASE_URL=http://127.0.0.1:3000
```

| Variable | Required | Default | Description |
|---|---|---|---|
| `VITE_API_BASE_URL` | No | `http://127.0.0.1:3000` | Backend API base URL. Set to your deployed backend URL in production. |

> **Note:** All Vite environment variables must be prefixed with `VITE_` to be exposed to the browser bundle.

---

## 🧩 Component Reference

### `App.jsx` — Root Component & State Machine

Manages the application lifecycle and routing between views.

| State | UI Rendered | Trigger |
|---|---|---|
| `idle` | `EmptyState` hero view | App start / reset |
| `loading` | `ProblemCard` + `LoadingState` | On prompt submit |
| `done` | `ResultsView` (full results) | Successful API response |
| `error` | Error card with retry button | Failed API response |

**Key Handlers:**
- `handleSubmit(prompt)` — Calls API, transitions `idle → loading → done/error`
- `handleReset()` — Resets all state to `idle`
- `toggleTheme()` — Toggles dark/light mode, syncs to `localStorage`

---

### `Header.jsx`

Sticky navigation bar with branding, live status indicator, and controls.

| Prop | Type | Description |
|---|---|---|
| `isDark` | `boolean` | Current theme state |
| `onToggleTheme` | `() => void` | Theme toggle callback |
| `showNewBattle` | `boolean` | Shows "New Benchmark" button when not on idle |
| `onNewBattle` | `() => void` | Resets to idle state |

---

### `ChatInput.jsx`

Fixed-bottom prompt input area.

| Prop | Type | Description |
|---|---|---|
| `onSubmit` | `(prompt: string) => void` | Called on form submission |
| `isLoading` | `boolean` | Disables input during API call |
| `placeholder` | `string` | Contextual placeholder text |

---

### `ProblemCard.jsx`

Displays the submitted problem statement prominently.

| Prop | Type | Description |
|---|---|---|
| `problem` | `string` | The user's submitted prompt |

---

### `SolutionCard.jsx`

Full-featured model output card with Markdown rendering.

| Prop | Type | Description |
|---|---|---|
| `number` | `1 \| 2` | Model number (determines color theme: indigo vs cyan) |
| `content` | `string` | Raw markdown response from the model |
| `score` | `number` | Judge score (0–10) |
| `isWinner` | `boolean` | Shows gold "Judge's Choice" trophy banner |
| `animDelay` | `number` | CSS animation delay in milliseconds |

**Score Badge Color Logic:**

| Score | Color | Label |
|---|---|---|
| `≥ 8` | 🟢 Emerald | High |
| `5 – 7` | 🟡 Amber | Mid |
| `< 5` | 🔴 Rose | Low |

---

### `JudgePanel.jsx`

Official verdict section with animated score bars and per-model critique.

| Prop | Type | Description |
|---|---|---|
| `judge` | `object` | `{ solution_1_score, solution_2_score, solution_1_reasoning, solution_2_reasoning }` |

**Internal Sub-components:**
- `ScoreBar` — Animated gradient progress bar per model
- `ReasoningCard` — Detailed judge critique text card

---

### `MarkdownRenderer.jsx`

Full Markdown renderer with code syntax highlighting.

| Prop | Type | Description |
|---|---|---|
| `content` | `string` | Raw markdown string to render |

Supports: headings, bold/italic, code blocks (with language detection), tables, lists, blockquotes.

---

### `LoadingState.jsx`

Animated skeleton loading UI shown during API call.

Sub-components:
- `CardSkeleton` — Shimmer skeleton card for each model
- `JudgeSkeleton` — Shimmer skeleton for the judge panel
- `SkeletonLine` — Single animated shimmer line

---

## 🔄 LangGraph Execution Flow

The backend uses **LangGraph `StateGraph`** to orchestrate the AI workflow in a directed acyclic graph:

```
          State Schema (Zod-validated)
          ┌─────────────────────────────┐
          │ problem:    string           │
          │ solution_1: string           │
          │ solution_2: string           │
          │ judge: {                     │
          │   solution_1_score:   number │
          │   solution_2_score:   number │
          │   solution_1_reasoning:string│
          │   solution_2_reasoning:string│
          │ }                           │
          └─────────────────────────────┘

              START
                │
                ▼
        ┌───────────────┐
        │ solutionNode  │  ← Promise.all([mistralModel, cohereModel])
        │               │    both models run SIMULTANEOUSLY
        │ Writes:        │
        │  solution_1   │
        │  solution_2   │
        └───────┬───────┘
                │
                ▼
        ┌───────────────┐
        │  judge_node   │  ← Gemini evaluates both solutions
        │               │    returns Zod-structured JSON
        │ Writes:        │
        │  judge{}      │
        └───────┬───────┘
                │
                ▼
              END
```

### Design Decisions

| Decision | Rationale |
|---|---|
| **Parallel model execution** | `Promise.all()` in `solutionNode` cuts latency by ~50% vs sequential calls |
| **Structured judge output** | Zod schema + `providerStrategy` guarantees numeric scores — no hallucinated formats |
| **Immutable state slices** | Each node returns only the fields it modifies, following LangGraph's reducer pattern |
| **Low judge temperature** | `temp: 0.2` for Gemini ensures consistent, repeatable scoring |

---

## 🔀 Application State Machine

```
                    ┌──────────────┐
      App starts ──►│    idle      │◄── handleReset() / onNewBattle
                    └──────┬───────┘
                           │ handleSubmit(prompt)
                           ▼
                    ┌──────────────┐
                    │   loading    │  (skeleton UI + battle banner)
                    └──────┬───────┘
                           │
               ┌───────────┴────────────┐
     API success│                        │API error
               ▼                        ▼
        ┌──────────────┐        ┌──────────────┐
        │     done     │        │    error     │
        │  (results)   │        │  (error card)│
        └──────┬───────┘        └──────┬───────┘
               │                       │
               └───────────┬───────────┘
                           │ handleReset()
                           ▼
                    ┌──────────────┐
                    │    idle      │
                    └──────────────┘
```

---

## 🌐 Deployment

### Frontend — Vercel (Recommended)

The project includes `vercel.json` for proper SPA routing support.

```bash
# Build production bundle
cd Frontend && npm run build

# Deploy with Vercel CLI
npx vercel --prod
```

Set this Vercel Environment Variable:
```
VITE_API_BASE_URL = https://your-backend.onrender.com
```

### Backend — Render / Railway / Fly.io

The server binds to `0.0.0.0` and reads `PORT` from the environment — compatible with any Node.js hosting platform.

**Start command:**
```bash
npm start
# or: tsx server.ts
```

**Environment variables to configure on your host:**
```
PORT=3000
FRONTEND_URL=https://your-app.vercel.app
GEMINI_API_KEY=...
MISTRAL_API_KEY=...
COHERE_API_KEY=...
```

### CORS Configuration

The backend automatically allows requests from:
- `http://localhost:5173` (local dev)
- Any `*.vercel.app` domain (Vercel preview + production deployments)
- The value of `FRONTEND_URL` environment variable

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and test locally
4. Commit: `git commit -m 'feat: describe your change'`
5. Push: `git push origin feature/your-feature-name`
6. Open a Pull Request

### Adding a New AI Model

To add a new contestant or replace an existing one:

1. **Install the LangChain adapter:**
   ```bash
   cd Backend && npm install @langchain/your-provider
   ```
2. **Add the model instance** in `src/ai/model.ai.ts`
3. **Add the API key** to `src/config/config.ts` and `.env.example`
4. **Update `solutionNode`** in `src/ai/graph.ai.ts` to invoke the new model
5. **Update the state schema** to include the new solution field (e.g., `solution_3`)
6. **Update the judge prompt** to evaluate the additional solution
7. **Add a new `SolutionCard`** in the frontend's `ResultsView`

---

## 📄 License

This project is open source. Feel free to use, modify, and deploy it for your own AI benchmarking experiments.

---

<p align="center">
  Built with ⚔️ by the ModelBench AI team<br/>
  <em>May the best model win.</em>
</p>

import express from "express";
import path from "path";
import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import fs from "fs";

const app = express();
app.use(express.json());

const PORT = 3000;

const knowledgePath = path.join(process.cwd(), "knowledge.md");
let knowledgeBase = "";
if (fs.existsSync(knowledgePath)) {
  knowledgeBase = fs.readFileSync(knowledgePath, "utf-8");
}

let ai: GoogleGenAI;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

const generatePdfTool: FunctionDeclaration = {
  name: "generatePdfReport",
  description: "Generate a PDF case study report for a specific project based on its details.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      projectName: { type: Type.STRING, description: "Name of the project." },
      overview: { type: Type.STRING, description: "Brief overview of the project." },
      timeline: { type: Type.STRING, description: "Timeline of the project." },
      budget: { type: Type.STRING, description: "Budget/Financials of the project." },
      technicalChallenges: { type: Type.STRING, description: "Technical challenges faced and overcome." },
      strategicImpact: { type: Type.STRING, description: "Strategic impact of the project." },
      environmentalConsiderations: { type: Type.STRING, description: "Environmental considerations." },
      clientFeedback: { type: Type.STRING, description: "Client feedback." },
      lessonsLearned: { type: Type.STRING, description: "Lessons learned." },
      futureRecommendations: { type: Type.STRING, description: "Future recommendations." },
      reportType: { type: Type.STRING, description: "Type of report: 'condensed' or 'detailed'." }
    },
    required: ["projectName", "overview", "timeline", "budget", "technicalChallenges", "strategicImpact", "environmentalConsiderations", "clientFeedback", "lessonsLearned", "futureRecommendations"]
  }
};

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      if (!process.env.GEMINI_API_KEY) {
         throw new Error("GEMINI_API_KEY environment variable is required");
      }
      ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    }

    const { message, history } = req.body;
    
    if (typeof message !== "string" || !Array.isArray(history)) {
       res.status(400).json({ error: "Invalid request payload" });
       return;
    }

    const contents = history.map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents,
      config: {
        systemInstruction: `You are an expert engineering consultant and chatbot for KRB Ingénieurs Conseils.
Use the following knowledge base to assist users. 
Knowledge Base:
${knowledgeBase}

If a user asks to generate a PDF report for a project, call the generatePdfReport tool with the structured data.
CRITICAL: If a query indicates a strategic need, you MUST proactively suggest scheduling a consultation.`,
        tools: [{ functionDeclarations: [generatePdfTool] }]
      }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const functionCall = response.functionCalls[0];
      if (functionCall.name === "generatePdfReport") {
        const args = functionCall.args as any;
        res.json({
          text: `Je génère le rapport PDF pour le projet ${args.projectName}. Veuillez patienter...`,
          action: "generate_pdf",
          pdfData: args
        });
        return;
      }
    }

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

async function startServer() {
  const distPath = path.join(process.cwd(), "dist");
  const isProd = process.env.NODE_ENV === "production" || fs.existsSync(path.join(distPath, "index.html"));

  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

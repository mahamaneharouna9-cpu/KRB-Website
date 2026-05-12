import { GoogleGenAI, Type, FunctionDeclaration } from "@google/genai";
import knowledgeBase from "../../knowledge.md?raw";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Handled by Vite define

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

export async function generateChatResponse(message: string, history: {role: 'user'|'model', text: string}[]) {
  try {
    const contents = history.map((msg) => ({
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
        return {
          text: `Je génère le rapport PDF pour le projet ${args.projectName}. Veuillez patienter...`,
          action: "generate_pdf",
          pdfData: args
        };
      }
    }

    return { text: response.text };
  } catch (error: any) {
    console.error("Chat API Error:", error);
    return { text: "Désolé, une erreur technique s'est produite lors du traitement de votre demande. Détail: " + (error.message || "") };
  }
}


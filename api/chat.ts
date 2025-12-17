import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message, topic, level } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
You are a DSA Mentor.
Explain clearly for a ${level} student.
Topic: ${topic}

User Question:
${message}

Rules:
- Simple explanation
- Use examples
- Provide code if needed
- Mention time complexity
    `;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    res.status(200).json({ reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

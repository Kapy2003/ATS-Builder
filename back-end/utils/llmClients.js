import { Groq } from "groq-sdk";
// import { GoogleGenerativeAI } from "@google-cloud/generative-ai";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Universal function to get a streaming response.
 * If Groq fails (Rate limit/429), it switches to Gemini.
 */
export const getLiveResponse = async (prompt, onChunk) => {
  try {
    // 1. Try Primary: Groq (Llama 3.3)
    const stream = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) onChunk(content);
    }
  } catch (error) {
    // 2. Failover: If Groq hits a limit (429), switch to Gemini
    if (error.status === 429 || error.status === 503) {
      console.warn("Groq limit hit! Switching to Gemini failover...");
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        if (chunkText) onChunk(chunkText);
      }
    } else {
      throw error;
    }
  }
};
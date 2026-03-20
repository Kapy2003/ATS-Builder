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
      // Each message must be its OWN object in the array
messages: [
  { 
    role: "system", // lowercase "system" is the standard for most APIs
    content: "You are a professional career coach. Write clearly. Do not repeat words or sentences. Use standard Markdown." 
  },
  { 
    role: "user", 
    content: prompt 
  }
],
      model: "llama-3.3-70b-versatile",
      stream: true,
      temperature: 0.4,           // Adds slight "creativity" to avoid getting stuck
      max_tokens: 4096,           // Prevents the model from rambling forever
      top_p: 1,                   // Filters out low-probability "nonsense" words
      frequency_penalty: 1,       // DIRECT FIX: Penalizes repeating the same words
      presence_penalty: 0.6,      // Encourages the model to move to new topics/lines
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
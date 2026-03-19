import { getLiveResponse } from "../utils/llmClients.js";

export const refineResume = async (req, res) => {
  const { resumeText, jdText, missingSkills } = req.body;

  // Set headers for SSE (Server-Sent Events)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const prompt = `
    You are an expert ATS (Applicant Tracking System) Optimizer and Career Coach.
    
    JOB DESCRIPTION:
    ${jdText}

    CANDIDATE RESUME:
    ${resumeText}
    
    TASK:
    Generate a personalized 30/60/90-day learning and project roadmap.
    For the expected resume bullets, use the Google X-Y-Z formula: 
    "Accomplished [X] as measured by [Y], by doing [Z]".

    FORMATTING RULES:
    - Output ONLY clean, structured Markdown.
    - Use clear headings (## Day 1-30, etc.), bullet points, and bold text for emphasis.
    - Do NOT output JSON.
  `;

  try {
    await getLiveResponse(prompt, (chunk) => {
      // Send data to frontend as it arrives
      res.write(`data: ${JSON.stringify({ text: chunk })}\n\n`);
    });
    
    // Signal the end of the stream
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    res.write(`data: ${JSON.stringify({ error: "Failed to generate roadmap." })}\n\n`);
    res.end();
  }
};
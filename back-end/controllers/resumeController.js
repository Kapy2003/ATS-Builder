import { getLiveResponse } from "../utils/llmClients.js";

export const refineResume = async (req, res) => {
  const { resumeText, jdText, missingSkills } = req.body;

  // Set headers for SSE (Server-Sent Events)
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const prompt = `
    You are a career coach and technical mentor. 
    A candidate wants to apply for a job with the following description:
    ---
    ${jd_text}
    ---
    Their current resume content is:
    ---
    ${resume_text}
    ---
    Based on the analysis, they are missing these key skills: {', '.join(missing_skills)}
    
    Please generate a personalized 30/60/90-day learning and project roadmap to help them qualify for this role.
    
    Format the response as a JSON object with exactly these keys:
    - "thirty_day": An object with "learning_goals" (list), "project_focus" (object with "title", "description", "technologies"), and "expected_resume_bullets" (list).
    - "sixty_day": Same structure as thirty_day.
    - "ninety_day": Same structure as thirty_day.
    - "project_ideas": A separate list of additional long-term project ideas.
    - "resume_suggestions": A separate list of general ATS advice.
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
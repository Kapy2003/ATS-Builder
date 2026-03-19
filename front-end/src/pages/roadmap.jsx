import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeText, jdText, missingSkills } = location.state || {};

  const [roadmapText, setRoadmapText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!resumeText || !jdText) {
      navigate("/");
      return;
    }

    const fetchRoadmap = async () => {
      try {
        // Fallback to localhost if the .env variable isn't loaded yet
        const apiUrl = import.meta.env.VITE_API_URL ;

        // RECOMMENDED FIX: Added /resume to match your server.js routing!
        const response = await fetch(`${apiUrl}/resume/refine-resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jdText, missingSkills })
        });

        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const messages = buffer.split("\n\n");
          buffer = messages.pop(); // Keep the incomplete chunk in the buffer

          for (const message of messages) {
            if (message.startsWith("data: ")) {
              const dataString = message.replace("data: ", "");
              
              if (dataString.trim() === "[DONE]") {
                setIsLoading(false);
                break;
              }

              try {
                const parsed = JSON.parse(dataString);
                if (parsed.text) {
                  // Append the raw markdown text as it streams in
                  setRoadmapText((prev) => prev + parsed.text);
                }
              } catch (e) {
                // Safely ignore partial JSON strings from the stream
              }
            }
          }
        }
      } catch (err) {
        console.error("Stream Error:", err);
        setError("Connection lost. Please ensure the backend is running.");
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, [resumeText, jdText, missingSkills, navigate]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-8 border-2 border-red-500 bg-red-950 text-red-400 font-mono shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto font-sans text-zinc-300 pb-20">
      <div className="mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2 text-white">
          Your ATS Growth Strategy
        </h1>
        <p className="text-zinc-500">
          A personalized execution plan to bridge your skill gaps.
        </p>
      </div>

      <div className="bg-[#191A23] border-2 border-zinc-800 p-8 md:p-12 rounded-xl shadow-[8px_8px_0px_0px_rgba(185,255,102,1)]">
        {/* prose-lime makes the links and accents match your #B9FF66 theme */}
        <div className="prose prose-invert prose-lime max-w-none font-mono text-sm md:text-base leading-relaxed marker:text-[#B9FF66]">
          <ReactMarkdown>{roadmapText}</ReactMarkdown>
        </div>
        
        {/* Blinking block cursor for that terminal aesthetic */}
        {isLoading && (
          <span className="inline-block w-3 h-5 bg-[#B9FF66] animate-pulse ml-1 align-middle mt-4"></span>
        )}
      </div>
    </div>
  );
}
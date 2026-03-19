import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";

const transformer = new Transformer();

// --- Internal Mindmap Component ---
const MarkmapView = ({ markdown }) => {
  const refSvg = useRef(null);
  const refMm = useRef(null);

  useEffect(() => {
    if (refMm.current) return;
    if (refSvg.current) {
      refMm.current = Markmap.create(refSvg.current);
    }
  }, []);

  useEffect(() => {
    if (refMm.current && markdown) {
      const { root } = transformer.transform(markdown);
      refMm.current.setData(root);
      refMm.current.fit();
    }
  }, [markdown]);

  return <svg className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing" ref={refSvg} />;
};

// --- Main Roadmap Page ---
export default function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract data from navigation state
  const { resumeText, jdText, missingSkills } = location.state || {};

  const [roadmapText, setRoadmapText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("markdown");

  useEffect(() => {
    // If no data exists (e.g., clicked via navbar), do nothing (Empty State logic takes over)
    if (!resumeText || !jdText) return;

    const fetchRoadmap = async () => {
      setIsLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

        const response = await fetch(`${apiUrl}/resume/refine-resume`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ resumeText, jdText, missingSkills })
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const messages = buffer.split("\n\n");
          buffer = messages.pop(); 

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
                  setRoadmapText((prev) => prev + parsed.text);
                }
              } catch (e) {
                // Ignore split stream chunks
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
  }, [resumeText, jdText, missingSkills]);

  // --- 1. Empty State UI (If user clicks Roadmap in Navbar without data) ---
  if (!resumeText || !jdText) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="bg-[#1e1e1e] border border-zinc-800 p-10 rounded-2xl shadow-2xl max-w-md text-center">
          <div className="text-6xl mb-6 opacity-40 text-purple-500">📂</div>
          <h2 className="text-2xl font-bold text-white mb-3">Vault is Empty</h2>
          <p className="text-zinc-500 mb-8 text-sm leading-relaxed">
            Your personal career roadmap hasn't been initialized yet. Head back to the Home page to upload your resume.
          </p>
          <button 
            onClick={() => navigate("/")}
            className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // --- 2. Main Obsidian-style Roadmap UI ---
  return (
    <div className="min-h-screen bg-[#111111] text-zinc-300 font-sans p-4 md:p-8 selection:bg-purple-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-4 font-mono select-none uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => navigate("/")}>Vault</span>
            <span>/</span>
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              <span className="text-xs">📄</span> 90_Day_Strategy.md
            </span>
          </div>
          <div className="flex gap-2 opacity-30">
            <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
            <div className="w-2 h-2 rounded-full bg-zinc-500"></div>
          </div>
        </div>

        {/* The Obsidian Container */}
        <div className="bg-[#1e1e1e] border border-zinc-800/80 rounded-xl shadow-2xl min-h-[75vh] flex flex-col overflow-hidden">
          
          {/* Tab Bar */}
          <div className="border-b border-zinc-800/80 px-2 pt-2 flex items-end bg-[#181818] select-none">
            <button 
              onClick={() => setActiveTab("markdown")}
              className={`px-5 py-2 text-xs font-semibold flex items-center gap-2 rounded-t-md transition-colors border border-b-0 ${
                activeTab === "markdown" 
                  ? "bg-[#1e1e1e] border-zinc-800/80 text-zinc-200" 
                  : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              DOCUMENT
            </button>
            <button 
              onClick={() => setActiveTab("mindmap")}
              className={`px-5 py-2 text-xs font-semibold flex items-center gap-2 rounded-t-md transition-colors border border-b-0 ${
                activeTab === "mindmap" 
                  ? "bg-[#1e1e1e] border-zinc-800/80 text-zinc-200" 
                  : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              MINDMAP
            </button>
          </div>

          {/* Editor/Viewer Content Area */}
          <div className="p-8 md:p-14 flex-grow overflow-auto scrollbar-thin scrollbar-thumb-zinc-800">
            
            {activeTab === "markdown" ? (
              <div className="prose prose-invert max-w-none 
                prose-headings:text-zinc-100 prose-headings:font-bold
                prose-h1:text-3xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-zinc-800 prose-h1:pb-4
                prose-h2:text-xl prose-h2:text-purple-400 prose-h2:mt-10
                prose-p:text-zinc-400 prose-p:leading-7
                prose-li:text-zinc-400 prose-li:marker:text-purple-500
                prose-code:bg-[#2d2d2d] prose-code:text-purple-300 prose-code:px-1.5 prose-code:rounded
              ">
                {error ? (
                   <p className="text-red-400 border border-red-900/50 p-4 rounded bg-red-950/20">{error}</p>
                ) : (
                  <ReactMarkdown>{roadmapText}</ReactMarkdown>
                )}
                
                {isLoading && (
                  <div className="mt-4 flex items-center gap-2">
                    <span className="inline-block w-[2px] h-5 bg-purple-500 animate-pulse"></span>
                    <span className="text-[10px] text-zinc-600 font-mono italic">Writing to vault...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-[600px] bg-[#1a1a1a]/50 rounded-lg border border-zinc-800/50">
                {roadmapText ? (
                  <MarkmapView markdown={roadmapText} />
                ) : (
                  <div className="flex items-center justify-center h-full text-zinc-700 font-mono text-xs uppercase tracking-widest">
                    Initializing Node Visualization...
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Footer controls */}
        {!isLoading && roadmapText && (
          <div className="mt-6 flex justify-end gap-4">
             <button 
               onClick={() => window.print()} 
               className="text-[10px] font-bold text-zinc-500 hover:text-purple-400 uppercase tracking-tighter transition-colors"
             >
               Export as PDF
             </button>
          </div>
        )}
      </div>
    </div>
  );
}
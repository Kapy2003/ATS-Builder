import React, { useState, useEffect, useRef, useMemo, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import ForceGraph2D from "react-force-graph-2d";
import * as d3 from "d3-force";

// --- 1. STYLED MARKDOWN EDITOR (WITH PRINT OVERRIDES) ---
const MemoizedMarkdown = memo(({ content }) => (
  <div className="prose prose-invert max-w-none text-zinc-300
    prose-headings:text-zinc-100 prose-headings:font-bold
    prose-h1:text-3xl prose-h1:mb-8 prose-h1:border-b prose-h1:border-zinc-800 prose-h1:pb-4
    prose-h2:text-xl prose-h2:text-purple-400 prose-h2:mt-10 prose-h2:border-l-4 prose-h2:border-purple-600 prose-h2:pl-4
    prose-h3:text-zinc-200 prose-h3:mt-6 prose-h3:text-sm prose-h3:uppercase prose-h3:tracking-widest
    prose-p:text-zinc-400 prose-p:leading-relaxed
    prose-strong:text-purple-300
    prose-li:text-zinc-400 prose-li:my-1 prose-li:marker:text-purple-500
    prose-code:bg-[#2d2d2d] prose-code:text-purple-300 prose-code:px-1.5 prose-code:rounded
    
    /* --- PRINT STYLES (Overrides Dark Mode for Clean PDF) --- */
    print:prose-headings:text-black print:prose-h1:border-black print:prose-h2:border-black
    print:text-black print:bg-white print:prose-p:text-black print:prose-li:text-black 
    print:prose-strong:text-black print:prose-code:bg-gray-100 print:prose-code:text-black
  ">
    <ReactMarkdown>{content || "Initializing Vault...\nPreparing your career roadmap."}</ReactMarkdown>
  </div>
));

// --- 2. INTERACTIVE NEURAL MAP ---
const SpiderVisualizer = ({ markdown }) => {
  const fgRef = useRef();
  const containerRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoverNode, setHoverNode] = useState(null);

  const truncateText = (str, maxLength = 25) => {
    if (!str) return "";
    return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
  };

  const cleanNodeTitle = (text) => {
    let cleaned = text.replace(/[*_#`]/g, "").trim();
    if (cleaned.includes(":")) cleaned = cleaned.split(":")[0].trim();

    const fluffWords = [
      "Accomplished", "Demonstrated", "Learn about", "Learn", "Master", 
      "Understand", "Familiarize yourself with", "Familiarize", "Practice", 
      "Focus on", "Review", "Develop", "Build", "Create", "Improve", "Enhance", "Work with"
    ];

    fluffWords.forEach(word => {
      const regex = new RegExp(`^${word}\\s+(a\\s+|an\\s+|the\\s+)?`, "i");
      cleaned = cleaned.replace(regex, "");
    });

    if (!cleaned) return "";
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
  };

  const graphData = useMemo(() => {
    const nodes = [{ id: "CORE", label: "ROADMAP", shortLabel: "ROADMAP", val: 16, group: 0 }];
    const links = [];
    if (!markdown) return { nodes, links };

    const lines = markdown.split("\n");
    let lastH2 = null;
    let lastH3 = null;

    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.*)/);
      const h3Match = line.match(/^###\s+(.*)/);
      const bulletMatch = line.match(/^[-*+]\s+(.*)/); 

      if (h2Match) {
        const rawTitle = h2Match[1];
        const cleanTitle = cleanNodeTitle(rawTitle);
        if (cleanTitle && !nodes.find(n => n.id === cleanTitle)) {
          nodes.push({ 
            id: cleanTitle, 
            label: rawTitle.replace(/[*_#]/g, "").trim(), 
            shortLabel: truncateText(cleanTitle, 22), 
            val: 12, group: 1 
          });
          links.push({ source: "CORE", target: cleanTitle });
          lastH2 = cleanTitle;
          lastH3 = null; 
        }
      } else if (h3Match && lastH2) {
        const rawTitle = h3Match[1];
        const cleanTitle = cleanNodeTitle(rawTitle);
        if (cleanTitle && !nodes.find(n => n.id === cleanTitle)) {
          nodes.push({ 
            id: cleanTitle, 
            label: rawTitle.replace(/[*_#]/g, "").trim(), 
            shortLabel: truncateText(cleanTitle, 25), 
            val: 8, group: 2 
          });
          links.push({ source: lastH2, target: cleanTitle });
          lastH3 = cleanTitle;
        }
      } else if (bulletMatch && (lastH3 || lastH2)) {
        const rawTask = bulletMatch[1];
        const cleanTask = cleanNodeTitle(rawTask);
        const parent = lastH3 || lastH2;
        const taskId = `${parent}-${cleanTask}`; 

        if (cleanTask && !nodes.find(n => n.id === taskId)) {
          nodes.push({ 
            id: taskId, 
            label: rawTask.replace(/[*_`]/g, "").trim(), 
            shortLabel: truncateText(cleanTask, 25), 
            val: 4, group: 3 
          });
          links.push({ source: parent, target: taskId });
        }
      }
    });
    return { nodes, links };
  }, [markdown]);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (fgRef.current && dimensions.width && dimensions.height) {
      fgRef.current.d3Force("center", d3.forceCenter(dimensions.width / 2, dimensions.height / 2));
      fgRef.current.d3Force("charge").strength(-400); 
      if (graphData.nodes.length > 1) {
        setTimeout(() => fgRef.current?.zoomToFit(400, 80), 100);
      }
    }
  }, [dimensions, graphData]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[500px] relative bg-[#111111]">
      <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-zinc-600 uppercase tracking-[0.3em] pointer-events-none flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
        Neural_Engine::Active
      </div>
      
      {dimensions.width > 0 && (
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="#111111"
          nodeRelSize={1}
          linkColor={() => "#333"}
          linkDirectionalParticles={1}
          linkDirectionalParticleSpeed={0.005}
          
          // --- THE NEW GORGEOUS HTML TOOLTIP ---
          nodeLabel={node => `
            <div style="
              background: rgba(24, 24, 27, 0.95); 
              border: 1px solid ${node.group === 0 ? '#a855f7' : node.group === 1 ? '#8b5cf6' : node.group === 2 ? '#6366f1' : '#52525b'}; 
              padding: 10px 14px; 
              border-radius: 8px; 
              max-width: 280px; 
              font-family: Inter, sans-serif; 
              font-size: 12px; 
              color: #f4f4f5; 
              white-space: normal; 
              line-height: 1.5; 
              box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);
              backdrop-filter: blur(4px);
            ">
              ${node.label}
            </div>
          `}
          
          onNodeHover={node => {
            if (containerRef.current) {
              containerRef.current.style.cursor = node ? "pointer" : "grab";
            }
            setHoverNode(node);
          }}
          onNodeDragEnd={node => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeClick={node => {
            node.fx = null;
            node.fy = null;
          }}
          
          nodeCanvasObject={(node, ctx, globalScale) => {
            const isHovered = node === hoverNode;
            // ALWAYS use shortLabel on the canvas so it stays clean
            const displayLabel = node.shortLabel; 
            
            const fontSize = isHovered ? 12 : 11; 
            ctx.font = `${isHovered ? "bold " : ""}${fontSize}px "Inter", sans-serif`;
            
            const colors = { 0: "#a855f7", 1: "#8b5cf6", 2: "#6366f1", 3: "#71717a" };
            const sizes = { 0: 7, 1: 5, 2: 3.5, 3: 2 };

            // Draw Dot
            ctx.beginPath();
            ctx.arc(node.x, node.y, sizes[node.group] || 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = colors[node.group] || "#71717a";
            
            if (node.fx !== undefined && node.fx !== null) {
               ctx.strokeStyle = "#fff";
               ctx.lineWidth = 1.5;
               ctx.stroke();
            } else if (node.group < 3 || isHovered) {
               ctx.shadowColor = colors[node.group];
               ctx.shadowBlur = isHovered ? 20 : 10;
            }
            
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw clean canvas text box
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            const textWidth = ctx.measureText(displayLabel).width;
            
            if (isHovered) {
              ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
              ctx.fillRect(node.x - textWidth / 2 - 4, node.y + 6, textWidth + 8, fontSize + 6);
              ctx.strokeStyle = colors[node.group] || "#8b5cf6";
              ctx.lineWidth = 1;
              ctx.strokeRect(node.x - textWidth / 2 - 4, node.y + 6, textWidth + 8, fontSize + 6);
            } else {
              ctx.fillStyle = "rgba(17, 17, 17, 0.75)";
              ctx.fillRect(node.x - textWidth / 2 - 2, node.y + 6, textWidth + 4, fontSize + 4);
            }

            ctx.fillStyle = node.group < 3 || isHovered ? "#ffffff" : "#a1a1aa";
            ctx.fillText(displayLabel, node.x, node.y + 8);
          }}
        />
      )}
    </div>
  );
};

// --- 3. MAIN ROADMAP PAGE ---
export default function Roadmap() {
  const location = useLocation();
  const navigate = useNavigate();
  const { resumeText, jdText, missingSkills } = location.state || {};

  const [roadmapText, setRoadmapText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("markdown");

  useEffect(() => {
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
                // Ignore chunk errors
              }
            }
          }
        }
      } catch (err) {
        setError("Connection lost. Please ensure the backend is running.");
        setIsLoading(false);
      }
    };

    fetchRoadmap();
  }, [resumeText, jdText, missingSkills]);

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

  return (
    <div className="min-h-screen bg-[#111111] text-zinc-300 font-sans p-4 md:p-8 selection:bg-purple-500/30 print:bg-white print:p-0 print:min-h-0">
      <div className="max-w-5xl mx-auto flex flex-col h-[90vh] print:h-auto print:block">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-4 font-mono select-none uppercase tracking-widest flex-shrink-0 print:hidden">
          <div className="flex items-center gap-2">
            <span className="hover:text-zinc-300 cursor-pointer" onClick={() => navigate("/")}>Vault</span>
            <span>/</span>
            <span className="text-purple-400 font-semibold flex items-center gap-1">
              <span className="text-xs">📄</span> 90_Day_Strategy.md
            </span>
          </div>
        </div>

        {/* The Obsidian Container */}
        <div className="bg-[#1e1e1e] border border-zinc-800/80 rounded-xl shadow-2xl flex-grow flex flex-col overflow-hidden print:bg-transparent print:border-none print:shadow-none print:overflow-visible print:block">
          
          {/* Tab Bar */}
          <div className="border-b border-zinc-800/80 px-2 pt-2 flex items-end bg-[#181818] select-none flex-shrink-0 print:hidden">
            <button 
              onClick={() => setActiveTab("markdown")}
              className={`px-5 py-2 text-xs font-semibold flex items-center gap-2 rounded-t-md transition-colors border border-b-0 ${
                activeTab === "markdown" 
                  ? "bg-[#1e1e1e] border-zinc-800/80 text-purple-400" 
                  : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              EDITOR
            </button>
            <button 
              onClick={() => setActiveTab("visualiser")}
              className={`px-5 py-2 text-xs font-semibold flex items-center gap-2 rounded-t-md transition-colors border border-b-0 ${
                activeTab === "visualiser" 
                  ? "bg-[#1e1e1e] border-zinc-800/80 text-purple-400" 
                  : "bg-transparent border-transparent text-zinc-600 hover:text-zinc-400"
              }`}
            >
              NEURAL MAP
            </button>
          </div>

          {/* Dynamic Content Area */}
          <div className="flex-grow overflow-hidden relative print:overflow-visible print:h-auto">
            {activeTab === "markdown" || window.matchMedia("print").matches ? (
              <div className="h-full overflow-y-auto p-8 md:p-14 scrollbar-thin scrollbar-thumb-zinc-800 print:overflow-visible print:p-0 print:h-auto">
                {error ? (
                   <p className="text-red-400 border border-red-900/50 p-4 rounded bg-red-950/20 print:hidden">{error}</p>
                ) : (
                  <MemoizedMarkdown content={roadmapText} />
                )}
                
                {isLoading && (
                  <div className="mt-8 flex items-center gap-2 print:hidden">
                    <span className="inline-block w-1.5 h-4 bg-purple-500 animate-pulse"></span>
                    <span className="text-[10px] text-zinc-600 font-mono tracking-widest uppercase">Writing to vault...</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full w-full print:hidden">
                <SpiderVisualizer markdown={roadmapText} />
              </div>
            )}
          </div>
        </div>
        
        {/* Footer controls */}
        <div className="mt-6 flex justify-end gap-4 flex-shrink-0 min-h-[40px] print:hidden">
          {!isLoading && roadmapText && (
            <button 
              onClick={() => {
                if(activeTab !== "markdown") setActiveTab("markdown");
                setTimeout(() => window.print(), 150); 
              }} 
              className="px-4 py-2 text-[10px] font-bold text-zinc-500 hover:text-purple-400 border border-transparent hover:border-zinc-800 rounded uppercase tracking-widest transition-all"
            >
              Export as PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
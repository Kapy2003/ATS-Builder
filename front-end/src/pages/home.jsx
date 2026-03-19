import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/hero";
import FeatureCard from "../components/featurecard";

const Home = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");

  const handleGenerate = (e) => {
    e.preventDefault();
    
    if (!resumeText.trim() || !jdText.trim()) {
      alert("Please enter both your resume and the job description.");
      return;
    }

    // This sends the user to the /roadmap route and passes the text invisibly
    navigate("/roadmap", { 
      state: { 
        resumeText: resumeText, 
        jdText: jdText, 
        missingSkills: [] // For now, we pass an empty array until you add the static analysis step
      } 
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Hero />

      {/* --- NEW INPUT SECTION --- */}
      <section className="mt-16 bg-[#191A23] rounded-3xl p-8 md:p-12 shadow-[8px_8px_0px_0px_rgba(185,255,102,1)]">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Test Your ATS Match
          </h2>
          <p className="text-zinc-400">
            Paste your current resume and the target job description below to generate a custom 90-day growth roadmap.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Resume Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[#B9FF66] font-bold uppercase tracking-wider text-sm">
                Your Resume
              </label>
              <textarea
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                className="w-full h-64 p-4 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-lg focus:outline-none focus:border-[#B9FF66] focus:ring-1 focus:ring-[#B9FF66] font-mono text-sm resize-none"
              />
            </div>

            {/* Job Description Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[#B9FF66] font-bold uppercase tracking-wider text-sm">
                Target Job Description
              </label>
              <textarea
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description here..."
                className="w-full h-64 p-4 bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-lg focus:outline-none focus:border-[#B9FF66] focus:ring-1 focus:ring-[#B9FF66] font-mono text-sm resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              className="bg-[#B9FF66] text-[#191A23] font-bold text-lg px-8 py-4 rounded-xl border-2 border-[#191A23] hover:bg-white hover:-translate-y-1 transition-all shadow-[4px_4px_0px_0px_rgba(25,26,35,1)]"
            >
              Generate Strategy
            </button>
          </div>
        </form>
      </section>
      {/* --- END INPUT SECTION --- */}

      <section className="mt-24 pb-20">
        <div className="flex items-center gap-8 mb-10">
          <h2 className="text-4xl font-bold bg-[#B9FF66] px-4 py-1 rounded-md inline-block text-[#191A23]">
            AI Features
          </h2>
          <p className="text-lg max-w-md text-gray-700">
            Streamline your hiring pipeline with AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FeatureCard 
            titleLine1="Resume" 
            titleLine2="Refiner Engine [coming soon]" 
            variant="light" 
          />
          <FeatureCard 
            titleLine1="Resume" 
            titleLine2="Architect [coming soon]" 
            variant="green" 
          />
          <FeatureCard 
            titleLine1="Resume" 
            titleLine2="Skill Gap Finder [coming soon]" 
            variant="dark" 
          />          
          <FeatureCard 
            titleLine1="Resume" 
            titleLine2="Resource Navigator [coming soon]" 
            variant="light" 
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
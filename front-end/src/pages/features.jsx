import React, { useState } from "react";

const Features = () => {
  const features = [
    "Deep PDF Parsing",
    "AI Formatting",
    "Keyword Optimization",
    "Smart Scoring",
  ];

const descriptions = {
  "Deep PDF Parsing":
    "Our platform uses advanced parsing technology to deeply analyze PDF resumes and extract structured information such as work experience, education, skills, and certifications. It ensures high accuracy even with complex resume layouts, helping recruiters and ATS systems understand candidate profiles clearly.",

  "AI Formatting":
    "Automatically transform your resume into a clean, modern, and ATS-friendly layout. Our AI adjusts spacing, headings, fonts, and sections so that your resume is both visually appealing for recruiters and properly structured for applicant tracking systems.",

  "Keyword Optimization":
    "Receive intelligent keyword suggestions based on the job description you are targeting. The system highlights missing industry keywords and skills, helping you optimize your resume so it passes ATS filters and ranks higher during automated screening.",

  "Smart Scoring":
    "Get a comprehensive score that evaluates how well your resume aligns with the job description. The smart scoring system analyzes formatting, keyword relevance, skills match, and content quality, giving you actionable insights to improve your chances of getting shortlisted."
};

  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="py-10  h-[80vh]">
      <h1 className="text-4xl font-bold bg-[#191A23] text-white px-2 rounded-md inline-block mb-10">
        Platform Features
      </h1>

      <div className="space-y-4">
        {features.map((f) => (
          <div
            key={f}
            className="flex items-start gap-4 text-2xl font-bold p-4 border-b border-gray-200 cursor-pointer"
            onMouseEnter={() => setHoveredFeature(f)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div>
              <span className="text-[#B9FF66]">✦</span> {f}

              <p
                className={`text-base font-normal text-gray-600 ml-8 overflow-hidden transition-all duration-500 ease-in-out
                ${
                  hoveredFeature === f
                    ? "max-h-40 opacity-100 translate-y-0 mt-2"
                    : "max-h-0 opacity-0 -translate-y-2"
                }`}
              >
                {descriptions[f]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
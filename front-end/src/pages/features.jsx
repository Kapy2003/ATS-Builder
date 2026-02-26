import React from 'react';

const Features = () => {
  const features = ['Deep PDF Parsing', 'AI Formatting', 'Keyword Optimization', 'Smart Scoring'];
  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold bg-[#191A23] text-white px-2 rounded-md inline-block mb-10">Platform Features</h1>
      <div className="space-y-4">
        {features.map((f) => (
          <div key={f} className="flex items-center gap-4 text-2xl font-bold p-4 border-b border-gray-200">
            <span className="text-[#B9FF66]">✦</span> {f}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
import React from 'react';

const Templates = () => {
  const templates = [
    { title: 'Standard ATS', color: 'bg-[#F3F3F3]' },
    { title: 'Tech Specialist', color: 'bg-[#B9FF66]' },
    { title: 'Executive CV', color: 'bg-[#191A23]', textColor: 'text-white' },
  ];

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold bg-[#B9FF66] px-2 rounded-md inline-block mb-10">Resume Templates</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((t) => (
          <div key={t.title} className={`${t.color} border border-[#191A23] p-8 rounded-[30px] shadow-[6px_6px_0px_0px_rgba(25,26,35,1)]`}>
            <h3 className={`text-2xl font-bold ${t.textColor || 'text-[#191A23]'}`}>{t.title}</h3>
            <button className="mt-6 bg-[#191A23] text-white px-4 py-2 rounded-xl text-sm">Select Template</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
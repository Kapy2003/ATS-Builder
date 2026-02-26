import React from 'react';

const Templates = () => {
  const templates = [
  { 
    title: 'Standard ATS', 
    color: 'bg-[#F3F3F3]', 
    btnClass: 'bg-[#191A23] text-white',
    borderColor: 'border-[#191A23]'
  },
  { 
    title: 'Tech Specialist', 
    color: 'bg-[#B9FF66]', 
    btnClass: 'bg-[#191A23] text-white',
    // borderColor: 'border-[#191A23]'
  },
  { 
    title: 'Executive CV', 
    color: 'bg-[#191A23]', 
    textColor: 'text-white',
    btnClass: 'bg-[#B9FF66] text-[#191A23]',
    borderColor: 'border-[#B9FF66]' // change if you want different border
  },
];

  return (
    <div className="py-10">
      <h1 className="text-4xl font-bold bg-[#B9FF66] px-2 rounded-md inline-block mb-10">
        Resume Templates
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {templates.map((t) => (
          <div 
            key={t.title} 
            className={`${t.color} border border-[#B9FF66] p-8 rounded-[30px] shadow-[6px_6px_0px_0px_rgba(25,26,35,1)] flex flex-col justify-between h-[250px] transition-transform hover:-translate-y-1`}
          >
            <h3 className={`text-2xl font-bold ${t.textColor || 'text-[#191A23]'}`}>
              {t.title}
            </h3>
            
            <button className={`mt-6 ${t.btnClass} px-6 py-3 rounded-xl font-bold transition-all hover:opacity-90 active:scale-95 w-fit`}>
              Select Template
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
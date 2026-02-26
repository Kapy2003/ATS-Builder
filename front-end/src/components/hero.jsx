const Hero = () => {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      <div className="max-w-lg">
        <h1 className="text-6xl font-bold leading-tight mb-6">
          Navigating the <span className="bg-[#B9FF66] px-2 rounded-md">AI landscape</span> for success
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Our intelligent engine helps automate candidate tracking and resume parsing using state-of-the-art LLM integration.
        </p>
            <button className="
            group relative
            bg-[#191A23] text-white 
            px-8 py-4 rounded-[14px] 
            font-bold text-lg
            border-2 border-transparent
            
            /* The Shadow */
            shadow-[4px_4px_0px_0px_rgba(185,255,102,1)] 
            
            /* Hover States */
            hover:bg-[#B9FF66] 
            hover:text-[#191A23] 
            hover:border-[#191A23]
            hover:-translate-y-1 
            hover:shadow-[6px_6px_0px_0px_rgba(25,26,35,1)]
            
            /* Active/Click States */
            active:translate-y-[2px] 
            active:translate-x-[2px] 
            active:shadow-none
            
            /* Smooth Transitions */
            transition-all duration-200 ease-in-out
            ">
            <span className="flex items-center gap-2">
                Upload Resume
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            </button>
      </div>

      <div className="flex justify-center md:justify-end">

        <svg
        viewBox="0 0 100 100"
        className="z-10 w-2/3 h-2/3 transition-transform duration-500 hover:scale-110" 
        xmlns="http://www.w3.org/2000/svg"
        >
        {/* Larger Document Body */}
        <rect x="15" y="10" width="70" height="80" rx="4" fill="white" stroke="#191A23" strokeWidth="3" />
        
        {/* Scaled Text Lines */}
        <rect x="25" y="30" width="50" height="3" rx="1.5" fill="#191A23" />
        <rect x="25" y="42" width="50" height="3" rx="1.5" fill="#191A23" />
        <rect x="25" y="54" width="30" height="3" rx="1.5" fill="#191A23" />
        
        {/* Search Circle */}
        <circle cx="65" cy="55" r="6" fill="#191A23" />
        
        {/* Wider Scanner Bar */}
        <rect
            x="10" y="10" 
            width="80" height="5"
            rx="2.5"
            fill="#B9FF66"
            stroke="#191A23"
            strokeWidth="2"
            className="animate-scan"
        />
        </svg>
      </div>
    </main>
  );
};

export default Hero;
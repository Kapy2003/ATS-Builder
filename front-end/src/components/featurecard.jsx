const FeatureCard = ({ titleLine1, titleLine2, variant = 'light', onAction }) => {
  const themes = {
    light: {
      container: "bg-[#F3F3F3] border-[#191A23] shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]",
      title: "bg-[#B9FF66] text-[#191A23]",
      button: "bg-[#191A23] text-[#B9FF66]",
      text: "text-black"
    },
    green: {
      container: "bg-[#B9FF66] border-[#191A23] shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]",
      title: "bg-white text-[#191A23]",
      button: "bg-[#191A23] text-[#B9FF66]",
      text: "text-black"
    },
    dark: {
      // Changed border to green and shadow to green to match your request
      container: "bg-[#191A23] border-[#B9FF66] shadow-[8px_8px_0px_0px_rgba(185,255,102,1)]",
      title: "bg-white text-[#191A23]",
      button: "bg-white text-[#191A23]",
      text: "text-white"
    }
  };

  const theme = themes[variant];

  return (
    <div className={`${theme.container} border rounded-[40px] p-10 flex flex-col justify-between h-[250px] transition-transform hover:-translate-y-1`}>
      <div>
        <h3 className={`text-2xl font-bold ${theme.title} inline-block px-2 rounded-md mb-2`}>
          {titleLine1}
        </h3>
        <br />
        <h3 className={`text-2xl font-bold ${theme.title} inline-block px-2 rounded-md`}>
          {titleLine2}
        </h3>
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={onAction}
          className={`${theme.button} w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-110 transition-transform`}
        >
          ↗
        </button>
        <span className={`font-medium text-lg ${theme.text}`}>Try it out</span>
      </div>
    </div>
  );
};

export default FeatureCard;
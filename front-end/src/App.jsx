import { Routes, Route, NavLink, Link } from 'react-router-dom';
import ContactUs from './pages/contact-us';
import AboutUs from './pages/about-us';
import Features from './pages/features';
import Templates from './pages/templates';

// Home component containing Hero and the restored Features Grid
const Home = () => (
  <>
    {/* Hero Section */}
    <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       <div className="max-w-lg">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Navigating the <span className="bg-[#B9FF66] px-2 rounded-md">AI landscape</span> for success
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Our intelligent engine helps automate candidate tracking and resume parsing using state-of-the-art LLM integration.
          </p>
          <button className="bg-[#191A23] text-white px-8 py-4 rounded-[14px] shadow-lg hover:bg-black transition-colors">
            Upload Resume
          </button>
        </div>
        <div className="w-full h-[400px] bg-[#F3F3F3] rounded-[40px] border border-[#191A23] flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]">
          <p className="text-[#191A23] font-bold text-xl">Illustration Graphic</p>
        </div>
    </main>

    {/* ATS Features Grid */}
    <section className="mt-24 pb-20">
      <div className="flex items-center gap-8 mb-10">
        <h2 className="text-4xl font-bold bg-[#B9FF66] px-4 py-1 rounded-md inline-block">
          AI Features
        </h2>
        <p className="text-lg max-w-md text-gray-700">
          Streamline your hiring pipeline with Gemini-powered tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card 1: Resume Parsing */}
        <div className="bg-[#F3F3F3] border border-[#191A23] rounded-[40px] p-10 shadow-[8px_8px_0px_0px_rgba(25,26,35,1)] flex flex-col justify-between h-[250px] transition-transform hover:-translate-y-1">
          <div>
            <h3 className="text-2xl font-bold bg-[#B9FF66] inline-block px-2 rounded-md mb-2">Resume Parsing</h3>
            <h3 className="text-2xl font-bold bg-[#B9FF66] inline-block px-2 rounded-md">Engine</h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#191A23] text-[#B9FF66] w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-105">↗</button>
            <span className="font-medium text-lg">Try it out</span>
          </div>
        </div>

        {/* Card 2: Candidate Scoring */}
        <div className="bg-[#B9FF66] border border-[#191A23] rounded-[40px] p-10 shadow-[8px_8px_0px_0px_rgba(25,26,35,1)] flex flex-col justify-between h-[250px] transition-transform hover:-translate-y-1">
          <div>
            <h3 className="text-2xl font-bold bg-white inline-block px-2 rounded-md mb-2">Automated</h3>
            <h3 className="text-2xl font-bold bg-white inline-block px-2 rounded-md">Candidate Scoring</h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-[#191A23] text-[#B9FF66] w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-105">↗</button>
            <span className="font-medium text-lg">Try it out</span>
          </div>
        </div>

        {/* Card 3: Smart Interview Scheduling */}
        <div className="bg-[#191A23] border border-[#191A23] rounded-[40px] p-10 shadow-[8px_8px_0px_0px_rgba(25,26,35,1)] flex flex-col justify-between h-[250px] transition-transform hover:-translate-y-1">
          <div>
            <h3 className="text-2xl font-bold bg-white text-[#191A23] inline-block px-2 rounded-md mb-2">Smart Interview</h3>
            <h3 className="text-2xl font-bold bg-white text-[#191A23] inline-block px-2 rounded-md">Scheduling</h3>
          </div>
          <div className="flex items-center gap-4">
            <button className="bg-white text-[#191A23] w-10 h-10 rounded-full flex items-center justify-center text-xl hover:scale-105 transition-transform">
              ↗
            </button>
            <span className="text-white font-medium text-lg">Try it out</span>
          </div>
        </div>
      </div>
    </section>
  </>
);

export default function App() {
  return (
    <div className="min-h-screen px-10 py-8 max-w-7xl mx-auto">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-20">
        <div className="text-2xl font-bold">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[#B9FF66]">✦</span> AI Platform
          </Link>
        </div>

        {/* Dynamic Navigation Links with Active State Styling */}
        <div className="hidden md:flex gap-4 items-center font-medium">
          {[
            { name: 'Contact Us', path: '/contact-us' },
            { name: 'About Us', path: '/about-us' },
            { name: 'Features', path: '/features' },
            { name: 'Templates', path: '/templates' }
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `px-4 py-2 rounded-md transition-all border-2 duration-200 ${
                  isActive 
                    ? 'bg-[#B9FF66] border-[#191A23] text-[#191A23] shadow-[2px_2px_0px_0px_rgba(25,26,35,1)] font-bold' 
                    : 'border-transparent text-[#191A23] hover:text-[#B9FF66] hover:border-[#191A23]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/features" element={<Features />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </div>
  );
}
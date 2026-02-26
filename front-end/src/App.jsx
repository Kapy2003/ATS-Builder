import { Routes, Route, Link } from 'react-router-dom';
import ContactUs from './pages/contact-us';
import AboutUs from './pages/about-us';
import Features from './pages/features';
import Templates from './pages/templates';

const Home = () => (
  <>
    {/* Hero Section */}
    <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       <div className="max-w-lg">
          <h1 className="text-6xl font-bold leading-tight mb-6">
            Navigating the <span className="bg-[#B9FF66] px-2 rounded-md">AI landscape</span> for success
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Our intelligent engine helps automate candidate tracking and resume parsing.
          </p>
          <button className="bg-[#191A23] text-white px-8 py-4 rounded-[14px] shadow-lg">
            Upload Resume
          </button>
        </div>
        <div className="w-full h-[400px] bg-[#F3F3F3] rounded-[40px] border border-[#191A23] flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]">
          <p className="text-[#191A23] font-bold text-xl">Illustration Graphic</p>
        </div>
    </main>

    {/* ATS Features Grid Restored */}
    <section className="mt-24 pb-20">
      <div className="flex items-center gap-8 mb-10">
        <h2 className="text-4xl font-bold bg-[#B9FF66] px-4 py-1 rounded-md inline-block">
          AI Features
        </h2>
        <p className="text-lg max-w-md">
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
        {/* Card 3: Dark Theme */}
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
      <nav className="flex justify-between items-center mb-20">
        <div className="text-2xl font-bold">
          <Link to="/">✦ AI Platform</Link>
        </div>
        <div className="hidden md:flex gap-8 items-center font-medium">
          <Link to='/contact-us' className="hover:text-[#B9FF66]">Contact Us</Link>
          <Link to='/about-us' className="hover:text-[#B9FF66]">About Us</Link>
          <Link to="/features" className="hover:text-[#B9FF66]">Features</Link>
          <Link to="/templates" className="hover:text-[#B9FF66]">Templates</Link>
        </div>
      </nav>

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
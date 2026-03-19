// src/App.jsx
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import Home from './pages/home';
import ContactUs from './pages/contact-us';
import AboutUs from './pages/about-us';
import Features from './pages/features';
import Templates from './pages/templates';
import Roadmap from './pages/roadmap'; 

export default function App() {
  return (
    <div className="min-h-screen px-10 py-8 max-w-7xl mx-auto text-[#191A23]">
      {/* Navigation */}
      <nav className="flex justify-between items-center mb-20">
        <div className="text-2xl font-bold">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[#B9FF66]">✦</span> AI Platform
          </Link>
        </div>

        {/* Dynamic Navigation Links */}
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
                    ? 'bg-[#B9FF66] border-[#191A23] shadow-[2px_2px_0px_0px_rgba(25,26,35,1)] font-bold' 
                    : 'border-transparent hover:bg-[#B9FF66] hover:border-[#191A23] hover:shadow-[2px_2px_0px_0px_rgba(25,26,35,1)]'
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
        <Route path="/roadmap" element={<Roadmap />} /> 
      </Routes>
    </div>
  );
}
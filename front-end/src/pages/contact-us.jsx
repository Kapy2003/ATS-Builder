import React, { useState } from "react";
import { sendContactMessage } from "../services/contactService";

const ContactUs = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await sendContactMessage(formData);
      alert(res.message);
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <div className="bg-[#F3F3F3] rounded-[40px] p-12 border border-[#191A23] shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]">
      <h1 className="text-4xl font-bold bg-[#B9FF66] px-2 rounded-md inline-block mb-8">
        Contact Us
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        <form className="space-y-6" onSubmit={handleSubmit}>

          <div>
            <label className="block font-bold mb-2">Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full border-2 border-[#191A23] p-4 rounded-[14px]"
              placeholder="Name"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full border-2 border-[#191A23] p-4 rounded-[14px]"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Message</label>
            <textarea
              name="message"
              onChange={handleChange}
              className="w-full border-2 border-[#191A23] p-4 rounded-[14px] h-32"
              placeholder="Type Your Message Here"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#191A23] text-white py-4 rounded-[14px] font-bold text-lg"
          >
            Send Message
          </button>

        </form>

{/* Right: Graphic Elements Only */}
        <div className="flex flex-col items-center justify-center space-y-16 py-10">
          
          {/* Email Graphic */}
          <div className="icon-container-box w-28 h-28 flex items-center justify-center bg-white border-2 border-[#191A23] rounded-[30px] shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]">
            <svg 
              width="54" height="54" viewBox="0 0 24 24" fill="none" 
              stroke="#191A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ overflow: "visible" }}
            >
              <path d="M4 6h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V8c0-1.1.9-2 2-2z" />
              <polyline points="22,8 12,15 2,8" className="mail-flap" />
            </svg>
          </div>

          {/* Location Graphic */}
          <div className="icon-container-box w-28 h-28 flex items-center justify-center bg-white border-2 border-[#191A23] rounded-[30px] shadow-[8px_8px_0px_0px_rgba(25,26,35,1)]">
            <svg 
              width="54" height="54" viewBox="0 0 24 24" fill="none" 
              stroke="#191A23" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" fill="#B9FF66" className="location-pulse" />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUs;
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

        <div className="flex flex-col justify-center">
          <p className="text-xl font-bold">Email: test@gmail.com</p>
          <p className="text-xl mt-2">Address: HOME</p>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
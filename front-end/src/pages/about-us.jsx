import React from 'react';

const AboutUs = () => {
  return (
    <div className="py-10 max-w-3xl">
      
      {/* Heading */}
      <h1 className="text-4xl font-bold bg-[#B9FF66] px-3 py-1 rounded-md inline-block mb-8">
        About ATS Resume Builder
      </h1>

      {/* Intro */}
      <p className="text-xl leading-relaxed font-medium">
        Welcome to ATS Resume Builder – your smart partner in creating professional, job-winning resumes.
        We make resume building simple and easy for students, freshers, and job seekers.
      </p>

      {/* Mission */}
      <h2 className="mt-8 text-2xl font-semibold">🎯 Our Mission</h2>
      <p className="mt-2 text-gray-700">
        Our mission is to help everyone create strong and professional resumes quickly without needing design or technical skills.
      </p>

      {/* Vision */}
      <h2 className="mt-6 text-2xl font-semibold">🌍 Our Vision</h2>
      <p className="mt-2 text-gray-700">
        We aim to become a trusted platform for resume building and help people achieve their dream jobs.
      </p>

      {/* Why Choose Us */}
      <h2 className="mt-6 text-2xl font-semibold">⭐ Why Choose Us</h2>
      <ul className="mt-2 list-disc list-inside text-gray-700">
        <li>Easy-to-use interface</li>
        <li>ATS-friendly resumes</li>
        <li>Professional templates</li>
        <li>Fast and free resume creation</li>
      </ul>

      {/* Features */}
      <h2 className="mt-6 text-2xl font-semibold">🚀 Features</h2>
      <ul className="mt-2 list-disc list-inside text-gray-700">
        <li>Multiple resume templates</li>
        <li>Real-time preview</li>
        <li>Download in PDF format</li>
        <li>Easy customization</li>
      </ul>

      {/* Story */}
      <h2 className="mt-6 text-2xl font-semibold">💡 Our Story</h2>
      <p className="mt-2 text-gray-700">
        This platform was created to solve a common problem — many students struggle to create professional resumes.
        We built this tool to make the process simple, fast, and effective.
      </p>

      {/* CTA */}
      <h2 className="mt-6 text-2xl font-semibold">🔥 Get Started</h2>
      <p className="mt-2 text-gray-700">
        Start building your resume today and take the first step toward your dream job!
      </p>

    </div>
  );
};

export default AboutUs;
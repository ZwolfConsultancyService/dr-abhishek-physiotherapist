import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-0.5 bg-black"></div>
              <span className="text-black text-xs tracking-widest uppercase font-semibold">
                WHO WE ARE
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{ fontFamily: "Lexend Peta, sans-serif" }}
              className="text-3xl md:text-4xl lg:text-5xl text-black leading-tight"
            >
              Welcome to Physio Therapy & Chiropractic Clinic
            </h2>

            {/* Paragraphs */}
            <div className="space-y-5">
              <p className="text-gray-700 text-lg leading-relaxed">
                PhysioCentric is more popularly known as medical therapy which helps a patient
                in the rehabilitation of various types of diseases and disabilities.
              </p>
              <p className="text-gray-500 text-base leading-relaxed">
                Physiotherapists have a better understanding of how the body works. They help
                patients recover from pain, injury, paralysis, ligament injury, and neurological
                conditions. Our physiotherapists are highly qualified and focused on maintaining
                health for people of all ages.
              </p>
            </div>

            {/* CTA */}
            <Link to="/services">
              <button className="mt-4 bg-black hover:bg-gray-800 text-white text-xs tracking-widest uppercase px-10 py-4 transition-all duration-300 hover:scale-105 shadow-lg">
                VIEW SERVICES
              </button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Decorative Border */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-black z-0"></div>

            {/* Image */}
            <div className="relative overflow-hidden shadow-2xl z-10">
              <img
                src="https://i.pinimg.com/736x/09/73/eb/0973eb1dfc7bbca9eadbbb4c25650729.jpg"
                alt="Physiotherapy Treatment"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
            </div>

            {/* Decorative Blurs */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gray-200 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-gray-300 rounded-full blur-2xl opacity-50"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
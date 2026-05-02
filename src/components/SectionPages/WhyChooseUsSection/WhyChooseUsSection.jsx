import React from 'react';
import whyChooseImage from '../../../assets/image01.png'; // apna actual path yahan daalo

export default function WhyChooseUsSection() {
  const stats = [
    { number: "37+", label: "Happy Patients" },
    { number: "5.0", label: "Google Rating" },
    { number: "100%", label: "Satisfaction" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left Image */}
        <div className="relative h-[300px] lg:h-auto">
          <img
            src={whyChooseImage}
            alt="PhysioCentric Physiotherapy Treatment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20"></div>
        </div>

        {/* Right Content - Black Background */}
        <div className="bg-black text-white px-8 py-12 md:px-12 lg:px-16 lg:py-20 flex flex-col justify-center">
          <div className="space-y-8">
            {/* Label */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-0.5 bg-white opacity-50"></div>
              <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
                OUR ADVANTAGE
              </span>
            </div>

            {/* Heading */}
            <h2
              style={{ fontFamily: "Lexend Peta, sans-serif" }}
              className="text-3xl md:text-4xl lg:text-5xl text-white leading-tight"
            >
              Why Choose PhysioCentric?
            </h2>

            {/* Description */}
            <div className="space-y-5">
              <p className="text-gray-300 text-lg leading-relaxed">
                PhysioCentric is New Delhi's top-rated physiotherapy center, trusted by hundreds
                of patients in Gulmohar Park and across the city for expert, evidence-based care.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Our qualified physiotherapists treat back pain, joint pain, sports injuries,
                post-surgical rehab, neurological conditions, and more — with personalized
                treatment plans designed around your recovery goals.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10"></div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-400 tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
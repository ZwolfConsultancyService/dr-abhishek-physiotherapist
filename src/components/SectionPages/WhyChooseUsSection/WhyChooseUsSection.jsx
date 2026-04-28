import React from 'react';

export default function WhyChooseUsSection() {
  const stats = [
    { number: "25k", label: "Happy Customers" },
    { number: "12+", label: "Years Experience" },
    { number: "100%", label: "Satisfaction" },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left Image */}
        <div className="relative h-[300px] lg:h-auto">
          <img
            src="https://i.pinimg.com/736x/b7/3c/d9/b73cd905928cd9dba0376bc906a85098.jpg"
            alt="Chiropractic Treatment"
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay */}
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
              Why Choose Us
            </h2>

            {/* Description */}
            <div className="space-y-5">
              <p className="text-gray-300 text-lg leading-relaxed">
                We proudly deliver quality, thorough chiropractic care to the community and surrounding areas.
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                Chiropractic care uses spinal alignment to relieve a wide variety of physical ailments,
                including muscle strain, neck pain, chronic back pain, and more.
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
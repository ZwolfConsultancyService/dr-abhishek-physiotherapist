import React from "react";
import { UserPlus, ThumbsUp, Users, Award } from "lucide-react";

const StatisticsSection = () => {
  return (
    <section className="w-full bg-white py-10 px-2 md:px-6 border-y border-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* Left Content */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-black"></span>
            <p className="uppercase text-black text-xs tracking-widest font-semibold">
              Statistics
            </p>
          </div>

          <h2 className="text-3xl md:text-5xl text-black leading-tight mb-6 font-bold">
            Know More About <br /> Our Success
          </h2>

          <p className="text-gray-500 max-w-lg leading-relaxed">
            Bring to the table win-win survival strategies to ensure proactive
            domination. At the end of the day, going forward, a new normal.
          </p>
        </div>

        {/* Right Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative">
          {/* Divider Lines - Desktop */}
          <div className="hidden sm:block absolute inset-0">
            <div className="absolute left-1/2 top-0 h-full w-px bg-gray-200"></div>
            <div className="absolute top-1/2 left-0 w-full h-px bg-gray-200"></div>
          </div>

          <StatItem icon={<UserPlus size={40} />} value="2879" label="Patients Recover" />
          <StatItem icon={<ThumbsUp size={40} />} value="100%" label="Satisfaction" />
          <StatItem icon={<Users size={40} />} value="27+" label="Therapist & Staff" />
          <StatItem icon={<Award size={40} />} value="17" label="Get Awards" />
        </div>
      </div>
    </section>
  );
};

const StatItem = ({ icon, value, label }) => {
  return (
    <div className="flex items-center gap-5 relative z-10 group">
      <div className="text-black group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold text-black">{value}</h3>
        <p className="text-gray-500 text-sm tracking-wide">{label}</p>
      </div>
    </div>
  );
};

export default StatisticsSection;
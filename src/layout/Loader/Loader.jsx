import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          {/* Outer Ring */}
          <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>

          {/* Animated Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>

          {/* Inner Pulse — Black */}
          <div className="absolute inset-4 bg-black rounded-full animate-pulse"></div>
        </div>

        {/* Text */}
        <h3 className="text-lg font-bold text-black tracking-widest uppercase mb-1">
          Loading
        </h3>
        <p className="text-gray-400 text-xs tracking-widest uppercase">
          Please wait a moment
        </p>
      </div>
    </div>
  );
};

export default Loader;
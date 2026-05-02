import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../../assets/hero.png"; // apni image ka path daalo

export default function HeroSection() {
  return (
    <div className="relative bg-white overflow-hidden border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Subtitle */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-0.5 bg-black"></div>
              <span className="text-black text-xs tracking-widest uppercase font-semibold">
                PHYSIOTHERAPY CENTRE — NEW DELHI
              </span>
            </div>

            {/* Title */}
            <h1
              style={{ fontFamily: "Lexend Peta, sans-serif" }}
              className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight"
            >
              Expert Physiotherapy Centre For Pain Relief
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-base md:text-lg leading-relaxed max-w-xl">
              PhysioCentric is New Delhi's trusted physiotherapy center, rated 5.0 on Google.
              We treat muscle strain, back pain, joint issues, and more with personalized care.
            </p>

            {/* Google Rating */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-bold text-black">5.0</span>
              <span className="text-sm text-gray-400">· 37 Google Reviews</span>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
              <Link to="/contacts">
                <button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-xs tracking-widest uppercase font-semibold transition-all duration-300 hover:scale-105 shadow-lg">
                  BOOK APPOINTMENT
                </button>
              </Link>
              <a href="tel:+919810513841">
                <button className="border border-black text-black px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-black hover:text-white transition-all duration-300">
                  098105 13841
                </button>
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="PhysioCentric Physiotherapy"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>

              {/* Floating info card on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">Location</p>
                  <p className="text-sm font-bold text-black">Gulmohar Park, New Delhi</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">Hours</p>
                  <p className="text-sm font-bold text-black">Mon–Sat, 9AM–7PM</p>
                </div>
                <div className="w-px h-10 bg-gray-200" />
                <div>
                  <p className="text-xs text-gray-400 tracking-widest uppercase">Rating</p>
                  <p className="text-sm font-bold text-black">5.0 ⭐ Google</p>
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gray-200 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-300 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
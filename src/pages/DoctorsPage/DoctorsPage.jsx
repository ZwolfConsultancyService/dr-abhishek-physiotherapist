import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  MapPin,
  Clock,
  Award,
  Users,
  Star,
  ChevronRight,
  Stethoscope,
  Heart,
  Activity,
  Zap,
  GraduationCap,
  BadgeCheck,
} from "lucide-react";

// ── Image imports ─────────────────────────────────────────────────
import headDoctor from "../../assets/teamfolder/head.jpeg"; // apni head doctor ki image
import doctor1 from "../../assets/teamfolder/01.jpeg";
import doctor2 from "../../assets/teamfolder/02.jpeg";
import doctor3 from "../../assets/teamfolder/03.jpeg";
import doctor4 from "../../assets/teamfolder/04.jpeg";
import doctor5 from "../../assets/teamfolder/05.jpeg";
import doctor6 from "../../assets/teamfolder/06.jpeg";
import doctor7 from "../../assets/teamfolder/07.jpeg";
import doctor8 from "../../assets/teamfolder/08.jpeg";

// ─── Team Data (8 members) ────────────────────────────────────────
const team = [
  { name: "Akansha", role: "Senior Physiotherapist", specialization: "Sports Injuries & Rehabilitation", image: doctor1 },
  { name: "Kanika", role: "Neurological Physiotherapist", specialization: "Neurological & Stroke Rehabilitation", image: doctor2 },
  { name: "Kiran", role: "Pediatric Physiotherapist", specialization: "Pediatric & Women's Health", image: doctor3 },
  { name: "Mamta", role: "Orthopaedic Physiotherapist", specialization: "Joint Pain & Manual Therapy", image: doctor4 },
  { name: "Raimey", role: "Cardiopulmonary Physiotherapist", specialization: "Chest & Cardiac Rehabilitation", image: doctor5 },
  { name: "Priyanka", role: "Sports & Exercise Physiotherapist", specialization: "Performance & Injury Prevention", image: doctor6 },
  { name: "Vishali", role: "Geriatric Physiotherapist", specialization: "Elderly Care & Fall Prevention", image: doctor7 },
  { name: "Zoya", role: "Pain Management Specialist", specialization: "Chronic Pain & Dry Needling", image: doctor8 },
];

// ─── Stats ────────────────────────────────────────────────────────
const stats = [
  { icon: Users, number: "37+", label: "Happy Patients" },
  { icon: Star, number: "5.0", label: "Google Rating" },
  { icon: Award, number: "8", label: "Expert Doctors" },
  { icon: Clock, number: "9+", label: "Years of Care" },
];

// ─── Specializations ──────────────────────────────────────────────
const specializations = [
  { icon: Activity, title: "Sports Rehabilitation", desc: "From sprains to ACL tears, we get athletes back in the game." },
  { icon: Zap, title: "Neurological Therapy", desc: "Expert care for stroke, Parkinson's, and spinal cord injuries." },
  { icon: Heart, title: "Women's Health", desc: "Antenatal, postnatal, and pelvic floor physiotherapy." },
  { icon: Stethoscope, title: "Orthopaedic Care", desc: "Joint pain, fractures, and post-surgery rehabilitation." },
];

// ─── Component ────────────────────────────────────────────────────
export default function DoctorsPage() {
  const [hoveredDoc, setHoveredDoc] = useState(null);

  return (
    <div className="bg-white min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative bg-black text-white overflow-hidden mt-8">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-white opacity-40" />
              <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
                PhysioCentric · New Delhi
              </span>
            </div>
            <h1
              className="text-5xl md:text-7xl font-black text-white leading-[1.0] mb-6 tracking-tight"
              style={{ fontFamily: "Lexend Peta, sans-serif" }}
            >
              Meet Our
              <br />
              <span className="text-gray-400">Expert Team</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-xl mb-10">
              Our board-certified physiotherapists bring years of specialized experience
              to deliver personalized, result-driven care for every patient.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/contacts">
                <button className="bg-white text-black px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                  Book Appointment
                </button>
              </Link>
              <a href="tel:+919810513841">
                <button className="border border-white/30 text-white px-8 py-4 text-xs tracking-widest uppercase font-bold hover:border-white transition-all duration-300">
                  098105 13841
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%)" }} />
      </section>

      {/* ── STATS ── */}
      <section className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 bg-black rounded-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <s.icon size={22} className="text-white" />
                </div>
                <div className="text-4xl font-black text-black mb-1" style={{ fontFamily: "Lexend Peta, sans-serif" }}>
                  {s.number}
                </div>
                <div className="text-xs tracking-widest uppercase text-gray-400 font-semibold">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HEAD DOCTOR SECTION ── */}
      <section className="bg-white py-20 md:py-28 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          {/* Label */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-12 h-0.5 bg-black" />
            <span className="text-xs tracking-widest uppercase font-semibold text-black">
              Our Lead Expert
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Image */}
            <div className="relative">
              {/* Decorative border */}
              <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-black z-0" />
              <div className="relative z-10 overflow-hidden bg-gray-100">
                <img
                  src={headDoctor}
                  alt="Dr. Divya Sharma"
                  className="w-full object-contain"
                  style={{ maxHeight: "560px" }}
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 left-6 z-20 bg-black text-white px-6 py-3 flex items-center gap-3 shadow-xl">
                <BadgeCheck size={18} className="text-white" />
                <div>
                  <div className="text-xs text-gray-400 tracking-widest uppercase">Certified</div>
                  <div className="text-sm font-bold tracking-wide">Chief Physiotherapist</div>
                </div>
              </div>
            </div>

            {/* Right — Info */}
            <div className="space-y-7 pt-6 lg:pt-0">
              {/* Name & Title */}
              <div>
                <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold mb-2">
                  Head of PhysioCentric
                </p>
                <h2
                  className="text-4xl md:text-5xl font-black text-black leading-tight"
                  style={{ fontFamily: "Lexend Peta, sans-serif" }}
                >
                  Dr. Divya
                  <br />
                  <span className="text-gray-400">Sharma</span>
                </h2>
              </div>

              {/* Divider */}
              <div className="w-16 h-0.5 bg-black" />

              {/* Bio */}
              <p className="text-gray-600 text-base leading-relaxed">
                Dr. Divya Sharma is the founder and chief physiotherapist at PhysioCentric,
                New Delhi. With over a decade of clinical expertise, she leads a team of
                highly specialized physiotherapists committed to evidence-based, patient-first
                care.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Her vision for PhysioCentric is rooted in delivering accessible, expert
                physiotherapy to patients of all ages — from acute injuries to chronic
                conditions and post-surgical rehabilitation.
              </p>

              {/* Qualifications */}
              <div className="space-y-3">
                <p className="text-xs tracking-widest uppercase text-gray-400 font-semibold">
                  Qualifications
                </p>
                {[
                  "BPT — Bachelor of Physiotherapy",
                  "MPT (Orthopaedics) — Master of Physiotherapy",
                  "Certified Manual Therapist",
                  "10+ Years Clinical Experience",
                ].map((q, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black rounded-sm flex items-center justify-center flex-shrink-0">
                      <GraduationCap size={14} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-600">{q}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link to="/contacts">
                <button className="mt-2 bg-black text-white px-8 py-4 text-xs tracking-widest uppercase font-bold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg">
                  Book With Dr. Divya
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── OUR TEAM ── */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-0.5 bg-black" />
              <span className="text-xs tracking-widest uppercase font-semibold text-black">
                Our Team
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2
                className="text-4xl md:text-5xl text-black leading-tight max-w-lg"
                style={{ fontFamily: "Lexend Peta, sans-serif" }}
              >
                The Specialists Behind Your Recovery
              </h2>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                Each of our 8 physiotherapists is highly qualified, continuously trained,
                and deeply committed to your well-being.
              </p>
            </div>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((doc, i) => (
              <div
                key={i}
                className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
                onMouseEnter={() => setHoveredDoc(i)}
                onMouseLeave={() => setHoveredDoc(null)}
              >
                <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {/* Hover overlay */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 bg-black/90 px-4 py-3 transition-all duration-500 ${
                      hoveredDoc === i ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    }`}
                  >
                    <p className="text-xs text-gray-300 tracking-widest uppercase">{doc.role}</p>
                    <p className="text-xs text-white mt-1">{doc.specialization}</p>
                  </div>
                </div>

                <div className="px-4 py-4 border-t border-gray-100">
                  <h3 className="text-base font-bold text-black leading-tight">{doc.name}</h3>
                  <p className="text-xs text-gray-400 tracking-wide uppercase mt-1">{doc.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SPECIALIZATIONS ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-0.5 bg-black" />
            <span className="text-xs tracking-widest uppercase font-semibold text-black">What We Treat</span>
          </div>
          <h2
            className="text-4xl md:text-5xl text-black leading-tight mb-14 max-w-xl"
            style={{ fontFamily: "Lexend Peta, sans-serif" }}
          >
            Areas of Specialization
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specializations.map((sp, i) => (
              <div
                key={i}
                className="group border border-gray-100 p-7 hover:bg-black hover:border-black transition-all duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 bg-black group-hover:bg-white rounded-sm flex items-center justify-center mb-5 transition-colors duration-300">
                  <sp.icon size={20} className="text-white group-hover:text-black transition-colors duration-300" />
                </div>
                <h3 className="text-base font-bold text-black group-hover:text-white mb-3 transition-colors duration-300">
                  {sp.title}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors duration-300">
                  {sp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT US ── */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-0.5 bg-white opacity-40" />
                <span className="text-xs tracking-widest uppercase text-gray-400 font-semibold">Find Us</span>
              </div>
              <h2
                className="text-4xl md:text-5xl text-white leading-tight mb-8"
                style={{ fontFamily: "Lexend Peta, sans-serif" }}
              >
                Visit PhysioCentric Today
              </h2>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 tracking-widest uppercase mb-1">Address</div>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      A-2, Block A, Gulmohar Park,<br />New Delhi, Delhi 110049
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 tracking-widest uppercase mb-1">Phone</div>
                    <a href="tel:+919810513841" className="text-gray-300 hover:text-white transition-colors text-sm">
                      098105 13841
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-white/20 flex items-center justify-center flex-shrink-0">
                    <Clock size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 tracking-widest uppercase mb-1">Hours</div>
                    <p className="text-gray-300 text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-white/10 p-10 text-center">
              <div className="flex justify-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-gray-400 mb-6">Rated 5.0 · 37 Google Reviews</p>
              <p className="text-gray-300 text-base leading-relaxed mb-8">
                Ready to start your recovery journey? Book a session with one of our experts today.
              </p>
              <Link to="/contacts">
                <button className="w-full bg-white text-black py-4 text-xs tracking-widest uppercase font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                  Book Appointment <ChevronRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
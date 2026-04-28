import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Download, Phone, Mail, ChevronRight, Home } from "lucide-react";
import { servicesDetailData } from "../../../data/servicesData/servicesData";
import LocationsSlider from "../Locationdetailpage/LocationsSlider";

const ServiceDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(3);

  const serviceData =
    servicesDetailData[slug] || servicesDetailData["physiotherapy"];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  }, [slug]);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleSidebarClick = (serviceName) => {
    navigate(`/service/${serviceName.toLowerCase().replace(/\s+/g, "-")}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-black rounded-full animate-spin"></div>
            <div className="absolute inset-4 bg-black rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs tracking-widest uppercase text-gray-400">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      {/* Banner */}
      <div
        className="relative h-[240px] md:h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url('${serviceData.bannerImage}')` }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <h1 className="text-3xl md:text-5xl mt-16 md:mt-20 text-white mb-4 font-bold tracking-tight">
            {serviceData.title}
          </h1>
          <nav className="flex items-center gap-2 text-white/60 text-sm">
            <button
              onClick={() => navigate("/")}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <span>/</span>
            <span className="text-white">{serviceData.title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ── Image + Content (mobile pe pehle) ── */}
            <main className="lg:col-span-9 order-1 lg:order-2 space-y-6 md:space-y-8">

              {/* Main Image */}
              <div className="bg-white shadow-lg overflow-hidden">
                <img
                  src={serviceData.mainImage}
                  alt={serviceData.title}
                  className="w-full h-[220px] sm:h-[320px] md:h-[400px] object-cover"
                />
              </div>

              {/* Description */}
              <div className="bg-white shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-black"></div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-black">
                    Overview
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
                  {serviceData.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-4">
                  {serviceData.description}
                </p>
                <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                  {serviceData.longDescription}
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-white shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-[220px] md:h-full">
                    <img
                      src={serviceData.benefitImage}
                      alt="Benefits"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-0.5 bg-black"></div>
                      <span className="text-xs tracking-widest uppercase font-semibold text-black">
                        Benefits
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                      {serviceData.benefits.title}
                    </h3>
                    <p className="text-gray-500 mb-4 text-sm leading-relaxed">
                      {serviceData.benefits.description}
                    </p>
                    <ul className="space-y-3">
                      {serviceData.benefits.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-black flex items-center justify-center flex-shrink-0 mt-0.5">
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-600 text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Why Choose Us - Accordion */}
              <div className="bg-white shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-black"></div>
                  <span className="text-xs tracking-widest uppercase font-semibold text-black">
                    Why Choose Us
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-black mb-6">
                  {serviceData.whyChoose.title}
                </h3>
                <div className="space-y-3">
                  {serviceData.whyChoose.points.map((item, index) => (
                    <div
                      key={index}
                      className={`border-2 overflow-hidden transition-all duration-300 ${
                        expandedIndex === index
                          ? "border-black"
                          : "border-gray-100"
                      }`}
                    >
                      <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`text-2xl font-light transition-colors ${
                              expandedIndex === index
                                ? "text-black"
                                : "text-gray-300"
                            }`}
                          >
                            {expandedIndex === index ? "−" : "+"}
                          </span>
                          <span className="text-left text-gray-800 font-medium text-sm">
                            {item.title}
                          </span>
                        </div>
                      </button>
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          expandedIndex === index ? "max-h-48" : "max-h-0"
                        }`}
                      >
                        <div className="px-4 pb-4 pt-2 text-gray-500 text-sm border-t border-gray-100 leading-relaxed">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="bg-black shadow-lg p-8 text-white text-center">
                <div className="w-12 h-0.5 bg-white/30 mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold mb-4 tracking-tight">
                  Visit Today
                </h3>
                <p className="mb-8 text-gray-400 leading-relaxed">
                  You'll know the minute you arrive this is the place. We are
                  here to surpass your desires.
                </p>
                <a href="/contacts">
                  <button className="px-8 py-3 border border-white/30 text-white text-xs tracking-widest uppercase font-semibold hover:bg-white/10 transition-all duration-300">
                    Make Appointment
                  </button>
                </a>
              </div>
            </main>

            {/* ── Sidebar (mobile pe niche) ── */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="bg-white shadow-lg overflow-hidden lg:sticky lg:top-8">

                {/* Sidebar Header */}
                <div className="bg-black text-white px-6 py-4">
                  <h3 className="text-lg font-bold tracking-widest uppercase">
                    PhysioCentric
                  </h3>
                </div>

                {/* Services Nav */}
                <nav className="py-2">
                  {serviceData.sidebar.services.map((service, index) => (
                    <button
                      key={index}
                      onClick={() => handleSidebarClick(service)}
                      className={`w-full text-left px-6 py-3 transition-colors border-b border-gray-100 text-sm group flex items-center justify-between ${
                        service === serviceData.title
                          ? "bg-black text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`}
                    >
                      <span>{service}</span>
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </nav>

                {/* Download Brochure */}
                <div className="p-6 bg-gray-900">
                  <button className="w-full flex items-center justify-center gap-2 bg-white text-black px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-gray-100 transition-all duration-300">
                    <Download className="w-5 h-5" />
                    Download Brochure
                  </button>
                </div>

                {/* Contact Info */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-black flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 tracking-widest uppercase">
                        Call Us
                      </p>
                      <p className="text-black font-medium text-sm">
                        1800-456-7890
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-black flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 tracking-widest uppercase">
                        Email
                      </p>
                      <p className="text-black font-medium text-sm">
                        info@example.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      <LocationsSlider />

      <style>{`
        * { box-sizing: border-box; }
        .container { width: 100%; margin-left: auto; margin-right: auto; }
        @media (max-width: 768px) { .container { padding-left: 1rem; padding-right: 1rem; } }
        button { transition: all 0.3s ease; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #000; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
      `}</style>
    </div>
  );
};

export default ServiceDetailPage;
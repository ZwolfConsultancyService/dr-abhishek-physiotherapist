import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { carouselServicesData } from "../../../data/servicesData/servicesData.js";

export default function ServicesSection() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const services = carouselServicesData;

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 4;
  };

  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const handleResize = () => setVisibleCards(getVisibleCards());
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = services.length - visibleCards;
        return prev + 1 > maxIndex ? 0 : prev + 1;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length, visibleCards]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = services.length - visibleCards;
      return prev + 1 > maxIndex ? 0 : prev + 1;
    });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => {
      const maxIndex = services.length - visibleCards;
      return prev - 1 < 0 ? maxIndex : prev - 1;
    });
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleCardClick = (slug) => navigate(`/service/${slug}`);

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="bg-white py-13 md:py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 sm:w-16 h-0.5 bg-black"></div>
            <span className="text-black text-xs sm:text-sm tracking-widest uppercase font-semibold">
              WHAT WE ARE OFFERING
            </span>
            <div className="w-12 sm:w-16 h-0.5 bg-black"></div>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black mb-4 md:mb-6 px-4 font-bold">
            Providing Physical Therapy Services
          </h2>

          <p className="text-gray-500 text-sm sm:text-base md:text-lg max-w-4xl mx-auto leading-relaxed px-4">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi
            nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
            sit amet, consectetur, adipisci velit.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-2 sm:px-3"
                >
                  <div
                    onClick={() => handleCardClick(service.slug)}
                    className="bg-white border border-gray-100 overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white text-sm sm:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                          {service.description}
                        </p>
                      </div>

                      {/* View Details Badge */}
                      <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
                        View Details
                      </div>
                    </div>

                    {/* Title Bar */}
                    <div className="bg-white py-4 sm:py-5 px-4 sm:px-6 text-center border-t border-gray-100">
                      <h3 className="text-lg sm:text-xl text-black group-hover:text-gray-500 transition-colors duration-300 font-medium">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Nav Buttons */}
          <div className="hidden md:flex justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-600 group-hover:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 lg:w-14 lg:h-14 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-600 group-hover:text-white" />
            </button>
          </div>

          {/* Mobile Nav */}
          <div className="md:hidden mt-8 space-y-4">
            <div className="flex justify-center gap-2">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-8 bg-black" : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={prevSlide}
                className="w-10 h-10 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group active:scale-95"
              >
                <ChevronLeft size={20} className="text-gray-600 group-hover:text-white" />
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 border-2 border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center group active:scale-95"
              >
                <ChevronRight size={20} className="text-gray-600 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ServicesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const services = [
    {
      title: "Laser Therapy",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=700&fit=crop",
      description: "Advanced laser treatment for pain relief and healing"
    },
    {
      title: "Occupa Therapy",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=700&fit=crop",
      description: "Specialized occupational therapy services"
    },
    {
      title: "Geriatic Therapy",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=700&fit=crop",
      description: "Comprehensive care for elderly patients"
    },
    {
      title: "Physio Therapy",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=700&fit=crop",
      description: "Complete physiotherapy solutions"
    },
    {
      title: "Sports Therapy",
      image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=700&fit=crop",
      description: "Athletic injury prevention and recovery"
    },
    {
      title: "Massage Therapy",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=700&fit=crop",
      description: "Therapeutic massage treatments"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Reset to 0 when we reach the end
        return nextIndex >= services.length - 3 ? 0 : nextIndex;
      });
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, services.length]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= services.length - 3 ? 0 : nextIndex;
    });
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      return nextIndex < 0 ? services.length - 4 : nextIndex;
    });
    // Resume auto-play after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          {/* Label */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-16 h-0.5 bg-blue-500"></div>
            <span className="text-blue-500  text-sm tracking-wider uppercase">
              WHAT WE ARE OFFERING
            </span>
            <div className="w-16 h-0.5 bg-blue-500"></div>
          </div>

          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl  text-[#0a1f44] mb-6">
            Providing Physical Therapy Services
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base md:text-lg max-w-4xl mx-auto leading-relaxed">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
        </div>

        {/* Services Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
            >
              {services.map((service, index) => (
                <div 
                  key={index} 
                  className="w-full md:w-1/2 lg:w-1/4 flex-shrink-0 px-3"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>

                    {/* Title Bar */}
                    <div className="bg-white py-5 px-6 text-center">
                      <h3 className="text-xl text-[#0a1f44]">
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons - Hidden on Mobile */}
          <div className="hidden md:flex justify-center gap-4 mt-12">
            <button
              onClick={prevSlide}
              className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Previous"
            >
              <ChevronLeft size={24} className="text-gray-600 group-hover:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="w-14 h-14 rounded-full border-2 border-gray-300 hover:border-pink-500 hover:bg-pink-500 hover:text-white transition-all duration-300 flex items-center justify-center group"
              aria-label="Next"
            >
              <ChevronRight size={24} className="text-gray-600 group-hover:text-white" />
            </button>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center gap-2 mt-8">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAutoPlaying(true), 5000);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-gray-300'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
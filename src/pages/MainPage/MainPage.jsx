import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HeroSection from "../../components/SectionPages/HeroSection/HeroSection";
import AboutSection from "../../components/SectionPages/AboutSection/AboutSection";
import WhyChooseUsSection from "../../components/SectionPages/WhyChooseUsSection/WhyChooseUsSection";
import ServicesSection from "../../components/SectionPages/ServicesSection/ServicesSection";
import StatisticsSection from "../../components/SectionPages/StatisticsSection/StatisticsSection";
import TestimonialSection from "../../components/SectionPages/TestimonialSection/TestimonialSection";
import LatestBlogsSection from "../../components/SectionPages/LatestBlogsSection/LatestBlogsSection";
import ContactSection from "../../components/SectionPages/ContactSection/ContactSection";

const MainPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // animation ek hi baar chale
      easing: "ease-in-out",
    });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <div data-aos="fade-up">
        <HeroSection />
      </div>

      <div data-aos="fade-right">
        <AboutSection />
      </div>
      <div data-aos="fade-left">
        <WhyChooseUsSection />
      </div>

      <div data-aos="fade-right">
        <ServicesSection />
      </div>
       <div data-aos="fade-left">
        <StatisticsSection />
      </div>

        <div data-aos="fade-right">
        <TestimonialSection />
      </div>

      <div data-aos="fade-left">
        <LatestBlogsSection />
      </div>

      <div data-aos="fade-up">
        <ContactSection />
      </div>
    </div>
  );
};

export default MainPage;

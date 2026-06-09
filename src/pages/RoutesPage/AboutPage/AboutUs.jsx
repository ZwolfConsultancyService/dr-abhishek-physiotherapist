import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import WhyChooseUsSection from "../../../components/SectionPages/WhyChooseUsSection/WhyChooseUsSection";
import TestimonialSection from "../../../components/SectionPages/TestimonialSection/TestimonialSection";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">

      {/* ───────────────── SEO HEAD ───────────────── */}
      <Helmet>
        {/* Primary Meta */}
        <title>About Us – PhysioCentric | Trusted Physiotherapy Clinic in New Delhi</title>
        <meta
          name="description"
          content="Learn about PhysioCentric — New Delhi's top-rated physiotherapy centre with 25+ years of excellence. Meet our expert therapists and discover our approach to personalised pain relief."
        />
        <meta name="keywords" content="about PhysioCentric, physiotherapy clinic New Delhi, experienced physiotherapist Delhi, best physio clinic Gulmohar Park, physiotherapy team Delhi, back pain specialist New Delhi" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.physiocentric.in/about" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.physiocentric.in/about" />
        <meta property="og:title" content="About PhysioCentric – Expert Physiotherapy in New Delhi" />
        <meta property="og:description" content="25+ years of excellence in physiotherapy. Meet the team behind New Delhi's most trusted physio clinic in Gulmohar Park." />
        <meta property="og:image" content="https://www.physiocentric.in/og-image.jpg" />
        <meta property="og:locale" content="en_IN" />
        <meta property="og:site_name" content="PhysioCentric" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About PhysioCentric – New Delhi's Trusted Physio Clinic" />
        <meta name="twitter:description" content="25+ years of excellence. 1700+ happy patients. Personalised physiotherapy in Gulmohar Park, New Delhi." />
        <meta name="twitter:image" content="https://www.physiocentric.in/og-image.jpg" />

        {/* Structured Data – AboutPage + MedicalBusiness */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "url": "https://www.physiocentric.in/about",
                "name": "About PhysioCentric",
                "description": "PhysioCentric is a leading physiotherapy centre in Gulmohar Park, New Delhi, with 25+ years of experience treating back pain, joint issues, and sports injuries.",
                "inLanguage": "en-IN"
              },
              {
                "@type": "MedicalBusiness",
                "name": "PhysioCentric",
                "url": "https://www.physiocentric.in",
                "telephone": "+919810513841",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "A-2, Block A, Gulmohar Park",
                  "addressLocality": "New Delhi",
                  "addressRegion": "Delhi",
                  "postalCode": "110049",
                  "addressCountry": "IN"
                },
                "foundingDate": "2000",
                "numberOfEmployees": { "@type": "QuantitativeValue", "value": 27 },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "5.0",
                  "reviewCount": "37",
                  "bestRating": "5"
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* ───────────────── HERO BANNER ───────────────── */}
      <div className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
        </div>

        <div className="relative h-full container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-center h-full max-w-2xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 font-bold">
              About Us
            </h1>
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center text-white/80 text-sm sm:text-base list-none p-0 m-0 gap-2">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li aria-hidden="true"><span className="mx-1">/</span></li>
                <li><span className="text-white font-medium" aria-current="page">About Us</span></li>
              </ol>
            </nav>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-white/60 max-w-xl tracking-wide">
              Professional Care &amp; Dedicated Service
            </p>
          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg className="w-full h-12 sm:h-16" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
            <path d="M0 0L50 10C100 20 200 40 300 45C400 50 500 40 600 35C700 30 800 30 900 35C1000 40 1100 50 1150 55L1200 60V120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* ───────────────── CONTENT SECTION ───────────────── */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-start">

          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="bg-gray-50 overflow-hidden shadow-xl">
              <div className="aspect-[4/5] sm:aspect-[3/4] relative">
                <img
                  src="https://i.pinimg.com/736x/76/43/bb/7643bb9b2377267262cc635b7b3c7b8b.jpg"
                  alt="PhysioCentric clinic interior — expert physiotherapy care in New Delhi"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  width={600}
                  height={750}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" aria-hidden="true"></div>

                {/* Bottom Card */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black flex items-center justify-center flex-shrink-0" aria-hidden="true">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">25+ Years</h3>
                        <p className="text-xs sm:text-sm text-gray-500">Of Excellence</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 bg-gray-200 rounded-full opacity-40 blur-2xl" aria-hidden="true"></div>
            <div className="hidden sm:block absolute -top-4 -left-4 w-32 h-32 bg-gray-100 rounded-full opacity-60 blur-3xl" aria-hidden="true"></div>
          </div>

          {/* Text Content */}
          <div className="order-1 lg:order-2">
            <div className="mb-6 sm:mb-8">
              <div className="flex items-center mb-4 mt-26">
                <div className="w-10 sm:w-12 h-0.5 bg-black mr-3" aria-hidden="true"></div>
                <span className="text-black text-xs sm:text-sm tracking-widest uppercase font-semibold">
                  Who We Are
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black mb-4 sm:mb-6 leading-tight">
                About Our Clinic
              </h2>
            </div>

            <div className="space-y-5 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 leading-snug">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur
              </h3>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                adipisci velit. sequi nesciunt. Neque porro quisquam est, qui dolor sit amet, consectetur.
              </p>

              <div className="pt-4 sm:pt-6 border-t border-gray-100">
                <h3 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">Our History</h3>
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                  sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                  Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
                  adipisci velit. sed quia non numquam qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <WhyChooseUsSection />

      {/* ───────────────── STATS SECTION ───────────────── */}
      <div className="bg-black border-y border-gray-800 py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
            {[
              { value: "1700+", label: "Happy Patients", path: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
              { value: "100%", label: "Satisfaction Guarantee", path: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" },
              { value: "27+", label: "Therapist & Staff", path: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
              { value: "10+", label: "Years Experience", path: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-4" aria-hidden="true">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 border border-gray-700 flex items-center justify-center group-hover:border-white transition-colors duration-300">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={stat.path}/>
                    </svg>
                  </div>
                </div>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-400 tracking-widest uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
import React from "react";

const ContactSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* LEFT FORM */}
        <div>
          <form className="space-y-10">

            {/* Name */}
            <div>
              <label className="block text-gray-600 mb-2">
                Enter your name*
              </label>
              <input
                type="text"
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600 py-2"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 mb-2">
                Your Email Address*
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600 py-2"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-600 mb-2">
                Your message
              </label>
              <textarea
                rows="4"
                className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-600 py-2 resize-none"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-700 text-white  px-10 py-4 rounded-full transition-all"
            >
              SUBMIT NOW
            </button>

          </form>
        </div>

        {/* RIGHT INFO BOX */}
        <div className="bg-blue-600 text-white p-10 md:p-14 rounded-lg">
          <p className="uppercase text-sm tracking-widest opacity-80 mb-4">
            Get Appointment
          </p>

          <h2 className="text-3xl md:text-4xl leading-snug mb-6">
            You can drop message <br /> for any query.
          </h2>

          <div className="w-12 h-[2px] bg-white mb-8"></div>

          <p className="uppercase text-sm tracking-widest opacity-80 mb-2">
            Call us on
          </p>

          <h3 className="text-3xl">
            1800-456-7890
          </h3>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;

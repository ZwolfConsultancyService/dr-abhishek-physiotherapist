import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Phone, Mail, MapPin, Clock, Calendar,
  User, MessageSquare, Send, CheckCircle, AlertCircle,
} from "lucide-react";

const API_BASE_URL = "https://dr-abhishek-physiotherapist-backend.onrender.com/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "", email: "", phone: "",
    preferredDate: "", preferredTime: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1200, once: true, easing: "ease-in-out-cubic", offset: 100, delay: 100 });
    AOS.refresh();
  }, []);

  const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitStatus) setSubmitStatus(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g, ""))) newErrors.phone = "Phone must be 10 digits";
    if (!formData.preferredDate) newErrors.preferredDate = "Preferred date is required";
    if (!formData.preferredTime) newErrors.preferredTime = "Preferred time is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const payload = {
        name: formData.fullName, fullName: formData.fullName,
        email: formData.email, phone: formData.phone, phoneNumber: formData.phone,
        date: formData.preferredDate, preferredDate: formData.preferredDate,
        time: formData.preferredTime, preferredTime: formData.preferredTime,
        message: formData.message || "", notes: formData.message || "",
      };
      const response = await fetch(`${API_BASE_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message || "Failed to book");
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ fullName: "", email: "", phone: "", preferredDate: "", preferredTime: "", message: "" });
        setSubmitStatus(null);
      }, 3000);
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field) =>
    `w-full px-4 py-3 pl-11 border-2 focus:outline-none transition-colors ${
      errors[field] ? "border-red-500" : "border-gray-200 focus:border-black"
    } ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`;

  const contactItems = [
    { icon: <Phone className="w-5 h-5 text-white" />, label: "Phone", lines: ["1800-456-7890", "+91 98765 43210"] },
    { icon: <Mail className="w-5 h-5 text-white" />, label: "Email", lines: ["info@physio.com", "support@physio.com"] },
    { icon: <MapPin className="w-5 h-5 text-white" />, label: "Address", lines: ["123 Medical Center,", "Healthcare Plaza,", "New Delhi, 110001"] },
    { icon: <Clock className="w-5 h-5 text-white" />, label: "Working Hours", lines: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 9:00 AM - 2:00 PM", "Sun: Closed"] },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-12">
      {/* Hero Banner */}
      <div
        className="relative h-[300px] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=800&fit=crop')" }}
        data-aos="fade-down" data-aos-duration="1000"
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center max-w-7xl">
          <h1 className="text-4xl md:text-5xl mt-10 text-white mb-4 font-bold"
            data-aos="fade-up" data-aos-duration="1200" data-aos-delay="200">
            Contact Us
          </h1>
          <nav className="flex items-center gap-2 text-white/70 text-sm"
            data-aos="fade-up" data-aos-duration="1200" data-aos-delay="300">
            <button className="hover:text-white transition-colors">Home</button>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left - Contact Info */}
            <aside className="lg:col-span-4">
              <div className="space-y-6">
                <div className="bg-white shadow-lg p-8"
                  data-aos="fade-right" data-aos-duration="1200" data-aos-delay="100">
                  <h3 className="text-2xl font-bold text-black mb-6 pb-3 border-b border-gray-100">
                    Contact Information
                  </h3>
                  <div className="space-y-6">
                    {contactItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-4"
                        data-aos="fade-up" data-aos-duration="1000" data-aos-delay={200 + i * 100}>
                        <div className="w-10 h-10 bg-black flex items-center justify-center flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-black font-semibold mb-1 text-sm tracking-widest uppercase">
                            {item.label}
                          </h4>
                          {item.lines.map((line, j) => (
                            <p key={j} className="text-gray-500 text-sm">{line}</p>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white shadow-lg overflow-hidden"
                  data-aos="fade-right" data-aos-duration="1200" data-aos-delay="200">
                  <div className="h-64 bg-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224357.49842267563!2d77.06889754725782!3d28.52725254683551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1234567890"
                      width="100%" height="100%" style={{ border: 0 }}
                      allowFullScreen loading="lazy" title="Location Map"
                    ></iframe>
                  </div>
                </div>
              </div>
            </aside>

            {/* Right - Form */}
            <main className="lg:col-span-8">
              <div className="bg-white shadow-lg p-8 md:p-12"
                data-aos="fade-left" data-aos-duration="1200" data-aos-delay="100">
                <div className="mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-0.5 bg-black"></div>
                    <span className="text-xs tracking-widest uppercase font-semibold text-black">Schedule a Visit</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-black mb-3"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
                    Book an Appointment
                  </h2>
                  <p className="text-gray-500" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300">
                    Schedule your visit and we'll confirm within 24 hours
                  </p>
                </div>

                {/* Success */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-gray-50 border-l-4 border-black flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-black font-bold mb-1">Appointment Booked!</h4>
                      <p className="text-gray-600 text-sm">We'll confirm within 24 hours.</p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-red-800 font-bold mb-1">Booking Failed</h4>
                      <p className="text-red-700 text-sm">Please try again or contact us directly.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name */}
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
                    <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                      Full Name <span className="text-gray-400">*</span>
                    </label>
                    <div className="relative">
                      <input type="text" name="fullName" value={formData.fullName}
                        onChange={handleChange} placeholder="Enter your full name"
                        disabled={isSubmitting} className={inputClass("fullName")} />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">
                    <div>
                      <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                        Email Address <span className="text-gray-400">*</span>
                      </label>
                      <div className="relative">
                        <input type="email" name="email" value={formData.email}
                          onChange={handleChange} placeholder="your@email.com"
                          disabled={isSubmitting} className={inputClass("email")} />
                        <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                        Phone Number <span className="text-gray-400">*</span>
                      </label>
                      <div className="relative">
                        <input type="tel" name="phone" value={formData.phone}
                          onChange={handleChange} placeholder="1234567890"
                          disabled={isSubmitting} className={inputClass("phone")} />
                        <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <div>
                      <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                        Preferred Date <span className="text-gray-400">*</span>
                      </label>
                      <div className="relative">
                        <input type="date" name="preferredDate" value={formData.preferredDate}
                          onChange={handleChange} min={new Date().toISOString().split("T")[0]}
                          disabled={isSubmitting} className={inputClass("preferredDate")} />
                        <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.preferredDate && <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>}
                    </div>
                    <div>
                      <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                        Preferred Time <span className="text-gray-400">*</span>
                      </label>
                      <div className="relative">
                        <select name="preferredTime" value={formData.preferredTime}
                          onChange={handleChange} disabled={isSubmitting}
                          className={`${inputClass("preferredTime")} appearance-none bg-white`}>
                          <option value="">Select a time slot</option>
                          {timeSlots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
                        </select>
                        <Clock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                      {errors.preferredTime && <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="700">
                    <label className="block text-black font-medium mb-2 text-sm tracking-wide">
                      Message (Optional)
                    </label>
                    <div className="relative">
                      <textarea name="message" value={formData.message} onChange={handleChange}
                        placeholder="Tell us about your condition..." rows="5" disabled={isSubmitting}
                        className={`w-full px-4 py-3 pl-11 border-2 border-gray-200 focus:border-black focus:outline-none transition-colors resize-none ${isSubmitting ? "bg-gray-100 cursor-not-allowed" : ""}`}>
                      </textarea>
                      <MessageSquare className="w-5 h-5 text-gray-400 absolute left-3 top-4" />
                    </div>
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isSubmitting}
                    className={`w-full py-4 px-8 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg text-sm tracking-widest uppercase font-semibold ${
                      isSubmitting ? "bg-gray-400 cursor-not-allowed text-white" : "bg-black hover:bg-gray-800 text-white hover:-translate-y-1 hover:shadow-xl"
                    }`}
                    data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="800">
                    {isSubmitting ? (
                      <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Booking...</>
                    ) : (
                      <><Send className="w-5 h-5" />Book Appointment</>
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs tracking-wide"
                    data-aos="fade-up" data-aos-duration="1000" data-aos-delay="900">
                    By submitting this form, you agree to our terms and conditions
                  </p>
                </form>
              </div>
            </main>
          </div>
        </div>
      </section>

      <style>{`
        input[type="date"]::-webkit-calendar-picker-indicator { cursor: pointer; opacity: 0.6; }
        input[type="date"]::-webkit-calendar-picker-indicator:hover { opacity: 1; }
        select { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M10.293 3.293L6 7.586 1.707 3.293A1 1 0 00.293 4.707l5 5a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #000; }
        ::-webkit-scrollbar-thumb:hover { background: #333; }
        [data-aos] { transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
      `}</style>
    </div>
  );
}
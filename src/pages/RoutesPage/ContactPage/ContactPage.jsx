import React, { useState } from "react";

const API_BASE_URL = "https://dr-abhishek-physiotherapist-backend.onrender.com/api";

const timeSlots = ["09:00 AM","10:00 AM","11:00 AM","12:00 PM","02:00 PM","03:00 PM","04:00 PM","05:00 PM"];

export default function ContactPage() {
  const [formData, setFormData] = useState({ fullName:"", email:"", phone:"", preferredDate:"", preferredTime:"", message:"" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: "" }));
    if (submitStatus) setSubmitStatus(null);
  };

  const validate = () => {
    const e = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/[-\s]/g,""))) e.phone = "Must be 10 digits";
    if (!formData.preferredDate) e.preferredDate = "Date is required";
    if (!formData.preferredTime) e.preferredTime = "Time is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setIsSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName, fullName: formData.fullName,
          email: formData.email, phone: formData.phone, phoneNumber: formData.phone,
          date: formData.preferredDate, preferredDate: formData.preferredDate,
          time: formData.preferredTime, preferredTime: formData.preferredTime,
          message: formData.message, notes: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubmitStatus("success");
      setTimeout(() => {
        setFormData({ fullName:"", email:"", phone:"", preferredDate:"", preferredTime:"", message:"" });
        setSubmitStatus(null);
      }, 4000);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputStyle = (field) => ({
    width: "100%",
    padding: "11px 14px 11px 40px",
    border: `1.5px solid ${errors[field] ? "#ef4444" : "#e2e8f0"}`,
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "inherit",
    color: "#1e293b",
    background: isSubmitting ? "#f8fafc" : "#fff",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f8fafc", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,600&display=swap" rel="stylesheet" />

      {/* HERO */}
      <div style={{ position: "relative", height: "320px", background: "#0d1117", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&h=640&fit=crop"
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.25 }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,17,23,0.9) 0%,rgba(15,23,42,0.75) 100%)" }} />
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: "linear-gradient(180deg,transparent,#3b82f6,transparent)" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: "1200px", margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", paddingBottom: "48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <div style={{ width: "40px", height: "1px", background: "#60a5fa" }} />
            <span style={{ fontSize: "11px", letterSpacing: "4px", textTransform: "uppercase", color: "#93c5fd", fontWeight: 500 }}>PhysioCentric</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 600, color: "#fff", margin: 0, lineHeight: 1.08 }}>
            Get in <em style={{ color: "#93c5fd" }}>Touch</em>
          </h1>
          <div style={{ marginTop: "16px", display: "flex", gap: "8px", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            <span>Home</span><span>›</span><span style={{ color: "rgba(255,255,255,0.75)" }}>Contact Us</span>
          </div>
        </div>
      </div>

      {/* INFO CARDS */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e2e8f0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))" }}>
          {[
            { color: "#2563eb", bg: "#eff6ff", icon: "phone", label: "Call Us", lines: ["09810513841"] },
            { color: "#059669", bg: "#ecfdf5", icon: "mail", label: "Email", lines: ["info@physiocentric.com"] },
            { color: "#7c3aed", bg: "#f5f3ff", icon: "pin", label: "Location", lines: ["A-2, Block A, Gulmohar Park,", "New Delhi, Delhi 110049"] },
            { color: "#d97706", bg: "#fffbeb", icon: "clock", label: "Hours", lines: ["Mon–Sat: 10am – 7pm", "Sun: Closed"] },
          ].map((c, i) => (
            <div key={i} style={{ padding: "24px 20px", borderRight: "1px solid #f1f5f9", borderTop: `3px solid ${c.color}` }}>
              <div style={{ width: "38px", height: "38px", borderRadius: "10px", background: c.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                <IconSvg name={c.icon} color={c.color} />
              </div>
              <div style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "#94a3b8", fontWeight: 600, marginBottom: "5px" }}>{c.label}</div>
              {c.lines.map((l, j) => <div key={j} style={{ fontSize: "13px", color: "#334155", lineHeight: 1.7 }}>{l}</div>)}
            </div>
          ))}
        </div>
      </div>

      {/* MAIN GRID */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "48px 24px 80px" }}>
        <div className="cp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "40px" }}>

          {/* LEFT */}
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <div style={{ width: "28px", height: "1px", background: "#3b82f6" }} />
                <span style={{ fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", color: "#3b82f6", fontWeight: 600 }}>Find Us</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 600, color: "#0f172a", margin: "0 0 10px" }}>
                Visit Our <em>Clinic</em>
              </h2>
              <p style={{ fontSize: "14px", color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                Located in Gulmohar Park, New Delhi. Walk-ins welcome during working hours.
              </p>
            </div>

            {/* MAP */}
            <div style={{ borderRadius: "12px", overflow: "hidden", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <div style={{ height: "3px", background: "linear-gradient(90deg,#3b82f6,#7c3aed)" }} />
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d17279.444892527215!2d77.19908151661608!3d28.546738155120085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3c2bae79c4b%3A0x8c6cf571e1cd86ce!2sPhysioCentric!5e0!3m2!1sen!2sin!4v1777618165437!5m2!1sen!2sin"
                width="100%" height="280"
                style={{ border: 0, display: "block", width: "100%" }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="PhysioCentric Map"
              />
              <div style={{ padding: "13px 16px", display: "flex", alignItems: "center", gap: "8px", background: "#fff", borderTop: "1px solid #f1f5f9" }}>
                <IconSvg name="pin" color="#7c3aed" size={14} />
                <span style={{ fontSize: "12px", color: "#475569" }}>A-2, Block A, Gulmohar Park, New Delhi 110049</span>
              </div>
            </div>

            {/* CALL CTA */}
            <a href="tel:09810513841"
              style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "16px", padding: "18px 22px", borderRadius: "12px", background: "#0f172a", color: "#fff", textDecoration: "none", transition: "background 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#1d4ed8"}
              onMouseLeave={e => e.currentTarget.style.background = "#0f172a"}
            >
              <div style={{ width: "42px", height: "42px", borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <IconSvg name="phone" color="white" size={17} />
              </div>
              <div>
                <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "3px" }}>Call Direct</div>
                <div style={{ fontSize: "17px", fontWeight: 600 }}>09810513841</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: "20px", opacity: 0.3 }}>›</div>
            </a>
          </div>

          {/* RIGHT — FORM */}
          <div style={{ background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 4px 32px rgba(0,0,0,0.06)", overflow: "hidden" }}>
            <div style={{ height: "4px", background: "linear-gradient(90deg,#3b82f6,#7c3aed,#06b6d4)" }} />
            <div style={{ padding: "36px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                <div style={{ width: "28px", height: "1px", background: "#3b82f6" }} />
                <span style={{ fontSize: "10px", letterSpacing: "3.5px", textTransform: "uppercase", color: "#3b82f6", fontWeight: 600 }}>Schedule a Visit</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem,3vw,1.9rem)", fontWeight: 600, color: "#0f172a", margin: "0 0 6px" }}>
                Book an <em>Appointment</em>
              </h2>
              <p style={{ fontSize: "14px", color: "#94a3b8", margin: "0 0 28px" }}>Fill in your details — we'll confirm within 24 hours.</p>

              {submitStatus === "success" && (
                <div style={{ display: "flex", gap: "12px", padding: "13px 15px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", marginBottom: "20px" }}>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>✓</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#15803d", fontSize: "14px" }}>Appointment Booked!</div>
                    <div style={{ fontSize: "13px", color: "#16a34a" }}>We'll confirm within 24 hours.</div>
                  </div>
                </div>
              )}
              {submitStatus === "error" && (
                <div style={{ display: "flex", gap: "12px", padding: "13px 15px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", marginBottom: "20px" }}>
                  <span style={{ color: "#dc2626", fontWeight: 700 }}>!</span>
                  <div>
                    <div style={{ fontWeight: 600, color: "#991b1b", fontSize: "14px" }}>Booking Failed</div>
                    <div style={{ fontSize: "13px", color: "#dc2626" }}>Please try again or call us directly.</div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <FField label="Full Name" required error={errors.fullName}>
                  <IWrap icon="user">
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                      placeholder="Your full name" disabled={isSubmitting}
                      style={baseInputStyle("fullName")}
                      onFocus={e => e.target.style.borderColor = "#3b82f6"}
                      onBlur={e => e.target.style.borderColor = errors.fullName ? "#ef4444" : "#e2e8f0"}
                    />
                  </IWrap>
                </FField>

                <div className="cp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <FField label="Email" required error={errors.email}>
                    <IWrap icon="mail">
                      <input type="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="your@email.com" disabled={isSubmitting}
                        style={baseInputStyle("email")}
                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                        onBlur={e => e.target.style.borderColor = errors.email ? "#ef4444" : "#e2e8f0"}
                      />
                    </IWrap>
                  </FField>
                  <FField label="Phone" required error={errors.phone}>
                    <IWrap icon="phone">
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                        placeholder="10-digit number" disabled={isSubmitting}
                        style={baseInputStyle("phone")}
                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                        onBlur={e => e.target.style.borderColor = errors.phone ? "#ef4444" : "#e2e8f0"}
                      />
                    </IWrap>
                  </FField>
                </div>

                <div className="cp-two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <FField label="Preferred Date" required error={errors.preferredDate}>
                    <IWrap icon="cal">
                      <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange}
                        min={new Date().toISOString().split("T")[0]} disabled={isSubmitting}
                        style={{ ...baseInputStyle("preferredDate"), colorScheme: "light" }}
                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                        onBlur={e => e.target.style.borderColor = errors.preferredDate ? "#ef4444" : "#e2e8f0"}
                      />
                    </IWrap>
                  </FField>
                  <FField label="Preferred Time" required error={errors.preferredTime}>
                    <IWrap icon="clock" arrow>
                      <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                        disabled={isSubmitting}
                        style={{ ...baseInputStyle("preferredTime"), appearance: "none", cursor: "pointer" }}
                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                        onBlur={e => e.target.style.borderColor = errors.preferredTime ? "#ef4444" : "#e2e8f0"}
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((s, i) => <option key={i}>{s}</option>)}
                      </select>
                    </IWrap>
                  </FField>
                </div>

                <FField label="Message (Optional)">
                  <div style={{ position: "relative" }}>
                    <IconSvg name="msg" color="#94a3b8" size={15} style={{ position: "absolute", left: "13px", top: "13px", pointerEvents: "none" }} />
                    <textarea name="message" value={formData.message} onChange={handleChange}
                      placeholder="Describe your condition or symptoms..." rows={4} disabled={isSubmitting}
                      style={{ width: "100%", padding: "11px 14px 11px 40px", border: "1.5px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", fontFamily: "inherit", color: "#1e293b", resize: "none", outline: "none", background: isSubmitting ? "#f8fafc" : "#fff", boxSizing: "border-box", lineHeight: 1.6, transition: "border-color 0.2s" }}
                      onFocus={e => e.target.style.borderColor = "#3b82f6"}
                      onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                    />
                  </div>
                </FField>

                <button type="submit" disabled={isSubmitting}
                  style={{ width: "100%", padding: "14px 20px", marginTop: "4px", background: isSubmitting ? "#94a3b8" : "#0f172a", color: "#fff", border: "none", borderRadius: "10px", cursor: isSubmitting ? "not-allowed" : "pointer", fontFamily: "inherit", fontSize: "12px", fontWeight: 600, letterSpacing: "3px", textTransform: "uppercase", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", transition: "all 0.2s" }}
                  onMouseEnter={e => { if (!isSubmitting) { e.currentTarget.style.background = "#1d4ed8"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = isSubmitting ? "#94a3b8" : "#0f172a"; e.currentTarget.style.transform = "none"; }}
                >
                  {isSubmitting
                    ? <><Spinner />Booking...</>
                    : <><SendIcon />Book Appointment</>
                  }
                </button>
                <p style={{ textAlign: "center", fontSize: "12px", color: "#cbd5e1", marginTop: "12px", marginBottom: 0 }}>
                  By submitting, you agree to our terms and conditions.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        input::placeholder, textarea::placeholder { color: #cbd5e1; }
        input[type="date"]::-webkit-calendar-picker-indicator { opacity: 0.5; cursor: pointer; }
        @media (max-width: 820px) {
          .cp-grid { grid-template-columns: 1fr !important; }
          .cp-two-col { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .cp-grid > div:last-child > div { padding: 24px 16px !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Helpers ── */
function FField({ label, required, error, children }) {
  return (
    <div style={{ marginBottom: "18px" }}>
      <label style={{ display: "block", fontSize: "11px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "#475569", marginBottom: "7px" }}>
        {label}{required && <span style={{ color: "#cbd5e1", marginLeft: "4px" }}>*</span>}
      </label>
      {children}
      {error && <p style={{ fontSize: "12px", color: "#ef4444", marginTop: "4px", marginBottom: 0 }}>{error}</p>}
    </div>
  );
}

function IWrap({ icon, arrow, children }) {
  return (
    <div style={{ position: "relative" }}>
      <IconSvg name={icon} color="#94a3b8" size={15} style={{ position: "absolute", left: "13px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", zIndex: 1 }} />
      {children}
      {arrow && (
        <svg style={{ position: "absolute", right: "13px", top: "50%", transform: "translateY(-50%)", width: "14px", height: "14px", color: "#94a3b8", pointerEvents: "none" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      )}
    </div>
  );
}

function Spinner() {
  return <div style={{ width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.65s linear infinite", flexShrink: 0 }} />;
}

function SendIcon() {
  return (
    <svg style={{ width: "15px", height: "15px" }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function IconSvg({ name, color, size = 18, style: s = {} }) {
  const paths = {
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" />,
    mail: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    user: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
    cal: <><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></>,
    msg: <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />,
  };
  return (
    <svg style={{ width: size, height: size, color, display: "block", ...s }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {paths[name]}
    </svg>
  );
}
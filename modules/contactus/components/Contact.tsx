"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";

// ─── Color Tokens — Theme 1 (Finalized) ───────────────────────────────────────
// Primary  (deep navy):   #003049
// Accent   (warm amber):  #F4A261
// Highlight (hover):      #E76F51
// Primary hover:          #02223a
// Dark bg  (footer):      #001f30
// Light bg (sections):    #f7f9fb
// ─────────────────────────────────────────────────────────────────────────────

// ─── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Dr. Priya Sharma",
    degree: "PhD – Life Sciences, IIT Bombay",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=120&h=120&fit=crop&crop=face",
    quote:
      "NRTC transformed my research journey. Their thesis guidance was precise, practical, and deeply encouraging. I submitted my dissertation three months ahead of schedule!",
    rating: 5,
    service: "Thesis Support",
  },
  {
    name: "Rahul Mehta",
    degree: "M.Phil – Economics, Delhi University",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face",
    quote:
      "The data analysis support was outstanding. The experts walked me through SPSS step-by-step and helped me interpret results I was completely stuck on. Highly recommended!",
    rating: 5,
    service: "Data Analysis",
  },
  {
    name: "Dr. Anjali Nair",
    degree: "PhD – Computer Science, NIT Calicut",
    image: "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=120&h=120&fit=crop&crop=face",
    quote:
      "My Scopus-indexed paper would not exist without NRTC's publication support. From journal selection to final revision, their team was incredibly professional and responsive.",
    rating: 5,
    service: "Publication Support",
  },
  {
    name: "Vikram Desai",
    degree: "MBA (Research) – NMIMS Mumbai",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=120&h=120&fit=crop&crop=face",
    quote:
      "I struggled with my research methodology chapter for months. After just two sessions with NRTC's advisor, I had complete clarity. Their structured approach is second to none.",
    rating: 5,
    service: "Research Methodology",
  },
  {
    name: "Sneha Kulkarni",
    degree: "PhD – Education, Pune University",
    image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?w=120&h=120&fit=crop&crop=face",
    quote:
      "The academic writing and editing service helped me improve my language dramatically. My supervisor couldn't believe the improvement in quality between drafts. Thank you, NRTC!",
    rating: 5,
    service: "Writing & Editing",
  },
  {
    name: "Prof. Arjun Rao",
    degree: "Post-Doc Researcher, IISER Pune",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&h=120&fit=crop&crop=face",
    quote:
      "NRTC's certificate course on research design gave me the confidence and skills to pursue independent research projects. The faculty are world-class and deeply committed.",
    rating: 5,
    service: "Training Program",
  },
];

const FAQS = [
  {
    q: "How quickly will I receive a response after submitting the form?",
    a: "Our team responds to all enquiries within 24 working hours. For urgent matters, we recommend calling or using our WhatsApp chat support for an immediate response.",
  },
  {
    q: "Is the initial consultation free of charge?",
    a: "Yes, your first 30-minute consultation with one of our academic advisors is completely free. This helps us understand your needs and recommend the most suitable support plan.",
  },
  {
    q: "Do you offer online/remote support for students outside Ahmedabad?",
    a: "Absolutely. We provide full online support via video calls, email, and our digital platform. Students from across India and internationally have benefited from our remote services.",
  },
  {
    q: "How do I know which service is right for my stage of research?",
    a: "During your free consultation, our advisors will assess your current stage, requirements, and goals, then recommend the most appropriate service package for you.",
  },
  {
    q: "Are your services confidential?",
    a: "Yes, complete confidentiality is guaranteed. We never share any student work, data, or personal information with third parties under any circumstances.",
  },
];

// ─── Hero Banner ──────────────────────────────────────────────────────────────
function HeroBanner() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-[#003049]">
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#F4A261]/6 rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-[#F4A261]/4 rounded-full translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex items-center gap-2 text-white/50 text-sm mb-6 justify-center">
          <a href="#" className="hover:text-[#F4A261] transition-colors">Home</a>
          <span>›</span>
          <span className="text-[#F4A261] font-medium">Contact Us</span>
        </div>

        <span className="inline-block bg-[#F4A261]/15 border border-[#F4A261]/30 text-[#F4A261] text-xs font-semibold px-4 py-1.5 rounded-full tracking-widest uppercase mb-5">
          We're Here to Help
        </span>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-5">
          Get in <span className="text-[#F4A261]">Touch</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed mb-10">
          Have a question about our services, need guidance on your research, or want to enrol in a
          course? Our team is ready to assist you — reach out through any channel that suits you.
        </p>

        {/* Quick contact chips */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { icon: "📞", label: "+91 82001 60169" },
            { icon: "📧", label: "contact@irtcentre.in" },
            { icon: "💬", label: "Live Chat Available" },
            { icon: "📍", label: "Surat, Gujarat" },
          ].map((c) => (
            <div
              key={c.label}
              className="flex items-center gap-2 bg-white/8 border border-white/15 text-white/80 text-xs font-semibold px-4 py-2 rounded-full"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Info Cards Row ───────────────────────────────────────────────────
function ContactCardsRow() {
  const cards = [
    {
      icon: "📞",
      title: "Phone & WhatsApp",
      lines: ["+91 82001 60169"],
      action: "Call Now",
      href: "tel:+919876543210",
      bg: false,
    },
    {
      icon: "📧",
      title: "Email Us",
      lines: ["contact@irtcentre.in", "support@irtcentre.in"],
      action: "Send Email",
      href: "mailto:contact@irtcentre.in",
      bg: true,
    },
    {
      icon: "💬",
      title: "Live Chat",
      lines: ["Available Mon–Sat", "9:00 AM – 7:00 PM IST"],
      action: "Start Chat",
      href: "#chat",
      bg: false,
    },
    {
      icon: "⏰",
      title: "Working Hours",
      lines: ["Mon – Sat: 9 AM – 7 PM", "Sunday: Closed"],
      action: null,
      href: null,
      bg: false,
    },
  ];

  return (
    <section className="bg-white py-0 px-6">
      <div className="max-w-7xl mx-auto -mt-10 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className={`rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:shadow-xl ${
                c.bg
                  ? "bg-[#F4A261] border-[#F4A261]"
                  : "bg-white border-[#003049]/8 hover:border-[#F4A261]/40"
              }`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4 ${
                  c.bg ? "bg-[#003049]/10" : "bg-[#003049]/6"
                }`}
              >
                {c.icon}
              </div>
              <h3
                className={`font-bold text-sm mb-2 ${
                  c.bg ? "text-[#003049]" : "text-[#003049]"
                }`}
              >
                {c.title}
              </h3>
              {c.lines.map((line) => (
                <p
                  key={line}
                  className={`text-sm leading-relaxed ${
                    c.bg ? "text-[#003049]/75" : "text-[#003049]/60"
                  }`}
                >
                  {line}
                </p>
              ))}
              {c.action && c.href && (
                <a
                  href={c.href}
                  className={`inline-block mt-4 text-xs font-bold px-4 py-1.5 rounded-full transition-colors duration-200 ${
                    c.bg
                      ? "bg-[#003049] text-white hover:bg-[#02223a]"
                      : "bg-[#003049] text-white hover:bg-[#02223a]"
                  }`}
                >
                  {c.action} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact Form + Office Info ───────────────────────────────────────────────
function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", subject: "", service: "", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim())    e.name    = "Full name is required.";
    if (!formData.email.trim())   e.email   = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email address.";
    if (!formData.phone.trim())   e.phone   = "Phone number is required.";
    if (!formData.subject.trim()) e.subject = "Subject is required.";
    if (!formData.service)        e.service = "Please select a service.";
    if (!formData.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleSubmit = async () => {
    setApiError("");
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    setLoading(true);
    try {
      const res = await fetch("/api/contact/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSubmitted(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = (field: string) =>
    `w-full bg-white border rounded-xl px-4 py-3 text-[#003049] placeholder-[#003049]/30 text-sm focus:outline-none transition-colors ${
      errors[field] ? "border-[#E76F51] focus:border-[#E76F51]" : "border-[#003049]/15 focus:border-[#F4A261]"
    }`;

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* ── Contact Form ── */}
        <div>
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Drop Us a Line</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2 mb-3 leading-tight">
            Send Enquiry
          </h2>
          <p className="text-[#003049]/60 text-base mb-8 leading-relaxed">
            Fill in the form below and one of our academic advisors will get back to you within
            24 working hours.
          </p>

          {submitted ? (
            <div className="bg-[#003049] rounded-2xl p-10 text-center">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-white font-black text-xl mb-2">Enquiry Sent!</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                Thank you for reaching out. Our team will respond to your enquiry within 24 working hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setFormData({ name:"", email:"", phone:"", subject:"", service:"", message:"" }); setErrors({}); }}
                className="bg-[#F4A261] text-[#003049] font-bold px-7 py-2.5 rounded-full hover:bg-[#E76F51] transition-colors"
              >
                Send Another Enquiry
              </button>
            </div>
          ) : (
            <div className="bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* Name */}
                <div>
                  <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                    Full Name <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. / Mr. / Ms. Your Name"
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    className={fieldClass("name")}
                  />
                  {errors.name && <p className="text-[#E76F51] text-xs mt-1">{errors.name}</p>}
                </div>
                {/* Email */}
                <div>
                  <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                    Email Address <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    className={fieldClass("email")}
                  />
                  {errors.email && <p className="text-[#E76F51] text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                {/* Phone */}
                <div>
                  <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                    Phone / WhatsApp <span className="text-[#E76F51]">*</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={(e) => { setFormData({ ...formData, phone: e.target.value }); setErrors({ ...errors, phone: "" }); }}
                    className={fieldClass("phone")}
                  />
                  {errors.phone && <p className="text-[#E76F51] text-xs mt-1">{errors.phone}</p>}
                </div>
                {/* Service */}
                <div>
                  <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                    Service of Interest <span className="text-[#E76F51]">*</span>
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => { setFormData({ ...formData, service: e.target.value }); setErrors({ ...errors, service: "" }); }}
                    className={fieldClass("service")}
                  >
                    <option value="">Select a service...</option>
                    <option>Research Guidance</option>
                    <option>Dissertation / Thesis Support</option>
                    <option>Research Methodology</option>
                    <option>Data Analysis</option>
                    <option>Writing &amp; Editing Services</option>
                    <option>Publication Support</option>
                    <option>Training Support</option>
                    <option>Other</option>
                  </select>
                  {errors.service && <p className="text-[#E76F51] text-xs mt-1">{errors.service}</p>}
                </div>
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                  Subject <span className="text-[#E76F51]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thesis guidance for PhD in Management"
                  value={formData.subject}
                  onChange={(e) => { setFormData({ ...formData, subject: e.target.value }); setErrors({ ...errors, subject: "" }); }}
                  className={fieldClass("subject")}
                />
                {errors.subject && <p className="text-[#E76F51] text-xs mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label className="text-[#003049] text-xs font-bold uppercase tracking-wide mb-1.5 block">
                  Message <span className="text-[#E76F51]">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us about your research stage, what you need help with, and any specific deadlines..."
                  value={formData.message}
                  onChange={(e) => { setFormData({ ...formData, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                  className={`${fieldClass("message")} resize-none`}
                />
                {errors.message && <p className="text-[#E76F51] text-xs mt-1">{errors.message}</p>}
              </div>

              {apiError && (
                <p className="text-[#E76F51] text-sm text-center mb-4 font-semibold">{apiError}</p>
              )}

              <button
                onClick={handleSubmit}
                // disabled={loading}
                className="w-full bg-[#003049] text-white font-black py-4 rounded-xl hover:bg-[#02223a] transition-colors duration-200 text-sm shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Enquiry →"}
              </button>
              <p className="text-[#003049]/40 text-xs text-center mt-3">
                🔒 Your information is 100% confidential and never shared.
              </p>
            </div>
          )}
        </div>

        {/* ── Office Info + Chat ── */}
        <div className="flex flex-col gap-6">
          {/* Office Location */}
          <div>
            <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Find Us</span>
            <h2 className="text-4xl font-black text-[#003049] mt-2 mb-6 leading-tight">
              Office Location
            </h2>
          </div>

          {/* Map placeholder */}
          <div className="relative rounded-2xl overflow-hidden bg-[#003049]/8 border border-[#003049]/10 h-48 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📍</div>
              <p className="text-[#003049] font-bold text-sm">NRTC Office, Surat</p>
              <p className="text-[#003049]/50 text-xs mt-1">Coming Soon..</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs font-bold text-[#F4A261] border border-[#F4A261]/40 px-4 py-1.5 rounded-full hover:bg-[#F4A261] hover:text-[#003049] transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          </div>

          {/* Address details */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🏢", label: "Address", val: "Coming Soon.." },
              { icon: "🌐", label: "Website", val: "www.irtcentre.in" },
              { icon: "📞", label: "Phone", val: "+91 82001 60169" },
              { icon: "📧", label: "Email", val: "contact@irtcentre.in\nsupport@irtcentre.in" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-3 items-start bg-[#f7f9fb] border border-[#003049]/8 rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-[#003049] flex items-center justify-center text-base shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#003049] font-bold text-xs uppercase tracking-wide">{item.label}</p>
                  <p className="text-[#003049]/65 text-xs mt-0.5 leading-relaxed whitespace-pre-line">{item.val}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Chat support card */}
          <div className="bg-[#003049] rounded-2xl p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#F4A261]/15 flex items-center justify-center text-2xl shrink-0">
              💬
            </div>
            <div className="flex-1">
              <h4 className="text-white font-black text-base mb-1">Live Chat Support</h4>
              <p className="text-white/60 text-sm mb-4 leading-relaxed">
                Chat with an academic advisor in real time. Available Monday to Saturday,
                9:00 AM – 7:00 PM IST for immediate assistance.
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="flex items-center gap-2 bg-[#F4A261] text-[#003049] font-bold text-xs px-4 py-2 rounded-full hover:bg-[#E76F51] transition-colors"
                >
                  <span>💬</span> Start Live Chat
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white font-bold text-xs px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
                >
                  <span>📱</span> WhatsApp Us
                </a>
              </div>
            </div>
          </div>

          {/* Working hours */}
          {/* <div className="bg-[#F4A261] rounded-2xl p-6">
            <h4 className="text-[#003049] font-black text-base mb-4 flex items-center gap-2">
              <span>⏰</span> Working Hours
            </h4>
            <div className="flex flex-col gap-2">
              {[
                { day: "Monday – Friday", hours: "9:00 AM – 7:00 PM", open: true },
                { day: "Saturday",        hours: "9:00 AM – 5:00 PM", open: true },
                { day: "Sunday",          hours: "Closed",             open: false },
                { day: "Public Holidays", hours: "Closed",             open: false },
              ].map((row) => (
                <div key={row.day} className="flex items-center justify-between py-1.5 border-b border-[#003049]/10 last:border-0">
                  <span className="text-[#003049]/80 text-sm font-medium">{row.day}</span>
                  <span
                    className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${
                      row.open
                        ? "bg-[#003049] text-white"
                        : "bg-[#003049]/15 text-[#003049]/50"
                    }`}
                  >
                    {row.hours}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => { setCurrent(idx); setAnimating(false); }, 250);
    },
    [animating]
  );

  useEffect(() => {
    const t = setInterval(() => goTo((current + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [current, goTo]);

  const prev = TESTIMONIALS[(current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length];
  const active = TESTIMONIALS[current];
  const next = TESTIMONIALS[(current + 1) % TESTIMONIALS.length];

  return (
    <section className="bg-[#003049] py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Student Voices</span>
          <h2 className="text-4xl font-black text-white mt-2">What Our Students Say</h2>
          <p className="text-white/60 mt-3 max-w-xl mx-auto text-base">
            Real stories from real scholars whose academic journeys we've been proud to support.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className={`max-w-3xl mx-auto transition-all duration-300 ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="bg-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            {/* Big decorative quote */}
            <div className="absolute -top-4 -left-2 text-[9rem] leading-none text-[#003049]/6 font-black select-none pointer-events-none">
              "
            </div>

            {/* Stars */}
            <div className="flex gap-1 mb-5">
              {Array(active.rating).fill(0).map((_, i) => (
                <span key={i} className="text-[#F4A261] text-lg">★</span>
              ))}
            </div>

            {/* Quote */}
            <p className="text-[#003049]/85 text-lg leading-relaxed mb-8 relative z-10 italic font-medium">
              "{active.quote}"
            </p>

            {/* Service badge */}
            <div className="mb-6">
              <span className="text-xs font-bold bg-[#F4A261]/15 text-[#E76F51] border border-[#F4A261]/30 px-3 py-1 rounded-full">
                {active.service}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-4 border-t border-[#003049]/8 pt-6">
              <img
                src={active.image}
                alt={active.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#F4A261]"
              />
              <div>
                <p className="text-[#003049] font-black text-base">{active.name}</p>
                <p className="text-[#003049]/55 text-sm">{active.degree}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Side previews (desktop) */}
        <div className="hidden lg:flex items-center justify-center gap-6 mt-8">
          {/* Prev preview */}
          <button
            onClick={() => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="flex items-center gap-3 bg-white/8 border border-white/15 hover:bg-white/15 rounded-2xl px-5 py-3 transition-all duration-200 text-left max-w-xs"
          >
            <img src={prev.image} alt={prev.name} className="w-10 h-10 rounded-full object-cover border border-[#F4A261]/40 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-white font-bold text-xs truncate">{prev.name}</p>
              <p className="text-white/50 text-xs truncate">{prev.degree}</p>
            </div>
            <span className="text-white/40 text-lg ml-auto">‹</span>
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? "w-7 h-2.5 bg-[#F4A261]" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Next preview */}
          <button
            onClick={() => goTo((current + 1) % TESTIMONIALS.length)}
            className="flex items-center gap-3 bg-white/8 border border-white/15 hover:bg-white/15 rounded-2xl px-5 py-3 transition-all duration-200 text-left max-w-xs"
          >
            <img src={next.image} alt={next.name} className="w-10 h-10 rounded-full object-cover border border-[#F4A261]/40 shrink-0" />
            <div className="overflow-hidden">
              <p className="text-white font-bold text-xs truncate">{next.name}</p>
              <p className="text-white/50 text-xs truncate">{next.degree}</p>
            </div>
            <span className="text-white/40 text-lg ml-auto">›</span>
          </button>
        </div>

        {/* Mobile dots */}
        <div className="flex lg:hidden justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-7 h-2.5 bg-[#F4A261]" : "w-2.5 h-2.5 bg-white/30"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Thumbnail grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-10 max-w-2xl mx-auto">
          {TESTIMONIALS.map((t, i) => (
            <button
              key={t.name}
              onClick={() => goTo(i)}
              className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-200 ${
                i === current
                  ? "bg-[#F4A261]/20 border border-[#F4A261]/50"
                  : "opacity-50 hover:opacity-80 border border-transparent"
              }`}
            >
              <img
                src={t.image}
                alt={t.name}
                className={`w-10 h-10 rounded-full object-cover transition-all duration-200 ${
                  i === current ? "border-2 border-[#F4A261]" : "border-2 border-white/20"
                }`}
              />
              <p className="text-white text-xs font-semibold text-center leading-tight truncate w-full">
                {t.name.split(" ")[0]}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="bg-[#f7f9fb] py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Common Questions</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">Frequently Asked Questions</h2>
          <p className="text-[#003049]/60 mt-3 text-base">
            Quick answers to the questions we hear most often from students reaching out for the first time.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                open === i
                  ? "border-[#F4A261] shadow-md"
                  : "border-[#003049]/10 bg-white hover:border-[#003049]/30"
              }`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className={`font-bold text-sm pr-4 ${open === i ? "text-[#003049]" : "text-[#003049]/80"}`}>
                  {faq.q}
                </span>
                <span
                  className={`text-xl font-black shrink-0 transition-all duration-300 ${
                    open === i ? "text-[#F4A261] rotate-45" : "text-[#003049]/30"
                  }`}
                >
                  +
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-5">
                  <p className="text-[#003049]/70 text-sm leading-relaxed border-l-2 border-[#F4A261] pl-4">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <section className="bg-[#003049] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Ready to Begin?</span>
        <h2 className="text-4xl font-black text-white mt-2 mb-4 leading-tight">
          Your Academic Success Starts Here
        </h2>
        <p className="text-white/70 text-base max-w-xl mx-auto mb-8 leading-relaxed">
          Join over 1,200 students who have trusted NRTC to guide them through every stage of their
          research journey. Book your free consultation today.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#"
            className="bg-[#F4A261] text-[#003049] font-black px-9 py-3.5 rounded-full hover:bg-[#E76F51] transition-colors duration-200 shadow-lg"
          >
            Book Free Consultation
          </a>
          <a
            href="#"
            className="border-2 border-white/30 text-white font-semibold px-9 py-3.5 rounded-full hover:bg-white/10 transition-colors duration-200"
          >
            Explore Services
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Contact() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroBanner />
      {/* <ContactCardsRow /> */}
      <ContactFormSection />
      <TestimonialsSection />
      <FAQSection />
      <BottomCTA />
      <Footer />
    </main>
  );
}

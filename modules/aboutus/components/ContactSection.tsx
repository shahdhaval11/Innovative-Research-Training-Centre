
// ─── Contact & Office Info ────────────────────────────────────────────────────
function ContactSection() {
  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-[#F4A261] font-bold text-sm uppercase tracking-widest">Reach Us</span>
          <h2 className="text-4xl font-black text-[#003049] mt-2">Contact & Office Information</h2>
          <p className="text-[#003049]/60 mt-3 max-w-xl mx-auto text-base">
            Have questions or want to discuss how we can support your academic journey? We're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact details */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: "📍",
                label: "Office Address",
                value: "204, Academic Tower, SG Highway, Ahmedabad – 380054, Gujarat, India",
              },
              {
                icon: "📞",
                label: "Phone / WhatsApp",
                value: "+91 82001 60169",
              },
              {
                icon: "📧",
                label: "Email",
                value: "contact@irtcentre.in  |  support@irtcentre.in",
              },
              {
                icon: "⏰",
                label: "Working Hours",
                value: "Monday – Saturday: 9:00 AM – 7:00 PM IST",
              },
              {
                icon: "🌐",
                label: "Website",
                value: "www.irtcentre.in",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 items-start bg-[#f7f9fb] border border-[#003049]/8 rounded-2xl p-5"
              >
                <div className="w-11 h-11 rounded-xl bg-[#003049] flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-[#003049] font-bold text-sm">{item.label}</p>
                  <p className="text-[#003049]/65 text-sm mt-0.5 leading-relaxed">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick contact form */}
          <div className="bg-[#003049] rounded-3xl p-8 md:p-10">
            <h3 className="text-white font-black text-xl mb-6">Send Us a Message</h3>
            <div className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Dr. / Mr. / Ms. Name"
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A261] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A261] transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Thesis Guidance, Publication Support"
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A261] transition-colors"
                />
              </div>
              <div>
                <label className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-1.5 block">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your academic project and how we can help..."
                  className="w-full bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F4A261] transition-colors resize-none"
                />
              </div>
              <button className="w-full bg-[#F4A261] text-[#003049] font-black py-3.5 rounded-xl hover:bg-[#E76F51] transition-colors duration-200 text-sm shadow-lg">
                Send Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
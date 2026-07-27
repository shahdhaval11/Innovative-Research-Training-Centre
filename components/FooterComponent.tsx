
function Footer() {
  return (
    <footer className="bg-[#001f30] text-white/60 py-12 px-6">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 overflow-hidden">
              <img
                src="/nanonovaLogoIcon.png"
                alt="Nanonova Research and Training Centre logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <p className="text-white font-bold text-sm leading-tight">
              Nanonova Research<br />
              <span className="text-[#F4A261] text-xs font-semibold tracking-widest uppercase">& Training Centre</span>
            </p>
          </div>
          <p className="text-sm leading-relaxed">
            Empowering UG, PG & PhD students with expert guidance, training, and publication support.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <p className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Quick Links</p>
          {["Home", "About Us", "Training", "Student Support", "Contact Us", "Gallery", "Feedback"].map((l) => (
            <a key={l} href="#" className="block text-sm hover:text-[#F4A261] transition-colors mb-2">
              {l}
            </a>
          ))}
        </div>

        {/* Services */}
        <div>
          <p className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Services</p>
          {["Thesis Writing", "Research Guidance", "Paper Publication", "Data Analysis", "Proofreading"].map(
            (l) => (
              <a key={l} href="#" className="block text-sm hover:text-[#F4A261] transition-colors mb-2">
                {l}
              </a>
            )
          )}
        </div>

        {/* Contact */}
        <div>
          <p className="text-white font-bold mb-4 text-sm uppercase tracking-wide">Contact Us</p>
          <p className="text-sm mb-2">📧 nanonovaresearch@gmail.com</p>
          <p className="text-sm mb-2">📞 +91 94087 82640</p>
          <p className="text-sm mb-5">📍 Surat, Gujarat, India</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 text-center text-xs">
        © {new Date().getFullYear()} Nanonova Research & Training Centre. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
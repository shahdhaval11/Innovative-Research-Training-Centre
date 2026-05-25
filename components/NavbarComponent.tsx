import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
   const router = useRouter()


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    // { label: "Home2",
    //   href: "/home2",
    //   icon: "🏠",
    // },
    // { label: "Home3",
    //   href: "/home3",
    //   icon: "🏠",
    // },
    { label: "Student Support",
      href: "/studentSupport",
      icon: "💡",
    },
    { label: "About",
      href: "/aboutus",
      icon: "👥",
    },
    { label: "Courses",
      href: "/courses",
      icon: "📚",
    },
    { label: "Contact",
      href: "/contactus",
      icon: "📮",
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#003049] shadow-lg py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3" onClick={() => router.push('/')} style={{ cursor: "pointer" }}>
          <div className="w-10 h-10 rounded-full bg-[#F4A261] flex items-center justify-center font-black text-[#003049] text-lg select-none">
            IR
          </div>
          <div className="leading-tight">
            <p className="text-white font-bold text-sm tracking-wide">Innovative Research</p>
            <p className="text-[#F4A261] text-xs tracking-widest uppercase">& Training Centre</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-white/80 hover:text-[#F4A261] text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {l.icon} {l.label || ""}
            </Link>
          ))}
          <a
            href="/admin/login"
            className="ml-2 bg-[#F4A261] text-[#003049] text-sm font-bold px-5 py-2 rounded-full hover:bg-[#E76F51] transition-colors duration-200"
          >
            Admin Login
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#003049] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            // <a key={l.label} href={l.href} className="text-white/80 hover:text-[#F4A261] text-sm font-medium">
            //   {l.icon} {l.label || ""}
            // </a>
            <Link key={l.label} href={l.href} className="text-white/80 hover:text-[#F4A261] text-sm font-medium">
              {l.icon} {l.label || ""}
            </Link>
          ))}
          <a href="#" className="bg-[#F4A261] text-[#003049] text-sm font-bold px-5 py-2 rounded-full text-center">
            Enroll Now
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
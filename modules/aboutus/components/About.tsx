"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";
import HeroBanner from "../components/HeroBanner";
import MissionVisionSection from "../components/MissionVisionSection";
import TeamSection from "../components/TeamSection";
import ExpertiseSection from "../components/ExpertiseSection";
import PartnersSection from "../components/PartnersSection";
import ContactSection from "../components/ContactSection";


// ─── Page ─────────────────────────────────────────────────────────────────────
export default function About() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroBanner />
      <MissionVisionSection />
      <TeamSection />
      <ExpertiseSection />
      <PartnersSection />
      <ContactSection />
      <Footer />
    </main>
  );
}

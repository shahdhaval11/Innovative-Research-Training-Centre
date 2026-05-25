"use client";

import { useState, useEffect, useCallback } from "react";
import Navbar from "@/components/NavbarComponent";
import Footer from "@/components/FooterComponent";
import HeroSlider from "../components/HeroSlider";
import StatsBar from "../components/StatsBar";
import IntroSection from "../components/IntroSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import AnnouncementsSection from "../components/AnnouncementsSection";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="font-sans">
      <Navbar />
      <HeroSlider />
      <StatsBar />
      <IntroSection />
      <ServicesSection />
      <TestimonialsSection />
      <AnnouncementsSection />
      {/* <TrainingCTASection /> */}
      <Footer />
    </main>
  );
}
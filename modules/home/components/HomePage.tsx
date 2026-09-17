import Hero from "./Hero";
import DisciplineStrip from "./DisciplineStrip";
import AudienceSection from "./AudienceSection";
import CoreServicesSection from "./CoreServicesSection";
import StatsBar from "./StatsBar";
import PopularPrograms from "./PopularPrograms";
import UpcomingWorkshops from "./UpcomingWorkshops";
import Testimonials from "./Testimonials";
import PartnersStrip from "./PartnersStrip";
import CtaBanner from "./CtaBanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <DisciplineStrip />
      <AudienceSection />
      <CoreServicesSection />
      <StatsBar />
      <PopularPrograms />
      <UpcomingWorkshops />
      <Testimonials />
      <PartnersStrip />
      <CtaBanner />
    </>
  );
}

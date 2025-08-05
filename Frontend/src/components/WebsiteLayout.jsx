import Navbar from "./Navbar";
import Features from "./Features";
import HeroSection from "./HeroSection";
import LanguagesAvailable from "./LanguagesAvailable";
import Feature3 from "./Feature3";
import WorkFlow from "./WorkFlow";
import Footer from "./Footer";
import CTA from "./FinalCTA";

const WebsiteLayout = () => {
  return <div>
    <Navbar />
    <HeroSection />
    <Features />
    <LanguagesAvailable />
    <Feature3 />
    <WorkFlow />
    <CTA />
    <Footer />
  </div>;
};

export default WebsiteLayout;

import Navbar from "./Navbar";
import Features from "./Features";
import HeroSection from "./HeroSection";
import LanguagesAvailable from "./LanguagesAvailable";
import Feature3 from "./Feature3";
import WorkFlow from "./WorkFlow";
import Footer from "./Footer";
import CTA from "./FinalCTA";
import RankLine from "./Rank"
import { useRef } from "react"

const WebsiteLayout = () => {

  const featureRef = useRef(null);
  const homeRef = useRef(null);
  const languageRef = useRef(null);
  const rankLineRef = useRef(null);
  const workFlowRef = useRef(null);

  return (
    <div className="font-[Inter]">
      <Navbar />
      <div ref={homeRef}>
        <HeroSection featureRef={featureRef} />
      </div>
      <div ref={featureRef}>
        <Features />
      </div>
      <Feature3 />
      <div ref={rankLineRef}>
        <RankLine />
      </div>
      <div ref={languageRef}>
        <LanguagesAvailable />
      </div>
      <div ref={workFlowRef}>
        <WorkFlow />
      </div>
      <CTA />
      <Footer
        homeRef={homeRef}
        featureRef={featureRef}
        rankLineRef={rankLineRef}
        languageRef={languageRef}
        workFlow={workFlowRef}
      />
    </div>
  );
};

export default WebsiteLayout;

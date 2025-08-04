import Navbar from "./components/Navbar";
import Features from "./components/Features";
import HeroSection from "./components/HeroSection";
import LanguagesAvailable from "./components/LanguagesAvailable";
import Feature3 from "./components/Feature3";
import WorkFlow from "./components/WorkFlow";
import Footer from "./components/Footer";
import CTA from "./components/FinalCTA";
import Dashboard from "./components/secureComponents/dashboard";
import ProfileHeroSection from "./components/secureComponents/ProfileHeroSection";
import { Routes, Route, Outlet } from "react-router-dom";
import ProfileLayout from "./components/secureComponents/ProfileLayout";

const App = () => {
  return (
    <div className="font-[Inter]">
      {/* <Navbar />
      <HeroSection />
      <Features />
      <LanguagesAvailable />
      <Feature3 />
      <WorkFlow />
      <Footer />
      <CTA /> */}
        <Routes>
          <Route path="/" element={<conten}
          <Route path="/user/*" element={<ProfileLayout />}>
          <Route index element={<Dashboard />}></Route>
          </Route>
        </Routes>
    </div>
  );
};

export default App;

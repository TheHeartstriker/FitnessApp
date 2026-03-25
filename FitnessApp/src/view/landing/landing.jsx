import About from "./about/about.jsx";
import HeroView from "./hero/hero.jsx";
import LayoutGuide from "@/components/layoutGuide/layoutGuide.jsx";
import How from "./how/how.jsx";
import Features from "./features/features.jsx";
import "./landing.css";
function LandingPage() {
  return (
    <>
      {/* <LayoutGuide columns={12} margin="32px" gutter="24px" /> */}
      <div className="landing-container">
        <HeroView />
        <About />
        <How />
        <Features />
      </div>
    </>
  );
}

export default LandingPage;

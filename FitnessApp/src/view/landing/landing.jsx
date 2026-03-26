import About from "./about/about.jsx";
import Hero from "./hero/hero.jsx";
import LayoutGuide from "@/components/layoutGuide/layoutGuide.jsx";
import How from "./how/how.jsx";
import Features from "./features/features.jsx";
import Preview from "./preview/preview.jsx";
import Benefits from "./benefits/benefits.jsx";
import Login from "./newLogin/login.jsx";
import "./landing.css";
function LandingPage() {
  return (
    <>
      {/* <LayoutGuide columns={12} margin="32px" gutter="24px" /> */}
      <div className="landing-container">
        <Hero />
        <About />
        <How />
        <Features />
        <Preview />
        <Benefits />
        <Login />
      </div>
    </>
  );
}

export default LandingPage;

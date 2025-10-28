import Login from "./login";
import { ScrollDown } from "../../utils/scroll";
import "./startPage.css";
import TriAngleBackgroundAni from "./startPage";
function LandingPage() {
  return (
    <>
      <section className="landing-page">
        <div className="landing-background-svg">
          <div className="test-blur"></div>
          <TriAngleBackgroundAni />
        </div>
        <div className="landing-content">
          <h2>THIS IS</h2>
          <h1>FGraphs</h1>
          <h3>A simplistic take on fitness tracking</h3>
          <p>
            Hi there! FGraphs is a fitness tracking app! Mainly made in my spare
            time to learn, have fun and showcase my skills and understanding of
            web development. But! Its also a pretty neat app to track your
            fitness if you into that.
          </p>
          <ScrollDown percent={100} className="primary-action-btn">
            Want to give it a try?
          </ScrollDown>
        </div>
      </section>
      <Login />
    </>
  );
}

export default LandingPage;

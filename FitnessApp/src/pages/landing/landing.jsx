import StartPage from "./startPage";
import LoginPage from "./login";
import Login from "./login";
import Tribackground from "../../assets/triBackground";

function LandingPage() {
  return (
    <>
      <section className="landing-page">
        <div className="landing-background-svg">
          <div className="test-blur"></div>
          <Tribackground />
        </div>
        <div className="landing-content">
          <h2>THIS IS</h2>
          <h1>FGraphs</h1>
          <h3>A simplistic take on fitness tracking</h3>
          <p>
            Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi
            sit cursus tincidunt massa et a. Dolor odio parturient cursus justo
            nunc enim, a, sit facilisi. Eleifend at ac lacus, ullamcorper mauris
            eget tortor mollis.
          </p>
          <button className="primary-action-btn">Want to give it a try?</button>
        </div>
      </section>
      <section className="login-section">
        <Login />
      </section>
    </>
  );
}

export default LandingPage;

import "./featured.css";
import Ellipse from "@/assets/landing/ellipse";

function Featured() {
  return (
    <section className="featured-section">
      <Ellipse />
      {/* Card one share */}
      <div className="featured-card featured-card--left">
        <div className="featured-card-image">
          <img src="/src/assets/landing/connection.png" alt="Sharing Image" />
        </div>
        <div className="featured-card-text">
          <div className="featured-card-text-pill">
            <span></span>
            <h3>Feature 1</h3>
          </div>
          <h4>Integrated data sharing system</h4>
          <p>
            Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi
            sit cursus tincidunt massa et a. Dolor odio parturient cursus justo
            nunc enim, a, sit facilisi.{" "}
          </p>
        </div>
      </div>
      {/* Card two data analysis */}
      <div className="featured-card featured-card--right">
        <div className="featured-card-image">
          <img src="/src/assets/landing/graphs.png" alt="Analytics Image" />
        </div>
        <div className="featured-card-text">
          <div className="featured-card-text-pill featured-card-text-pill--second">
            <span></span>
            <h3>Feature 1</h3>
          </div>
          <h4>Integrated data sharing system</h4>
          <p>
            Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi
            sit cursus tincidunt massa et a. Dolor odio parturient cursus justo
            nunc enim, a, sit facilisi.{" "}
          </p>
        </div>
      </div>
      {/* Card three data design? */}
      <div className="featured-card featured-card--left">
        <div className="featured-card-image">
          <img src="/src/assets/landing/design.png" alt="Design Image" />
        </div>
        <div className="featured-card-text">
          <div className="featured-card-text-pill featured-card-text-pill--third">
            <span></span>
            <h3>Feature 1</h3>
          </div>
          <h4>Integrated data sharing system</h4>
          <p>
            Proin quis cras euismod sit et metus risus ut. Semper nam vel morbi
            sit cursus tincidunt massa et a. Dolor odio parturient cursus justo
            nunc enim, a, sit facilisi.{" "}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Featured;

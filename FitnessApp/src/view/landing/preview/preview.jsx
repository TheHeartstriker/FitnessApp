import "./preview.css";
import { useEffect, useState } from "react";
import { lorem, smallLorem, largeLorem } from "@/utils/text";
import InfoLine from "@/components/infoLine/infoLine";
import PreviewAni from "./previewAni";
function Preview() {
  const [activePreview, setActivePreview] = useState(0);
  return (
    <section className="preview-section">
      {/*  */}
      {/* Preview header */}
      {/*  */}
      <PreviewAni />
      <div className="preview-section-header">
        <InfoLine text="Some info" reverse={true} />
        <div className="preview-section-header-text">
          <h2>
            The preview of the intresting, <br />
            design, innovation and inspiration <br />
            of FGraphs
          </h2>
          <div className="preview-section-header-text-para">
            <h3>Details</h3>
            <p>{lorem}</p>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Preview images */}
      {/*  */}
      <div className="preview-section-images">
        {/*  */}
        {/* Image container */}
        <div className="preview-section-images-container">
          <div
            className={`preview-section-images-container-item ${activePreview === 0 ? "active" : ""}`}
            onMouseEnter={() => setActivePreview(0)}
          >
            <img src="/landing/grid.png" alt="Feature image" />
          </div>
          <div
            className={`preview-section-images-container-item ${activePreview === 1 ? "active" : ""}`}
            onMouseEnter={() => setActivePreview(1)}
          >
            <img src="/landing/grid.png" alt="Feature image" />
          </div>
          <div
            className={`preview-section-images-container-item ${activePreview === 2 ? "active" : ""}`}
            onMouseEnter={() => setActivePreview(2)}
          >
            <img src="/landing/grid.png" alt="Feature image" />
          </div>
          <div
            className={`preview-section-images-container-item ${activePreview === 3 ? "active" : ""}`}
            onMouseEnter={() => setActivePreview(3)}
          >
            <img src="/landing/grid.png" alt="Feature image" />
          </div>
        </div>
        {/*  */}
        {/* Stats container */}
        <div className="preview-section-images-stats">
          <div className="preview-section-images-stats-item">
            <h4>Mobile responsive</h4>
          </div>
          <div className="preview-section-images-stats-item">
            <h4>Innovative UI</h4>
          </div>
          <div className="preview-section-images-stats-item">
            <h4>Simple</h4>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Preview ending text and cards */}
      {/*  */}
      <div className="preview-section-ending">
        <h3>
          Fueling growth through <br /> insight and creative <br /> application
        </h3>
        <div className="preview-section-ending-card">
          <h4>Creative</h4>
          <p>{smallLorem}</p>
        </div>
        <div className="preview-section-ending-card">
          <h4>Creative</h4>
          <p>{smallLorem}</p>
        </div>
        <div className="preview-section-ending-card">
          <h4>Creative</h4>
          <p>{smallLorem}</p>
        </div>
      </div>
    </section>
  );
}

export default Preview;

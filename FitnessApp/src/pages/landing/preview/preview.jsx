import "./preview.css";
import { PreviewElement } from "@/components/landing/previewElement";
import { accountText01, inputDataText02, consistencyText03 } from "./text";
function Preview() {
  return (
    <section className="preview-section">
      <div className="preview-header">
        <h3>Preview</h3>
      </div>
      <div className="preview-content">
        <PreviewElement
          number={"01"}
          textHeader={"Creating an Account"}
          textContent={accountText01}
          middle={false}
        />
        <PreviewElement
          number={"02"}
          textHeader={"Inputting Data"}
          textContent={inputDataText02}
          middle={true}
        />
        <PreviewElement
          number={"03"}
          textHeader={"Consistency "}
          textContent={consistencyText03}
          middle={false}
        />
      </div>
    </section>
  );
}

export default Preview;

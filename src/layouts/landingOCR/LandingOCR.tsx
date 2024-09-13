// styles
import "./landingOCR.scss";

// types
import { ReactElement } from "react";

// components
import ExtractImageForm from "../../components/extractImageForm/ExtractImageForm";

export default function LandingOCR(): ReactElement {
  return (
    <main id={"landingOCR"}>
      <h2>{"OCR"}</h2>
      <section>
        <ExtractImageForm />
      </section>
    </main>
  );
}

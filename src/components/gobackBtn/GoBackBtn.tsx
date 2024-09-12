// styles
import "./gobackBtn.scss";

// types
import { ReactElement } from "react";

// hooks
import { useContext } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext.tsx";

export default function GoBackBtn(): ReactElement {
  const { language } = useContext(LanguageContext);

  return (
    <div id={"backButtonWrapper"}>
      <button
        className={"goBackButton"}
        onClick={() => window.history.back()}
      >{`${language === "en" ? "Go back" : "Retour"}`}</button>
    </div>
  );
}

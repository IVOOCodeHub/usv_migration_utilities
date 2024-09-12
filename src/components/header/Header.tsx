// styles
import "./header.scss";

// assets
import logo from "../../assets/branding/brandingLogo.png";

// types
import { ReactElement } from "react";

// hooks
import { useContext } from "react";
import { Link } from "react-router-dom";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function Header(): ReactElement {
  const { language, setLanguageHandler } = useContext(LanguageContext);
  const title =
    language === "en" ? "USV migration utilities" : "Utilitaires de migration USV";

  return (
    <header id={"header"}>
      <Link to={"http://192.168.0.254:8080/USV_PROD/menu0.asp"} title={"USV"}>
        <figure>
          <img src={logo} alt={"logo"} />
        </figure>
      </Link>
      <h1>{title}</h1>
      <div className={"buttonWrapper"}>
        <span title={"Français"} onClick={() => setLanguageHandler("fr")}>
          🇫🇷
        </span>
        <span title={"Anglais"} onClick={() => setLanguageHandler("en")}>
          🇬🇧
        </span>
      </div>
    </header>
  );
}

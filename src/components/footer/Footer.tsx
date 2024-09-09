// styles
import "./footer.scss";

// assets
import logo from "../../assets/branding/brandingLogo--alt.png";

// types
import { ReactElement } from "react";

// hooks
import { Link } from "react-router-dom";
import { useContext } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function Footer(): ReactElement {
  const { language } = useContext(LanguageContext);
  return (
    <footer id={"footer"}>
      <Link to={"/auth"}>
        <figure title={"Accueil"}>
          <img src={logo} alt={"logo"} />
        </figure>
      </Link>
      <p>
        ©2024{" "}
        {language === "en" ? "Export .ASP to BDD" : "Export .ASP vers BDD"}
      </p>
    </footer>
  );
}

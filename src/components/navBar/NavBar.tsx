// styles
import "./NavBar.scss";

// types
import { ReactElement } from "react";
export interface INavBarProps {
  formState: {
    isQueryToBDDFormOpen: boolean;
    setIsQueryToBDDFormOpen: (isQueryToBDDFormOpen: boolean) => void;
  };
}

// hooks
import { useContext } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function NavBar({ formState }: INavBarProps): ReactElement {
    const { language } = useContext(LanguageContext);

  return (
    <nav id={"formNav"}>
      <button
        onClick={() =>
          formState.setIsQueryToBDDFormOpen(!formState.isQueryToBDDFormOpen)
        }
      >
          {language === "en" ? "Query to BDD" : "Requête vers BDD"}
      </button>
    </nav>
  );
}

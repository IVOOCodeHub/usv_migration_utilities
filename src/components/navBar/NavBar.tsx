// styles
import "./NavBar.scss";

// types
import { ReactElement } from "react";
export interface INavBarProps {
  formState: {
    isQueryToBDDFormOpen: boolean;
    setIsQueryToBDDFormOpen: (isQueryToBDDFormOpen: boolean) => void;
    isRequestForQueryFormOpen: boolean;
    setIsRequestForQueryFormOpen: (isRequestForQueryFormOpen: boolean) => void;
  };
}

// hooks
import { useContext } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function NavBar({ formState }: INavBarProps): ReactElement {
  const { language } = useContext(LanguageContext);

  const toggleIsRequestForQueryForm = () => {
    formState.setIsRequestForQueryFormOpen(
      !formState.isRequestForQueryFormOpen,
    );
    formState.setIsQueryToBDDFormOpen(false);
  };

  const toggleIsQueryToBDDForm = () => {
    formState.setIsQueryToBDDFormOpen(!formState.isQueryToBDDFormOpen);
    formState.setIsRequestForQueryFormOpen(false);
  };

  return (
    <nav id={"formNav"}>
      <button onClick={() => toggleIsRequestForQueryForm()}>
        {language === "en"
          ? "Request for query creation"
          : "Demande de création de requête"}
      </button>
      <button onClick={() => toggleIsQueryToBDDForm()}>
        {language === "en" ? "Query to BDD" : "Requête vers BDD"}
      </button>
    </nav>
  );
}

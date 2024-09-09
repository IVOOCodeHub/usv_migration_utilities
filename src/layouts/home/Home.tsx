// styles
import "./home.scss";

// types
import { ReactElement } from "react";

// hooks
import { useState, useEffect, useContext } from "react";

// components
import NavBar from "../../components/navBar/NavBar";
import QueryToBDDForm from "../../components/queryToBDDForm/QueryToBDDForm.tsx";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext.tsx";

export default function Home(): ReactElement {
  const [isQueryToBDDFormOpen, setIsQueryToBDDFormOpen] = useState(false);
  const [isAnFormIsOpen, setIsAnFormIsOpen] = useState(false);
  const { language } = useContext(LanguageContext);

  const props = { isQueryToBDDFormOpen, setIsQueryToBDDFormOpen };

  const toggleFormState = () => {
    if (!isQueryToBDDFormOpen) {
      setIsAnFormIsOpen(false);
    } else {
      setIsAnFormIsOpen(true);
    }
  };

  useEffect(() => {
    toggleFormState();
  }, [isQueryToBDDFormOpen]);

  return (
    <main id={"home"} className={isQueryToBDDFormOpen ? "formOpen" : ""}>
      <section>
        <NavBar formState={props} />
      </section>
      <section className={"homeContent"}>
        {isAnFormIsOpen ? (
          <QueryToBDDForm />
        ) : (
          <h2>
            {language === "en"
              ? "Form for exporting information from .ASP code to the database. Please select the type of information you want to export."
              : "Formulaire d'export d'information issus de code .ASP vers la base de donnée. Sélectionnez le type d'information que vous souhaitez exporter."}
          </h2>
        )}
      </section>
    </main>
  );
}

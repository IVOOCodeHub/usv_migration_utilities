// styles
import "./home.scss";

// types
import { ReactElement } from "react";

// hooks
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

// components
import NavBar from "../../components/navBar/NavBar";
import QueryToBDDForm from "../../components/queryToBDDForm/QueryToBDDForm.tsx";
import RequestForQueryForm from "../../components/requestForQueryForm/RequestForQueryForm.tsx";

// context
import { UserContext } from "../../context/userContext/UserContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext.tsx";

export default function Home(): ReactElement {
  const { setMatricule } =
    useContext(UserContext);
  const { language } = useContext(LanguageContext);

  // if we come from Arbo USV in usv prod, the website, is open with args in the url, used for the form "RequestForQuery".
  const [searchParams] = useSearchParams();
  const getMatricule = searchParams.get("matricule");
  const matriculeFromParams = getMatricule?.split("|")[0];
  const pageKey = searchParams.get("pageKey");

  useEffect(() => {
    if (matriculeFromParams) {
      setMatricule(matriculeFromParams);
    }
  }, []);

  useEffect(() => {
    if (pageKey) {
      setIsRequestForQueryFormOpen(true);
    }
  }, []);

  const [isQueryToBDDFormOpen, setIsQueryToBDDFormOpen] = useState(false);
  const [isRequestForQueryFormOpen, setIsRequestForQueryFormOpen] =
    useState(false);
  const [isAnFormIsOpen, setIsAnFormIsOpen] = useState(false);

  const props = {
    isQueryToBDDFormOpen,
    setIsQueryToBDDFormOpen,
    isRequestForQueryFormOpen,
    setIsRequestForQueryFormOpen,
  };

  const toggleFormState = () => {
    if (!isQueryToBDDFormOpen && !isRequestForQueryFormOpen) {
      setIsAnFormIsOpen(false);
    } else {
      setIsAnFormIsOpen(true);
    }
  };

  useEffect(() => {
    toggleFormState();
  }, [isQueryToBDDFormOpen, isRequestForQueryFormOpen]);

  return (
    <main id={"home"} className={isAnFormIsOpen ? "formOpen" : ""}>
      <section>
        <NavBar formState={props} />
      </section>
      <section className={"homeContent"}>
        {isAnFormIsOpen ? (
          <>
            {isQueryToBDDFormOpen && <QueryToBDDForm />}
            {isRequestForQueryFormOpen && <RequestForQueryForm />}
          </>
        ) : (
          <h2>
            {language === "en"
              ? "Please select a form."
              : "Veuillez sélectionner un formulaire."}
          </h2>
        )}
      </section>
    </main>
  );
}

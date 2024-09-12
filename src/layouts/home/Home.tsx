// styles
import "./home.scss";

// types
import { ReactElement } from "react";

// hooks
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

// components
import RequestForQueryForm from "../../components/requestForQueryForm/RequestForQueryForm.tsx";

// context
import { UserContext } from "../../context/userContext/UserContext";

export default function Home(): ReactElement {
  const { setMatricule } = useContext(UserContext);

  // if we come from Arbo USV in usv prod, the website, is open with args in the url, used for the form "RequestForQuery".
  // the .asp page is called "gest_arbo_usv_modif0.asp, in USV_PROD folder on 192.168.0.254"
  const [searchParams] = useSearchParams();
  const getMatricule = searchParams.get("matricule");
  const matriculeFromParams = getMatricule?.split("|")[0];
  const pageKey = searchParams.get("pageKey");

  const [isRequestForQueryFormOpen, setIsRequestForQueryFormOpen] =
    useState(false);
  const [isAnFormIsOpen, setIsAnFormIsOpen] = useState(false);

  const toggleFormState = () => {
    if (!isRequestForQueryFormOpen) {
      setIsAnFormIsOpen(false);
    } else {
      setIsAnFormIsOpen(true);
    }
  };

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

  useEffect(() => {
    toggleFormState();
  }, [isRequestForQueryFormOpen]);

  return (
    <main id={"home"} className={isAnFormIsOpen ? "formOpen" : ""}>
      <section className={"homeContent"}>
        {isAnFormIsOpen && (
          <>{isRequestForQueryFormOpen && <RequestForQueryForm />}</>
        )}
      </section>
    </main>
  );
}

// styles
import "./requestForQueryForm.scss";

// types
import { ReactElement, FormEvent } from "react";
import { IRequestForQuery } from "../../API/interfaces/requestForQuery.interface.ts";

// hooks
import { useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

// context
import { UserContext } from "../../context/userContext/UserContext";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext.tsx";
import { LoaderContext } from "../../context/LoaderContext/LoaderContext.tsx";

// components
import Loader from "../loader/Loader";
import GoBackBtn from "../gobackBtn/GoBackBtn";

// services
import { RequestForQueryService } from "../../API/services/requestForQuery.service";
const requestForQueryService = new RequestForQueryService();

export default function RequestForQueryForm(): ReactElement {
  const { userCredentials } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);

  const [searchParams] = useSearchParams();
  const pageKey = searchParams.get("pageKey");
  const getPageName = searchParams.get("pageName");
  const pageName = getPageName?.slice(0, -1);

  const [queryOverview, setQueryOverview] = useState("");
  const [expectedQueryResult, setExpectedQueryResult] = useState("");
  const [submitResponse, setSubmitResponse] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSubmitResponse("");

    const datas: IRequestForQuery = {
      pageKey: pageKey!,
      queryOverview: queryOverview,
      expectedQueryResult: expectedQueryResult,
    };

    startLoading();
    const res = await requestForQueryService.postRequestForQuery(
      userCredentials!,
      datas,
    );
    stopLoading();
    if (res instanceof Error) {
      alert(res.message);
    } else {
      const confirmationMessage =
        language === "en"
          ? "Request for query successfully submitted"
          : "La demande de requête a été envoyée avec succès";
      setSubmitResponse(confirmationMessage);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {submitResponse ? (
            <h2>{submitResponse}</h2>
          ) : (
            <form id={"requestForQueryForm"} onSubmit={handleSubmit}>
              <h2>
                {language === "en" ? "Request for query" : "Demande de requête"}
              </h2>
              <div className={"formInputWrapper"}>
                <label>
                  {language === "en"
                    ? "Name of the page for which to make the request: "
                    : "Nom de la page pour laquelle effectuer la demande : "}
                </label>
                <p>
                  Page :<b style={{ fontWeight: "700" }}> {pageName}</b>,{" "}
                  {language === "en"
                    ? " Key of the page: "
                    : " cle de la page :"}{" "}
                  <b style={{ fontWeight: "700" }}>{pageKey}</b>
                </p>
              </div>
              <div className={"formInputWrapper"}>
                <label>
                  {language === "en"
                    ? "Query overview"
                    : "Vue d'ensemble de la requête"}
                </label>
                <textarea
                  placeholder={
                    language === "en"
                      ? "Describe what your query should does (context, steps, etc.)."
                      : "Décrivez ce que votre requête doit faire (contexte, étapes, etc.)."
                  }
                  onChange={(e) => setQueryOverview(e.target.value)}
                ></textarea>
              </div>
              <div className={"formInputWrapper"}>
                <label>
                  {language === "en"
                    ? "Expected query result"
                    : "Résultat attendu"}
                </label>
                <textarea
                  placeholder={
                    language === "en"
                      ? `If possible, provide an example in JSON format.`
                      : `Si possible, donnez un exemple au format JSON.
                `
                  }
                  onChange={(e) => setExpectedQueryResult(e.target.value)}
                ></textarea>
              </div>
              <div className={"formButtonWrapper"}>
                <button className={"submitButton"} type={"submit"}>
                  {language === "en" ? "Submit request" : "Envoyer la demande"}
                </button>
              </div>
            </form>
          )}
        </>
      )}
      <GoBackBtn />
    </>
  );
}

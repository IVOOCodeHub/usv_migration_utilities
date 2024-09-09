// styles
import "./QueryToBDDForm.scss";

// types
import { ReactElement, FormEvent, ChangeEvent } from "react";
import { IQueryToBDD } from "../../API/interfaces/queryToBDD.interface.ts";

// hooks | libraries
import { useContext, useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-sql.js";
import "prismjs/themes/prism-okaidia.css";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext.tsx";
import { LoaderContext } from "../../context/LoaderContext/LoaderContext.tsx";

// components
import Loader from "../loader/Loader.tsx";

// services
import { QueryToBDDService } from "../../API/services/queryToBDD.service.ts";
const queryToBDDService = new QueryToBDDService();

export default function QueryToBDDForm(): ReactElement {
  const { language } = useContext(LanguageContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const [aspPageName, setAspPageName] = useState("");
  const [queryComment, setQueryComment] = useState("");
  const [query, setQuery] = useState("");
  const [isVerify, setIsVerify] = useState(false);

  useEffect(() => {
    Prism.highlightAll();
  }, [query, isVerify]);

  const handleQueryChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuery(e.target.value);
  };

  const verifyQuery = () => {
    setIsVerify(true);
  };

  const cancelVerify = () => {
    setIsVerify(false);
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas: IQueryToBDD = {
      aspPageName: aspPageName,
      queryComment: queryComment,
      query: query,
    };

    console.log("datas =>", datas);

    startLoading();
    await queryToBDDService.postQuery(datas);
    stopLoading();
  };

  const ToggleWithSyntaxHighlighting = (): ReactElement => {
    return (
      <pre className={"language-sql"}>
        <code className={"language-sql"}>{query}</code>
      </pre>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <form id={"submitToBDDForm"} onSubmit={submitForm}>
      <h2>{language === "en" ? "Query to BDD" : "Requête vers BDD"}</h2>
      <div className={"formInputWrapper"}>
        <label>
          {language === "en" ? ".ASP page name" : "Nom de la page .ASP"}
        </label>
        <input
          type={"text"}
          placeholder={
            language === "en"
              ? "Enter your .ASP page name"
              : "Nom de la page .ASP"
          }
          onChange={(e) => setAspPageName(e.target.value)}
        />
      </div>
      <div className={"formInputWrapper"}>
        <label>
          {language === "en"
            ? "What does the query do ?"
            : "Que fais la requête ?"}
        </label>
        <input
          type={"text"}
          placeholder={language === "en" ? "Comment" : "Commentaire"}
          onChange={(e) => setQueryComment(e.target.value)}
        />
      </div>
      <div className={"formInputWrapper"}>
        <label>{language === "en" ? "Query" : "Requête"}</label>
        {isVerify ? (
          <ToggleWithSyntaxHighlighting />
        ) : (
          <textarea
            placeholder={
              language === "en" ? "Enter your query" : "Entrez votre requête"
            }
            value={query}
            onChange={handleQueryChange}
          ></textarea>
        )}
      </div>
      <div className={"formButtonWrapper"}>
        {isVerify ? (
          <>
            <span onClick={cancelVerify} className={"cancelButton"}>
              {language === "en" ? "Cancel" : "Annuler"}
            </span>
            <button type={"submit"} className={"submitButton"}>
              {language === "en" ? "Submit" : "Envoyer"}
            </button>
          </>
        ) : (
          <span onClick={verifyQuery} className={"checkButton"}>
            {language === "en" ? "Check" : "Vérifier"}
          </span>
        )}
      </div>
    </form>
  );
}

// styles
import "./displayAnnotateComponents.scss";

// types
import { ReactElement, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IPageElement } from "../../layouts/landingOCR/LandingOCR";
interface IDisplayAnnotateComponentsProps {
  pageElements: IPageElement[];
  datas: object | null;
  setDatas: Dispatch<SetStateAction<object | null>>;
  saveInformations: () => void;
}
interface IInputValues {
  [key: string]: string;
}

// hooks | libraries
import { useContext, useState } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function DisplayAnnotateComponents({
  pageElements,
  datas,
  setDatas,
  saveInformations,
}: IDisplayAnnotateComponentsProps): ReactElement {
  const { language } = useContext(LanguageContext);
  const [inputValues, setInputValues] = useState<IInputValues>({});

  const noIdentifiedComponentsMessage =
    language === "en"
      ? "No components have been identified for this section."
      : "Aucun composant n'as été identifié pour cette section.";

  const componentsByCategory = pageElements.reduce(
    (acc, pageElement) => {
      const components = pageElement.component || [];
      switch (pageElement.category) {
        case "En-tête":
          acc.headerComponents.push(...components);
          break;
        case "Contenu":
          acc.bodyComponents.push(...components);
          break;
        case "Pied de page":
          acc.footerComponents.push(...components);
          break;
        default:
          break;
      }
      return acc;
    },
    {
      headerComponents: [] as string[],
      bodyComponents: [] as string[],
      footerComponents: [] as string[],
    },
  );

  const handleInputChange = (
    component: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setInputValues({
      ...inputValues,
      [component]: event.target.value,
    });
  };

  const handleSubmit = () => {
    const updatedDatas = {
      ...datas,
      componentsByCat: {
        headerComponents: componentsByCategory.headerComponents.map(
          (component) => ({
            component,
            text: inputValues[component] || "",
          }),
        ),
        bodyComponents: componentsByCategory.bodyComponents.map(
          (component) => ({
            component,
            text: inputValues[component] || "",
          }),
        ),
        footerComponents: componentsByCategory.footerComponents.map(
          (component) => ({
            component,
            text: inputValues[component] || "",
          }),
        ),
      },
    };
    setDatas(updatedDatas);
    saveInformations();
  };

  return (
    <>
      <h2>
        {language === "en" ? "Identified components" : "Composants identifiés"}
      </h2>

      <article>
        <h3>
          {language === "en" ? "Header components" : "Composant d'en-tête"}
        </h3>
        <ul>
          {componentsByCategory.headerComponents.length > 0 ? (
            <>
              {componentsByCategory.headerComponents.map((component, index) => (
                <li key={index}>
                  <label>{component} : </label>
                  <input
                    type={"text"}
                    value={inputValues[component] || ""}
                    onChange={(event) => handleInputChange(component, event)}
                  />
                </li>
              ))}
            </>
          ) : (
            <p>{noIdentifiedComponentsMessage}</p>
          )}
        </ul>
      </article>

      <article>
        <h3>{language === "en" ? "Body components" : "Composant de corps"}</h3>
        <ul>
          {componentsByCategory.bodyComponents.length > 0 ? (
            <>
              {componentsByCategory.bodyComponents.map((component, index) => (
                <li key={index}>
                  <label>{component} : </label>
                  <input
                    type={"text"}
                    value={inputValues[component] || ""}
                    onChange={(event) => handleInputChange(component, event)}
                  />
                </li>
              ))}
            </>
          ) : (
            <p>{noIdentifiedComponentsMessage}</p>
          )}
        </ul>
      </article>

      <article>
        <h3>
          {language === "en"
            ? "Footer components"
            : "Composant de pied-de-page"}
        </h3>
        <ul>
          {componentsByCategory.footerComponents.length > 0 ? (
            <>
              {componentsByCategory.footerComponents.map((component, index) => (
                <li key={index}>
                  <label>{component} : </label>
                  <input
                    type={"text"}
                    value={inputValues[component] || ""}
                    onChange={(event) => handleInputChange(component, event)}
                  />
                </li>
              ))}
            </>
          ) : (
            <p>{noIdentifiedComponentsMessage}</p>
          )}
        </ul>
      </article>
      <div className={"btnWrapper"}>
        <button type={"button"}>
          {language === "en" ? "Cancel" : "Annuler"}
        </button>
        <button onClick={handleSubmit}>
          {language === "en" ? "Submit" : "Soumettre"}
        </button>
      </div>
    </>
  );
}

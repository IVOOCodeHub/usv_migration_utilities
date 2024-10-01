// styles
import "./displayAnnotateComponents.scss";

// types
import { ReactElement, Dispatch, SetStateAction, ChangeEvent } from "react";
import { IPageElement } from "../../layouts/landingOCR/LandingOCR";
interface IDisplayAnnotateComponentsProps {
  pageElements: IPageElement[];
  datas: object | null;
  setDatas: Dispatch<SetStateAction<object | null>>;
  setImage: Dispatch<SetStateAction<string | null>>;
}
interface IInputValues {
  [key: string]: string;
}

// hooks | libraries
import { useContext, useState } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { LoaderContext } from "../../context/LoaderContext/LoaderContext.tsx";
import { DictionaryContext } from "../../context/dictionaryContext/DictionaryContext.tsx";

// component
import Loader from "../../components/loader/Loader";

// services
import { PageAnnotateToBddService } from "../../API/services/pageAnnotageToBdd.service";
import { IPageAnnotateToBdd } from "../../API/interfaces/pageAnnotateToBdd.interface.ts";
const pageAnnotateToBddService = new PageAnnotateToBddService();

export default function DisplayAnnotateComponents({
  pageElements,
  datas,
  setDatas,
  setImage,
}: IDisplayAnnotateComponentsProps): ReactElement {
  const { language } = useContext(LanguageContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { componentsDictionary } = useContext(DictionaryContext);

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

  const componentNameToKey = componentsDictionary!.reduce(
    (map: { [key: string]: string }, component) => {
      map[component.denomination_commune] = component.cle;
      return map;
    },
    {},
  );

  const handleSubmit = async () => {
    startLoading();

    const template: string = (datas as IPageAnnotateToBdd).template
    const pageName: string = (datas as IPageAnnotateToBdd).pageName

    const updatedDatas = {
      template: template,
      pageName: pageName,
      componentsByCat: {
        headerComponents: componentsByCategory.headerComponents.map(
          (component) => ({
            component: componentNameToKey[component] || component,
            text: inputValues[component] || "",
          }),
        ),
        bodyComponents: componentsByCategory.bodyComponents.map(
          (component) => ({
            component: componentNameToKey[component] || component,
            text: inputValues[component] || "",
          }),
        ),
        footerComponents: componentsByCategory.footerComponents.map(
          (component) => ({
            component: componentNameToKey[component] || component,
            text: inputValues[component] || "",
          }),
        ),
      },
    };

    await pageAnnotateToBddService.postPageAnnotateToBdd(updatedDatas);

    setImage(null)
    setDatas(null); // clean states, to reset app after submit.
    stopLoading();
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2>
            {language === "en"
              ? "Identified components"
              : "Composants identifiés"}
          </h2>

          <article>
            <h3>
              {language === "en" ? "Header components" : "Composant d'en-tête"}
            </h3>
            <ul>
              {componentsByCategory.headerComponents.length > 0 ? (
                <>
                  {componentsByCategory.headerComponents.map(
                    (component, index) => (
                      <li key={index}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={inputValues[component] || ""}
                          onChange={(event) =>
                            handleInputChange(component, event)
                          }
                        />
                      </li>
                    ),
                  )}
                </>
              ) : (
                <p>{noIdentifiedComponentsMessage}</p>
              )}
            </ul>
          </article>

          <article>
            <h3>
              {language === "en" ? "Body components" : "Composant de corps"}
            </h3>
            <ul>
              {componentsByCategory.bodyComponents.length > 0 ? (
                <>
                  {componentsByCategory.bodyComponents.map(
                    (component, index) => (
                      <li key={index}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={inputValues[component] || ""}
                          onChange={(event) =>
                            handleInputChange(component, event)
                          }
                        />
                      </li>
                    ),
                  )}
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
                  {componentsByCategory.footerComponents.map(
                    (component, index) => (
                      <li key={index}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={inputValues[component] || ""}
                          onChange={(event) =>
                            handleInputChange(component, event)
                          }
                        />
                      </li>
                    ),
                  )}
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
      )}
    </>
  );
}

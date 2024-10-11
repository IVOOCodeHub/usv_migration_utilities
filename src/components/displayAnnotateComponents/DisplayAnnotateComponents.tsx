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
import { UserContext } from "../../context/userContext/UserContext";

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
  const { userCredentials } = useContext(UserContext);

  const [inputValues, setInputValues] = useState<IInputValues>({});

  const noIdentifiedComponentsMessage =
    language === "en"
      ? "No components have been identified for this section."
      : "Aucun composant n'a été identifié pour cette section.";

  // Regroup components by category
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

  // Handle input change with unique keys for each component + index
  const handleInputChange = (
    componentKey: string,
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setInputValues({
      ...inputValues,
      [componentKey]: event.target.value,
    });
  };

  // Map components to their unique keys from dictionary
  const componentNameToKey = componentsDictionary!.reduce(
    (map: { [key: string]: string }, component) => {
      map[component.denomination_commune] = component.cle;
      return map;
    },
    {},
  );

  // Handle form submission
  const handleSubmit = async () => {
    startLoading();

    const pageKey: number = (datas as IPageAnnotateToBdd).cle_arbo_usv;

    const updatedDatas = {
      cle_arbo_usv: Number(pageKey),
      componentsByCat: {
        headerComponents: componentsByCategory.headerComponents.map(
          (
            component: string,
            index: number,
          ): { component: string; text: string } => ({
            component: componentNameToKey[component] || component,
            text: inputValues[`${component}-header-${index}`] || "",
          }),
        ),
        bodyComponents: componentsByCategory.bodyComponents.map(
          (
            component: string,
            index: number,
          ): { component: string; text: string } => ({
            component: componentNameToKey[component] || component,
            text: inputValues[`${component}-body-${index}`] || "",
          }),
        ),
        footerComponents: componentsByCategory.footerComponents.map(
          (
            component: string,
            index: number,
          ): { component: string; text: string } => ({
            component: componentNameToKey[component] || component,
            text: inputValues[`${component}-footer-${index}`] || "",
          }),
        ),
      },
    };

    console.log("Submitted datas =>", updatedDatas);

    await pageAnnotateToBddService.postPageAnnotateToBdd(
      userCredentials!,
      updatedDatas,
    );

    setImage(null);
    setDatas(null); // clean states, to reset app after submit.
    stopLoading();
  };

  const handleCancel: () => void = (): void => {
    window.location.reload();
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

          {/* Header Components */}
          <article>
            <h3>
              {language === "en" ? "Header components" : "Composant d'en-tête"}
            </h3>
            <ul>
              {componentsByCategory.headerComponents.length > 0 ? (
                <>
                  {componentsByCategory.headerComponents.map(
                    (component: string, index: number): ReactElement => (
                      <li key={`${component}-header-${index}`}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={
                            inputValues[`${component}-header-${index}`] || ""
                          }
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>,
                          ): void =>
                            handleInputChange(
                              `${component}-header-${index}`,
                              event,
                            )
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

          {/* Body Components */}
          <article>
            <h3>
              {language === "en" ? "Body components" : "Composant de corps"}
            </h3>
            <ul>
              {componentsByCategory.bodyComponents.length > 0 ? (
                <>
                  {componentsByCategory.bodyComponents.map(
                    (component: string, index: number): ReactElement => (
                      <li key={`${component}-body-${index}`}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={
                            inputValues[`${component}-body-${index}`] || ""
                          }
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>,
                          ): void =>
                            handleInputChange(
                              `${component}-body-${index}`,
                              event,
                            )
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

          {/* Footer Components */}
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
                    (component: string, index: number): ReactElement => (
                      <li key={`${component}-footer-${index}`}>
                        <label>{component} : </label>
                        <input
                          type={"text"}
                          value={
                            inputValues[`${component}-footer-${index}`] || ""
                          }
                          onChange={(
                            event: ChangeEvent<HTMLInputElement>,
                          ): void =>
                            handleInputChange(
                              `${component}-footer-${index}`,
                              event,
                            )
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

          {/* Buttons */}
          <div className={"btnWrapper"}>
            <button type={"button"} onClick={handleCancel}>
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

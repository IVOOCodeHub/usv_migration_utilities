// styles
import "./imageAnnotate.scss";

// types
import { ReactElement, Dispatch, SetStateAction } from "react";
import { IPageElement } from "../../layouts/landingOCR/LandingOCR.tsx";
interface IAnnotationRegion {
  id: string;
  type: string;
  cls?: string;
  tags?: string[];
  x: number;
  y: number;
  width: number;
  height: number;
}

interface IAnnotatedImage {
  src: string;
  name: string;
  regions?: IAnnotationRegion[];
}

interface IAnnotationOutput {
  images: IAnnotatedImage[];
}

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";
import { DictionaryContext } from "../../context/dictionaryContext/DictionaryContext";

// hooks | libraries
import { useContext, useState, useEffect } from "react";
import ReactImageAnnotate from "react-image-annotate";
import { IComponentDictionary } from "../../API/interfaces/componentsDictionary.interface.ts";


export default function ImageAnnotate({
  image,
  setImage,
  setPageElements,
}: {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  pageElements: IPageElement[];
  setPageElements: Dispatch<SetStateAction<IPageElement[]>>;
}): ReactElement {
  const { language } = useContext(LanguageContext);
  const { componentsDictionary, getComponentsDictionary } =
    useContext(DictionaryContext);
  const [annotations, setAnnotations] = useState<IAnnotationRegion[] | null>(
    null,
  );
  const [regionTagList, setRegionTagList] = useState<string[]>([]);

  // create an array to avoid error
  // " Warning: Each child in a list should have a unique "key" prop."
  // of React
  const imagesArray = [image].map((imageSrc: string | null, index: number) => {
    return {
      id: `image-${index}`,
      src: imageSrc,
      name: `${
        language === "en"
          ? "Define the components of the page"
          : "Définissez les composants de la page"
      }`,
    };
  });

  const handleAnnotationsChange = (output: IAnnotationOutput) => {
    setAnnotations(output.images[0].regions || []);
    console.log("annotations : =>", output.images[0].regions);
  };

  const handleCancel = () => {
    setImage(null);
  };

  const isTagSaved = () => {
    return !!annotations;
  };

  const handleSubmit = () => {
    const newElements: IPageElement[] = [];
    annotations!.forEach((annotation) => {
      console.log("annotation : =>", annotation);

      const element = {
        category: annotation["cls"]!,
        component: annotation["tags"]!,
      };

      newElements.push(element);
    });

    setPageElements(newElements);
  };

  useEffect(() => {
    if (componentsDictionary && componentsDictionary.length === 0) {
      getComponentsDictionary();
    }
  }, []);

  useEffect(() => {
    handleRegionTagList();
  }, [componentsDictionary]);

  const handleRegionTagList: () => Promise<void> = async (): Promise<void> => {
    componentsDictionary!.forEach((component: IComponentDictionary): void => {
      setRegionTagList((prevState: string[]): string[] => [
        ...prevState,
        component.denomination_commune,
      ]);
    });
  };

  return (
    <>
      <div className={"imageAnnotateWrapper"}>
        {regionTagList.length > 0 && (
          <ReactImageAnnotate
            images={imagesArray}
            regionTagList={regionTagList}
            regionClsList={[
              language === "en" ? "Header" : "En-tête",
              language === "en" ? "Body" : "Contenu",
              language === "en" ? "Footer" : "Pied de page",
            ]}
            onExit={handleAnnotationsChange}
            enabledTools={["create-box"]}
            hideNext={true}
            hidePrev={true}
            hideSettings={true}
            hideClone={true}
            hideDelete={true}
            hideFullScreen={true}
            hideToolbar={true}
            hideHeader={false}
            hideHeaderText={false}
            hideSave={false}
          />
        )}
      </div>
      <div className={"imageAnnotateFooter"}>
        <p>
          {language === "en"
            ? "Don't forget to save for submission"
            : "N'oubliez pas de sauvegarder pour pouvoir valider"}
        </p>
        <div>
          <button onClick={handleCancel} className={"cancelBtn"}>
            {language === "en" ? "Cancel" : "Annuler"}
          </button>
          <button
            onClick={handleSubmit}
            className={isTagSaved() ? "submitBtn" : "submitBtn--disabled"}
            disabled={!isTagSaved()}
          >
            {language === "en" ? "Submit" : "Valider"}
          </button>
        </div>
      </div>
    </>
  );
}

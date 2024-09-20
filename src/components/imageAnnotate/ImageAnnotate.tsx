// styles
import "./imageAnnotate.scss";

// types
import { ReactElement, Dispatch, SetStateAction, useState } from "react";
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

// hooks | libraries
import { useContext } from "react";
import ReactImageAnnotate from "react-image-annotate";

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
  const [annotations, setAnnotations] = useState<IAnnotationRegion[] | null>(
    null,
  );

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

  return (
    <>
      <div className={"imageAnnotateWrapper"}>
        <ReactImageAnnotate
          images={imagesArray}
          regionTagList={[
            language === "en" ? "Title" : "Titre",
            language === "en" ? "Subtitle" : "Sous-titre",
            language === "en" ? "Caption" : "Légende",
            language === "en" ? "Table" : "Tableau",
            language === "en" ? "Confirm button" : "Bouton de confirmation",
            language === "en" ? "Close button" : "Bouton de fermeture",
            language === "en" ? "Link button" : "Bouton de re-direction",
            language === "en" ? "Image" : "Image",
            language === "en" ? "Link" : "Lien",
          ]}
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

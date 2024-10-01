// styles
import "./landingOCR.scss";

// assets | icons
import { FcPicture } from "react-icons/fc";

// types
import { MouseEvent, ReactElement } from "react";
export interface IPageElement {
  category: string | null;
  component: string[] | null;
}

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

// components
import ExtractImageForm from "../../components/extractImageForm/ExtractImageForm";
import DisplayAnnotateComponents from "../../components/displayAnnotateComponents/DisplayAnnotateComponents.tsx";
import ExtractTextFromImage from "../../components/extractTextFromImage/ExtractTextFromImage";

// hooks | libraries
import { useState, useContext } from "react";
import ImageAnnotate from "../../components/imageAnnotate/ImageAnnotate.tsx";

export default function LandingOCR(): ReactElement {
  const { language } = useContext(LanguageContext);
  const [image, setImage] = useState<string | null>(null);
  const [pageElements, setPageElements] = useState<IPageElement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<object | null>({});

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <main id={"landingOCR"}>
      {!image && (
        <section>
          <ExtractImageForm
            image={image}
            setImage={setImage}
            setDatas={setDatas}
          />
        </section>
      )}
      {image && pageElements.length === 0 && (
        <section id={"imageAnnotate"}>
          <ImageAnnotate
            image={image}
            setImage={setImage}
            pageElements={pageElements}
            setPageElements={setPageElements}
          />
        </section>
      )}
      {pageElements.length > 0 && (
        <>
          <div className={"pageElementWrapper"}>
            <section id={"displayAnnotateComponents"}>
              <article id={"displayImage"}>
                {image && (
                  <button onClick={() => setIsModalOpen(true)}>
                    <FcPicture size={25} />
                    {language === "en" ? "Display image" : "Afficher l'image"}
                  </button>
                )}
              </article>
              <DisplayAnnotateComponents
                pageElements={pageElements}
                datas={datas}
                setDatas={setDatas}
                setImage={setImage}
              />
            </section>
            <section id={"extractTextFromImage"}>
              <ExtractTextFromImage image={image} />
            </section>
          </div>
        </>
      )}

      {image && isModalOpen && (
        <div className={"screenshotModal"} onClick={handleClickOutside}>
          <div className="modalWrapper" onClick={(e) => e.stopPropagation()}>
            <span
              className="closeModal"
              onClick={handleCloseModal}
              title={"Close modal"}
            >
              &times;
            </span>
            <img src={image} alt={"image enlarged"} style={{ width: "100%" }} />
          </div>
        </div>
      )}
    </main>
  );
}

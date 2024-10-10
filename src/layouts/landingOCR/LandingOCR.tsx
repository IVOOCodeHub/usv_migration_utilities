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
import { UserContext } from "../../context/userContext/UserContext";

// components
import DisplayAnnotateComponents from "../../components/displayAnnotateComponents/DisplayAnnotateComponents.tsx";
import ExtractTextFromImage from "../../components/extractTextFromImage/ExtractTextFromImage";

// hooks | libraries
import { useState, useContext, useEffect } from "react";
import ImageAnnotate from "../../components/imageAnnotate/ImageAnnotate.tsx";

export default function LandingOCR(): ReactElement {
  const searchParams = new URLSearchParams(window.location.search);
  const pageKey: string | null = searchParams.get("pageKey");
  const fileName: string | null = searchParams.get("fileName");
  const getMatricule: string | null = searchParams.get("matricule");
  const matriculeWithSlash: string | undefined = getMatricule?.split("|")[1];
  const matricule: string | undefined = matriculeWithSlash?.split("/")[0];

  const { language } = useContext(LanguageContext);
  const { setMatricule } = useContext(UserContext);

  const [image, setImage] = useState<string | null>(null);
  const [pageElements, setPageElements] = useState<IPageElement[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [datas, setDatas] = useState<object | null>({});

  const screenshotLocation: string = `http://192.168.0.254:8080/usv_prod/screenshots_page_asp/${fileName}`;

  useEffect((): void => {
    if (pageKey && fileName) {
      setImage(screenshotLocation);
    }
  }, [fileName]);

  useEffect((): void => {
    if (pageKey) {
      setDatas({
        cle_arbo_usv: pageKey,
        fileName: fileName,
      });
    }
  }, [pageKey, fileName]);

  useEffect((): void => {
    if (matricule) {
      setMatricule(matricule);
    }
  }, []);

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

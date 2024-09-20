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
import { LoaderContext } from "../../context/LoaderContext/LoaderContext";

// components
import ExtractImageForm from "../../components/extractImageForm/ExtractImageForm";
import DisplayAnnotateComponents from "../../components/displayAnnotateComponents/DisplayAnnotateComponents.tsx";
import ExtractTextFromImage from "../../components/extractTextFromImage/ExtractTextFromImage";
import Loader from "../../components/loader/Loader";

// hooks | libraries
import { useState, useContext } from "react";
import ImageAnnotate from "../../components/imageAnnotate/ImageAnnotate.tsx";

export default function LandingOCR(): ReactElement {
  const { language } = useContext(LanguageContext);
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
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

  // TODO remove this function, to pass this in the NTH:child (3 => DisplayAnnotateComponents)
  // TODO it's necessary to clean this with an useEffect hook to refresh the datas state.
  // TODO When the datas state is updated, the API calls should be triggered.
  // TODO then, the state of datas & img have to be reset to null.

  // TODO => Rework the function handleSubmit in DisplayAnnotateComponents.

  // const saveInformations = () => {
  //   console.log("saveInformations ->", datas);
  //   setImage(null)
  //   setPageElements([]);
  // };

  return (
    <>
      {/*{isLoading ? (*/}
      {/*  <Loader />*/}
      {/*) : (*/}
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
                        {language === "en"
                          ? "Display image"
                          : "Afficher l'image"}
                      </button>
                    )}
                  </article>
                  <DisplayAnnotateComponents
                    pageElements={pageElements}
                    datas={datas}
                    setDatas={setDatas}
                    saveInformations={saveInformations}
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
              <div
                className="modalWrapper"
                onClick={(e) => e.stopPropagation()}
              >
                <span
                  className="closeModal"
                  onClick={handleCloseModal}
                  title={"Close modal"}
                >
                  &times;
                </span>
                <img
                  src={image}
                  alt={"image enlarged"}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          )}
        </main>
      {/*)}*/}
    </>
  );
}

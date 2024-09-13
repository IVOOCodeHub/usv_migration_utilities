// styles
import "./extractImageForm.scss";

// types
import { ReactElement, MouseEvent, FormEvent } from "react";

// hooks
import { useContext, useState, useEffect } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function ExtractImageForm(): ReactElement {
  const { language } = useContext(LanguageContext);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [template, setTemplate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datas = {
      image: image,
      template: template,
    };

    console.log("datas", datas);
  };

  useEffect(() => {
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }
  }, [file]);

  useEffect(() => {
    if (image && template !== "") {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  }, [image, template]);

  return (
    <>
      <form id={"extractImageForm"} onSubmit={handleSubmit}>
        <h3>{language === "en" ? "Picture selection" : "Sélection d'image"}</h3>
        <div className={"formInputWrapper"}>
          <label htmlFor={"selectImg"}>
            {language === "en"
              ? "Please select an image"
              : "Veuillez sélectionner une image"}
          </label>
          <input
            type={"file"}
            id={"selectImg"}
            accept={"image/*"}
            onChange={(e) => setFile(e.target.files![0])}
          />
        </div>
        <div className={"formInputWrapper"}>
          <label htmlFor={"templateSelect"}>
            {language === "en"
              ? "Please select a page template"
              : "Veuillez sélectionner un modèle de page"}
          </label>
          <select
            id={"templateSelect"}
            onChange={(e) => setTemplate(e.target.value)}
          >
            <option value={""}>
              {language === "en" ? "Choose" : "Choisir"}
            </option>
            <option value={"menu"}>
              {language === "en" ? "Menu" : "Menu"}
            </option>
            <option value={"subMenu"}>
              {language === "en" ? "Sub-Menu" : "Sous-menu"}
            </option>
            <option value={"details"}>
              {language === "en" ? "Details" : "Détails"}
            </option>
          </select>
        </div>
        {image && (
          <figure>
            <img
              className={"previewImage"}
              src={image}
              alt={"image selected"}
              title={language === "en" ? "Display image" : "Afficher l'image"}
              onClick={() => setIsModalOpen(true)}
            />
          </figure>
        )}
        <div className={"btnWrapper"}>
          <button
            className={isBtnEnabled ? "btn" : "btnDisabled"}
            type={"submit"}
            disabled={!isBtnEnabled}
          >
            {language === "en" ? "Submit" : "Soumettre"}
          </button>
        </div>
      </form>

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
    </>
  );
}

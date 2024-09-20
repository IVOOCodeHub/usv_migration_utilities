// styles
import "./extractImageForm.scss";

// types
import { ReactElement, FormEvent, Dispatch, SetStateAction } from "react";

// hooks | libraries
import { useContext, useState, useEffect } from "react";

// context
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

export default function ExtractImageForm({
  image,
  setImage,
  setDatas,
}: {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
  setDatas: Dispatch<SetStateAction<object | null>>;
}): ReactElement {
  const { language } = useContext(LanguageContext);
  const [file, setFile] = useState<File | null>(null);
  const [pageName, setPageName] = useState<string>("");
  const [template, setTemplate] = useState<string>("");
  const [isBtnEnabled, setIsBtnEnabled] = useState<boolean>(false);

  const handleSetFile = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setImage(imageURL);
    }

    const datas = {
      template: template,
      pageName: pageName,
    };

    setDatas(datas);
  };

  useEffect(() => {
    if (file && template !== "") {
      setIsBtnEnabled(true);
    } else {
      setIsBtnEnabled(false);
    }
  }, [image, template]);

  return (
    <div className={"extractImageForm"}>
      <form id={"extractImageForm"} onSubmit={handleSetFile}>
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
          <label htmlFor={"pageName"}>
            {language === "en"
              ? "Please fill the page name"
              : "Veuillez renseigner le nom de la page"}
          </label>
          <input
            type={"text"}
            id={"pageName"}
            onChange={(e) => setPageName(e.target.value)}
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
    </div>
  );
}

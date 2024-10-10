// styles
import "./extractTextFromImage.scss";

// types
import { ReactElement } from "react";
interface IExtractTextFromImageProps {
  image: string | null;
}

// hooks | libraries
import { useState, useEffect, useContext, useRef } from "react";
import Tesseract from "tesseract.js";

// context
import { LoaderContext } from "../../context/LoaderContext/LoaderContext.tsx";
import { LanguageContext } from "../../context/LanguageContext/LanguageContext";

// components
import Loader from "../loader/Loader";

export default function ExtractTextFromImage({
  image,
}: IExtractTextFromImageProps): ReactElement {
  const { isLoading, startLoading, stopLoading } = useContext(LoaderContext);
  const { language } = useContext(LanguageContext);
  const [processedText, setProcessedText] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextAreaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  const processImage = async (image: string) => {
    startLoading();
    try {
      const worker = await Tesseract.createWorker("fra");
      const req = await worker.recognize(image);
      setProcessedText(req.data.text);
    } catch (error) {
      return console.error(`Error while processing image : ${error}`);
    }
    stopLoading();
  };

  useEffect(() => {
    if (textAreaRef.current) {
      setTimeout(() => {
        adjustTextAreaHeight(textAreaRef.current!);
      }, 0);
    }
  }, [processedText]);

  useEffect(() => {
    if (image)
      processImage(image).then(() =>
        console.log("processedText =>", processedText),
      );
  }, []);

  return (
    <>
      {processedText && (
        <>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2>
                {language === "en"
                  ? "Text extracted from image"
                  : "Texte extrait de l'image"}
              </h2>
              <textarea
                ref={textAreaRef}
                defaultValue={processedText}
                onChange={(e) => setProcessedText(e.target.value)}
                onInput={() => {
                  if (textAreaRef.current) {
                    adjustTextAreaHeight(textAreaRef.current);
                  }
                }}
              ></textarea>
            </>
          )}
        </>
      )}
    </>
  );
}

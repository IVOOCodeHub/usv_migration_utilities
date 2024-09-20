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
  // const canvasRef = useRef<HTMLCanvasElement>(null);

  const adjustTextAreaHeight = (element: HTMLTextAreaElement) => {
    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  };

  // DISABLED: less accurate than classic image while testing.
  // const convertImageToGrayscale = (imageSrc: string) => {
  //   return new Promise<string>((resolve) => {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas?.getContext("2d");
  //     const image = new Image();
  //     image.src = imageSrc;
  //
  //     image.onload = () => {
  //       if (canvas && ctx) {
  //         // set the canvas dimensions to match the image dimensions
  //         canvas.width = image.width;
  //         canvas.height = image.height;
  //
  //         // draw the image on the canvas
  //         ctx.drawImage(image, 0, 0);
  //
  //         // bring each pixel of the image
  //         const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  //         const data = imageData.data;
  //
  //         // Loop through each pixel and convert to grayscale
  //         for (let i = 0; i < data.length; i += 4) {
  //           const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
  //           data[i] = avg; // red
  //           data[i + 1] = avg; // green
  //           data[i + 2] = avg; // blue
  //           // alpha channel (data[i + 3]) is left as-is
  //         }
  //
  //         // update canvas with grayscale image
  //         ctx.putImageData(imageData, 0, 0);
  //
  //         // return the image as an data URL
  //         resolve(canvas.toDataURL());
  //       }
  //     };
  //   });
  // };

  const processImage = async (image: string) => {
    startLoading();
    try {

      // convert image to grayscale before OCR processing
      // DISABLED: less accurate than classic image while testing.
      // const greyscaleImage = await convertImageToGrayscale(image);

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
        // await for the text area to be fulfilled with extracted text
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
              {/* DISABLED: less accurate than classic image while testing. */}
              {/*<canvas ref={canvasRef} style={{ display: "none" }}></canvas>*/}
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

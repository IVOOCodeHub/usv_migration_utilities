import { createContext, ReactNode, useState } from "react";

interface ILanguageContext {
  language: string;
  setLanguageHandler: (language: string) => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: "fr",
  setLanguageHandler: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("fr");

  const setLanguageHandler = (language: string) => {
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguageHandler }}>
      {children}
    </LanguageContext.Provider>
  );
};

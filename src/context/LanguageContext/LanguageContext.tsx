import { createContext, ReactNode, useState } from "react";

interface ILanguageContext {
  language: string;
  setLanguageHandler: (language: string) => void;
}

export const LanguageContext = createContext<ILanguageContext>({
  language: "en",
  setLanguageHandler: () => {},
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState("en");

  const setLanguageHandler = (language: string) => {
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguageHandler }}>
      {children}
    </LanguageContext.Provider>
  );
};

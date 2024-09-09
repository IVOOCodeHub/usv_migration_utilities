import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// context
import { LanguageProvider } from "./context/LanguageContext/LanguageContext";
import { LoaderProvider } from "./context/LoaderContext/LoaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <LoaderProvider>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </LoaderProvider>,
);

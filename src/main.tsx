import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// context
import { UserProvider } from "./context/userContext/UserContext";
import { LanguageProvider } from "./context/LanguageContext/LanguageContext";
import { LoaderProvider } from "./context/LoaderContext/LoaderContext.tsx";

createRoot(document.getElementById("root")!).render(
  <UserProvider>
    <LoaderProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LoaderProvider>
  </UserProvider>,
);

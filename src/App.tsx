// styles
import "./utils/styles/global.scss";

// types
import { ReactElement } from "react";

// hooks
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components
import Header from "./components/header/Header.tsx";
import Footer from "./components/footer/Footer.tsx";

// layout
import Home from "./layouts/home/Home";

function App(): ReactElement {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

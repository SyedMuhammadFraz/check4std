import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Diseases from "./Components/Diseases/Diseases";
import MainPage from "./Components/Diseases/Price&Packages/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index path="diseases" element={<Diseases />} />
            <Route index path="price-packages" element={<MainPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

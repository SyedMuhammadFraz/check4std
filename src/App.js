import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Diseases from "./Components/Diseases/Diseases";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route index path="diseases" element={<Diseases />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

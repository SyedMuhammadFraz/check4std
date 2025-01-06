import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Diseases from "./Components/Diseases/Diseases";
import MainPage from "./Components/Price&Packages/MainPage";
import Home from "./Components/Home/Home";
import OrderPage from "./Components/Orders/order";
import Testpanel from "./Components/Price&Packages/10-test-panel/Testpanel";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />}>
            <Route index path="diseases" element={<Diseases />} />
            <Route index path="price-packages" element={<MainPage />} />
            <Route index path="ten-test-panel" element={<Testpanel />} />
            <Route index path="order" element={<OrderPage />} />
            <Route index path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

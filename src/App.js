import "./App.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./utils/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Diseases from "./Components/Diseases/Diseases";
import MainPage from "./Components/Price&Packages/MainPage";
import Home from "./Components/Home/Home";
import OrderPage from "./Components/Orders/order";
import SignUp from "./Components/Signup/signup";
import SignIn from "./Components/Signin/signin";
import OTPPage from "./Components/Signup/otp";
import Testpanel from "./Components/Price&Packages/10-test-panel/Testpanel";
import ProfilePage from "./Components/User Profile/profile page";
import MapPage from "./Components/Find A Lab/Find_a_Lab";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <>
    <AuthProvider>
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />}>
            <Route index path="diseases" element={<Diseases />} />
            <Route index path="price-packages" element={<MainPage />} />
            <Route index path="ten-test-panel" element={<Testpanel />} />
            <Route index path="order" element={<OrderPage />} />
            <Route index path="signup" element={<SignUp />} />
            <Route index path="login" element={<SignIn />} />
            <Route index path="get-otp" element={<OTPPage />} />
            <Route index path="test-centers" element={<MapPage />} />
            <Route index path="user-profile" element={<ProfilePage />} />
            <Route index path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  );
}

export default App;

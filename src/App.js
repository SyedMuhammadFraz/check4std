import "./App.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./utils/AuthContext";
import { LocationProvider } from "./utils/LocationContext";
import { CartProvider } from "./utils/CartContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerJourney from "./Components/Journey/CustomerJourney";
import JourneyEntry, { JourneyPageAlias } from "./Components/Journey/JourneyEntry";
import LandingPage from "./Components/LandingPage";
import Diseases from "./Components/Diseases/Diseases";
import MainPage from "./Components/Price&Packages/MainPage";
import Home from "./Components/Home/Home";
import AboutUs from "./Components/Marketing/AboutUs";
import HowItWorks from "./Components/Marketing/HowItWorks";
import Resources from "./Components/Marketing/Resources";
import Contact from "./Components/Marketing/Contact";
import SignUp from "./Components/Signup/signup";
import SignIn from "./Components/Signin/signin";
import OTPPage from "./Components/Signup/otp";
import Testpanel from "./Components/Price&Packages/10-test-panel/Testpanel";
import ProfilePage from "./Components/User Profile/profile page";
import MapPage from "./Components/Find A Lab/Find_a_Lab";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Components/AdminPanel/AdminDashboard";
import Admin_User_Table from "./Components/AdminPanel/Admin_User_Table";
import AdminMain from "./Components/AdminPanel/AdminMain";
import Admin_Disease_Table from "./Components/AdminPanel/Admin_Disease_Table";

import Chlamydia_Gonorrhea from "./Components/Price&Packages/Chlamydia-Gonorrhea/Chlamydia_Gonorrhea";
import Herpes1_2 from "./Components/Price&Packages/Herpes1_2/Herpes1_2";
import Chlamydia_Test from "./Components/Price&Packages/Chlamydia-Test/Chlamydia_Test";
import Gonorrhea_Test from "./Components/Price&Packages/Gonorrhea-Test/Gonorrhea_Test";
import HepA_Test from "./Components/Price&Packages/HepA-Test/HepA_Test";
import HepB_Test from "./Components/Price&Packages/HepB-Test/HepB_Test";
import HepC_Test from "./Components/Price&Packages/HepC-Test/HepC_Test";
import Oral_Herpes_Test from "./Components/Price&Packages/Oral-herpes-Test/Oral_Herpes_Test";
import Genital_Herpes_Test from "./Components/Price&Packages/Genital-Herpes-Test/Genital_Herpes_Test";
import HIV1_2_FourthGen_Test from "./Components/Price&Packages/HIV1-2-Antibody-4thGen-Test/HIV1_2_FourthGen_Test";
import HIV_RNA_Test from "./Components/Price&Packages/HIV-RNA-Early-Detection-Test/HIV_RNA_Test";
import Syphilis_Test from "./Components/Price&Packages/Syphilis-Test/Syphilis_Test";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgotPassword from "./Components/Signin/ForgotPassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./Loader/Loader";
import { LoaderProvider } from "./utils/LoaderContext";
import RedirectHandler from "./utils/RedirectHandler";
import Unauthorized from "./Modals/Unauthorized";
import DoctorConsultation from "./Components/How it Works/Doctor Consultation/DoctorConsultation";
import AdminManageDoctor from "./Components/AdminPanel/Admin_Manage_Doctor";
import Admin_Manage_Doctor from "./Components/AdminPanel/Admin_Manage_Doctor";
import ForgotPasswordOtp from "./Components/Signin/ForgotPasswordOtp";
import DoctorCalendar from "./Components/DoctorPanel/DoctorCalendar";
import DoctorForm from "./Modals/DoctorForm";
import NurseForm from "./Modals/NurseForm";
import DoctorDashboard from "./Components/DoctorPanel/DoctorDashboard";
import NurseDashboard from "./Components/DoctorPanel/NurseDashboard";
import DoctorNavBar from "./Components/DoctorPanel/DoctorNavBar";
import StdQuestions from "./Components/Questionares/StdQuestions";
import SetDoctorPassword from "./Components/Signin/SetDoctorPassword";
import ActivateAccount from "./Components/Signin/ActivateAccount";
import { QuestionnaireProvider } from "./utils/QuestionareContext";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51QmEGhBnib7VwsWorAR9BRX9EJYouUwh2axjgezSVD0Blv5VyouGOaS70CTN128YTijJhwrcTmjtcmeeeSBpCATf00YbpYF6PC"
  );
  return (
    <>
      <Elements stripe={stripePromise}>
        <LocationProvider>
          <CartProvider>
          <AuthProvider>
            <ToastContainer
              position="top-right" // Change to "top-center", "bottom-right", etc.
              autoClose={3000}
              style={{ marginTop: "40px" }} // Moves it lower
            />
            <QuestionnaireProvider>
              <LoaderProvider>
                <Loader />
                <BrowserRouter>
                  {/* <RedirectHandler /> */}
                  <Routes>
                    <Route path="/journey" element={<CustomerJourney />} />
                    <Route path="/journey/:step" element={<CustomerJourney />} />
                    <Route path="/payment-success" element={<Navigate to="/journey/payment-success" replace />} />
                    <Route path="/payment-failed" element={<Navigate to="/journey/payment-failed" replace />} />
                    <Route element={<LandingPage />}>
                      <Route path="about-us" element={<AboutUs />} />
                      <Route path="how-it-works" element={<HowItWorks />} />
                      <Route path="resources" element={<Resources />} />
                      <Route path="contact" element={<Contact />} />
                      {/* <Route index path="diseases" element={<Diseases />} /> */}
                      <Route
                        index
                        path="set-doctor-password"
                        element={<SetDoctorPassword />}
                      />
                      <Route path="/pages" element={<JourneyPageAlias />} />
                      <Route path="/pages/:slug" element={<JourneyPageAlias />} />
                      <Route path="/diseases" element={<Diseases />} />
                      <Route path="/diseases/:topic" element={<Diseases />} />
                      <Route
                        index
                        path="price-packages"
                        element={<MainPage />}
                      />
                      <Route
                        index
                        path="ten-test-panel"
                        element={<Testpanel />}
                      />
                      <Route
                        index
                        path="chlamydia-gonorrhea-test"
                        element={<Chlamydia_Gonorrhea />}
                      />
                      <Route
                        index
                        path="chlamydia-test"
                        element={<Chlamydia_Test />}
                      />
                      <Route
                        index
                        path="gonorrhea-test"
                        element={<Gonorrhea_Test />}
                      />
                      <Route index path="hep-a-test" element={<HepA_Test />} />
                      <Route index path="hep-b-test" element={<HepB_Test />} />
                      <Route index path="hep-c-test" element={<HepC_Test />} />
                      <Route
                        index
                        path="herpes-i-ii-test"
                        element={<Herpes1_2 />}
                      />
                      <Route
                        index
                        path="oral-herpes-test"
                        element={<Oral_Herpes_Test />}
                      />
                      <Route
                        index
                        path="genital-herpes-test"
                        element={<Genital_Herpes_Test />}
                      />
                      <Route
                        index
                        path="hiv-test"
                        element={<HIV1_2_FourthGen_Test />}
                      />
                      <Route
                        index
                        path="hiv-rna-test"
                        element={<HIV_RNA_Test />}
                      />
                      <Route
                        index
                        path="syphilis-test"
                        element={<Syphilis_Test />}
                      />
                      {/* Open to guests: logged-in users and guests share the order page. */}
                      <Route path="order" element={<JourneyEntry />} />
                      <Route path="patient-details" element={<Navigate to="/journey/details" replace />} />
                      <Route
                        path="activate-account"
                        element={<ActivateAccount />}
                      />
                      <Route index path="signup" element={<SignUp />} />
                      <Route index path="login" element={<SignIn />} />
                      <Route
                        index
                        path="std-assessment"
                        element={<StdQuestions />}
                      />
                      <Route index path="get-otp" element={<OTPPage />} />
                      <Route index path="test-centers" element={<MapPage />} />
                      <Route
                        index
                        path="doctor-consultation"
                        element={<DoctorConsultation />}
                      />
                      <Route
                        index
                        path="doctor-calendar"
                        element={<DoctorCalendar />}
                      />
                      <Route
                        index
                        path="unauthorized"
                        element={<Unauthorized />}
                      />
                      <Route
                        index
                        path="user-profile"
                        element={<ProfilePage />}
                      />
                      <Route
                        index
                        path="forgot-password"
                        element={<ForgotPassword />}
                      />

                      <Route
                        index
                        path="forgot-password-otp"
                        element={<ForgotPasswordOtp />}
                      />
                      <Route index path="/" element={<Home />} />
                      <Route
                        path="/redirect-handler"
                        element={<RedirectHandler />}
                      />
                    </Route>
                    {/* Protected Admin Routes */}
                    <Route
                      path="/admin-panel"
                      element={<ProtectedRoute allowedRoles={["admin"]} />}
                    >
                      <Route index element={<AdminDashboard />} />
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route
                        path="order-table"
                        element={<Admin_User_Table />}
                      />
                      <Route path="doctors" element={<Admin_Manage_Doctor />} />
                      <Route
                        path="test-table"
                        element={<Admin_Disease_Table />}
                      />
                    </Route>
                    <Route path="/doctorform" element={<DoctorForm />} />
                    <Route path="/nurse-form" element={<NurseForm />} />
                    <Route
                      path="/doctor-dashboard"
                      element={
                        <>
                          <DoctorNavBar />
                          <DoctorDashboard />
                        </>
                      }
                    />
                    <Route
                      path="/nurse-dashboard"
                      element={
                        <>
                          <DoctorNavBar />
                          <NurseDashboard />
                        </>
                      }
                    />
                  </Routes>
                </BrowserRouter>
              </LoaderProvider>
            </QuestionnaireProvider>
          </AuthProvider>
          </CartProvider>
        </LocationProvider>
      </Elements>
    </>
    //AdminPass12@
  );
}

export default App;

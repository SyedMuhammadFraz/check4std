import "./App.css";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "./utils/AuthContext";
import { LocationProvider } from "./utils/LocationContext";
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
import STDs from "./Components/Diseases/STD Overview/overview";
import Chlamydia from "./Components/Diseases/Chlamydia/Chlamydia";
import Gonorrhea from "./Components/Diseases/Gonorrhea/Gonorrhea";
import HIV from "./Components/Diseases/HIV/HIV";
import OralHerpes from "./Components/Diseases/Oral Herpes/Oral Herpes2";
import UnderstandingSTDs from "./Components/Diseases/Symptoms/STD Symptoms";
import SyphilisInfo from "./Components/Diseases/Syphilis/Syphilis";
import HepatitisAInfo from "./Components/Diseases/Hepatitis A/Hepatitis A";
import HepatitisBInfo from "./Components/Diseases/Hepatitis B/Hepatitis B";
import HepatitisCInfo from "./Components/Diseases/Hepatitis C/Hepatitis C";
import GenitalHerpesInfo from "./Components/Diseases/Genital Herpes/Genital Herpes";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import ForgotPassword from "./Components/Signin/ForgotPassword";
import ProtectedRoute from "./utils/ProtectedRoute";
import Loader from "./Loader/Loader";
import { LoaderProvider } from "./utils/LoaderContext";
import PaymentFailure from "./utils/PaymentFailure";
import PaymentSuccess from "./utils/PaymentSuccess";
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
import DoctorNavBar from "./Components/DoctorPanel/DoctorNavBar";
import StdQuestions from "./Components/Questionares/StdQuestions";
import SetDoctorPassword from "./Components/Signin/SetDoctorPassword";
import { QuestionnaireProvider } from "./utils/QuestionareContext";

function App() {
  const stripePromise = loadStripe(
    "pk_test_51QmEGhBnib7VwsWorAR9BRX9EJYouUwh2axjgezSVD0Blv5VyouGOaS70CTN128YTijJhwrcTmjtcmeeeSBpCATf00YbpYF6PC"
  );
  return (
    <>
      <Elements stripe={stripePromise}>
        <LocationProvider>
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
                    <Route element={<LandingPage />}>
                      {/* <Route index path="diseases" element={<Diseases />} /> */}
                      <Route
                        index
                        path="set-doctor-password"
                        element={<SetDoctorPassword />}
                      />
                      <Route path="/diseases" element={<Diseases />}>
                        <Route
                          index
                          path="/diseases/overview"
                          element={<STDs />}
                        />
                        <Route
                          index
                          path="/diseases/chlamydia"
                          element={<Chlamydia />}
                        />
                        <Route
                          index
                          path="/diseases/gonorrhea"
                          element={<Gonorrhea />}
                        />
                        <Route index path="/diseases/hiv" element={<HIV />} />
                        <Route
                          index
                          path="/diseases/oral-herpes"
                          element={<OralHerpes />}
                        />
                        <Route
                          index
                          path="/diseases/symptoms"
                          element={<UnderstandingSTDs />}
                        />
                        <Route
                          index
                          path="/diseases/syphilis"
                          element={<SyphilisInfo />}
                        />
                        <Route
                          index
                          path="/diseases/hep-a"
                          element={<HepatitisAInfo />}
                        />
                        <Route
                          index
                          path="/diseases/hep-b"
                          element={<HepatitisBInfo />}
                        />
                        <Route
                          index
                          path="/diseases/hep-c"
                          element={<HepatitisCInfo />}
                        />
                        <Route
                          index
                          path="/diseases/genital-herpes"
                          element={<GenitalHerpesInfo />}
                        />
                      </Route>
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
                      <Route
                        path="order"
                        element={<ProtectedRoute allowedRoles={["user"]} />}
                      >
                        <Route index element={<OrderPage />} />
                      </Route>
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
                        path="/payment-success"
                        element={<PaymentSuccess />}
                      />
                      <Route
                        path="/payment-failed"
                        element={<PaymentFailure />}
                      />
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
                  </Routes>
                </BrowserRouter>
              </LoaderProvider>
            </QuestionnaireProvider>
          </AuthProvider>
        </LocationProvider>
      </Elements>
    </>
    //AdminPass12@
  );
}

export default App;

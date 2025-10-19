import DetailBuilding from "../../pages/DetailBuilding/index.tsx";
import Error404 from "../../pages/Error404/index.tsx";
import ForgotPassword from "../../pages/ForgotPassword/index.tsx";
import Home from "../../pages/Home/index.tsx";
import Login from "../../pages/Login/index.tsx";
import NewPassword from "../../pages/NewPassword/index.tsx";
import OTP from "../../pages/OTP/index.tsx";
import Playground from "../../pages/Playground/index.tsx";
import PrivacyPolicy from "../../pages/PrivacyPolicy/index.tsx";
import Register from "../../pages/Register/index.tsx";
import TermsAndConditions from "../../pages/TermsAndConditions/index.tsx";
import AddPlace from "../../pages/AddPlace/index.tsx";

export const routes = [
  {
    path: "/",
    component: <Home />,
  },
  {
    path: "/detail",
    component: <DetailBuilding />,
  },
  {
    path: "/login",
    component: <Login />,
  },
  {
    path: "/register",
    component: <Register />,
  },
  {
    path: "/forgot-password",
    component: <ForgotPassword />,
  },
  {
    path: "/new-password",
    component: <NewPassword />,
  },
  {
    path: "/otp",
    component: <OTP />,
  },
  {
    path: "/privacy-policy",
    component: <PrivacyPolicy />,
  },
  {
    path: "/tnc",
    component: <TermsAndConditions />,
  },
  {
    path: "/playground",
    component: <Playground />,
  },
  {
    path: "/register-place",
    component: <AddPlace />,
  },
  {
    path: "*",
    component: <Error404 />,
  },
];

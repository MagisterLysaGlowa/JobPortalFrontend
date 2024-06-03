import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import App from "../App";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import FavouritePage from "../pages/FavouritePage/FavouritePage";
import ApplicationsPage from "../pages/ApplicationsPage/ApplicationsPage";
import JobOfertForm from "../pages/JobOfertForm/JobOfertForm";
import CompanyForm from "../pages/CompanyForm/CompanyForm";
import CompanyPage from "../pages/CompanyPage/CompanyPage";
import OfertPage from "../pages/OfertPage/OfertPage";
import CurrentApplicationPage from "../pages/CurrentApplicationPage/CurrentApplicationPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "favourite", element: <FavouritePage /> },
      { path: "applications", element: <ApplicationsPage /> },
      { path: "jobOfertForm", element: <JobOfertForm /> },
      { path: "companyForm", element: <CompanyForm /> },
      { path: "companyPage", element: <CompanyPage /> },
      { path: "ofertPage", element: <OfertPage /> },
      { path: "currentApplication", element: <CurrentApplicationPage /> },
    ],
  },
]);

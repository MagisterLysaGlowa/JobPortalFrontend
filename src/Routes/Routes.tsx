import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import App from "../App";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import HomePage from "../pages/HomePage/HomePage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import FavouritePage from "../pages/FavouritePage/FavouritePage";
import ApplicationsPage from "../pages/ApplicationsPage/ApplicationsPage";

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
    ],
  },
]);

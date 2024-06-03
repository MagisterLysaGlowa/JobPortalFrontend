import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../../api/models/user";
import authService from "../../api/services/AuthService";
import userService from "../../api/services/UserService";
// import authService from "../../api/services/AuthService";

// const logout = async () => {
//   authService.Logout();
// };

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    userId: 0,
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    access: "",
    avatarSource: "",
    birthDate: "",
    domicile: "",
  });

  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    const user: User = await authService.Get();
    setUser(user);
    setAdmin(user.access == "admin" ? false : true);
  };

  const handleMenuButtonClick = () => {
    setMenuVisibility(!menuVisibility);
  };

  const handleLogoutClick = async () => {
    await authService.Logout();
    navigate("/login");
    setUser(user);
    setMenuVisibility(!menuVisibility);
    window.location.reload();
  };

  return (
    <nav className="bg-[#f8fafc] flex flex-row items-center justify-between h-16 shadow-sm">
      <Link className="font-kanit font-bold text-blue-500 text-3xl ml-8" to="/">
        Joble.com
      </Link>
      <button
        onClick={handleMenuButtonClick}
        className={`mr-10 flex flex-col justify-evenly h-[45px]`}
      >
        <div className="h-1 w-10 rounded-xl bg-white"></div>
        <div className="h-1 w-10 rounded-xl bg-white"></div>
        <div className="h-1 w-10 rounded-xl bg-white"></div>
      </button>
      <ul
        className={`absolute top-16 right-0 shadow-xl flex-col min-w-full md:min-w-[400px] z-40 bg-white border-t-2 h-[100vh] transition-all duration-700 ${
          menuVisibility ? "translate-x-0" : "translate-x-[1000px]"
        }`}
      >
        <li className="mt-20 h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white">
          <Link
            to="/"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Strona główna
          </Link>
        </li>

        <li
          className="mt-3 h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white"
          hidden={!(user.access != undefined)}
        >
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Twój profil
          </Link>
        </li>

        {user.access === "admin" && (
          <li className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white mt-3">
            <Link
              to="/jobOfertForm"
              className="w-full text-center h-full flex justify-center items-center"
              onClick={() => {
                setMenuVisibility(!menuVisibility);
              }}
            >
              Dodaj ofertę
            </Link>
          </li>
        )}

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={admin}
        >
          <Link
            to="/companyForm"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Dodaj firmę
          </Link>
        </li>

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={admin}
        >
          <Link
            to="/companyPage"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Przeglądaj firmy
          </Link>
        </li>

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={!(user.access != undefined)}
        >
          <Link
            to="/applications"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Aktualne aplikacje
          </Link>
        </li>

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={!(user.access != undefined)}
        >
          <Link
            to="/favourite"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Ulubione oferty
          </Link>
        </li>

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={!(user.userId == undefined)}
        >
          <Link
            to="/login"
            className="w-full text-center h-full flex justify-center items-center"
            onClick={() => {
              setMenuVisibility(!menuVisibility);
            }}
          >
            Zaloguj się
          </Link>
        </li>

        <li
          className="h-12 border-2 border-blue-500 text-blue-400 font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-blue-500 hover:text-white  mt-3"
          hidden={!(user.access != undefined)}
        >
          <button
            className="w-full text-center h-full flex justify-center items-center"
            onClick={handleLogoutClick}
          >
            Wyloguj się
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

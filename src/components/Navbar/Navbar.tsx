import React, { useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../api/services/AuthService";

const logout = async () => {
  authService.Logout();
};

const Navbar: React.FC = () => {
  const [menuVisibility, setMenuVisibility] = useState<boolean>(false);

  const handleMenuButtonClick = () => {
    setMenuVisibility(!menuVisibility);
  };

  return (
    <nav className="bg-main-second flex flex-row items-center justify-between h-16">
      <h1 className="font-kanit font-bold text-white text-3xl ml-8">
        Joble.com
      </h1>
      <button
        onClick={handleMenuButtonClick}
        className={`mr-10 flex flex-col justify-evenly h-[45px]`}
      >
        <div className="h-1 w-10 rounded-xl bg-white"></div>
        <div className="h-1 w-10 rounded-xl bg-white"></div>
        <div className="h-1 w-10 rounded-xl bg-white"></div>
      </button>
      <ul
        className={`absolute top-16 right-0 flex-col min-w-full md:min-w-[400px] bg-main-second border-t-2 h-full transition-all duration-700 ${
          menuVisibility ? "translate-x-0" : "translate-x-[1000px]"
        }`}
      >
        <li className="mt-20 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Twój profil
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Dodaj ofertę
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Profil firmy
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Aktualne aplikacje
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Ulubione oferty
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/login"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Zaloguj się
          </Link>
        </li>

        <li className="mt-4 h-12 border-2 border-main-third text-main-third font-bold mx-10 rounded-xl cursor-pointer transition-all duration-500 hover:bg-main-third hover:text-white">
          <Link
            to="/profile"
            className="w-full text-center h-full flex justify-center items-center"
          >
            Wyloguj się
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

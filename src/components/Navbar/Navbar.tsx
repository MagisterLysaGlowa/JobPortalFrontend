import React from "react";
import { Link } from "react-router-dom";
import authService from "../../api/services/AuthService";

const logout = async () => {
  authService.Logout();
};

const Navbar: React.FC = () => {
  return (
    <nav className="bg-main-second flex flex-row items-center justify-between h-16">
      <h1 className="font-kanit font-bold text-white text-3xl ml-8">
        Joble.com
      </h1>

      <div className="flex flex-row items-center">
        <Link to="/">
          <button className="text-white font-kanit font-bold text-xl mx-3">
            Strona główna
          </button>
        </Link>

        <Link to="/register">
          <button className="text-white font-kanit font-bold text-xl mx-3">
            Zarejestruj się
          </button>
        </Link>

        <Link to="/login">
          <button className="text-white font-kanit font-bold text-xl mx-3">
            Zaloguj się
          </button>
        </Link>

        <Link
          to="/login"
          onClick={logout}
          className="text-white font-kanit font-bold text-xl ml-3 mr-16"
        >
          Wyloguj się
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

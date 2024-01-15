import React, { ChangeEvent, FormEvent, useState } from "react";
import "./LoginPage.css";
import { LoginFormData } from "../../../types";
import authService from "../../api/services/AuthService";

const tailwindClasses = {
  button: "h-16 w-96 bg-green-500 text-white font-bold text-xl rounded-lg mx-2",
  input:
    "h-16 w-96 border-2 border-gray-400 outline-none text-black pl-3 text-xl rounded-lg mx-2",
  header: "text-6xl font-bold mb-8",
};

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.Login(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen flex-col">
        <h1 className={tailwindClasses.header}>Zaloguj się</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <h4>E-mail</h4>
            <input
              type="text"
              id="email"
              name="email"
              className={tailwindClasses.input}
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <h4>Hasło</h4>
            <input
              type="password"
              id="password"
              name="password"
              className={tailwindClasses.input}
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>

          <button className={tailwindClasses.button + " mt-5"}>
            Zaloguj się
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

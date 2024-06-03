import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./LoginPage.css";
import { LoginFormData, LoginFormError } from "../../../types";
import authService from "../../api/services/AuthService";
import register_banner from "../../assets/register_banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import { loginFormValidation } from "../../utils/validations";
import { User } from "../../api/models/user";

const LoginPage: React.FC = () => {
  useEffect(() => {
    const setup = async () => {
      const user: User = await authService.Get();
      if (user) {
        navigate("/");
      }
    };
    setup();
  }, []);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [formError, setFormError] = useState<LoginFormError>({
    emailError: "",
    passwordError: "",
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
    if (await loginFormValidation(formData, formError, setFormError)) {
      const correct = await authService.Login(formData);
      correct
        ? setFormError({
            emailError: "",
            passwordError: "",
          })
        : setFormError({
            ...formError,
            passwordError: "Niepoprawne hasło!",
          });

      if (correct) {
        window.location.reload();
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-32">
      <section className="grid grid-cols-1 md:grid-cols-2 bg-white w-full max-w-[1100px] rounded-[40px] z-20 shadow-md mx-2 xl:mx-0">
        <div className="rounded-l-lg hidden items-center justify-center py-8 pl-8 md:flex">
          <img
            src={register_banner}
            alt="register banner"
            className="h-[550px] rounded-[40px] object-cover object-center"
          />
        </div>
        <div className="flex flex-col justify-center min-h-[550px]">
          <header className="text-center text-4xl lg:text-5xl font-bold text-main-third tracking-widest ">
            Zaloguj się
          </header>
          <article className="flex justify-center mt-4">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col px-8 py-4 max-w-[450px] flex-grow bg-white rounded-xl"
            >
              <div className="flex flex-col flex-grow flex-shrink basis-1">
                <label
                  htmlFor="email"
                  className="text-main-second font-bold text-xl mb-2"
                >
                  E-mail
                </label>
                <input
                  type="text"
                  id="email"
                  placeholder="E-mail"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md border-2 border-gray-300 ${
                    formError.emailError != "" &&
                    "!text-red-600 border-2 border-red-600 placeholder-red-600"
                  }`}
                />
                <p className="text-red-600 text-md font-bold h-8 text-sm">
                  {formError.emailError != "" && formError.emailError}
                </p>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-main-second font-bold text-xl mb-2"
                >
                  Hasło
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Hasło"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md  border-2 border-gray-300 ${
                    formError.passwordError != "" &&
                    "!text-red-600 border-2 border-red-600 placeholder-red-600"
                  }`}
                />
                <p className="text-red-600 text-md font-bold h-8 text-sm">
                  {formError.passwordError != "" && formError.passwordError}
                </p>
              </div>

              <button className="bg-blue-600 text-white font-bold text-xl h-16 rounded-lg shadow-md mt-2">
                Zaloguj się
              </button>

              <Link to="/register" className="text-center mt-4 text-main-third">
                Nie masz konta? Dołącz do nas
              </Link>
            </form>
          </article>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;

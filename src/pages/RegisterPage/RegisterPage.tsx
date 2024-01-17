import React, { ChangeEvent, FormEvent, useState, useCallback } from "react";
import {
  ImageUploadFields,
  RegisterFormData,
  RegisterFormError,
} from "../../../types";
import authService from "../../api/services/AuthService";
import StageCounter from "../../components/StageCounter/StageCounter";
import { registerFormValidation } from "../../utils/validations";
import register_banner from "../../assets/register_banner.jpg";
import defaultImageSrc from "../../assets/user_placeholder.png";
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faFolderPlus } from "@fortawesome/free-solid-svg-icons";

const RegisterPage: React.FC = () => {
  //* PROPERTIES INITALIZATION
  const [stage, setStage] = useState<number>(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
    avatarSource: "",
    phoneNumber: "",
    birthDate: "",
    domicile: "",
  });
  const [imageData, setImageData] = useState<ImageUploadFields>({
    imageSrc: defaultImageSrc,
    imageFile: null,
  });

  const [formError, setFormError] = useState<RegisterFormError>({
    nameError: "",
    surnameError: "",
    emailError: "",
    passwordError: "",
    passwordRepeatError: "",
    phoneNumberError: "",
    birthDateError: "",
    domicileError: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //* HANDLE REACT DROPZONE
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles[0]) {
      let imageFile = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (x: ProgressEvent<FileReader>) => {
        setImageData({
          imageFile,
          imageSrc: x.target?.result,
        });
      };
      reader.readAsDataURL(imageFile);
    } else {
      setImageData({
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  //* REGISTER FORM SUBMIT METHOD
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await authService.Register(formData, imageData);
  };

  //* METHODS USED FOR NAVIGATION BETWEEN STAGES OF REGISTER
  const handleNextStageClick = async () => {
    if (
      await registerFormValidation(stage, formData, formError, setFormError)
    ) {
      setStage((prevStage) => {
        return prevStage + 1;
      });
    }
  };

  const handlePreviousStageClick = () => {
    setStage((prevStage) => {
      return prevStage - 1;
    });
  };

  //* RENDER DIFFRENT REGISTER STAGE ELEMENTS
  let currentFormRender: JSX.Element;
  switch (stage) {
    //? RENDER NAME AND SURNAME FIELDS
    case 1:
      currentFormRender = (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="name"
              className="text-main-second font-bold text-xl mb-2"
            >
              Imię
            </label>
            <input
              id="name"
              type="text"
              placeholder="Imię"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.nameError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.nameError != "" && formError.nameError}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="surname"
              className="text-main-second font-bold text-xl mb-2"
            >
              Nazwisko
            </label>
            <input
              type="text"
              id="surname"
              placeholder="Nazwisko"
              name="surname"
              value={formData.surname}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.surnameError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.surnameError != "" && formError.surnameError}
            </p>
          </div>

          <button
            type="button"
            onClick={handleNextStageClick}
            className="bg-main-second text-white font-bold text-xl h-16 rounded-lg shadow-md"
          >
            Dalej
          </button>
        </>
      );
      break;
    //? RENDER EMAIL AND PHONE FIELDS
    case 2:
      currentFormRender = (
        <>
          <div className="flex flex-col">
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
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
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
              htmlFor="phone"
              className="text-main-second font-bold text-xl mb-2"
            >
              Numer telefonu
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Numer telefonu"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.phoneNumberError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.phoneNumberError != "" && formError.phoneNumberError}
            </p>
          </div>

          <div className="flex flex-row gap-8">
            <button
              type="button"
              onClick={handlePreviousStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={handleNextStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Dalej
            </button>
          </div>
        </>
      );
      break;
    //? RENDER PASSWORDS FIELDS
    case 3:
      currentFormRender = (
        <>
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
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.passwordError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.passwordError != "" && formError.passwordError}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="passwordRepeat"
              className="text-main-second font-bold text-xl mb-2"
            >
              Powtórz hasło
            </label>
            <input
              type="password"
              id="passwordRepeat"
              placeholder="Powtórz hasło"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.passwordRepeatError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.passwordRepeatError != "" &&
                formError.passwordRepeatError}
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <button
              type="button"
              onClick={handlePreviousStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={handleNextStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Dalej
            </button>
          </div>
        </>
      );
      break;
    //? RENDER DOMCILE AND BIRTH DATE FIELDS
    case 4:
      currentFormRender = (
        <>
          <div className="flex flex-col">
            <label
              htmlFor="birthDate"
              className="text-main-second font-bold text-xl mb-2"
            >
              Data urodzenia
            </label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.birthDateError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.birthDateError != "" && formError.birthDateError}
            </p>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="domicile"
              className="text-main-second font-bold text-xl mb-2"
            >
              Miejsce zamieszkania
            </label>
            <input
              type="text"
              id="domicile"
              placeholder="Miejsce zamieszkania"
              name="domicile"
              value={formData.domicile}
              onChange={handleInputChange}
              className={`h-16 rounded-lg pl-3 outline-none text-main-second shadow-md ${
                formError.domicileError != "" &&
                "!text-red-600 border-2 border-red-600 placeholder-red-600"
              }`}
            />
            <p className="text-red-600 text-md font-bold h-8 text-sm">
              {formError.domicileError != "" && formError.domicileError}
            </p>
          </div>
          <div className="flex flex-row gap-8">
            <button
              type="button"
              onClick={handlePreviousStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={handleNextStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Dalej
            </button>
          </div>
        </>
      );
      break;
    //? RENDER AVATAR IMAGE FIELDS
    case 5:
      currentFormRender = (
        <>
          <h4 className="text-center text-3xl font-bold mb-2">
            Zdjęcie profilowe
          </h4>
          <div className="flex justify-center relative">
            <img
              src={imageData.imageSrc}
              alt="user avatar"
              className="w-[200px] h-[200px] rounded-full"
            />
            <div
              {...getRootProps()}
              className={`absolute w-[200px] h-[200px] rounded-full flex justify-center items-center hover:bg-green-500/50  transition-colors duration-500 cursor-pointer group ${
                isDragActive && "bg-blue-500/50"
              }`}
              id="upload--file--wrapper"
            >
              <input {...getInputProps()} />
              <FontAwesomeIcon
                icon={isDragActive ? faFolderPlus : faFileArrowUp}
                className={`text-8xl text-white transition-all duration-500 group-hover:scale-100 ${
                  isDragActive ? "scale-100" : "scale-0"
                }`}
                id="upload--file--icon"
              />
            </div>
          </div>
          <div className="flex flex-row gap-8 mt-5">
            <button
              type="button"
              onClick={handlePreviousStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Wstecz
            </button>
            <button
              type="button"
              onClick={handleNextStageClick}
              className="bg-main-second text-white font-bold text-xl h-16 rounded-lg flex-grow flex-shrink basis-0 shadow-md"
            >
              Dalej
            </button>
          </div>
        </>
      );
      break;

    case 6:
      currentFormRender = (
        <>
          <h1>{formData.avatarSource}</h1>
          <button
            type="submit"
            className="bg-main-second text-white font-bold text-xl h-16 rounded-lg shadow-md mt-8"
          >
            Zarejestruj się
          </button>
          <button
            onClick={handlePreviousStageClick}
            className="bg-main-second text-white font-bold text-xl h-16 rounded-lg shadow-md mt-8"
          >
            Poprzedni krok
          </button>
        </>
      );
      break;

    default:
      currentFormRender = (
        <>
          <h4>Invalid stage number</h4>
        </>
      );
  }

  return (
    <>
      <div className="flex items-center justify-center mt-32">
        <section className="grid grid-cols-1 md:grid-cols-2 bg-main-light w-full max-w-[1100px] rounded-[40px] z-20 shadow-md mx-2 xl:mx-0">
          <div className="rounded-l-lg hidden items-center justify-center py-8 pl-8 md:flex">
            <img
              src={register_banner}
              alt="register banner"
              className="h-[550px] rounded-[40px] object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-center min-h-[550px]">
            <header className="text-center text-4xl lg:text-5xl font-bold text-main-third tracking-widest">
              Zarejestruj się
            </header>
            <div className="px-8">
              <StageCounter stage={stage} />
            </div>

            <article className="flex justify-center">
              <form
                className="flex flex-col px-8 py-4 max-w-[450px] flex-grow"
                onSubmit={handleSubmit}
              >
                {currentFormRender}
              </form>
            </article>
          </div>
        </section>
      </div>
    </>
  );
};

export default RegisterPage;

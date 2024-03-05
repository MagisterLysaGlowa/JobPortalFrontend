import authService from "../../api/services/AuthService";
import userService from "../../api/services/UserService";
import { User } from "../../api/models/user";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCakeCandles,
  faCompass,
  faEnvelope,
  faPhone,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";

const ProfilePage = () => {
  //* BUTTON VISIBILITY STATES
  const [educationVisible, setEducationVisible] = useState<boolean>(false);

  //! SITUATIONAL CHECKBOX
  const [educationCheckboxVisible, setEducationCheckboxVisible] =
    useState<boolean>(false);

  const [image, setImage] = useState("");
  const [user, setUser] = useState<User>({
    id: 0,
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    access: "",
    avatarSource: "",
    birthDate: "",
    domicile: "",
  });

  useEffect(() => {
    const getUser = async () => {
      if (await authService.Get()) {
        const userTmp = await authService.Get();
        setImage(await userService.GetAvatar(userTmp.avatarSource));

        setUser(userTmp);
      }
    };
    getUser();
  }, []);

  return (
    <>
      <section className="flex flex-col w-full items-center">
        <article className="w-full max-w-[1400px] bg-main-dark mt-5 px-8 py-12 flex rounded-3xl shadow-md">
          <div className="w-[250px] h-[250px]">
            <img
              src={image != null ? image : ""}
              alt="user avatar"
              className="w-full h-full rounded-3xl"
            />
          </div>

          <div className="ml-16">
            <h1 className="text-5xl text-main-third uppercase font-bold tracking-wide">
              {user.name} {user.surname}
            </h1>

            <div className="flex items-center my-3 text-main-second font-bold">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="text-2xl text-main-second mr-1"
              />
              <h2>{user.email}</h2>
            </div>

            <div className="flex items-center my-3 text-main-second font-bold">
              <FontAwesomeIcon
                icon={faPhone}
                className="text-2xl text-main-second mr-1"
              />
              <h2>{user.phoneNumber}</h2>
            </div>

            <div className="flex items-center my-3 text-main-second font-bold">
              <FontAwesomeIcon
                icon={faCakeCandles}
                className="text-2xl text-main-second mr-1"
              />
              <h2>{user.birthDate}</h2>
            </div>

            <div className="flex items-center my-3 text-main-second font-bold">
              <FontAwesomeIcon icon={faCompass} className="text-2xl mr-1" />
              <h2>{user.domicile}</h2>
            </div>
          </div>
        </article>

        <article className="w-full max-w-[1400px] bg-main-dark mt-20 px-8 py-12 flex flex-col rounded-3xl shadow-md">
          <h1 className="text-4xl text-main-third uppercase font-bold">
            Wykształcenie
          </h1>
          <button
            className={`${educationVisible ? "hidden" : "flex"}`}
            onClick={() => {
              setEducationVisible(!educationVisible);
            }}
          >
            Dodaj element wykształcenia
          </button>

          <div
            className={`${
              educationVisible ? "flex" : "hidden"
            } border-2 border-main-second p-8 rounded-2xl`}
          >
            <form className="grid grid-cols-2 gap-5 w-[800px]">
              <div>
                <h2 className="text-main-second font-bold text-xl">
                  Nazwa uczelni
                </h2>
                <input
                  type="text"
                  className="w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4"
                />
              </div>

              <div>
                <h2 className="text-main-second font-bold text-xl">
                  Miejscowość
                </h2>
                <input
                  type="text"
                  className="w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4"
                />
              </div>

              <div>
                <h2 className="text-main-second font-bold text-xl">
                  Poziom wykształcenia
                </h2>
                <select className="w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4 bg-white">
                  <option>podstawowe</option>
                  <option>zawodowe</option>
                  <option>średnie</option>
                  <option>licencjat</option>
                  <option>magister</option>
                  <option>inżynier</option>
                  <option>doktor</option>
                  <option>profesor</option>
                </select>
              </div>

              <div>
                <h2 className="text-main-second font-bold text-xl">Kierunek</h2>
                <input
                  type="text"
                  className="w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4"
                />
              </div>

              <div>
                <h2 className="text-main-second font-bold text-xl">
                  Rozpoczęcie edukacjii
                </h2>
                <input
                  type="date"
                  className="w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4"
                />
              </div>

              <div>
                <h2 className="text-main-second font-bold text-xl">
                  Zakończenie edukacjii
                </h2>
                <input
                  type="date"
                  className={`w-full h-16 rounded-lg shadow-md outline-none text-xl pl-4 ${
                    educationCheckboxVisible && "pointer-events-none opacity-50"
                  }`}
                />
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className=" accent-main-third"
                    onClick={() => {
                      setEducationCheckboxVisible(!educationCheckboxVisible);
                    }}
                  />
                  <h2 className="text-main-third ml-1 text-lg">
                    W trakcie edukacjii
                  </h2>
                </div>
              </div>

              <button
                type="button"
                className={`${
                  educationVisible ? "flex" : "hidden"
                } bg-main-third text-white font-bold h-16 justify-center items-center rounded-lg`}
                onClick={() => {
                  setEducationVisible(!educationVisible);
                }}
              >
                Zamknij okno
              </button>
            </form>
          </div>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;

import authService from "../../api/services/AuthService";
import userService from "../../api/services/UserService";
import "./ProfilePage.css";
import { User } from "../../api/models/user";
import { ChangeEvent, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import ProfilePageWindow from "../../components/ProfilePageWindow/ProfilePageWindow";
import { Course } from "../../api/models/course";
import DeleteCourseButton from "../../components/Buttons/DeleteCourseButton";
import { Education } from "../../api/models/education";
import DeleteEducationButton from "../../components/Buttons/DeleteEducationButton";
import { Experience } from "../../api/models/experience";
import DeleteExperienceButton from "../../components/Buttons/DeleteExperienceButton";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons/faEnvelope";
import { faCakeCandles } from "@fortawesome/free-solid-svg-icons/faCakeCandles";
import { faGlobe } from "@fortawesome/free-solid-svg-icons/faGlobe";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { Ability } from "../../api/models/ability";
import { Language } from "../../api/models/language";
import { Link } from "../../api/models/link,";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons/faSquareCheck";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";

const ProfilePage = () => {
  //* BUTTON VISIBILITY STATES

  //! SITUATIONAL CHECKBOX
  const [profilePageElement, setProfilePageElement] = useState<string>("about");
  const [userCourses, setUserCourses] = useState<Course[]>([
    {
      courseId: 0,
      courseName: "",
      courseOrganizer: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [userEducations, setUserEducations] = useState<Education[]>([
    {
      educationId: 0,
      schoolName: "",
      location: "",
      educationLevel: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [userExperiences, setUserExperiences] = useState<Experience[]>([
    {
      experienceId: 0,
      proffesion: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
    },
  ]);
  const [currentProfilePageElement, setCurrentProfilePageElement] =
    useState<string>("about");
  const [display, setDisplay] = useState<JSX.Element>();
  const [image, setImage] = useState("");
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
  const [ability, setAbility] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [languageLevel, setLanguageLevel] = useState<string>("");
  const [link, setLink] = useState<string>("");

  const [abilities, setAbilities] = useState<Ability[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    const Setup = async () => {
      const setUserConfig = async () => {
        authService.Get().then(async (res) => {
          setUser(res);
          console.log(res.userId);

          setImage(await userService.GetAvatar(res.avatarSource));
        });
      };
      await setUserConfig();
    };
    Setup();
    RefreshUserData();
    console.log(user.userId);
  }, []);

  useEffect(() => {
    RefreshUserData();
  }, [abilities]);

  const profilePageElementClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    setCurrentProfilePageElement(e.currentTarget.id);
    await EditProfilePageElements(e.currentTarget.id);
  };
  const EditProfilePageElements = async (currentElement: string) => {
    setProfilePageElement(currentElement);
    if (currentElement == "about") {
      setDisplay(<div></div>);
    } else if (currentElement === "courses") {
      const data = await userService.GetUserCourses(user.userId);
      setUserCourses(data);

      let display = (
        <div className="w-full mt-2 slide">
          <h1 className="text-3xl bg-white rounded-md px-4 py-2 shadow-md">
            Moje kursy
          </h1>
          {data.map((course, index) => {
            return (
              <div
                key={index}
                className="shadow-lg rounded-md mt-2 px-4 py-6 flex flex-col gap-3 bg-white"
              >
                <h2 className="font-bold">
                  Nazwa kursu:{" "}
                  <span className="font-normal">{course.courseName}</span>
                </h2>
                <h2 className="font-bold">
                  Organizator kursu:{" "}
                  <span className="font-normal">{course.courseOrganizer}</span>
                </h2>
                <h2 className="font-bold">
                  Data rozpoczęcia kursu:{" "}
                  <span className="font-normal">
                    {course.startDate.substring(0, 10)}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Data zakończenia kursu:{" "}
                  <span className="font-normal">
                    {course.endDate.substring(0, 10)}
                  </span>
                </h2>
                <DeleteCourseButton
                  courseId={course.courseId}
                  editProfilePageElements={EditProfilePageElements}
                />
              </div>
            );
          })}
        </div>
      );
      setDisplay(display);
    } else if (currentElement === "educations") {
      const data = await userService.GetUserEducations(user.userId);

      setUserEducations(data);

      let display = (
        <div className="w-full mt-2 slide">
          <h1 className="text-3xl bg-white rounded-md px-4 py-2 shadow-md">
            Moje Wykształcenie
          </h1>
          {data.map((education, index) => {
            return (
              <div
                key={index}
                className="shadow-lg rounded-md mt-2 px-4 py-6 flex flex-col gap-3 bg-white"
              >
                <h2 className="font-bold">
                  Nazwa szkoły:{" "}
                  <span className="font-normal">{education.schoolName}</span>
                </h2>
                <h2 className="font-bold">
                  Miejscowość:{" "}
                  <span className="font-normal">{education.location}</span>
                </h2>
                <h2 className="font-bold">
                  Poziom szkoły:{" "}
                  <span className="font-normal">
                    {education.educationLevel}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Kierunek:{" "}
                  <span className="font-normal">{education.field}</span>
                </h2>
                <h2 className="font-bold">
                  Data rozpoczęcia nauki:{" "}
                  <span className="font-normal">
                    {education.startDate.substring(0, 10)}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Data zakończenia nauki:{" "}
                  <span className="font-normal">
                    {education.endDate.substring(0, 10)}
                  </span>
                </h2>
                <DeleteEducationButton
                  educationId={education.educationId}
                  editProfilePageElements={EditProfilePageElements}
                />
              </div>
            );
          })}
        </div>
      );
      setDisplay(display);
    } else if (currentElement === "experiences") {
      const data = await userService.GetUserExperiences(user.userId);
      setUserExperiences(data);

      let display = (
        <div className="w-full mt-2 subpixel-antialiased">
          <h1 className="text-3xl bg-white rounded-md px-4 py-2 shadow-md">
            Moje doświadczenie
          </h1>
          {data.map((experience, index) => {
            return (
              <div
                key={index}
                className="shadow-lg rounded-md mt-2 px-4 py-6 flex flex-col gap-3 bg-white"
              >
                <h2 className="font-bold">
                  Stanowisko:{" "}
                  <span className="font-normal">{experience.proffesion}</span>
                </h2>
                <h2 className="font-bold">
                  Nazwa firmy:{" "}
                  <span className="font-normal">{experience.companyName}</span>
                </h2>
                <h2 className="font-bold">
                  Miejscowość:{" "}
                  <span className="font-normal">{experience.location}</span>
                </h2>
                <h2 className="font-bold">
                  Data rozpoczęcia pracy:{" "}
                  <span className="font-normal">
                    {experience.startDate.substring(0, 10)}
                  </span>
                </h2>
                <h2 className="font-bold">
                  Data zakończenia pracy:{" "}
                  <span className="font-normal">
                    {experience.endDate.substring(0, 10)}
                  </span>
                </h2>
                <DeleteExperienceButton
                  experienceId={experience.experienceId}
                  editProfilePageElements={EditProfilePageElements}
                />
              </div>
            );
          })}
        </div>
      );
      setDisplay(display);
    }
  };

  const RefreshUserData = async () => {
    const user = await authService.Get();
    let userId = user.userId;
    setAbilities(await userService.GetAbilities(userId));
    setLanguages(await userService.GetLanguages(userId));
    setLinks(await userService.GetLinks(userId));
  };

  const handleAbilityInputChanged = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setAbility(e.target.value);
  };

  const handleAbilityClick = async () => {
    userService.InsertAbility(ability, user.userId);
    setAbility("");
    RefreshUserData();
  };

  const handleDeleteAbilityClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    userService.DeleteUserAbility(e.currentTarget.tabIndex);
    RefreshUserData();
  };

  //LANGUAGE
  const handleLanguageInputChanged = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    setLanguage(value);
  };

  const handleLanguageSelectChanged = async (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setLanguageLevel(value);
  };

  const handleLanguageClick = async () => {
    userService.InsertLanguage(language, languageLevel, user.userId);
    setLanguage("");
    setLanguageLevel("");
    RefreshUserData();
  };

  const handleDeleteLanguageClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    userService.DeleteUserLanguage(e.currentTarget.tabIndex);
    RefreshUserData();
  };

  //LINK
  const handleLinkInputChanged = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLink(value);
  };

  const handleLinkClick = async () => {
    userService.InsertLink(link, user.userId);
    setLink("");
    RefreshUserData();
  };

  const handleDeleteLinkClick = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    userService.DeleteUserLink(e.currentTarget.tabIndex);
    RefreshUserData();
  };

  return (
    <>
      <section className="flex flex-col w-full items-center ">
        <article className="w-full max-w-[1200px] mt-5 grid grid--header--template">
          <aside className="col-span-2 lg:col-span-1">
            <div className="w-full lg:w-[250px] lg:h-[250px]">
              <img
                src={image != null ? image : ""}
                alt="user avatar"
                className="w-full h-full"
              />
            </div>

            <div className="lw-full lg:w-[250px] h-[200px] lg:h-[400px] bg-white px-4 py-4 flex flex-col gap-3 rounded-b-xl">
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faCakeCandles}
                  className="text-2xl text-blue-500"
                />
                <h1 className="ml-2 text-blue-900">{user.birthDate}</h1>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="text-2xl text-blue-500"
                />
                <h1 className="ml-2 text-blue-900">{user.email}</h1>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className="text-2xl text-blue-500"
                />
                <h1 className="ml-2 text-blue-900">{user.domicile}</h1>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faPhone}
                  className="text-2xl text-blue-500"
                />
                <h1 className="ml-2 text-blue-900">{user.phoneNumber}</h1>
              </div>
            </div>
          </aside>

          <div className="lg:ml-16 col-span-2 lg:col-span-1">
            <div className="flex h-[250px] bg-blue-500 rounded-b-xl mb-10 items-center flex-col justify-center">
              <h1 className="text-4xl lg:text-5xl tracking-tight text-white capitalize font-bold">
                {user.name} {user.surname}
              </h1>
              <h2 className="mt-[0.70em] ml-6 text-gray-200 text-md">
                <FontAwesomeIcon icon={faEnvelope} />
                <span className="ml-1">{user.email}</span>
              </h2>
              <h2 className="mt-[0.70em] ml-6 text-gray-300 text-md">
                <FontAwesomeIcon icon={faLocationDot} />
                <span className="ml-1">{user.domicile}</span>
              </h2>
            </div>

            <div className="flex gap-5">
              <button onClick={profilePageElementClick} id="about">
                O mnie
                <hr
                  className={`${
                    currentProfilePageElement == "about"
                      ? "bg-blue-600 w-full"
                      : "bg-transparent w-[0px]"
                  } h-[3px] relative top-[0.13em] transition-all duration-300 ease-in-out`}
                />
              </button>
              <button onClick={profilePageElementClick} id="courses">
                Kursy
                <hr
                  className={`${
                    currentProfilePageElement == "courses"
                      ? "bg-blue-600 w-full"
                      : "bg-transparent w-[0px]"
                  } h-[3px] relative top-[0.13em] transition-all duration-300 ease-in-out`}
                />
              </button>
              <button onClick={profilePageElementClick} id="educations">
                Wykształcenie
                <hr
                  className={`${
                    currentProfilePageElement == "educations"
                      ? "bg-blue-600 w-full"
                      : "bg-transparent w-[0px]"
                  } h-[3px] relative top-[0.13em] transition-all duration-300 ease-in-out`}
                />
              </button>
              <button onClick={profilePageElementClick} id="experiences">
                Doświadczenie
                <hr
                  className={`${
                    currentProfilePageElement == "experiences"
                      ? "bg-blue-600 w-full"
                      : "bg-transparent w-[0px]"
                  } h-[3px] relative top-[0.13em] transition-all duration-300 ease-in-out`}
                />
              </button>
            </div>
            <hr className="h-[2px] bg-gray-300" />
            <div>
              <ProfilePageWindow
                profilePageElement={profilePageElement}
                display={display}
                editProfilePageElements={EditProfilePageElements}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 col-span-2 gap-5 mb-10 ">
            <div className="bg-white shadow-md rounded-lg px-4 py-8 flex flex-col">
              <h1 className="text-2xl font-bold h-[100px]">
                Umiejętności / Certyfikaty / Uprawnienia
              </h1>

              <div className="flex flex-col gap-1 h-full mt-5">
                {abilities.map((item, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-2xl text-green-600 mr-2"
                      />
                      <h2 className="text-lg w-full">{item.abilityName}</h2>
                      <button
                        onClick={handleDeleteAbilityClick}
                        tabIndex={item.abilityId}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="p-2 text-xl text-white bg-red-500 rounded-lg"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  onChange={handleAbilityInputChanged}
                  value={ability}
                  className="my-2 h-12 rounded-md outline-none border-2 border-gray-200 pl-2 text-lg"
                />
                <button
                  onClick={handleAbilityClick}
                  className="bg-green-500 text-xl text-white h-12 font-medium rounded-md"
                >
                  Dodaj
                </button>
              </div>
            </div>
            <div className="bg-white shadow-md rounded-lg px-4 py-8 flex flex-col">
              <h1 className="text-2xl font-bold ">Znane języki</h1>

              <div className="flex flex-col gap-1 h-full mt-5">
                {languages.map((item, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-2xl text-green-600 mr-2"
                      />
                      <h2 className="text-lg w-full">{item.languageName}</h2>
                      <h2 className="text-lg w-full">{item.languageLevel}</h2>
                      <button
                        onClick={handleDeleteLanguageClick}
                        tabIndex={item.languageId}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="p-2 text-xl text-white bg-red-500 rounded-lg"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col">
                <input
                  type="text"
                  name="languageName"
                  onChange={handleLanguageInputChanged}
                  className="my-2 h-12 rounded-md outline-none border-2 border-gray-200 pl-2 text-lg"
                />
                <select
                  name="languageLevel"
                  className="my-2 h-12 rounded-md outline-none border-2 border-gray-200 pl-2 text-lg"
                  onChange={handleLanguageSelectChanged}
                >
                  <option>A1</option>
                  <option>A2</option>
                  <option>B1</option>
                  <option>B2</option>
                  <option>C1</option>
                  <option>C2</option>
                </select>

                <button
                  className="bg-green-500 text-xl text-white h-12 font-medium rounded-md"
                  onClick={handleLanguageClick}
                >
                  Dodaj
                </button>
              </div>
            </div>

            <div className="bg-white shadow-md rounded-lg px-4 py-8 flex flex-col">
              <h1 className="text-2xl font-bold  h-[100px]">
                Linki do innych portali
              </h1>

              <div className="flex flex-col gap-1 h-full mt-5">
                {links.map((item, index) => {
                  return (
                    <div className="flex items-center" key={index}>
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="text-2xl text-green-600 mr-2"
                      />
                      <h2 className="text-lg w-full">{item.linkContent}</h2>
                      <button
                        onClick={handleDeleteLinkClick}
                        tabIndex={item.linkId}
                      >
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          className="p-2 text-xl text-white bg-red-500 rounded-lg"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="my-2 h-12 rounded-md outline-none border-2 border-gray-200 pl-2 text-lg"
                  value={link}
                  onChange={handleLinkInputChanged}
                />
                <button
                  className="bg-green-500 text-xl text-white h-12 font-medium rounded-md"
                  onClick={handleLinkClick}
                >
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default ProfilePage;

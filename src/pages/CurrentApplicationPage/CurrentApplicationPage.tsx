import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { User } from "../../api/models/user";
import authService from "../../api/services/AuthService";
import { Education } from "../../api/models/education";
import userService from "../../api/services/UserService";
import { Course } from "../../api/models/course";
import { Experience } from "../../api/models/experience";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBriefcase,
  faChartSimple,
  faHand,
  faLanguage,
  faUser,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { Language } from "../../api/models/language";
import { Link } from "../../api/models/link,";
import { Ability } from "../../api/models/ability";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons/faCircleChevronRight";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { JobOfert } from "../../api/models/jobOfert";

type Props = {};

const CurrentApplicationPage = (props: Props) => {
  const navigate = useNavigate();
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
  const [educations, setEducations] = useState<Education[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [links, setLinks] = useState<Link[]>([]);
  const [abilities, setAbilities] = useState<Ability[]>([]);

  const location = useLocation();
  const { jobOfertId } = location.state;
  const { positionName } = location.state;
  useEffect(() => {
    (async () => {
      const user: User = await authService.Get();
      setUser(user);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await reloadData();
    })();
  }, [user]);

  const reloadData = async () => {
    const educationsDb = await userService.GetUserEducations(user.userId);
    const experiencesDb = await userService.GetUserExperiences(user.userId);
    const coursesDb = await userService.GetUserCourses(user.userId);
    const languagesDb = await userService.GetLanguages(user.userId);
    const linksDb = await userService.GetLinks(user.userId);
    const abilityDb = await userService.GetAbilities(user.userId);

    setEducations(educationsDb);
    setExperiences(experiencesDb);
    setCourses(coursesDb);
    setLanguages(languagesDb);
    setLinks(linksDb);
    setAbilities(abilityDb);
  };

  const handleApplicationClick = async () => {
    if (user.userId == undefined) return;
    const userApplications: JobOfert[] =
      await userService.GetUserJobOfertApplications(user.userId);
    const applicationTmp = userApplications.find((x) => x.id == jobOfertId);
    if (applicationTmp?.id == undefined) {
      await userService.InsertUserJobOfertApplication(jobOfertId, user.userId);
      navigate("/applications");
    } else {
      alert("Aplikacja do oferty już została wysłana");
    }
  };

  return (
    <section className="flex items-center flex-col">
      <article className="w-full max-w-[1000px] p-2">
        <header className="bg-blue-500 py-20 flex flex-col items-center">
          <h1 className="text-4xl font-bold uppercase font-kanit text-white">
            Aplikuj na stanowisko
          </h1>
          <span className="text-2xl italic text-white mt-2">
            {positionName}
          </span>
        </header>

        <div className="bg-white rounded-b-xl shadow-md px-4 py-10 grid grid-cols-2">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Podstawowe dane
            </h1>
            <h2 className="font-bold mt-5">
              Imię: <span className="font-normal">{user.name}</span>
            </h2>
            <h2 className="font-bold">
              Nazwisko: <span className="font-normal">{user.surname}</span>
            </h2>
            <h2 className="font-bold">
              E-mail: <span className="font-normal">{user.email}</span>
            </h2>
            <h2 className="font-bold">
              Numer telefonu:{" "}
              <span className="font-normal">{user.phoneNumber}</span>
            </h2>
            <h2 className="font-bold">
              Miejsce zamieszkania:{" "}
              <span className="font-normal">{user.domicile}</span>
            </h2>
            <h2 className="font-bold">
              Data urodzenia:{" "}
              <span className="font-normal">{user.birthDate}</span>
            </h2>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 mt-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Wykształcenie
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {educations.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border-2 border-dashed border-gray-500 px-4 py-5 rounded-xl shadow-md"
                  >
                    <h2 className="font-bold">
                      Nazwa szkoły / uczelni:
                      <span className="font-normal">{item.schoolName}</span>
                    </h2>
                    <h2 className="font-bold">Miejscowość:{item.location}</h2>
                    <h2 className="font-bold">
                      Poziom wykształcenia:
                      <span className="font-normal">{item.educationLevel}</span>
                    </h2>
                    <h2 className="font-bold">Kierunek: {item.field}</h2>
                    <h2 className="font-bold">
                      Data rozpoczęcia nauki:
                      <span className="font-normal">{item.startDate}</span>
                    </h2>
                    <h2 className="font-bold">
                      Data zakończenia nauki:
                      <span className="font-normal">{item.endDate}</span>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faUserGraduate}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 mt-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Doświadczenie
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {experiences.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border-2 border-dashed border-gray-500 px-4 py-5 rounded-xl shadow-md"
                  >
                    <h2 className="font-bold">
                      Nazwa stanowiska:
                      <span className="font-normal">{item.proffesion}</span>
                    </h2>
                    <h2 className="font-bold">
                      Nazwa firmy:{item.companyName}
                    </h2>
                    <h2 className="font-bold">
                      Poziom wykształcenia:
                      <span className="font-normal">
                        Miejscowość{item.location}
                      </span>
                    </h2>
                    <h2 className="font-bold">
                      Data rozpoczęcia pracy:{" "}
                      <span className="font-normal">{item.startDate}</span>
                    </h2>
                    <h2 className="font-bold">
                      Data zakończenia pracy:
                      <span className="font-normal">{item.endDate}</span>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faBriefcase}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 mt-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Kursy / Szkolenia
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {courses.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border-2 border-dashed border-gray-500 px-4 py-5 rounded-xl shadow-md"
                  >
                    <h2 className="font-bold">
                      Nazwa kursu / szkolenia:
                      <span className="font-normal">{item.courseName}</span>
                    </h2>
                    <h2 className="font-bold">
                      Imię i nazwisko organizatora:
                      <span className="font-normal">
                        {item.courseOrganizer}
                      </span>
                    </h2>
                    <h2 className="font-bold">
                      Data rozpoczęcia kursu / szkolenia:{" "}
                      <span className="font-normal">{item.startDate}</span>
                    </h2>
                    <h2 className="font-bold">
                      Data zakończenia kursu / szkolenia:
                      <span className="font-normal">{item.endDate}</span>
                    </h2>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faBook}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 mt-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Znane języki
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {languages.map((item, index) => {
                return (
                  <div key={index}>
                    <h1 className="font-bold flex items-center">
                      <FontAwesomeIcon
                        icon={faCircleChevronRight}
                        className="text-xl text-blue-700"
                      />
                      <span className="ml-2">{item.languageName} </span>
                      <FontAwesomeIcon
                        icon={faChartSimple}
                        className="mx-3 text-green-500"
                      />
                      <span className="uppercase text-green-700">
                        {item.languageLevel}
                      </span>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flexjustify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faLanguage}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 mt-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Umiejętności / Uprawnienia
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {abilities.map((item, index) => {
                return (
                  <div key={index}>
                    <h1 className="font-bold flex items-center">
                      <FontAwesomeIcon
                        icon={faCircleChevronRight}
                        className="text-xl text-blue-700"
                      />
                      <span className="ml-2">{item.abilityName} </span>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faHand}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md px-4 py-10 grid grid-cols-2 my-10">
          <div className="lg:col-span-1 col-span-2">
            <h1 className="text-4xl text-blue-400 font-bold uppercase font-kanit">
              Linki do innych portali
            </h1>
            <div className="flex flex-col gap-5 mt-5">
              {links.map((item, index) => {
                return (
                  <div key={index}>
                    <h1 className="font-bold flex items-center">
                      <FontAwesomeIcon
                        icon={faCircleChevronRight}
                        className="text-xl text-blue-700"
                      />
                      <span className="ml-2">{item.linkContent} </span>
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:flex justify-end">
            <div className="bg-blue-500 w-[200px] h-[200px] rounded-full flex items-center justify-center">
              <FontAwesomeIcon
                icon={faGithub}
                className="text-9xl text-blue-500 bg-white rounded-full w-[100px] h-[100px] p-10"
              />
            </div>
          </div>
        </div>

        <div
          className="flex  justify-center lg:justify-end"
          onClick={handleApplicationClick}
        >
          <button className="bg-blue-400 rounded-md font-bold text-xl shadow-md w-full max-w-[500px] h-16 mb-10 text-white ">
            Aplikuj na stanowisko
          </button>
        </div>
      </article>
    </section>
  );
};

export default CurrentApplicationPage;

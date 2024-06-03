import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import {
  CourseFormData,
  EducationFormData,
  ExperienceFormData,
} from "../../../types";
import userService from "../../api/services/UserService";
import { User } from "../../api/models/user";
import authService from "../../api/services/AuthService";
import { button } from "@material-tailwind/react";
import "../../pages/ProfilePage/ProfilePage.css";

interface Props {
  profilePageElement: string;
  display: any;
  editProfilePageElements: any;
}

const ProfilePageWindow = (props: Props) => {
  const { profilePageElement, editProfilePageElements } = props;
  const [userFormData, setUserFormData] = useState<User>({
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
  const [editAbout, setEditAbout] = useState<boolean>(false);
  const [courseFormData, setCourseFormData] = useState<CourseFormData>({
    courseName: "",
    courseOrganizer: "",
    startDate: "",
    endDate: "",
  });
  const [educationFormData, setEducationFormData] = useState<EducationFormData>(
    {
      schoolName: "",
      location: "",
      educationLevel: "",
      field: "",
      startDate: "",
      endDate: "",
    }
  );
  const [experienceFormData, setExperienceFormData] =
    useState<ExperienceFormData>({
      proffesion: "",
      companyName: "",
      location: "",
      startDate: "",
      endDate: "",
    });

  useEffect(() => {
    const setup = async () => {
      authService.Get().then(async (res) => {
        setUser(res);
        setUserFormData(res);
      });
    };
    setup();
  }, []);

  //* USER FORM DATA *//
  const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("esa");

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleUserFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  //* COURSE FORM DATA *//
  const handleCourseInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCourseFormData({
      ...courseFormData,
      [name]: value,
    });
  };

  const handleCourseFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userService.InsertUserCourse(courseFormData, user.userId);
    await editProfilePageElements("courses");
  };

  //* EDUCATIONS FORM DATA *//
  const handleEducationInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEducationFormData({
      ...educationFormData,
      [name]: value,
    });
  };

  const handleEducationSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEducationFormData({
      ...educationFormData,
      [name]: value,
    });
  };

  const handleEducationFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userService.InsertUserEducation(educationFormData, user.userId);
    await editProfilePageElements("educations");
  };

  //* EXPERIENCES FORM DATA *//

  const handleExperienceInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setExperienceFormData({
      ...experienceFormData,
      [name]: value,
    });
  };

  const handleExperienceFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await userService.InsertUserExperience(experienceFormData, user.userId);
    await editProfilePageElements("experiences");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col items-center lg:block">
        <form
          className={`flex-col w-full max-w-[300px] lg:max-w-[400px] gap-2 mt-2 ${
            profilePageElement === "about" ? "flex" : "hidden"
          }`}
          onSubmit={handleUserFormSubmit}
        >
          <input
            type="text"
            placeholder="Imię"
            name="name"
            onChange={handleUserInputChange}
            value={userFormData.name}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          <input
            type="text"
            placeholder="Nazwisko"
            name="surname"
            onChange={handleUserInputChange}
            value={userFormData.surname}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            onChange={handleUserInputChange}
            value={userFormData.email}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          <input
            type="number"
            placeholder="Numer telefonu"
            name="phoneNumber"
            onChange={handleUserInputChange}
            value={userFormData.phoneNumber}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          <input
            type="date"
            name="birthDate"
            onChange={handleUserInputChange}
            value={userFormData.birthDate}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          <input
            type="text"
            placeholder="Miejsce zamieszkania"
            name="domicile"
            onChange={handleUserInputChange}
            value={userFormData.domicile}
            disabled={!editAbout}
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
          />
          {editAbout ? (
            <button
              className="py-3 text-white bg-red-400 font-bold shadow-sm rounded-md"
              onClick={() => {
                setEditAbout(!editAbout);
                const updateRequest = async () => {
                  await userService.UpdateUser(user.userId, userFormData);
                };
                updateRequest();
              }}
            >
              Zamknij okno
            </button>
          ) : (
            <button
              className="py-3 text-white bg-green-400 font-bold shadow-sm rounded-md"
              onClick={() => {
                setEditAbout(!editAbout);
              }}
            >
              Edytuj dane
            </button>
          )}
        </form>
        <form
          className={`flex-col max-w-[400px] gap-2 mt-2 ${
            profilePageElement === "courses" ? "flex" : "hidden"
          }`}
          onSubmit={handleCourseFormSubmit}
        >
          <input
            type="text"
            placeholder="nazwa kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="courseName"
            onChange={handleCourseInputChange}
          />
          <input
            type="text"
            placeholder="organizator kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="courseOrganizer"
            onChange={handleCourseInputChange}
          />
          <input
            type="date"
            placeholder="data rozpoczęcia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="startDate"
            onChange={handleCourseInputChange}
          />
          <input
            type="date"
            placeholder="data zakończenia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="endDate"
            onChange={handleCourseInputChange}
          />
          <button className="py-3 text-white bg-green-400 font-bold shadow-sm rounded-md">
            Dodaj informację o kursie
          </button>
        </form>

        <form
          className={`flex-col max-w-[400px] gap-2 mt-2 ${
            profilePageElement === "educations" ? "flex" : "hidden"
          }`}
          onSubmit={handleEducationFormSubmit}
        >
          <input
            type="text"
            placeholder="nazwa szkoły"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="schoolName"
            onChange={handleEducationInputChange}
          />
          <input
            type="text"
            placeholder="miejscowość"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="location"
            onChange={handleEducationInputChange}
          />
          <select
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="educationLevel"
            onChange={handleEducationSelectChange}
          >
            <option>podstawowe</option>
            <option>zawodowe</option>
            <option>średnie</option>
            <option>licencjat</option>
          </select>
          <input
            type="text"
            placeholder="kierunek"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="field"
            onChange={handleEducationInputChange}
          />
          <input
            type="date"
            placeholder="data rozpoczęcia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="startDate"
            onChange={handleEducationInputChange}
          />
          <input
            type="date"
            placeholder="data zakończenia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="endDate"
            onChange={handleEducationInputChange}
          />
          <button className="py-3 text-white bg-green-400 font-bold shadow-sm rounded-md">
            Dodaj informację o edukacji
          </button>
        </form>

        <form
          className={`flex-col max-w-[400px] gap-2 mt-2 ${
            profilePageElement === "experiences" ? "flex" : "hidden"
          }`}
          onSubmit={handleExperienceFormSubmit}
        >
          <input
            type="text"
            placeholder="nazwa stanowiska"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="proffesion"
            onChange={handleExperienceInputChange}
          />
          <input
            type="text"
            placeholder="nazwa firmy"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="courseOrganizer"
            onChange={handleExperienceInputChange}
          />
          <input
            type="text"
            placeholder="miejscowość"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="location"
            onChange={handleExperienceInputChange}
          />
          <input
            type="date"
            placeholder="data rozpoczęcia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="startDate"
            onChange={handleExperienceInputChange}
          />
          <input
            type="date"
            placeholder="data zakończenia kursu"
            className="pl-2 py-2 text-gray-600 shadow-sm rounded-md"
            name="endDate"
            onChange={handleExperienceInputChange}
          />
          <button className="py-3 text-white bg-green-400 font-bold shadow-sm rounded-md">
            Dodaj informację o doświadczeniu
          </button>
        </form>
      </div>
      <div className="animate">{props.display}</div>
    </div>
  );
};

export default ProfilePageWindow;

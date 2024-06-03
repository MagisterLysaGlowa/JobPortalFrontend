import axios, { AxiosResponse } from "axios";
import { Course } from "../models/course";
import {
  CourseFormData,
  EducationFormData,
  ExperienceFormData,
} from "../../../types";
import { Education } from "../models/education";
import { Experience } from "../models/experience";
import { JobOfert } from "../models/jobOfert";
import { User } from "../models/user";
import { Link } from "../models/link,";
import { Ability } from "../models/ability";
import { Language } from "../models/language";

class UserService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  GetAvatar = async (imageUrl: string) => {
    console.log(`${this.baseURL}/GetAvatar/${imageUrl}`);

    const response = await axios.get(`${this.baseURL}/GetAvatar/${imageUrl}`, {
      responseType: "blob",
      headers: {
        "Content-Type": "image/png",
      },
    });
    const url = URL.createObjectURL(response.data);
    return url;
  };

  //!USER COURSE METHODS

  GetUserCourses = async (userId: number): Promise<Course[]> => {
    try {
      const response: AxiosResponse<Course[]> = await axios.get(
        `${this.baseURL}/course/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  DeleteUserCourse = async (courseId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/course/${courseId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertUserCourse = async (
    courseFormData: CourseFormData,
    userId: number
  ): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append("courseName", courseFormData.courseName);
      requestData.append("courseOrganizer", courseFormData.courseOrganizer);
      requestData.append("startDate", courseFormData.startDate);
      requestData.append("endDate", courseFormData.endDate);
      requestData.append("userId", userId.toString());
      console.log(requestData);

      await axios.post(`${this.baseURL}/course`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  //!USER EDUCATION METHODS

  GetUserEducations = async (userId: number): Promise<Education[]> => {
    try {
      const response: AxiosResponse<Education[]> = await axios.get(
        `${this.baseURL}/education/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  DeleteUserEducation = async (educationId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/education/${educationId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertUserEducation = async (
    educationFormData: EducationFormData,
    userId: number
  ): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append("schoolName", educationFormData.schoolName);
      requestData.append("location", educationFormData.location);
      requestData.append("educationLevel", educationFormData.educationLevel);
      requestData.append("field", educationFormData.field);
      requestData.append("startDate", educationFormData.startDate);
      requestData.append("endDate", educationFormData.endDate);
      requestData.append("userId", userId.toString());
      console.log(requestData);

      await axios.post(`${this.baseURL}/education`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  //!USER EXPERIENCE METHODS

  GetUserExperiences = async (userId: number): Promise<Experience[]> => {
    try {
      const response: AxiosResponse<Experience[]> = await axios.get(
        `${this.baseURL}/experience/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  DeleteUserExperience = async (experienceId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/experience/${experienceId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertUserExperience = async (
    experienceFormData: ExperienceFormData,
    userId: number
  ): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append("proffesion", experienceFormData.proffesion);
      requestData.append("companyName", experienceFormData.companyName);
      requestData.append("location", experienceFormData.location);
      requestData.append("startDate", experienceFormData.startDate);
      requestData.append("endDate", experienceFormData.endDate);
      requestData.append("userId", userId.toString());
      console.log(requestData);

      await axios.post(`${this.baseURL}/experience`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertUserJobOfertApplication = async (
    jobOfertId: number,
    userId: number
  ): Promise<void> => {
    try {
      await axios.post(`${this.baseURL}/application/${jobOfertId}-${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertUserJobOfertFavourite = async (
    jobOfertId: number,
    userId: number
  ): Promise<void> => {
    try {
      await axios.post(`${this.baseURL}/favourite/${jobOfertId}-${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  GetUserJobOfertApplications = async (userId: number): Promise<JobOfert[]> => {
    try {
      const response: AxiosResponse<JobOfert[]> = await axios.get(
        `${this.baseURL}/application/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetUserJobOfertFavourite = async (userId: number): Promise<JobOfert[]> => {
    try {
      const response: AxiosResponse<JobOfert[]> = await axios.get(
        `${this.baseURL}/favourite/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  UpdateUser = async (userId: number, userData: User): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append("UserId", userId.toString());
      requestData.append("Name", userData.name);
      requestData.append("Surname", userData.surname);
      requestData.append("Email", userData.email);
      requestData.append("PhoneNumber", userData.phoneNumber);
      requestData.append("BirthDate", userData.birthDate);
      requestData.append("Domicile", userData.domicile);

      await axios.put(`${this.baseURL}/${userId}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  InsertAbility = async (ability: string, userId: number): Promise<Ability> => {
    try {
      const requestData = new FormData();
      requestData.append("AbilityName", ability);
      requestData.append("UserId", userId.toString());
      const response: AxiosResponse<Ability> = await axios.post(
        `${this.baseURL}/ability/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  InsertLanguage = async (
    languageName: string,
    languageLevel: string,
    userId: number
  ): Promise<Language> => {
    try {
      const requestData = new FormData();
      requestData.append("LanguageName", languageName);
      requestData.append("LanguageLevel", languageLevel);
      requestData.append("UserId", userId.toString());
      const response: AxiosResponse<Language> = await axios.post(
        `${this.baseURL}/language/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  InsertLink = async (link: string, userId: number): Promise<Link> => {
    try {
      const requestData = new FormData();
      requestData.append("LinkContent", link);
      requestData.append("UserId", userId.toString());
      const response: AxiosResponse<Link> = await axios.post(
        `${this.baseURL}/link/`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetAbilities = async (userId: number) => {
    try {
      const response: AxiosResponse<Ability[]> = await axios.get(
        `${this.baseURL}/ability/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetLanguages = async (userId: number) => {
    try {
      const response: AxiosResponse<Language[]> = await axios.get(
        `${this.baseURL}/language/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetLinks = async (userId: number) => {
    try {
      const response: AxiosResponse<Link[]> = await axios.get(
        `${this.baseURL}/link/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  DeleteUserAbility = async (abilityId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/ability/${abilityId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteUserLanguage = async (languageId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/language/${languageId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteUserLink = async (linkId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/link/${linkId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteUserApplication = async (
    jobOfertId: number,
    userId: number
  ): Promise<void> => {
    try {
      await axios.delete(
        `${this.baseURL}/application/${jobOfertId}-${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  };

  DeleteUserFavourite = async (
    jobOfertId: number,
    userId: number
  ): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/favourite/${jobOfertId}-${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };
}

const userService = new UserService("http://localhost:8080/api/user");
export default userService;

import axios, { AxiosResponse } from "axios";
import {
  ImageUploadFields,
  LoginFormData,
  RegisterFormData,
} from "../../../types";
import { User } from "../models/user";

class AuthService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  Login = async (formData: LoginFormData): Promise<boolean> => {
    try {
      await axios.post(`${this.baseURL}/login`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  Get = async (): Promise<User> => {
    try {
      const response: AxiosResponse<User> = await axios.get(
        `${this.baseURL}/user`,
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

  Register = async (
    formData: RegisterFormData,
    imageData: ImageUploadFields
  ): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append("name", formData.name);
      requestData.append("surname", formData.surname);
      requestData.append("email", formData.email);
      requestData.append("password", formData.password);
      requestData.append("phoneNumber", formData.phoneNumber);
      requestData.append("birthDate", formData.birthDate);
      requestData.append("domicile", formData.domicile);
      if (imageData.imageFile != null) {
        requestData.append("imageFile", imageData.imageFile);
      } else {
        const empty = new File(
          [new Blob([new ArrayBuffer(0)], { type: "image/png" })],
          "empty.png",
          {
            type: "image/png",
          }
        );
        requestData.append("imageFile", empty);
      }

      await axios.post(`${this.baseURL}/register`, requestData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  Logout = async (): Promise<void> => {
    try {
      await axios.post(`${this.baseURL}/logout`, null, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  EmailIsTaken = async (email: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<boolean> = await axios.get(
        `${this.baseURL}/emailIsFree/${email}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  PhoneIsTaken = async (phone: string): Promise<boolean> => {
    try {
      const response: AxiosResponse<boolean> = await axios.get(
        `${this.baseURL}/numberIsFree/${phone}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };
}

const authService = new AuthService("http://localhost:8080/api/auth");
export default authService;

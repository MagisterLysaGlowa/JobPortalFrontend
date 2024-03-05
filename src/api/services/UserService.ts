import axios from "axios";

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
}

const userService = new UserService("http://localhost:8080/api/user");
export default userService;

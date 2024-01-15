import { useEffect, useState } from "react";
import authService from "../../api/services/AuthService";
import { User } from "../../api/models/user";

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>({
    id: 0,
    name: "",
    email: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await authService.Get();
        setUser(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {user != null ? <h1>Welcome {user.email}</h1> : <h1>Not logged in</h1>}
    </div>
  );
};

export default HomePage;

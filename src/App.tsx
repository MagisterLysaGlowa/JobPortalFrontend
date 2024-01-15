import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <main className="relative">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;

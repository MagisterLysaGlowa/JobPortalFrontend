import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import React from "react";

export const Context = React.createContext<any>({});

const App: React.FC = () => {
  return (
    <main className="relative overflow-hidden min-h-[100vh]">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;

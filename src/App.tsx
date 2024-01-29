import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import React from "react";

export const Context = React.createContext<any>({});

const App: React.FC = () => {
  return (
    <main className="relative overflow-hidden">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default App;

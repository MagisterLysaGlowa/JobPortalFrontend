import { useEffect, useState } from "react";
import authService from "../../api/services/AuthService";
import { User } from "../../api/models/user";
import test_img from "../../assets/register_banner.jpg";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="w-[1000px] bg-main-light p-20 mt-5 rounded-xl shadow-md">
        <h1>Filtrowanie</h1>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
        </div>

        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
        </div>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
          <input
            type="text"
            className="flex-shrink flex-grow basis-1 shadow-md h-[60px] rounded-xl"
          />
        </div>

        <button className="w-[300px] h-[60px] shadow-md bg-main-third text-white font-bold text-xl rounded-xl mt-2">
          Filtruj
        </button>
      </section>
      <section className="flex gap-5 mx-5 mt-[5em]">
        <div className="p-5 rounded-xl h-[300px] flex-shrink flex-grow basis-1 bg-main-dark shadow-md">
          <h1 className="text-2xl font-bold font-kanit">Oferta pracy</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            officiis, laborum odit numquam id illum, sit distinctio nisi
            dolores, beatae esse maxime accusantium voluptatum quod odio fugiat
            quaerat nemo debitis.
          </p>
          <button className="w-[300px] bg-main-third h-[60px] rounded-xl text-white text-lg font-bold ml-[100px]">
            Przeglądaj ofertę
          </button>
        </div>

        <div className="p-5 rounded-xl h-[300px] flex-shrink flex-grow basis-1 bg-main-dark shadow-md">
          <h1 className="text-2xl font-bold font-kanit">Oferta pracy</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            officiis, laborum odit numquam id illum, sit distinctio nisi
            dolores, beatae esse maxime accusantium voluptatum quod odio fugiat
            quaerat nemo debitis.
          </p>
          <button className="w-[300px] bg-main-third h-[60px] rounded-xl text-white text-lg font-bold ml-[100px]">
            Przeglądaj ofertę
          </button>
        </div>

        <div className="p-5 rounded-xl h-[300px] flex-shrink flex-grow basis-1 bg-main-dark shadow-md">
          <h1 className="text-2xl font-bold font-kanit">Oferta pracy</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            officiis, laborum odit numquam id illum, sit distinctio nisi
            dolores, beatae esse maxime accusantium voluptatum quod odio fugiat
            quaerat nemo debitis.
          </p>
          <button className="w-[300px] bg-main-third h-[60px] rounded-xl text-white text-lg font-bold ml-[100px]">
            Przeglądaj ofertę
          </button>
        </div>

        <div className="p-5 rounded-xl h-[300px] flex-shrink flex-grow basis-1 bg-main-dark shadow-md">
          <h1 className="text-2xl font-bold font-kanit">Oferta pracy</h1>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
            officiis, laborum odit numquam id illum, sit distinctio nisi
            dolores, beatae esse maxime accusantium voluptatum quod odio fugiat
            quaerat nemo debitis.
          </p>
          <button className="w-[300px] bg-main-third h-[60px] rounded-xl text-white text-lg font-bold ml-[100px]">
            Przeglądaj ofertę
          </button>
        </div>
      </section>

      <section className="mt-10 max-w-[1200px]">
        <h1 className="text-white text-5xl font-bold font-kani mb-2">
          Z nami poznasz rynek pracy
        </h1>
        <img src={test_img} alt="banner" className="rounded-3xl shadow-md" />
      </section>

      <footer className="text-white w-full bg-main-third h-[100px] mt-20 text-center">
        Kacper piaskowy zp z.o.o
      </footer>
    </div>
  );
};

export default HomePage;

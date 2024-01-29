import React from "react";
import {
  faHouseLaptop,
  faLocationDot,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
type Props = {};

const ApplicationsPage = (props: Props) => {
  return (
    <>
      <section className="flex flex-col items-center">
        <h1 className="text-7xl text-main-third my-10 font-bold">
          Aplikowane oferty
        </h1>
        <div className="flex flex-col items-center w-full max-w-[1600px] bg-main-dark px-12 py-24 rounded-3xl">
          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center w-full">
            <div className="w-[200px] h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="esa"
                className="w-full h-full rounded-xl mt-4 xl:mt-0"
              />
            </div>

            <div className="flex flex-col ml-8 flex-grow">
              <h1 className="text-4xl font-bold h-3/4 text-main-third pt-4">
                Oferta pracy
              </h1>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Limanowa</span>
                <FontAwesomeIcon
                  icon={faHouseLaptop}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Zdalna</span>
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Pełen etat</span>
              </div>
            </div>

            <div className="flex flex-col justify-center mr-5 mb-4 xl:mb-0">
              <button className="w-[250px] bg-red-500 h-[60px] text-white rounded-xl font-bold text-2xl">
                Usuń aplikację
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Dodaj do ulubionych
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center mt-10 w-full">
            <div className="w-[200px] h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="esa"
                className="w-full h-full rounded-xl mt-4 xl:mt-0"
              />
            </div>

            <div className="flex flex-col ml-8 flex-grow">
              <h1 className="text-4xl font-bold h-3/4 text-main-third pt-4">
                Oferta pracy
              </h1>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Limanowa</span>
                <FontAwesomeIcon
                  icon={faHouseLaptop}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Zdalna</span>
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Pełen etat</span>
              </div>
            </div>

            <div className="flex flex-col justify-center mr-5 mb-4 xl:mb-0">
              <button className="w-[250px] bg-red-500 h-[60px] text-white rounded-xl font-bold text-2xl">
                Usuń aplikację
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Dodaj do ulubionych
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center mt-10 w-full">
            <div className="w-[200px] h-[200px]">
              <img
                src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
                alt="esa"
                className="w-full h-full rounded-xl mt-4 xl:mt-0"
              />
            </div>

            <div className="flex flex-col ml-8 flex-grow">
              <h1 className="text-4xl font-bold h-3/4 text-main-third pt-4">
                Oferta pracy
              </h1>
              <div className="flex items-center">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Limanowa</span>
                <FontAwesomeIcon
                  icon={faHouseLaptop}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Zdalna</span>
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="mr-1 ml-3 text-2xl text-main-third"
                />
                <span className="text-xl text-main-third">Pełen etat</span>
              </div>
            </div>

            <div className="flex flex-col justify-center mr-5 mb-4 xl:mb-0">
              <button className="w-[250px] bg-red-500 h-[60px] text-white rounded-xl font-bold text-2xl">
                Usuń aplikację
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Dodaj do ulubionych
              </button>
            </div>
          </article>
        </div>
      </section>

      <footer className="w-full bg-main-second h-[100px] mt-32 text-white flex justify-center flex-col px-8">
        <h2 className="text-xl">Kacper Piaskowy</h2>
        <h3>All rights reserved</h3>
      </footer>
    </>
  );
};

export default ApplicationsPage;

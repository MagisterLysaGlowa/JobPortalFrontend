import {
  faBriefcase,
  faHouseLaptop,
  faLocationDot,
  faNewspaper,
  faUnlock,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import authService from "../../api/services/AuthService";
import test_img from "../../assets/register_banner.jpg";
import CarouselHomePage from "../../components/CarouselCustom/CarouselHomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex items-center flex-col ">
        <div className="max-w-[1000px] h-[300px] md:h-[600px] mt-8">
          <CarouselHomePage />
        </div>

        <div className="w-full max-w-[1600px] gap-10 mt-8 flex flex-col 2xl:flex-row lg:px-8">
          <div className="w-full 2xl:w-1/4 bg-main-dark h-[400px] rounded-3xl shadow-md flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faUser}
              className="text-6xl text-main-third"
            />
            <h1 className="text-center font-bold text-4xl mt-4 text-main-third">
              Header lorem
            </h1>
            <p className="text-sm text-justify px-8 text-gray-900 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium aperiam accusantium maxime cupiditate nisi repellat?
              Facere laudantium ea excepturi aut totam qui.?
            </p>
            <button className="bg-main-third h-14 w-[250px] place-self-end mt-4 mr-8 text-white font-bold text-xl rounded-xl">
              Czytaj dalej
            </button>
          </div>

          <div className="w-full 2xl:w-1/4 bg-main-dark h-[400px] rounded-3xl shadow-md flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faUnlock}
              className="text-6xl text-main-third"
            />
            <h1 className="text-center font-bold text-4xl mt-4 text-main-third">
              Header lorem
            </h1>
            <p className="text-sm text-justify px-8 text-gray-900 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium aperiam accusantium maxime cupiditate nisi repellat?
              Facere laudantium ea excepturi aut totam qui.?
            </p>
            <button className="bg-main-third h-14 w-[250px] place-self-end mt-4 mr-8 text-white font-bold text-xl rounded-xl">
              Czytaj dalej
            </button>
          </div>

          <div className="w-full 2xl:w-1/4 bg-main-dark h-[400px] rounded-3xl shadow-md flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faBriefcase}
              className="text-6xl text-main-third"
            />
            <h1 className="text-center font-bold text-4xl mt-4 text-main-third">
              Header lorem
            </h1>
            <p className="text-sm text-justify px-8 text-gray-900 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium aperiam accusantium maxime cupiditate nisi repellat?
              Facere laudantium ea excepturi aut totam qui.?
            </p>
            <button className="bg-main-third h-14 w-[250px] place-self-end mt-4 mr-8 text-white font-bold text-xl rounded-xl">
              Czytaj dalej
            </button>
          </div>
          <h1>esa</h1>
          <h1>esa</h1>
          <div className="w-full 2xl:w-1/4 bg-main-dark h-[400px] rounded-3xl shadow-md flex flex-col justify-center">
            <FontAwesomeIcon
              icon={faWallet}
              className="text-6xl text-main-third"
            />
            <h1 className="text-center font-bold text-4xl mt-4 text-main-third">
              Header lorem
            </h1>
            <p className="text-sm text-justify px-8 text-gray-900 mt-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium aperiam accusantium maxime cupiditate nisi repellat?
              Facere laudantium ea excepturi aut totam qui.?
            </p>
            <button className="bg-main-third h-14 w-[250px] place-self-end mt-4 mr-8 text-white font-bold text-xl rounded-xl">
              Czytaj dalej
            </button>
          </div>
        </div>

        <div className="bg-main-dark w-full max-w-[1600px] mt-20 rounded-xl shadow-md px-20 pb-20">
          <h1 className="text-5xl font-bold my-8 text-main-second">
            Najnowsze ogłoszenia
          </h1>
          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center">
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
                Aplikuj
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Aplikuj
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center mt-10">
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
                Aplikuj
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Aplikuj
              </button>
            </div>
          </article>

          <article className="bg-white rounded-xl flex flex-col xl:flex-row items-center mt-10">
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
                Aplikuj
              </button>

              <button className="w-[250px] bg-green-500 h-[60px] text-white rounded-xl font-bold text-2xl mt-5">
                Aplikuj
              </button>
            </div>
          </article>
        </div>
      </div>

      <footer className="w-full bg-main-second h-[100px] mt-32 text-white flex justify-center flex-col px-8">
        <h2 className="text-xl">Kacper Piaskowy</h2>
        <h3>All rights reserved</h3>
      </footer>
    </>
  );
};

export default HomePage;

import {
  faBriefcase,
  faChevronLeft,
  faChevronRight,
  faGraduationCap,
  faHouseLaptop,
  faLocationCrosshairs,
  faLocationDot,
  faNewspaper,
  faPencil,
  faTrashCan,
  faUnlock,
  faUser,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import authService from "../../api/services/AuthService";
import test_img from "../../assets/register_banner.jpg";
import CarouselHomePage from "../../components/CarouselCustom/CarouselHomePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import jobOfertService from "../../api/services/JobOfertService";
import { JobOfert } from "../../api/models/jobOfert";
import { Company } from "../../api/models/company";
import { FilterFormData } from "../../../types";
import { Category } from "../../api/models/category";
import { Link } from "react-router-dom";
import { User } from "../../api/models/user";
import userService from "../../api/services/UserService";
import { faHeart } from "@fortawesome/free-regular-svg-icons/faHeart";
import { faHeart as solidFaHeart } from "@fortawesome/free-solid-svg-icons/faHeart";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { button } from "@material-tailwind/react";

interface JobOfertForDisplay {
  jobOfert: JobOfert;
  company: Company;
  favourite: boolean;
}

const HomePage: React.FC = () => {
  const [filterFormData, setFilterFormData] = useState<FilterFormData>({
    positionName: "",
    positionLevel: "",
    employmentContract: "",
    employmentType: "",
    jobType: "",
    salaryMinimum: 0,
    salaryMaximum: 0,
    companyName: "",
    companyLocation: "",
    categoryName: "",
  });
  const [favouriteHidden, setFavouriteHidden] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    userId: 0,
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    access: "",
    avatarSource: "",
    birthDate: "",
    domicile: "",
  });
  const [allPageNumbers, setAllPageNumbers] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [jobOferts, setJobOferts] = useState<JobOfertForDisplay[]>([]);
  const [jobOfertsForDisplay, setJobOfertsForDisplay] = useState<
    JobOfertForDisplay[]
  >([]);
  const [categoriesDb, setCategoriesDb] = useState<Category[]>([]);

  useEffect(() => {
    setup();
    paginationReload(filterFormData);
  }, []);

  const checkUser = async () => {
    const user: User = await authService.Get();
    return user;
  };

  const setup = async () => {
    const user: User = await checkUser();
    setUser(user);
    const response: JobOfert[] = await jobOfertService.GetJobOfertsFilter(
      filterFormData,
      1
    );
    reloadPage(response, user);
    setCategoriesDb(await jobOfertService.GetAllCategories());
  };

  const reloadPage = async (jobOfertsDb: JobOfert[], userTmp: User) => {
    setJobOfertsForDisplay([]);
    let user = userTmp;
    if (user.userId == undefined) {
      user = {
        userId: 0,
        name: "",
        surname: "",
        email: "",
        phoneNumber: "",
        access: "",
        avatarSource: "",
        birthDate: "",
        domicile: "",
      };
      setFavouriteHidden(true);
    }

    let favouritesDb: JobOfert[] = [];
    if (user.userId != 0) {
      favouritesDb = await userService.GetUserJobOfertFavourite(user.userId);
    }
    console.log(favouritesDb);
    jobOfertsDb.forEach(async (item) => {
      let companyDb: Company = await jobOfertService.GetCompanyForJobOfertId(
        item.id
      );
      let isFavourite: boolean = false;
      if (user.userId != 0) {
        isFavourite = favouritesDb.find((f) => f.id === item.id) ? true : false;
      }

      let fullOfert: JobOfertForDisplay = {
        jobOfert: item,
        company: companyDb,
        favourite: isFavourite,
      };

      setJobOfertsForDisplay((prevJobOferts) => [...prevJobOferts, fullOfert]);
    });
  };

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };

  const handleFilterSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };

  const handleFilterFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: User = await checkUser();
    const response: JobOfert[] = await jobOfertService.GetJobOfertsFilter(
      filterFormData,
      currentPageNumber
    );
    paginationReload(filterFormData);
    await reloadPage(response, user);
    console.log(jobOfertsForDisplay);
  };

  const paginationReload = async (filterFormData: FilterFormData) => {
    const responseCount: number =
      await jobOfertService.GetFilteredJobOfertsCount(filterFormData);

    setAllPageNumbers(
      Math.trunc(responseCount / 10) + (responseCount % 10 != 0 ? 1 : 0)
    );
  };

  const handlePaginationClick = async (pageNumber: number) => {
    setCurrentPageNumber(pageNumber + 1);
    console.log(currentPageNumber);
    const user: User = await checkUser();
    const response: JobOfert[] = await jobOfertService.GetJobOfertsFilter(
      filterFormData,
      pageNumber + 1
    );
    paginationReload(filterFormData);
    await reloadPage(response, user);
  };

  const handleFavouriteClick = async (
    jobOfertId: number,
    isFavourite: boolean
  ) => {
    const user: User = await authService.Get();
    if (!isFavourite) {
      await userService.InsertUserJobOfertFavourite(jobOfertId, user.userId);
    } else {
      await userService.DeleteUserFavourite(jobOfertId, user.userId);
    }
    const response: JobOfert[] = await jobOfertService.GetJobOfertsFilter(
      filterFormData,
      currentPageNumber
    );
    paginationReload(filterFormData);
    await reloadPage(response, user);
  };

  const handleJobOfertDeleteClick = async (jobOfertId: number) => {
    await jobOfertService.DeleteBenefits(jobOfertId);
    await jobOfertService.DeleteRequirements(jobOfertId);
    await jobOfertService.DeleteDuties(jobOfertId);
    await jobOfertService.DeleteCategories(jobOfertId);
    await jobOfertService.DeleteJobOfert(jobOfertId);
    const response: JobOfert[] = await jobOfertService.GetJobOfertsFilter(
      filterFormData,
      currentPageNumber
    );
    paginationReload(filterFormData);
    await reloadPage(response, user);
  };

  return (
    <>
      <div className="flex items-center flex-col ">
        <div className="max-w-[1600px] h-[300px] lg:h-[800px] mt-8">
          <CarouselHomePage />
        </div>

        <div className="max-w-[1300px] grid grid-cols-5 mt-20 gap-8">
          <aside className="bg-white rounded-md row-span-4 hidden lg:block"></aside>
          <div className="w-full lg:col-span-4 col-span-5 p-2 lg:p-0">
            <h1 className="text-2xl font-bold mb-2">Filtruj</h1>
            <form
              onSubmit={handleFilterFormSubmit}
              className="grid grid-cols-3 gap-2"
            >
              <input
                type="text"
                placeholder="stanowisko"
                name="positionName"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3"
                onChange={handleFilterInputChange}
              />

              <select
                name="positionLevel"
                onChange={handleFilterSelectChange}
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                defaultValue={1}
              >
                <option disabled value={1}>
                  Poziom stanowiska
                </option>
                <option>praktykant/stażysta</option>
                <option>asystent</option>
                <option>junior</option>
                <option>mid</option>
                <option>senior</option>
                <option>ekspert</option>
                <option>kierownik/koordynator</option>
                <option>menedżer</option>
                <option>dyrektor</option>
                <option>prezes</option>
              </select>

              <input
                type="text"
                placeholder="lokalizacja firmy"
                name="companyLocation"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                onChange={handleFilterInputChange}
              />

              <input
                type="text"
                placeholder="nazwa firmy"
                name="companyName"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                onChange={handleFilterInputChange}
              />

              <input
                type="text"
                placeholder="płaca minimalna"
                name="salaryMinimum"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                onChange={handleFilterInputChange}
              />
              <input
                type="text"
                placeholder="płaca maksymalna"
                name="salaryMaximum"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                onChange={handleFilterInputChange}
              />

              <select
                name="employmentContract"
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                onChange={handleFilterSelectChange}
                defaultValue={1}
              >
                <option disabled value={1}>
                  Rodzaj umowy
                </option>
                <option>Umowa o pracę na czas nieokreślony</option>
                <option>Umowa o pracę na czas określony</option>
                <option>Umowa o pracę na czas częściowy</option>
                <option>Umowa o pracę tymczasową</option>
                <option>B2B</option>
              </select>

              <select
                name="employmentType"
                onChange={handleFilterSelectChange}
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                defaultValue={1}
              >
                <option disabled value={1}>
                  Wymiar zatrudnienia
                </option>
                <option>Pełny etat</option>
                <option>Czas częściowy</option>
                <option>Zatrudnienie na okresie próbnym</option>
                <option>Praca sezonowa</option>
                <option>Zatrudnienie tymczasowe</option>
              </select>

              <select
                name="jobType"
                onChange={handleFilterSelectChange}
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                defaultValue={1}
              >
                <option disabled value={1}>
                  Rodzaj pracy
                </option>
                <option>zdalna</option>
                <option>stacjonarna</option>
                <option>hybrydowa</option>
              </select>

              <select
                name="categoryName"
                onChange={handleFilterSelectChange}
                className="h-12 outline-none rounded-md shadow-sm pl-2 bg-white col-span-3 lg:col-span-1"
                defaultValue={1}
              >
                <option disabled value={1}>
                  Kategoria
                </option>
                {categoriesDb.map((item, index) => {
                  return <option key={index}>{item.categoryName}</option>;
                })}
              </select>
              <button className="col-span-3 bg-blue-300 h-14 rounded-md text-xl font-bold text-white shadow-md">
                Filtruj
              </button>
            </form>
          </div>
          <div className="col-span-5 lg:col-span-3">
            {jobOfertsForDisplay.map((item, index) => {
              return (
                <div key={index}>
                  <Link
                    to={"/ofertPage"}
                    state={{ jobOfertId: item.jobOfert.id }}
                    className="bg-white rounded-xl grid mt-6 px-8 py-6"
                  >
                    <div className="flex items-center">
                      <h1 className="font-bold text-3xl text-blue-600 flex-grow">
                        {item.jobOfert.positionName}
                      </h1>
                    </div>
                    <div className="flex w-full flex-col lg:flex-row gap-5 mt-4">
                      <div className="bg-[#f1f5f9] py-1 px-3 min-w-[100px] rounded-xl flex items-center">
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="text-lg text-green-300"
                        />
                        <h3 className="ml-2 text-green-300">
                          {item.jobOfert.employmentType}
                        </h3>
                      </div>

                      <div className="bg-[#f1f5f9] py-1 px-3 min-w-[100px] rounded-xl flex items-center">
                        <FontAwesomeIcon
                          icon={faNewspaper}
                          className="text-lg text-red-300"
                        />
                        <h3 className="ml-2 text-red-300">
                          {item.jobOfert.employmentContract}
                        </h3>
                      </div>

                      <div className="bg-[#f1f5f9] py-1 px-3 min-w-[100px] rounded-xl flex items-center">
                        <FontAwesomeIcon
                          icon={faLocationCrosshairs}
                          className="text-lg text-purple-300"
                        />
                        <h3 className="ml-2 text-purple-300">
                          {item.jobOfert.jobType}
                        </h3>
                      </div>
                    </div>
                    <h2 className="text-xl font-bold mt-2">
                      {item.company.companyName}
                    </h2>

                    <div className="mt-2 flex items-center">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="text-xl text-gray-600"
                      />
                      <h2 className="text-lg text-gray-600 ml-4">
                        {item.company.companyLocation}
                      </h2>
                    </div>

                    <div className="mt-1 flex items-center">
                      <FontAwesomeIcon
                        icon={faGraduationCap}
                        className="text-lg text-gray-600"
                      />
                      <h2 className="text-lg text-gray-600 ml-2">
                        {item.jobOfert.positionLevel}
                      </h2>
                    </div>
                  </Link>
                  <div className="flex justify-end gap-3">
                    <button
                      className="bg-blue-300 px-4 py-3 rounded-xl"
                      hidden={favouriteHidden}
                      onClick={() => {
                        handleFavouriteClick(item.jobOfert.id, item.favourite);
                      }}
                    >
                      {item.favourite ? (
                        <span className="flex items-center text-white">
                          <FontAwesomeIcon
                            icon={solidFaHeart}
                            className="text-3xl"
                          />
                          <span className="ml-2">Usuń z ulubionych</span>
                        </span>
                      ) : (
                        <span className="flex items-center text-white">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="text-3xl "
                          />
                          <span className="ml-2">Dodaj do ulubionych</span>
                        </span>
                      )}
                    </button>
                    <Link
                      to={"/jobOfertForm"}
                      state={{ jobOfertId: item.jobOfert.id }}
                      className={`bg-blue-300 px-4 py-3 rounded-xl items-center ${
                        user.access == "admin" ? "flex" : "hidden"
                      }`}
                    >
                      <FontAwesomeIcon icon={faPencil} className="text-white" />
                      <h2 className="text-white ml-2">Edytuj</h2>
                    </Link>

                    <button
                      className={`bg-blue-300 px-4 py-3 rounded-xl items-center ${
                        user.access == "admin" ? "flex" : "hidden"
                      }`}
                      onClick={() => {
                        handleJobOfertDeleteClick(item.jobOfert.id);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-white"
                      />
                      <h2 className="text-white ml-2">Usuń</h2>
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-center gap-1">
              <button
                onClick={async () => {
                  if (!(currentPageNumber - 1 < 1)) {
                    setCurrentPageNumber(currentPageNumber - 1);
                    console.log(currentPageNumber);
                    const user: User = await checkUser();
                    const response: JobOfert[] =
                      await jobOfertService.GetJobOfertsFilter(
                        filterFormData,
                        currentPageNumber - 1
                      );
                    paginationReload(filterFormData);
                    await reloadPage(response, user);
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faChevronLeft}
                  className="mr-1 text-sm"
                />
              </button>
              <div className="mx-2 flex gap-2">
                {[...Array(allPageNumbers)].map((x, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handlePaginationClick(i);
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={async () => {
                  if (!(currentPageNumber + 1 > allPageNumbers)) {
                    setCurrentPageNumber(currentPageNumber + 1);
                    const user: User = await checkUser();
                    const response: JobOfert[] =
                      await jobOfertService.GetJobOfertsFilter(
                        filterFormData,
                        currentPageNumber + 1
                      );
                    console.log(currentPageNumber);

                    paginationReload(filterFormData);
                    await reloadPage(response, user);
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="ml-1 text-sm"
                />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-md hidden lg:block"></div>
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

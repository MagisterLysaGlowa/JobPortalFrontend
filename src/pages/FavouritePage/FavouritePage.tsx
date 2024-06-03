import React, { useEffect, useState } from "react";
import { User } from "../../api/models/user";
import authService from "../../api/services/AuthService";
import { useNavigate } from "react-router";
import { JobOfert } from "../../api/models/jobOfert";
import userService from "../../api/services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBriefcase,
  faGraduationCap,
  faHeart,
  faLocationCrosshairs,
  faLocationDot,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Company } from "../../api/models/company";
import jobOfertService from "../../api/services/JobOfertService";

type Props = {};

interface JobOfertForDisplay {
  jobOfert: JobOfert;
  company: Company;
}

const FavouritePage = (props: Props) => {
  const navigate = useNavigate();
  const [jobOfertsForDisplay, setJobOfertsForDisplay] = useState<
    JobOfertForDisplay[]
  >([]);

  useEffect(() => {
    OnAppearing();
  }, []);
  const OnAppearing = async () => {
    const user: User = await authService.Get();
    if (user.userId == undefined) {
      navigate("/login");
    } else {
      const favouritesResponse: JobOfert[] =
        await userService.GetUserJobOfertFavourite(user.userId);
      reloadPage(favouritesResponse);
    }
  };

  const reloadPage = async (applicationsDb: JobOfert[]) => {
    setJobOfertsForDisplay([]);
    applicationsDb.forEach(async (item) => {
      let companyDb: Company = await jobOfertService.GetCompanyForJobOfertId(
        item.id
      );
      let fullOfert: JobOfertForDisplay = {
        jobOfert: item,
        company: companyDb,
      };

      setJobOfertsForDisplay((prevJobOferts) => [...prevJobOferts, fullOfert]);
    });
  };

  return (
    <section className="w-full flex justify-center">
      <div className="max-w-[1300px] mt-20 w-full">
        <div className="col-span-3 p-2">
          {jobOfertsForDisplay.map((item, index) => {
            return (
              <Link
                to={"/ofertPage"}
                state={{ jobOfertId: item.jobOfert.id }}
                className="bg-white rounded-xl grid my-6 px-8 py-6"
                key={index}
              >
                <div className="flex items-center">
                  <h1 className="font-bold text-3xl text-blue-600">
                    {item.jobOfert.positionName}
                  </h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-5 mt-4">
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
                  {item.company.companyName} {item.company.companyAddress}
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FavouritePage;

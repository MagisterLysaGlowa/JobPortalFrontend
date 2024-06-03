import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { JobOfert } from "../../api/models/jobOfert";
import jobOfertService from "../../api/services/JobOfertService";
import { Company } from "../../api/models/company";
import { Category } from "../../api/models/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons/faNewspaper";
import { faClock } from "@fortawesome/free-solid-svg-icons/faClock";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { faChartSimple } from "@fortawesome/free-solid-svg-icons/faChartSimple";
import { faComputer } from "@fortawesome/free-solid-svg-icons/faComputer";
import { Benefit } from "../../api/models/benefit";
import { Duty } from "../../api/models/duty";
import { Requirement } from "../../api/models/requirement";
import { faCircleCheck } from "@fortawesome/free-regular-svg-icons/faCircleCheck";
import { faWallet } from "@fortawesome/free-solid-svg-icons/faWallet";
import { faHourglassHalf } from "@fortawesome/free-regular-svg-icons/faHourglassHalf";
import { Link } from "react-router-dom";

const OfertPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jobOfertId } = location.state;
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [duties, setDuties] = useState<Duty[]>([]);
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [jobOfert, setJobOfert] = useState<JobOfert>({
    id: 0,
    recruitmentEndDate: "",
    positionName: "",
    positionLevel: "",
    employmentContract: "",
    employmentType: "",
    jobType: "",
    salaryMinimum: 0,
    salaryMaximum: 0,
    workDays: "",
    workStartHour: "",
    workEndHour: "",
    createdAt: "",
  });
  const [company, setCompany] = useState<Company>({
    companyId: 0,
    companyName: "",
    companyAddress: "",
    companyLocation: "",
    companyDescription: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
    OnAppearing();
  }, []);

  const OnAppearing = async () => {
    const jobOfertResponse: JobOfert = await jobOfertService.GetJobOfert(
      jobOfertId
    );
    const companyResponse: Company =
      await jobOfertService.GetCompanyForJobOfertId(jobOfertId);

    const categoriesResponse: Category[] =
      await jobOfertService.GetCategoriesForJobOfert(jobOfertId);

    const benefitResponse: Benefit[] = await jobOfertService.GetBenefits(
      jobOfertId
    );
    const dutyResponse: Duty[] = await jobOfertService.GetDuties(jobOfertId);
    const requirementResponse: Requirement[] =
      await jobOfertService.GetRequirements(jobOfertId);

    setJobOfert(jobOfertResponse);
    setCompany(companyResponse);
    setCategories(categoriesResponse);
    setBenefits(benefitResponse);
    setDuties(dutyResponse);
    setRequirements(requirementResponse);
  };

  return (
    <div className="flex items-center flex-col ">
      <div className="max-w-[1400px] w-full grid grid-cols-5 mt-20 gap-8">
        <div className="col-span-5 lg:col-span-3 ">
          <section className="bg-white w-full rounded-lg">
            <header className="flex flex-col px-8 py-4">
              <h1 className="font-bold text-blue-600 text-3xl">
                {jobOfert.positionName}
              </h1>
              <i className="text-gray-500 text-lg">{company.companyName}</i>
            </header>

            <hr />

            <div className="grid col-spaj-5 lg:grid-cols-2 grid-rows-3 px-8 py-10 gap-5">
              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faLocationDot} />
                </div>
                <h2 className="ml-2 text-indigo-800">
                  {company.companyAddress}
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faCalendarDays} />
                </div>
                <h2 className="ml-2">
                  <div className="flex flex-col">
                    <span className="text-indigo-800">Oferta ważna do</span>
                    <i className="text-gray-600">
                      {jobOfert.recruitmentEndDate.substring(0, 10)}
                    </i>
                  </div>
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faNewspaper} />
                </div>
                <h2 className="ml-2 text-indigo-800">
                  {jobOfert.employmentContract}
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faClock} />
                </div>
                <h2 className="ml-2 text-indigo-800">
                  {jobOfert.employmentType}
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faChartSimple} />
                </div>
                <h2 className="ml-2 text-indigo-800">
                  {jobOfert.positionLevel}
                </h2>
              </div>

              <div className="flex items-center">
                <div className="flex items-center justify-center w-[60px] h-[60px] rounded-lg bg-blue-50 text-2xl text-blue-600">
                  <FontAwesomeIcon icon={faComputer} />
                </div>
                <h2 className="ml-2 text-indigo-800">{jobOfert.jobType}</h2>
              </div>
            </div>
          </section>

          <section className="bg-white w-full rounded-xl mt-8 px-8 py-10">
            <h1 className="text-indigo-600 font-bold text-3xl">Wymagania</h1>
            <ul className="mt-2">
              {requirements.map((item, index) => {
                return (
                  <li key={index} className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-blue-600 text-2xl"
                    />
                    <span className="ml-2 text-gray-800 text-xl">
                      {item.requirementName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="bg-white w-full rounded-xl mt-8 px-8 py-10">
            <h1 className="text-indigo-600 font-bold text-3xl">
              Zakres obowiązków
            </h1>
            <ul className="mt-2">
              {duties.map((item, index) => {
                return (
                  <li key={index} className="flex items-center mt-1">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-blue-600 text-2xl"
                    />
                    <span className="ml-2 text-gray-800 text-xl">
                      {item.dutyName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="bg-white w-full rounded-xl mt-8 px-8 py-10">
            <h1 className="text-indigo-600 font-bold text-3xl">Benefity</h1>
            <ul className="mt-2">
              {benefits.map((item, index) => {
                return (
                  <li key={index} className="flex items-center my-1">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      className="text-blue-600 text-2xl"
                    />
                    <span className="ml-2 text-gray-800 text-xl">
                      {item.benefitName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="bg-white w-full rounded-xl mt-8 px-8 py-10">
            <h1 className="text-indigo-600 font-bold text-3xl">
              {company.companyName}
            </h1>
            <p className="mt-2 text-lg text-gray-700">
              {company.companyDescription}
            </p>
          </section>
        </div>
        <div className="col-span-5 mb-5 lg:mb-0 lg:col-span-2">
          <section className="bg-white rounded-xl w-full px-8 py-10">
            <div className="flex justify-center">
              <Link
                className="bg-blue-500 min-w-[300px] h-[60px] mb-10 rounded-full text-white font-bold text-2xl flex items-center justify-center"
                to={"/currentApplication"}
                state={{
                  jobOfertId: jobOfert.id,
                  positionName: jobOfert.positionName,
                }}
              >
                Aplikuj
              </Link>
            </div>
            <hr />

            <div className="flex flex-col mt-2">
              <h1 className="text-indigo-800 font-bold text-3xl mb-5 mt-2">
                Podstawowe informacje
              </h1>
              <div className="flex items-center">
                <div className="bg-indigo-100 w-[50px] h-[50px] flex justify-center items-center rounded-xl">
                  <FontAwesomeIcon
                    icon={faWallet}
                    className="text-2xl text-indigo-800"
                  />
                </div>
                <p className="ml-4 text-indigo-500 font-semi-bold text-xl">
                  {jobOfert.salaryMinimum}zł - {jobOfert.salaryMaximum}zł
                </p>
              </div>

              <div className="flex items-center mt-4">
                <div className="bg-indigo-100 w-[50px] h-[50px] flex justify-center items-center rounded-xl">
                  <FontAwesomeIcon
                    icon={faHourglassHalf}
                    className="text-2xl text-indigo-800"
                  />
                </div>
                <p className="ml-4 text-indigo-500 font-semi-bold text-xl">
                  {jobOfert.workStartHour} - {jobOfert.workEndHour}
                </p>
              </div>

              <div className="flex items-center mt-4">
                <div className="bg-indigo-100 w-[50px] h-[50px] flex justify-center items-center rounded-xl">
                  <FontAwesomeIcon
                    icon={faCalendarXmark}
                    className="text-2xl text-indigo-800"
                  />
                </div>
                <p className="ml-4 text-indigo-500 font-semi-bold text-xl">
                  {jobOfert.workDays}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OfertPage;

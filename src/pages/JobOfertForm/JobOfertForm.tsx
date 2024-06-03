import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CompanyFormData, JobOfertFormData } from "../../../types";
import jobOfertService from "../../api/services/JobOfertService";
import { Category } from "../../api/models/category";
import { Company } from "../../api/models/company";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router";

const JobOfertForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [jobOfertId, setJobOfertId] = useState<number>(0);
  useEffect(() => {
    const startUp = async () => {
      setCategoriesDb(await jobOfertService.GetAllCategories());
      setCompaniesDb(await jobOfertService.GetAllCompanies());
    };

    const editModeSetup = async () => {
      if (location.state != null) {
        setEditMode(true);
        const { jobOfertId } = location.state;
        setJobOfertId(jobOfertId);
        setJobOfertFormData(await jobOfertService.GetJobOfert(jobOfertId));
        const benefits = await jobOfertService.GetBenefits(jobOfertId);
        benefits.forEach((item) => {
          setBenefits((prevBenefits) => [...prevBenefits, item.benefitName]);
        });
        const requirements = await jobOfertService.GetRequirements(jobOfertId);
        requirements.forEach((item) => {
          setRequirements((prevRequirements) => [
            ...prevRequirements,
            item.requirementName,
          ]);
        });
        const duties = await jobOfertService.GetDuties(jobOfertId);
        duties.forEach((item) => {
          setDuties((prevDuties) => [...prevDuties, item.dutyName]);
        });
        const categories = await jobOfertService.GetCategoriesForJobOfert(
          jobOfertId
        );
        categories.forEach((item) => {
          setCategories((prevCategories) => [
            ...prevCategories,
            item.categoryName,
          ]);
        });
      }
    };
    startUp();
    editModeSetup();
  }, []);

  const [editMode, setEditMode] = useState<boolean>();

  const [jobOfertFormData, setJobOfertFormData] = useState<JobOfertFormData>({
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
  });

  const [requirement, setRequirement] = useState<string>("");
  const [requirements, setRequirements] = useState<string[]>([]);

  const [duty, setDuty] = useState<string>("");
  const [duties, setDuties] = useState<string[]>([]);

  const [benefit, setBenefit] = useState<string>("");
  const [benefits, setBenefits] = useState<string[]>([]);

  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoriesDb, setCategoriesDb] = useState<Category[]>([]);
  const [categoryInputVisibility, setCategoryInputVisibility] =
    useState<boolean>(true);

  const [company, setCompany] = useState<CompanyFormData>({
    companyName: "",
    companyAddress: "",
    companyLocation: "",
    companyDescription: "",
  });
  const [companiesDb, setCompaniesDb] = useState<Company[]>([]);
  const [companyId, setCompanyId] = useState<number>(-1);
  const [companyInputVisibility, setCompanyInputVisibility] =
    useState<boolean>(true);

  //* JOB OFERT FORM DATA INPUT AND FORM HANDLE
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobOfertFormData({
      ...jobOfertFormData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setJobOfertFormData({
      ...jobOfertFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(jobOfertFormData);
    try {
      jobOfertService.InsertJobOfert(
        jobOfertFormData,
        requirements,
        benefits,
        duties,
        categories,
        companyInputVisibility ? companyId : company
      );
    } catch {
      return;
    }
    navigate("/");
  };

  //! HANDLE INPUT CHANGES FOR REQUIREMENT , DUTY , BENEFIT
  const handleInputChangeSecond = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "category":
        setCategory(value);
        break;
      case "benefit":
        setBenefit(value);
        break;
      case "requirement":
        setRequirement(value);
        break;
      case "duty":
        setDuty(value);
        break;
    }
  };

  const handleRequirementButtonClick = () => {
    if (!requirements.includes(requirement) && requirement != "") {
      setRequirements((prevRequirements) => [...prevRequirements, requirement]);
    }
    setRequirement("");
  };

  const handleBenefitButtonClick = () => {
    if (!benefits.includes(benefit) && benefit != "") {
      setBenefits((prevBenefits) => [...prevBenefits, benefit]);
    }
    setBenefit("");
  };

  const handleDutyButtonClick = () => {
    if (!duties.includes(duty) && duty != "") {
      setDuties((prevDuties) => [...prevDuties, duty]);
    }
    setDuty("");
  };
  const handleCategoryButtonClick = () => {
    if (!categories.includes(category) && category != "") {
      setCategories((prevCategories) => [...prevCategories, category]);
    }
    setCategory("");
  };

  const handleCategorySelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Inna") {
      setCategoryInputVisibility(false);
    } else {
      setCategoryInputVisibility(true);
      setCategory(e.target.value);
    }
  };

  const handleCompanySelectChanged = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value == "Inna") {
      setCompanyInputVisibility(false);
    } else {
      setCompanyInputVisibility(true);
      setCompanyId(Number(e.target.value));
    }
  };

  const handleCompanyInputChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value,
    });
  };

  const handleCompanyTextAreaChanged = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCompany({
      ...company,
      [name]: value,
    });
  };

  const deleteDuty = (duty: string) => {
    setDuties((prevDuties) => {
      return prevDuties.filter((item) => item !== duty);
    });
  };

  const deleteBenefit = (benefit: string) => {
    setBenefits((prevBenefits) => {
      return prevBenefits.filter((item) => item !== benefit);
    });
  };

  const deleteRequirement = (requirement: string) => {
    setRequirements((prevRequirements) => {
      return prevRequirements.filter((item) => item !== requirement);
    });
  };

  const deleteCategory = (category: string) => {
    setCategories((prevCategories) => {
      return prevCategories.filter((item) => item !== category);
    });
  };

  const updateJobOfertClick = async () => {
    await jobOfertService.UpdateJobOfert(
      jobOfertId,
      jobOfertFormData,
      benefits,
      requirements,
      categories,
      duties
    );
  };

  return (
    <section className="flex items-center flex-col">
      <h1 className="text-5xl font-bold uppercase text-gray-800 my-10 text-center">
        Dodaj nową ofertę
      </h1>
      <form
        onSubmit={handleFormSubmit}
        className="grid grid-cols-2 gap-x-5 gap-y-2 p-2 lg:p-0"
      >
        {/* COMPANY SELECT */}
        <select
          onChange={handleCompanySelectChanged}
          className="col-span-2 w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
          defaultValue={1}
          hidden={editMode}
        >
          <option disabled value={1}>
            --- Wybierz firmę ---
          </option>
          {companiesDb.map((item, index) => {
            return (
              <option key={index} value={item.companyId}>
                {item.companyName}
              </option>
            );
          })}
          <option>Inna</option>
        </select>
        <article
          className={`${
            companyInputVisibility ? "hidden" : "grid"
          } grid-cols-2 col-span-2 gap-5`}
        >
          <div className="col-span-2">
            <h2 className="text-lg uppercase text-gray-800">Nazwa firmy</h2>
            <input
              type="text"
              name="companyName"
              className="w-full h-12 rounded-md shadow-sm pl-2 text-lg outline-none"
              placeholder="Nazwa firmy"
              onChange={handleCompanyInputChanged}
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-lg uppercase text-gray-800">Adres firmy</h2>
            <input
              type="text"
              name="companyAddress"
              className="w-full h-12 rounded-md shadow-sm pl-2 text-lg outline-none"
              placeholder="Adres firmy"
              onChange={handleCompanyInputChanged}
            />
          </div>

          <div className="col-span-2 lg:col-span-1">
            <h2 className="text-lg uppercase text-gray-800">
              Lokalizacja firmy
            </h2>
            <input
              type="text"
              name="companyLocation"
              className="w-full h-12 rounded-md shadow-sm pl-2 text-lg outline-none"
              placeholder="Lokalizacja firmy"
              onChange={handleCompanyInputChanged}
            />
          </div>

          <div className="col-span-2">
            <h2 className="text-lg uppercase text-gray-800">Opis firmy</h2>
            <textarea
              name="companyDescription"
              className="w-full h-48 rounded-md shadow-sm pl-2 text-md outline-none py-1 resize-none"
              onChange={handleCompanyTextAreaChanged}
            />
          </div>
        </article>

        {/* POSITON NAME */}
        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Nazwa stanowiska</h2>
          <input
            type="text"
            name="positionName"
            placeholder="Nazwa stanowiska"
            value={jobOfertFormData.positionName}
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            required
          />
        </div>

        {/* RECRUITMENT END DATE */}
        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">
            Data zakończenia rekrutacji
          </h2>
          <input
            type="date"
            name="recruitmentEndDate"
            value={jobOfertFormData.recruitmentEndDate.substring(0, 10)}
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            required
          />
        </div>

        {/* POSITION LEVEL*/}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Poziom stanowiska</h2>
          {editMode ? (
            <select
              name="positionLevel"
              onChange={handleSelectChange}
              value={jobOfertFormData.positionLevel}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              required
            >
              <option disabled>Poziom stanowiska</option>
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
          ) : (
            <select
              name="positionLevel"
              onChange={handleSelectChange}
              defaultValue={1}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              required
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
          )}
        </div>

        {/* EMPLOYMENT CONTRACT */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Rodzaj umowy</h2>
          {editMode ? (
            <select
              name="employmentContract"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              value={jobOfertFormData.employmentContract}
              required
            >
              <option disabled>Rodzaj umowy</option>
              <option>Umowa o pracę na czas nieokreślony</option>
              <option>Umowa o pracę na czas określony</option>
              <option>Umowa o pracę na czas częściowy</option>
              <option>Umowa o pracę tymczasową</option>
              <option>B2B</option>
            </select>
          ) : (
            <select
              name="employmentContract"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              defaultValue={1}
              required
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
          )}
        </div>

        {/* EMPLOYMENT TYPE */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">
            Rodzaj zatrudnienia
          </h2>
          {editMode ? (
            <select
              name="employmentType"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              value={jobOfertFormData.employmentType}
              required
            >
              <option disabled>Wymiar zatrudnienia</option>
              <option>Pełny etat</option>
              <option>Czas częściowy</option>
              <option>Zatrudnienie na okresie próbnym</option>
              <option>Praca sezonowa</option>
              <option>Zatrudnienie tymczasowe</option>
            </select>
          ) : (
            <select
              name="employmentType"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              defaultValue={1}
              required
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
          )}
        </div>

        {/* JOB TYPE */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Rodzaj pracy</h2>
          <h1>{editMode}</h1>
          {editMode ? (
            <select
              name="jobType"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              value={jobOfertFormData.jobType}
              required
            >
              <option disabled>Rodzaj pracy</option>
              <option>Zdalna</option>
              <option>Stacjonarna</option>
              <option>Hybrydowa</option>
            </select>
          ) : (
            <select
              name="jobType"
              onChange={handleSelectChange}
              className="w-full h-12 shadow-sm rounded-md text-lg outline-none px-2 bg-white"
              defaultValue={1}
              required
            >
              <option disabled value={1}>
                Rodzaj pracy
              </option>
              <option>Zdalna</option>
              <option>Stacjonarna</option>
              <option>Hybrydowa</option>
            </select>
          )}
        </div>

        {/* SALARY MINIMUM */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Pensja minimalna</h2>
          <input
            type="number"
            name="salaryMinimum"
            placeholder="Pensja minimalna"
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            value={jobOfertFormData.salaryMinimum}
            required
          />
        </div>

        {/*  SALARY MAXIMUM */}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Pensja maksymalna</h2>
          <input
            type="number"
            name="salaryMaximum"
            placeholder="Pensja maksymalna"
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            value={jobOfertFormData.salaryMaximum}
            required
          />
        </div>

        {/* WORK DAYS*/}
        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Dni pracy</h2>
          <input
            type="text"
            name="workDays"
            placeholder="Dni pracy"
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            value={jobOfertFormData.workDays}
            required
          />
        </div>

        {/* WORK START HOUR*/}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Godziny pracy od</h2>
          <input
            type="time"
            name="workStartHour"
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            value={jobOfertFormData.workStartHour}
            required
          />
        </div>

        {/* WORK END HOUR*/}
        <div className="col-span-2 lg:col-span-1">
          <h2 className="text-lg uppercase text-gray-800">Godziny pracy do</h2>
          <input
            type="time"
            name="workEndHour"
            onChange={handleInputChange}
            className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2"
            value={jobOfertFormData.workEndHour}
            required
          />
        </div>

        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Dodaj kategorię</h2>
          <div className="grid grid-cols-2 gap-x-5">
            <select
              onChange={handleCategorySelectChanged}
              defaultValue={1}
              className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2 col-span-2 lg:col-span-1"
            >
              {categoriesDb.map((item, index) => {
                return <option key={index}>{item.categoryName}</option>;
              })}
              <option disabled value={1}>
                --- Wybierz kategorię ---
              </option>
              <option>Inna</option>
            </select>

            <button
              type="button"
              onClick={handleCategoryButtonClick}
              className="h-12 mt-2 lg:mt-0 bg-blue-700 rounded-md text-white font-bold text-xl col-span-2 lg:col-span-1"
            >
              Dodaj kategorię
            </button>

            <input
              type="text"
              name="category"
              onChange={handleInputChangeSecond}
              hidden={categoryInputVisibility}
              placeholder="Nazwa nowej kategorii"
              className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2 mt-2  col-span-2 lg:col-span-1"
            />
          </div>

          <div className="mt-5">
            {categories.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-xl text-blue-700"
                  />
                  <h1 className="ml-2 text-xl">{item}</h1>
                  <button
                    type="button"
                    onClick={() => {
                      deleteCategory(item);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Dodaj wymagania</h2>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="requirement"
              onChange={handleInputChangeSecond}
              className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2 col-span-2 lg:col-span-1"
              value={requirement}
            />
            <button
              onClick={handleRequirementButtonClick}
              type="button"
              className="bg-red-700 rounded-md text-white font-bold text-xl  col-span-2 lg:col-span-1 h-12"
            >
              Dodaj wymaganie
            </button>
          </div>

          <div>
            {requirements.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-xl text-red-700"
                  />
                  <h1 className="ml-2 text-xl">{item}</h1>
                  <button
                    type="button"
                    onClick={() => {
                      deleteRequirement(item);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Dodaj korzyści</h2>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="benefit"
              onChange={handleInputChangeSecond}
              className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2  col-span-2 lg:col-span-1"
              value={benefit}
            />
            <button
              type="button"
              onClick={handleBenefitButtonClick}
              className="bg-yellow-700 rounded-md text-white font-bold text-xl col-span-2 lg:col-span-1 h-12"
            >
              Dodaj korzyść
            </button>
          </div>

          <div>
            {benefits.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-xl text-yellow-700"
                  />
                  <h1 className="ml-2 text-xl">{item}</h1>
                  <button
                    type="button"
                    onClick={() => {
                      deleteBenefit(item);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-span-2">
          <h2 className="text-lg uppercase text-gray-800">Dodaj obowiązki</h2>
          <div className="grid grid-cols-2 gap-5">
            <input
              type="text"
              name="duty"
              onChange={handleInputChangeSecond}
              className="w-full h-12 shadow-sm rounded-md text-xl outline-none px-2 col-span-2 lg:col-span-1"
              value={duty}
            />
            <button
              type="button"
              onClick={handleDutyButtonClick}
              className="bg-purple-700 rounded-md text-white font-bold text-xl col-span-2 lg:col-span-1 h-12"
            >
              Dodaj obowiązek
            </button>
          </div>

          <div>
            {duties.map((item, index) => {
              return (
                <div key={index} className="flex items-center">
                  <FontAwesomeIcon
                    icon={faCaretRight}
                    className="text-xl text-purple-700"
                  />
                  <h1 className="ml-2 text-xl">{item}</h1>
                  <button
                    type="button"
                    onClick={() => {
                      deleteDuty(item);
                    }}
                  >
                    delete
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {!editMode && (
          <button className="h-16 text-white bg-green-500 w-full mt-5 font-bold text-xl rounded-md shadow-sm col-span-2 max-w-[400px] justify-self-center mb-16">
            Dodaj nową ofertę
          </button>
        )}
        {editMode && (
          <button
            className="h-16 text-white bg-green-500 w-full mt-5 font-bold text-xl rounded-md shadow-sm col-span-2 max-w-[400px] justify-self-center mb-16"
            type="button"
            onClick={updateJobOfertClick}
          >
            Edytuj ofertę
          </button>
        )}
      </form>
    </section>
  );
};

export default JobOfertForm;

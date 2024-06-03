import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CompanyFormData } from "../../../types";
import jobOfertService from "../../api/services/JobOfertService";
import { useLocation, useNavigate } from "react-router";
import { Company } from "../../api/models/company";

const CompanyForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState<number>(-1);
  const [editMode, setEditMode] = useState<boolean>();
  useEffect(() => {
    const setup = async () => {
      if (location.state != null) {
        setEditMode(true);
        const { companyId } = location.state;
        setCompanyId(companyId);
        setCompanyFormData(await jobOfertService.GetCompanyById(companyId));
      }
    };
    setup();
  }, []);
  const [companyFormData, setCompanyFormData] = useState<CompanyFormData>({
    companyName: "",
    companyAddress: "",
    companyLocation: "",
    companyDescription: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyFormData({
      ...companyFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editMode) {
      await jobOfertService.UpdateCompany(companyId, companyFormData);
      navigate("/companyPage");
    } else {
      await jobOfertService.InsertCompany(companyFormData);
      navigate("/companyPage");
    }
  };

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-3xl uppercase text-gray-800 font-bold my-5">
        {editMode ? "Edytowanie firmy" : "Dodawanie firmy"}
      </h1>
      <form
        className="flex flex-col w-full max-w-[400px]"
        onSubmit={handleFormSubmit}
      >
        <div className="mt-2">
          <h1 className="text-xl text-gray-800">Nazwa firmy</h1>
          <input
            type="text"
            name="companyName"
            onChange={handleInputChange}
            value={companyFormData.companyName}
            className="w-full h-12 shadow-md rounded-md outline-none pl-2 text-lg"
            placeholder="Nazwa firmy"
          />
        </div>

        <div className="mt-2">
          <h1 className="text-xl text-gray-800">Lokalizacja firmy</h1>
          <input
            type="text"
            name="companyLocation"
            onChange={handleInputChange}
            value={companyFormData.companyLocation}
            className="w-full h-12 shadow-md rounded-md outline-none pl-2 text-lg"
            placeholder="Lokalizacja firmy"
          />
        </div>

        <div className="mt-2">
          <h1 className="text-xl text-gray-800">Adres firmy</h1>
          <input
            type="text"
            name="companyAddress"
            onChange={handleInputChange}
            value={companyFormData.companyAddress}
            className="w-full h-12 shadow-md rounded-md outline-none pl-2 text-lg"
            placeholder="Adres firmy"
          />
        </div>
        <div className="mt-2">
          <h1 className="text-xl text-gray-800">Opis firmy</h1>
          <textarea
            name="companyDescription"
            onChange={handleTextAreaChange}
            value={companyFormData.companyDescription}
            className="w-full h-48 shadow-md rounded-md outline-none resize-none pl-2 py-2 text-lg"
          ></textarea>
        </div>
        <button
          className={`${
            editMode ? "bg-yellow-800" : "bg-green-600"
          } w-full h-14 rounded-md shadow-md mt-5 text-white font-bold text-xl`}
        >
          {editMode ? "Edytuj firmę" : "Dodaj firmę"}
        </button>
      </form>
    </div>
  );
};

export default CompanyForm;

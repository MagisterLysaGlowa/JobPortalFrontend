import { MouseEvent, useEffect, useState } from "react";
import { Company } from "../../api/models/company";
import jobOfertService from "../../api/services/JobOfertService";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const CompanyPage = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  useEffect(() => {
    setup();
  }, []);

  const setup = async () => {
    setCompanies(await jobOfertService.GetAllCompanies());
  };

  const handleCompanyDeleteClick = async (companyId: number) => {
    console.log(companyId);

    await jobOfertService.DeleteCompany(companyId);
    setup();
  };

  return (
    <article className="flex flex-col items-center">
      <h1 className="text-4xl text-gray-800 uppercase font-bold my-5 text-center">
        Wszystkie firmy w systemie
      </h1>
      <div className="max-w-[1400px] w-full">
        {companies.map((item, index) => {
          return (
            <div
              key={index}
              className="bg-white my-5 py-10 lg:flex px-5 items-center shadow-md rounded-md grid grid-cols-2"
            >
              <h1 className="w-full text-2xl font-bold text-gray-800 col-span-2">
                {item.companyName}
              </h1>
              <Link
                to={"/companyForm"}
                state={{ companyId: item.companyId }}
                className="flex items-center text-white bg-yellow-800 px-5 py-3 rounded-md"
              >
                <FontAwesomeIcon icon={faPen} className="mr-2" />
                Edytuj
              </Link>
              <button
                tabIndex={item.companyId}
                className="ml-3 flex items-center text-white bg-red-500 px-5 py-3 rounded-md"
                onClick={() => {
                  handleCompanyDeleteClick(item.companyId);
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Usuń
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default CompanyPage;

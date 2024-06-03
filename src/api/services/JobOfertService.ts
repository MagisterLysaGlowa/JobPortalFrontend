import axios, { AxiosResponse } from "axios";
import {
  CompanyFormData,
  FilterFormData,
  JobOfertFormData,
} from "../../../types";
import { Category } from "../models/category";
import { JobOfert } from "../models/jobOfert";
import { Company } from "../models/company";
import { Requirement } from "../models/requirement";
import { Duty } from "../models/duty";
import { Benefit } from "../models/benefit";

class JobOfertService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  GetAllJobOferts = async (): Promise<JobOfert[]> => {
    try {
      const response: AxiosResponse<JobOfert[]> = await axios.get(
        `${this.baseURL}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetJobOfert = async (jobOfertId: number): Promise<JobOfert> => {
    try {
      const response: AxiosResponse<JobOfert> = await axios.get(
        `${this.baseURL}/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetCategoriesForJobOfert = async (
    jobOfertId: number
  ): Promise<Category[]> => {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        `${this.baseURL}/category/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetJobOfertsFilter = async (
    filter: FilterFormData,
    pageNumber: number
  ): Promise<JobOfert[]> => {
    try {
      const requestData = new FormData();
      requestData.append("positionName", filter.positionName);
      requestData.append("positionLevel", filter.positionLevel);
      requestData.append("employmentContract", filter.employmentContract);
      requestData.append("employmentType", filter.employmentType);
      requestData.append("jobType", filter.jobType);
      requestData.append("salaryMinimum", filter.salaryMinimum.toString());
      requestData.append("salaryMaximum", filter.salaryMaximum.toString());
      requestData.append("companyName", filter.companyName);
      requestData.append("companyLocation", filter.companyLocation);
      requestData.append("categoryName", filter.categoryName);
      console.log(requestData);

      const response = await axios.post(
        `${this.baseURL}/homePageJobOfert/${pageNumber}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetAllCategories = async (): Promise<Category[]> => {
    try {
      const response: AxiosResponse<Category[]> = await axios.get(
        `${this.baseURL}/category`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  InsertCompany = async (
    companyFormData: CompanyFormData
  ): Promise<Company> => {
    try {
      const requestData = new FormData();
      requestData.append("companyName", companyFormData.companyName);
      requestData.append("companyAddress", companyFormData.companyAddress);
      requestData.append("companyLocation", companyFormData.companyLocation);
      requestData.append(
        "companyDescription",
        companyFormData.companyDescription
      );

      const response = await axios.post(
        `${this.baseURL}/company`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const company: Company = response.data;
      return company;
    } catch (error) {
      throw error;
    }
  };

  UpdateCompany = async (
    companyId: number,
    companyFormData: CompanyFormData
  ): Promise<Company> => {
    try {
      const requestData = new FormData();
      requestData.append("companyName", companyFormData.companyName);
      requestData.append("companyAddress", companyFormData.companyAddress);
      requestData.append("companyLocation", companyFormData.companyLocation);
      requestData.append(
        "companyDescription",
        companyFormData.companyDescription
      );

      const response = await axios.put(
        `${this.baseURL}/company/${companyId}`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const company: Company = response.data;
      return company;
    } catch (error) {
      throw error;
    }
  };

  GetCompanyById = async (companyId: number): Promise<Company> => {
    try {
      const response: AxiosResponse<Company> = await axios.get(
        `${this.baseURL}/company-${companyId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const company: Company = response.data;
      return company;
    } catch (error) {
      throw error;
    }
  };

  GetCompanyForJobOfertId = async (jobOfertId: number): Promise<Company> => {
    try {
      const response: AxiosResponse<Company> = await axios.get(
        `${this.baseURL}/company/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const company: Company = response.data;
      return company;
    } catch (error) {
      throw error;
    }
  };

  GetAllCompanies = async (): Promise<Company[]> => {
    try {
      const response: AxiosResponse<Company[]> = await axios.get(
        `${this.baseURL}/company`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const companies: Company[] = response.data;
      return companies;
    } catch (error) {
      throw error;
    }
  };

  AddCompanyJobOfertRelation = async (
    companyId: number,
    jobOfertId: number
  ): Promise<void> => {
    console.log(companyId);

    try {
      await axios.post(`${this.baseURL}/company/${companyId}-${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  GetRequirements = async (jobOfertId: number): Promise<Requirement[]> => {
    try {
      const response: AxiosResponse<Requirement[]> = await axios.get(
        `${this.baseURL}/requirement/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetDuties = async (jobOfertId: number): Promise<Duty[]> => {
    try {
      const response: AxiosResponse<Duty[]> = await axios.get(
        `${this.baseURL}/duty/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  GetBenefits = async (jobOfertId: number): Promise<Benefit[]> => {
    try {
      const response: AxiosResponse<Benefit[]> = await axios.get(
        `${this.baseURL}/benefit/${jobOfertId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  InsertJobOfert = async (
    jobOfertFormData: JobOfertFormData,
    jobOfertRequirements: string[],
    jobOfertBenefits: string[],
    jobOfertDuties: string[],
    jobOfertCategories: string[],
    jobOfertCompany: CompanyFormData | number
  ): Promise<void> => {
    try {
      const requestData = new FormData();
      requestData.append(
        "recruitmentEndDate",
        jobOfertFormData.recruitmentEndDate
      );
      requestData.append("positionName", jobOfertFormData.positionName);
      requestData.append("positionLevel", jobOfertFormData.positionLevel);
      requestData.append(
        "employmentContract",
        jobOfertFormData.employmentContract
      );
      requestData.append("employmentType", jobOfertFormData.employmentType);
      requestData.append("jobType", jobOfertFormData.jobType);
      requestData.append(
        "salaryMinimum",
        jobOfertFormData.salaryMinimum.toString()
      );
      requestData.append(
        "salaryMaximum",
        jobOfertFormData.salaryMaximum.toString()
      );
      requestData.append("workDays", jobOfertFormData.workDays);
      requestData.append("workStartHour", jobOfertFormData.workStartHour);
      requestData.append("workEndHour", jobOfertFormData.workEndHour);
      console.log(requestData);

      const response = await axios.post(`${this.baseURL}`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      let jobOfertId: number = response.data.id;

      //? Company insert for job ofert

      if (typeof jobOfertCompany == "number") {
        this.AddCompanyJobOfertRelation(jobOfertCompany, jobOfertId);
      } else {
        const company: Company = await this.InsertCompany(jobOfertCompany);
        this.AddCompanyJobOfertRelation(company.companyId, jobOfertId);
      }

      //? Requirement insert for job ofert

      const requestDataRequirement = new FormData();
      requestDataRequirement.append("JobOfertId", jobOfertId.toString());
      jobOfertRequirements.forEach((item) => {
        requestDataRequirement.append("Requirements[]", item);
      });
      await axios.post(`${this.baseURL}/requirement`, requestDataRequirement, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      //? Benefits insert for job ofert

      const requestDataBenefit = new FormData();
      requestDataBenefit.append("JobOfertId", jobOfertId.toString());
      jobOfertBenefits.forEach((item) => {
        requestDataBenefit.append("Benefits[]", item);
      });
      await axios.post(`${this.baseURL}/benefit`, requestDataBenefit, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      //? Duty insert for job ofert

      const requestDataDuty = new FormData();
      requestDataDuty.append("JobOfertId", jobOfertId.toString());
      jobOfertDuties.forEach((item) => {
        requestDataDuty.append("Duties[]", item);
      });
      await axios.post(`${this.baseURL}/duty`, requestDataDuty, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      //? Category insert for job ofert

      const requestDataCategory = new FormData();
      requestDataCategory.append("JobOfertId", jobOfertId.toString());
      jobOfertCategories.forEach((item) => {
        requestDataCategory.append("Categories[]", item);
      });
      console.log(requestDataCategory);
      await axios.post(`${this.baseURL}/category`, requestDataCategory, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  GetFilteredJobOfertsCount = async (
    filter: FilterFormData
  ): Promise<number> => {
    try {
      const requestData = new FormData();
      requestData.append("positionName", filter.positionName);
      requestData.append("positionLevel", filter.positionLevel);
      requestData.append("employmentContract", filter.employmentContract);
      requestData.append("employmentType", filter.employmentType);
      requestData.append("jobType", filter.jobType);
      requestData.append("salaryMinimum", filter.salaryMinimum.toString());
      requestData.append("salaryMaximum", filter.salaryMaximum.toString());
      requestData.append("companyName", filter.companyName);
      requestData.append("companyLocation", filter.companyLocation);
      requestData.append("categoryName", filter.categoryName);

      const response = await axios.post(
        `${this.baseURL}/jobOfert`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  DeleteCompany = async (companyId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/company/${companyId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteBenefits = async (jobOfertId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/benefit/${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteDuties = async (jobOfertId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/duty/${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteRequirements = async (jobOfertId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/requirement/${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteCategories = async (jobOfertId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/category/${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  DeleteJobOfert = async (jobOfertId: number): Promise<void> => {
    try {
      await axios.delete(`${this.baseURL}/${jobOfertId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  };

  UpdateJobOfert = async (
    jobOfertId: number,
    jobOfertFormData: JobOfertFormData,
    benefits: string[],
    requirements: string[],
    cateogires: string[],
    duties: string[]
  ): Promise<void> => {
    console.log("update");

    const requestData = new FormData();
    requestData.append(
      "recruitmentEndDate",
      jobOfertFormData.recruitmentEndDate
    );
    requestData.append("positionName", jobOfertFormData.positionName);
    requestData.append("positionLevel", jobOfertFormData.positionLevel);
    requestData.append(
      "employmentContract",
      jobOfertFormData.employmentContract
    );
    requestData.append("employmentType", jobOfertFormData.employmentType);
    requestData.append("jobType", jobOfertFormData.jobType);
    requestData.append(
      "salaryMinimum",
      jobOfertFormData.salaryMinimum.toString()
    );
    requestData.append(
      "salaryMaximum",
      jobOfertFormData.salaryMaximum.toString()
    );
    requestData.append("workDays", jobOfertFormData.workDays);
    requestData.append("workStartHour", jobOfertFormData.workStartHour);
    requestData.append("workEndHour", jobOfertFormData.workEndHour);
    console.log(requestData);

    const response = await axios.put(
      `${this.baseURL}/${jobOfertId}`,
      requestData,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    await this.DeleteBenefits(jobOfertId);
    await this.DeleteRequirements(jobOfertId);
    await this.DeleteDuties(jobOfertId);
    await this.DeleteCategories(jobOfertId);

    await this.InsertCategories(cateogires, jobOfertId);
    await this.InsertBenefits(benefits, jobOfertId);
    await this.InsertRequirements(requirements, jobOfertId);
    await this.InsertDuties(duties, jobOfertId);
  };

  InsertBenefits = async (benefits: string[], jobOfertId: number) => {
    if (benefits.length > 0) {
      const requestDataBenefit = new FormData();
      requestDataBenefit.append("JobOfertId", jobOfertId.toString());
      benefits.forEach((item) => {
        requestDataBenefit.append("Benefits[]", item);
      });
      await axios.post(`${this.baseURL}/benefit`, requestDataBenefit, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  InsertCategories = async (categories: string[], jobOfertId: number) => {
    if (categories.length > 0) {
      const requestDataCategory = new FormData();
      requestDataCategory.append("JobOfertId", jobOfertId.toString());
      categories.forEach((item) => {
        requestDataCategory.append("Categories[]", item);
      });
      await axios.post(`${this.baseURL}/category`, requestDataCategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  InsertRequirements = async (requirements: string[], jobOfertId: number) => {
    console.log(requirements);
    if (requirements.length > 0) {
      const requestDataRequirement = new FormData();
      requestDataRequirement.append("JobOfertId", jobOfertId.toString());
      requirements.forEach((item) => {
        requestDataRequirement.append("Requirements[]", item);
      });
      await axios.post(`${this.baseURL}/requirement`, requestDataRequirement, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };

  InsertDuties = async (duties: string[], jobOfertId: number) => {
    console.log(duties);
    if (duties.length > 0) {
      const requestDataDuty = new FormData();
      requestDataDuty.append("JobOfertId", jobOfertId.toString());
      duties.forEach((item) => {
        requestDataDuty.append("Duties[]", item);
      });
      await axios.post(`${this.baseURL}/duty`, requestDataDuty, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  };
}

const jobOfertService = new JobOfertService(
  "http://localhost:8080/api/jobOfert"
);
export default jobOfertService;

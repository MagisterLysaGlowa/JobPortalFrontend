export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  password: string;
  passwordRepeat: string;
  avatarSource: string;
  birthDate: string;
  domicile: string;
}

export interface RegisterFormError {
  nameError: string;
  surnameError: string;
  emailError: string;
  phoneNumberError: string;
  passwordError: string;
  passwordRepeatError: string;
  birthDateError: string;
  domicileError: string;
}

export interface LoginFormError {
  emailError: string;
  passwordError: string;
}

export interface ImageUploadFields {
  imageSrc: any;
  imageFile: File | null;
}

export interface CourseFormData {
  courseName: string;
  courseOrganizer: string;
  startDate: string;
  endDate: string;
}

export interface EducationFormData {
  schoolName: string;
  location: string;
  educationLevel: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface ExperienceFormData {
  proffesion: string;
  companyName: string;
  location: string;
  startDate: string;
  endDate: string;
}

export interface JobOfertFormData {
  recruitmentEndDate: string;
  positionName: string;
  positionLevel: string;
  employmentContract: string;
  employmentType: string;
  jobType: string;
  salaryMinimum: number;
  salaryMaximum: number;
  workDays: string;
  workStartHour: string;
  workEndHour: string;
}

export interface CompanyFormData {
  companyName: string;
  companyAddress: string;
  companyLocation: string;
  companyDescription: string;
}

export interface FilterFormData {
  positionName: string;
  positionLevel: string;
  employmentContract: string;
  employmentType: string;
  jobType: string;
  salaryMinimum: number;
  salaryMaximum: number;
  companyName: string;
  companyLocation: string;
  categoryName: string;
}

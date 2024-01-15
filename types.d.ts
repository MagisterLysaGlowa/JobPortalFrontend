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

export interface ImageUploadFields {
  imageSrc: any;
  imageFile: File | null;
}

import { RegisterFormData, RegisterFormError } from "../../types";
import authService from "../api/services/AuthService";

export const registerFormValidation = async (
  stage: number,
  formData: RegisterFormData,
  formError: RegisterFormError,
  setFormError: React.Dispatch<React.SetStateAction<RegisterFormError>>
): Promise<boolean> => {
  switch (stage) {
    case 1:
      let nameAndSurnameRegex: RegExp = /^[a-zA-Z]+(?:[ -][a-zA-Z]+)*$/;
      let nameCorrect = nameAndSurnameRegex.test(formData.name);
      let surnameCorrect = nameAndSurnameRegex.test(formData.surname);

      setFormError({
        ...formError,
        ["nameError"]: nameCorrect ? "" : "Niepoprawne imię",
        ["surnameError"]: surnameCorrect ? "" : "Niepoprawne nazwisko",
      });
      return nameCorrect && surnameCorrect;
    case 2:
      const emailRegex: RegExp =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const phoneNumberRegex: RegExp = /^\d{9}$/;
      let emailCorrect = emailRegex.test(formData.email);
      let phoneNumberCorrect = phoneNumberRegex.test(formData.phoneNumber);

      let emailErrorText = "Niepoprawny email";
      if (emailCorrect) {
        if (await authService.EmailIsTaken(formData.email)) {
          emailErrorText = "Ten email jest już zajęty";
          emailCorrect = false;
        }
      }

      let phoneErrorText = "Niepoprawny numer telefonu";
      if (phoneNumberCorrect) {
        if (await authService.PhoneIsTaken(formData.phoneNumber)) {
          phoneErrorText = "Ten numer telefonu jest już zajęty";
          phoneNumberCorrect = false;
        }
      }

      setFormError({
        ...formError,
        ["emailError"]: emailCorrect ? "" : emailErrorText,
        ["phoneNumberError"]: phoneNumberCorrect ? "" : phoneErrorText,
      });
      return emailCorrect && phoneNumberCorrect;
    case 3:
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@$%^*-])[A-Za-z\d@$!%*?&]{8,}$/;
      let passwordCorrect = passwordRegex.test(formData.password);
      let passwordRepeatCorrect = formData.password === formData.passwordRepeat;
      setFormError({
        ...formError,
        ["passwordError"]: passwordCorrect
          ? ""
          : "Hasło musi się składać z dużych i małych liter , cyfr oraz zanków specjalnych",
        ["passwordRepeatError"]: passwordRepeatCorrect
          ? ""
          : "Hasła nie są takie same",
      });
      return passwordCorrect && passwordRepeatCorrect;
    case 4:
      const domicileRegex = /^[a-zA-ZąćęłńóśźżĄĆĘŁŃÓŚŹŻ\- ]+$/;
      let domicileCorrect = domicileRegex.test(formData.domicile);
      let birthDateCorrect =
        new Date().getFullYear() -
          parseInt(formData.birthDate.substring(0, 4)) <
        120;
      setFormError({
        ...formError,
        ["domicileError"]: domicileCorrect
          ? ""
          : "Niepoprawna nazwa miejcowości",
        ["birthDateError"]: birthDateCorrect ? "" : "Ty jeszcze żyjesz?",
      });
      return birthDateCorrect && domicileCorrect;
  }
  return true;
};

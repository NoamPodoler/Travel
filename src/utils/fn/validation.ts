import { User as FirebaseUser } from "firebase/auth";
import { PlanInterface, UserDataInterface } from "../interfaces";

export const isUserValid = (user: UserDataInterface) => {
  if (user === null) return false;
  if (user.name === null) return false;
  if (user.country === null) return false;
  if (user.password === null) return false;

  return true;
};

export const isEmailValid = (email: string) => {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isValid = expression.test(email);
  return { error: isValid ? "" : "Email is Invalid", isValid: isValid };
};

export const isPasswordValid = (pwd: string) => {
  if (pwd.length < 5)
    return { isValid: false, error: "Password must be at least 5 characters" };
  if (pwd.length > 15)
    return { isValid: false, error: "Password must be under 15 characters" };

  return { isValid: true, error: "" };
};

export const isFullNameValid = (name: string) => {
  if (name.length < 5)
    return { isValid: false, error: "Name must be at least 5 characters" };
  if (name.length > 25)
    return { isValid: false, error: "Name must be under 25 characters" };

  return { isValid: true, error: "" };
};

export const isPasswordsMatching = (pwd1: string, pwd2: string) => {
  return {
    isValid: pwd1 === pwd2 && isPasswordValid(pwd1).isValid,
    error:
      pwd1 === pwd2
        ? isPasswordValid(pwd1).isValid
          ? ""
          : "Password is not Valid"
        : "Passwords are not matching",
  };
};

export const isPlanValid = (plan: PlanInterface) => {
  if (plan.title?.length === 0) return false;
  if (plan.destinations?.length === 0) return false;
  if (plan.startingDate === null || plan.endingDate === null) return false;

  return true;
};

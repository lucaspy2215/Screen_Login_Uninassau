import { SyntheticEvent } from "react";

// stops the page from reloading and returns the form fields as an object
export const closedFormValues = (e: SyntheticEvent<HTMLFormElement>) => {
  e.preventDefault();
  return Object.fromEntries(new FormData(e.currentTarget));
};
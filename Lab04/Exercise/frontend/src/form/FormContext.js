import { createContext, useContext } from "react";

export const FormContext = createContext(null);

export function useFormContext() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error("Form fields must be inside FormContext.Provider");
  }

  return context;
}

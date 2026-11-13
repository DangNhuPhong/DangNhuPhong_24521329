import { useState } from "react";
import { FormContext } from "./FormContext.js";
import { validateForm } from "./validateForm.js";
import InputField from "./InputField.jsx";
import ShowData from "./ShowData.jsx";

const initial = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SimpleForm() {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const errors = validateForm(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(event) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleBlur(event) {
    const name = event.target.name;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitted(true);
    setAccepted(isValid);

    if (!isValid) {
      const firstError = Object.keys(errors)[0];

      const input = event.currentTarget.elements.namedItem(firstError);

      input?.focus();
    }
  }

  function reset() {
    setValues(initial);
    setTouched({});
    setSubmitted(false);
    setAccepted(false);
  }

  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        touched,
        submitted,
        handleChange,
        handleBlur,
      }}
    >
      <section className="form-panel">
        <h2>Synchronous Context Form</h2>

        <form noValidate onSubmit={handleSubmit}>
          <InputField name="name" label="Name" autoComplete="name" />

          <InputField
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
          />

          <InputField
            name="password"
            label="Password"
            type="password"
            autoComplete="new-password"
          />

          <InputField
            name="confirmPassword"
            label="Confirm password"
            type="password"
            autoComplete="new-password"
          />

          <p role="status">
            {isValid ? "Form is valid." : "Complete all required fields."}
          </p>

          <button type="submit">Submit</button>

          <button type="button" onClick={reset}>
            Reset
          </button>
        </form>

        {accepted && isValid && (
          <ShowData
            data={{
              name: values.name.trim(),
              email: values.email.trim(),
              password: "[hidden]",
            }}
          />
        )}
      </section>
    </FormContext.Provider>
  );
}

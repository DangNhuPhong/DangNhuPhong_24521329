import { useId } from "react";
import { useFormContext } from "./FormContext.js";

export default function InputField({
  name,
  label,
  type = "text",
  autoComplete,
}) {
  const id = useId();

  const { values, errors, touched, submitted, handleChange, handleBlur } =
    useFormContext();

  const error = touched[name] || submitted ? errors[name] : undefined;

  const errorId = `${id}-error`;

  return (
    <section className="field-group">
      <label htmlFor={id}>{label}</label>

      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={values[name] ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />

      {error && (
        <p id={errorId} className="field-error" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}

export function validateForm(values) {
  const errors = {};

  if ((values.name ?? "").trim().length < 2) {
    errors.name = "Enter at least 2 characters.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email ?? "")) {
    errors.email = "Enter a valid email.";
  }

  if ((values.password ?? "").length < 8) {
    errors.password = "Use at least 8 characters.";
  }

  if (!values.confirmPassword || values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords must match.";
  }

  return errors;
}

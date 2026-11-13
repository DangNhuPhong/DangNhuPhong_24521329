export function validateMessage(payload) {
  const author =
    typeof payload?.author === "string" ? payload.author.trim() : "";

  const text = typeof payload?.text === "string" ? payload.text.trim() : "";

  const errors = {};

  if (author.length < 2 || author.length > 40) {
    errors.author = "Author must be 2–40 characters.";
  }

  if (text.length < 1 || text.length > 500) {
    errors.text = "Message must be 1–500 characters.";
  }

  return {
    errors,
    value: {
      author,
      text,
    },
  };
}

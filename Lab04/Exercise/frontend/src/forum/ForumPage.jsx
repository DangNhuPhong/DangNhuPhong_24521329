import { Fragment, useState } from "react";

import { useForumMessages } from "./useForumMessages.js";

import { validateMessage } from "../../../shared/messageValidation.js";

const channels = ["nasa", "esports-tribunal", "notNasa"];

function ForumChannel({ channel }) {
  const { data, loading, error, posting, postError, postMessage, reload } =
    useForumMessages(channel);

  const [values, setValues] = useState({
    author: "",
    text: "",
  });

  const [attempted, setAttempted] = useState(false);

  const { errors, value } = validateMessage(values);

  async function submit(event) {
    event.preventDefault();
    setAttempted(true);

    if (Object.keys(errors).length > 0 || posting || loading || error) {
      return;
    }

    const sent = await postMessage(value);

    if (sent) {
      setValues((previous) => ({
        ...previous,
        text: "",
      }));

      setAttempted(false);
    }
  }

  return (
    <section aria-label={`${channel} channel`}>
      <h3>{channel}</h3>

      <button type="button" disabled={loading || posting} onClick={reload}>
        Reload messages
      </button>

      <section aria-busy={loading} aria-label="Messages">
        {loading && <p role="status">Loading messages…</p>}

        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}

        {!loading && !error && data.length === 0 && <p>No messages yet.</p>}

        {!loading && !error && (
          <dl className="message-list">
            {data.map((message) => (
              <Fragment key={message.id}>
                <dt>
                  {message.author}
                  {" — "}

                  <time dateTime={message.timestamp}>
                    {new Date(message.timestamp).toLocaleString("vi-VN")}
                  </time>
                </dt>

                <dd>{message.text}</dd>
              </Fragment>
            ))}
          </dl>
        )}
      </section>

      <form noValidate onSubmit={submit} className="forum-form">
        <section className="field-group">
          <label htmlFor="message-author">Author</label>

          <input
            id="message-author"
            value={values.author}
            required
            maxLength={40}
            disabled={posting}
            autoComplete="name"
            aria-invalid={Boolean(attempted && errors.author)}
            aria-describedby={
              attempted && errors.author ? "author-error" : undefined
            }
            onChange={(event) => {
              setValues({
                ...values,
                author: event.target.value,
              });
            }}
          />

          {attempted && errors.author && (
            <p id="author-error" role="alert">
              {errors.author}
            </p>
          )}
        </section>

        <section className="field-group">
          <label htmlFor="message-text">Message</label>

          <textarea
            id="message-text"
            value={values.text}
            required
            maxLength={500}
            disabled={posting}
            aria-invalid={Boolean(attempted && errors.text)}
            aria-describedby={
              attempted && errors.text ? "text-error" : undefined
            }
            onChange={(event) => {
              setValues({
                ...values,
                text: event.target.value,
              });
            }}
          />

          {attempted && errors.text && (
            <p id="text-error" role="alert">
              {errors.text}
            </p>
          )}
        </section>

        <button type="submit" disabled={loading || posting || Boolean(error)}>
          {posting ? "Sending…" : "Send message"}
        </button>

        {postError && (
          <p role="alert" className="error">
            {postError}
          </p>
        )}
      </form>
    </section>
  );
}

export default function ForumPage() {
  const [channel, setChannel] = useState("nasa");

  return (
    <section>
      <h2>Full-stack Forum</h2>

      <label htmlFor="forum-channel">Channel</label>

      <select
        id="forum-channel"
        value={channel}
        onChange={(event) => {
          setChannel(event.target.value);
        }}
      >
        {channels.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>

      <ForumChannel key={channel} channel={channel} />
    </section>
  );
}

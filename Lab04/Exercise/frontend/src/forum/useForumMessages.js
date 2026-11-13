import { useEffect, useRef, useState } from "react";

function empty(channel) {
  return {
    channel,
    data: [],
    loading: true,
    error: "",
    posting: false,
    postError: "",
  };
}

export function useForumMessages(forumId) {
  const [state, setState] = useState(() => empty(forumId));

  const [revision, setRevision] = useState(0);

  const sessionRef = useRef(null);

  useEffect(() => {
    const session = {
      channel: forumId,
      controller: new AbortController(),
      posting: false,
    };

    sessionRef.current = session;

    const signal = session.controller.signal;

    const url = `/api/forums/${encodeURIComponent(forumId)}/messages`;

    async function load() {
      setState(empty(forumId));

      try {
        const response = await fetch(url, {
          signal,
        });

        const body = await response.json();

        if (!response.ok) {
          throw new Error(body.error ?? `HTTP ${response.status}`);
        }

        if (!signal.aborted) {
          setState((previous) => ({
            ...previous,
            data: body,
          }));
        }
      } catch (error) {
        if (!signal.aborted) {
          setState((previous) => ({
            ...previous,
            error: error.message,
          }));
        }
      } finally {
        if (!signal.aborted) {
          setState((previous) => ({
            ...previous,
            loading: false,
          }));
        }
      }
    }

    void load();

    return () => {
      session.controller.abort();
    };
  }, [forumId, revision]);

  async function postMessage(payload) {
    const session = sessionRef.current;

    if (
      !session ||
      session.channel !== forumId ||
      session.controller.signal.aborted ||
      session.posting
    ) {
      return false;
    }

    session.posting = true;

    const signal = session.controller.signal;

    setState((previous) => ({
      ...previous,
      posting: true,
      postError: "",
    }));

    try {
      const response = await fetch(
        `/api/forums/${encodeURIComponent(session.channel)}/messages`,
        {
          method: "POST",
          signal,

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),
        },
      );

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.error ?? `HTTP ${response.status}`);
      }

      if (signal.aborted) {
        return false;
      }

      setState((previous) => ({
        ...previous,
        data: [...previous.data, body],
      }));

      return true;
    } catch (error) {
      if (!signal.aborted) {
        setState((previous) => ({
          ...previous,
          postError: error.message,
        }));
      }

      return false;
    } finally {
      session.posting = false;

      if (!signal.aborted) {
        setState((previous) => ({
          ...previous,
          posting: false,
        }));
      }
    }
  }

  return {
    ...(state.channel === forumId ? state : empty(forumId)),

    postMessage,

    reload: () => {
      setRevision((value) => value + 1);
    },
  };
}

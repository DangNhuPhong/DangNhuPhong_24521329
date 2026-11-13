import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";

import { validateMessage } from "../shared/messageValidation.js";

const channels = new Set(["nasa", "esports-tribunal", "notNasa"]);

export function createApp(store, origin = "http://localhost:5173") {
  const app = express();

  app.use(cors({ origin }));

  app.use(
    express.json({
      limit: "16kb",
    }),
  );

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true });
  });

  const routes = ["/api/forums/:forumId/messages", "/api/messages/:forum"];

  function channelGuard(req, res, next) {
    const channel = req.params.forumId ?? req.params.forum;

    if (!channels.has(channel)) {
      return res.status(404).json({
        error: "Unknown channel",
      });
    }

    req.forumId = channel;
    next();
  }

  app.get(routes, channelGuard, async (req, res) => {
    const messages = await store.get(req.forumId);

    res.json(messages);
  });

  app.post(routes, channelGuard, async (req, res) => {
    const { errors, value } = validateMessage(req.body);

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        error: "Invalid message",
        fields: errors,
      });
    }

    const message = {
      ...value,
      id: randomUUID(),
      timestamp: new Date().toISOString(),
    };

    await store.add(req.forumId, message);

    res.status(201).json(message);
  });

  app.use((_req, res) => {
    res.status(404).json({
      error: "Route not found",
    });
  });

  app.use((error, _req, res, _next) => {
    if (error.type === "entity.parse.failed") {
      return res.status(400).json({
        error: "Invalid JSON",
      });
    }

    if (error.type === "entity.too.large") {
      return res.status(413).json({
        error: "Body too large",
      });
    }

    console.error(error);

    res.status(500).json({
      error: "Internal server error",
    });
  });

  return app;
}

export class AudioQueue {
  constructor() {
    this.queue = [];
    this.activeTask = null;
    this.closed = false;
    this.context = null;
    this.listeners = new Set();
    this.sequence = 0;
  }

  getSnapshot() {
    return {
      queue: this.queue.map((task) => ({
        id: task.id,
        url: task.url,
        status: task.status,
      })),
      activeTask: this.activeTask
        ? {
            id: this.activeTask.id,
            url: this.activeTask.url,
            status: this.activeTask.status,
          }
        : null,
      closed: this.closed,
    };
  }

  notify() {
    const snapshot = this.getSnapshot();

    this.listeners.forEach((listener) => {
      listener(snapshot);
    });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener(this.getSnapshot());

    return () => {
      this.listeners.delete(listener);
    };
  }

  async getContext() {
    if (!this.context || this.context.state === "closed") {
      this.context = new AudioContext();
    }

    if (this.context.state === "suspended") {
      await this.context.resume();
    }

    return this.context;
  }

  enqueue(url) {
    if (this.closed) {
      return Promise.reject(new Error("Audio queue is closed."));
    }

    if (typeof url !== "string" || !url.trim()) {
      return Promise.reject(new Error("Please provide an audio URL."));
    }

    const task = {
      id: ++this.sequence,
      url: url.trim(),
      status: "QUEUED",
      controller: new AbortController(),
      resolve: null,
      reject: null,
      settled: false,
    };

    const promise = new Promise((resolve, reject) => {
      task.resolve = resolve;
      task.reject = reject;
    });

    task.promise = promise;

    this.queue.push(task);
    this.notify();
    this.processNext();

    return promise;
  }

  settle(task, error, value) {
    if (task.settled) return;

    task.settled = true;

    if (error) {
      task.reject(error);
    } else {
      task.resolve(value);
    }
  }

  cancel(taskId) {
    if (this.activeTask?.id === taskId) {
      this.activeTask.controller.abort();
      return true;
    }

    const index = this.queue.findIndex((task) => task.id === taskId);

    if (index < 0) return false;

    const [task] = this.queue.splice(index, 1);

    task.status = "CANCELLED";
    task.controller.abort();

    this.settle(task, new DOMException("Task cancelled.", "AbortError"));

    this.notify();

    return true;
  }

  async processNext() {
    if (this.closed || this.activeTask) return;

    const task = this.queue.shift();

    if (!task) {
      this.notify();
      return;
    }

    this.activeTask = task;
    task.status = "LOADING";
    this.notify();

    try {
      const context = await this.getContext();

      if (task.controller.signal.aborted) {
        throw new DOMException("Task cancelled.", "AbortError");
      }

      const response = await fetch(task.url, {
        signal: task.controller.signal,
      });

      if (!response.ok) {
        throw new Error(`Audio request failed with HTTP ${response.status}.`);
      }

      const arrayBuffer = await response.arrayBuffer();

      if (task.controller.signal.aborted) {
        throw new DOMException("Task cancelled.", "AbortError");
      }

      task.status = "DECODING";
      this.notify();

      const audioBuffer = await context.decodeAudioData(arrayBuffer);

      if (task.controller.signal.aborted) {
        throw new DOMException("Task cancelled.", "AbortError");
      }

      task.status = "SUCCESS";

      this.settle(task, null, {
        id: task.id,
        url: task.url,
        audioBuffer,
      });
    } catch (error) {
      task.status = task.controller.signal.aborted ? "CANCELLED" : "ERROR";

      this.settle(task, error);
    } finally {
      this.activeTask = null;
      this.notify();

      queueMicrotask(() => this.processNext());
    }
  }

  async close() {
    if (this.closed) return;

    this.closed = true;

    if (this.activeTask) {
      this.activeTask.controller.abort();
    }

    const pending = this.queue.splice(0);

    for (const task of pending) {
      task.status = "CANCELLED";
      task.controller.abort();

      this.settle(task, new DOMException("Queue closed.", "AbortError"));
    }

    this.notify();

    if (this.activeTask) {
      await this.activeTask.promise.catch(() => {});
    }

    if (this.context && this.context.state !== "closed") {
      await this.context.close();
    }

    this.notify();
  }
}

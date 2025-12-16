import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll } from "vitest";
import { server, resetTasks } from "./msw-server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => {
  server.resetHandlers();
  resetTasks();
});
afterAll(() => server.close());

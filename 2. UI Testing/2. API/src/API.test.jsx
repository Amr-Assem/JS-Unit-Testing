import React from "react";
import {
  test,
  expect,
  afterEach,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import {
  cleanup,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

import API from "./API";

// Setup mock server, and handle the responses of GET requests
const server = setupServer(
  http.get("*/posts", () => {
    return HttpResponse.json([
      {
        id: "1",
        title: "Something something",
        body: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
      },
    ]);
  })
);

beforeAll(() => server.listen()); // Run server before all tests
afterEach(() => server.resetHandlers()); // Reset default handlers after each test
beforeEach(() => {
  cleanup();
});
afterAll(() => server.close()); // Close server after all tests

/* -------------------------------------------------------------------------- */
test("display loading state before any requests are made", async () => {
  render(<API />);
  expect(screen.getByText("Loading post ...")).toBeInTheDocument();
});

/* -------------------------------------------------------------------------- */
test("render fetched post successfully", async () => {
  render(<API />);
  expect(await screen.findAllByRole("heading")).toHaveLength(1);
  screen.debug();
});

/* -------------------------------------------------------------------------- */
test("post is displayed correctly", async () => {
  render(<API />);
  expect(
    await screen.findByRole("heading", {
      level: 2,
      name: "Something something",
    })
  );
  expect(
    await screen.findByText(
      "Lorem ipsum dolor sit amet consectetur adipisicing elit..."
    )
  );
});

/* -------------------------------------------------------------------------- */
test("render something went wrong on server error", async () => {
  server.use(
    http.get("*/posts", () => new HttpResponse(null, { status: 500 }))
  );

  render(<API />);
  screen.debug();
  await waitForElementToBeRemoved(() => screen.getByText("Loading post ..."));
  expect(screen.getByRole("alert")).toHaveTextContent("Something went wrong");
});

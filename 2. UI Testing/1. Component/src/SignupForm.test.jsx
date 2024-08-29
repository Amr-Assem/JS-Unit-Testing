import React from "react";
import { test, expect, describe, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SignupForm from "./SignupForm";

describe("<SignupForm/>", () => {
  beforeEach(() => {
    render(<SignupForm />);
  });
  afterEach(() => {
    cleanup();
  });

  /* -------------------------------------------------------------------------- */
  test("form displays username, age, email, password inputs, and a submit button", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
  });

  /* -------------------------------------------------------------------------- */
  test("submitting the form with empty fields displays an error to the user", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.click(submitButton);

    expect(screen.getByText("Username is required")).toBeInTheDocument();
    expect(
      screen.getByText("Age must be a number and at least 18")
    ).toBeInTheDocument();
    expect(screen.getByText("Valid email is required")).toBeInTheDocument();
    expect(
      screen.getByText("Password must be at least 6 characters")
    ).toBeInTheDocument();
  });

  /* -------------------------------------------------------------------------- */
  test("submitting the form with valid data displays no errors", async () => {
    const usernameInput = screen.getByLabelText(/username/i);
    const ageInput = screen.getByLabelText(/age/i);
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    await userEvent.type(usernameInput, "amr-assem");
    await userEvent.type(ageInput, "24");
    await userEvent.type(emailInput, "amr@mail.com");
    await userEvent.type(passwordInput, "amr-password");

    await userEvent.click(submitButton);

    expect(screen.queryByText("Username is required")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Age must be a number and at least 18")
    ).not.toBeInTheDocument();
    expect(screen.queryByText("Invalid email address")).not.toBeInTheDocument();
    expect(
      screen.queryByText("Password must be at least 6 characters")
    ).not.toBeInTheDocument();
  });
});

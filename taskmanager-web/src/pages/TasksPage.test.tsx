import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../test/renderWithProviders";
import { TasksPage } from "./TasksPage";

describe("TasksPage (meaningful tests)", () => {
  it("loads tasks and renders them", async () => {
    renderWithProviders(<TasksPage />);

    // page header
    expect(screen.getByText(/Task Manager/i)).toBeInTheDocument();

    // seeded MSW task should appear
    expect(await screen.findByText("Seed Task")).toBeInTheDocument();
    expect(screen.getByText(/From MSW/i)).toBeInTheDocument();
  });

  it("creates a task and refreshes the list", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TasksPage />);

    // Wait for initial load
    await screen.findByText("Seed Task");

    // Fill form
    await user.type(screen.getByPlaceholderText(/Task title/i), "New Task");
    await user.type(screen.getByPlaceholderText(/Description/i), "Created from test");

    // datetime-local input: easiest is to query by role 'textbox' can be tricky.
    // Use label if you add one; for now target input[type=datetime-local].
    const dueInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    expect(dueInput).toBeTruthy();
    // set a valid local datetime
    await user.clear(dueInput);
    await user.type(dueInput, "2030-12-31T12:00");

    // Status select: if you left it default NotStarted, no need to open.
    await user.click(screen.getByRole("button", { name: /Add Task/i }));

    // Newly created task should appear after refetch
    expect(await screen.findByText("New Task")).toBeInTheDocument();
    expect(screen.getByText("Created from test")).toBeInTheDocument();
  });

  it("blocks submit when title is missing (validation)", async () => {
    const user = userEvent.setup();
    renderWithProviders(<TasksPage />);

    await screen.findByText("Seed Task");

    const dueInput = document.querySelector('input[type="datetime-local"]') as HTMLInputElement;
    await user.clear(dueInput);
    await user.type(dueInput, "2030-12-31T12:00");

    // Submit without title
    await user.click(screen.getByRole("button", { name: /Add Task/i }));

    // Should NOT create a new task in list
    expect(screen.queryByText("New Task")).not.toBeInTheDocument();
  });
});

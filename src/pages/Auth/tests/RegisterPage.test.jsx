import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../Register"; // Adjust this import based on your folder structure
import { sendData } from "../../../hooks/sendData";
import { validateRegister } from "../../../utils/validation";
import toast from "react-hot-toast";

// Mock dependencies
jest.mock("../../../hooks/sendData");
jest.mock("../../../utils/validation");
jest.mock("react-hot-toast");

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe("Register Component", () => {
  // Mocking the toast methods
  beforeEach(() => {
    toast.success = jest.fn();
    toast.error = jest.fn();
  });

  test("renders the register form correctly", () => {
    renderWithRouter(<Register />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
  });

  // test("shows errors when validation fails", async () => {
  //   validateRegister.mockReturnValue({
  //     isValid: false,
  //     errors: {
  //       username: "Username is required",
  //       email: "Email is invalid",
  //     },
  //   });

  //   renderWithRouter(<Register />);

  //   // Simulate form submission
  //   fireEvent.click(screen.getByText("Register"));

  //   await waitFor(() => {
  //     expect(screen.getByText("Username is required")).toBeInTheDocument();
  //     expect(screen.getByText("Email is invalid")).toBeInTheDocument();
  //   });
  // });

  // test("toggles password visibility", () => {
  //   renderWithRouter(<Register />);

  //   const passwordInput = screen.getByPlaceholderText("Password");
  //   const toggleButton = screen.getByRole("button", { name: /eye/i });

  //   // Initially password should be of type 'password'
  //   expect(passwordInput.type).toBe("password");

  //   // Click the toggle button to show password
  //   fireEvent.click(toggleButton);
  //   expect(passwordInput.type).toBe("text");

  //   // Click again to hide password
  //   fireEvent.click(toggleButton);
  //   expect(passwordInput.type).toBe("password");
  // });

  // test("shows success message on successful registration", async () => {
  //   validateRegister.mockReturnValue({
  //     isValid: true,
  //     errors: {},
  //   });

  //   sendData.mockResolvedValue({
  //     status: 201,
  //   });

  //   renderWithRouter(<Register />);

  //   const usernameInput = screen.getByPlaceholderText("Username");
  //   const emailInput = screen.getByPlaceholderText("Email");
  //   const passwordInput = screen.getByPlaceholderText("Password");

  //   // Fill the form fields
  //   fireEvent.change(usernameInput, { target: { value: "testuser" } });
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });

  //   // Submit the form
  //   fireEvent.click(screen.getByText("Register"));

  //   await waitFor(() => {
  //     expect(toast.success).toHaveBeenCalledWith("Registration successful! Please verify your account.");
  //   });
  // });

  // test("shows error message when registration fails", async () => {
  //   validateRegister.mockReturnValue({
  //     isValid: true,
  //     errors: {},
  //   });

  //   sendData.mockRejectedValue({
  //     response: {
  //       status: 400,
  //       data: { error: "Invalid data" },
  //     },
  //   });

  //   renderWithRouter(<Register />);

  //   const usernameInput = screen.getByPlaceholderText("Username");
  //   const emailInput = screen.getByPlaceholderText("Email");
  //   const passwordInput = screen.getByPlaceholderText("Password");

  //   // Fill the form fields
  //   fireEvent.change(usernameInput, { target: { value: "testuser" } });
  //   fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });

  //   // Submit the form
  //   fireEvent.click(screen.getByText("Register"));

  //   await waitFor(() => {
  //     expect(toast.error).toHaveBeenCalledWith("Invalid data");
  //   });
  // });

  // test("disables submit button when form is submitting", async () => {
  //   validateRegister.mockReturnValue({
  //     isValid: true,
  //     errors: {},
  //   });

  //   sendData.mockResolvedValue({
  //     status: 201,
  //   });

  //   renderWithRouter(<Register />);

  //   const submitButton = screen.getByText("Register");

  //   // Simulate form submission
  //   fireEvent.click(submitButton);

  //   // Button should be disabled while submitting
  //   expect(submitButton).toBeDisabled();

  //   await waitFor(() => {
  //     expect(submitButton).not.toBeDisabled();
  //   });
  // });
});

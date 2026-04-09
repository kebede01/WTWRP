import { jest, describe, test, expect } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterModal from "./RegisterModal";
import "@testing-library/jest-dom";

describe("RegisterModal", () => {
  test("collects user data and calls onSubmitRegister correctly", async () => {
    // 1. Setup mock functions - resolving the promise simulates a successful 201 Created
    const mockOnSubmit = jest.fn(() => Promise.resolve());
    const mockCloseModal = jest.fn();

    render(
      <RegisterModal
        isOpen={true}
        title="Sign Up"
        buttonText="Next"
        onSubmitRegister={mockOnSubmit}
        handleCloseModal={mockCloseModal}
        name="register"
      />,
    );

    // 2. Target the inputs
    // getByLabelText ensures your form is accessible and properly linked to labels
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const avatarInput = screen.getByLabelText(/Avatar URL/i);

    // 3. Simulate user input
    // Using 'securePassword123' (17 chars) to comfortably pass the 12-char backend gate
    fireEvent.change(emailInput, {
      target: { value: "test@example.com", name: "email" },
    });
    fireEvent.change(passwordInput, {
      target: { value: "securePassword123", name: "password" },
    });
    fireEvent.change(nameInput, {
      target: { value: "Jane Doe", name: "name" },
    });
    fireEvent.change(avatarInput, {
      target: { value: "https://avatar.com/jane.png", name: "avatar" },
    });

    // 4. Click the submit button
    const submitButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(submitButton);

    // 5. Verification
    // waitFor handles the async delay of the onSubmit promise resolving
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "securePassword123",
        name: "Jane Doe",
        avatar: "https://avatar.com/jane.png",
      });
    });

    // Ensure the modal closes only after successful registration
    expect(mockCloseModal).toHaveBeenCalled();
  });
});

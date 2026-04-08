import { jest, describe, test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterModal from "./RegisterModal";

describe("RegisterModal", () => {
  test("collects user data and calls onSubmitRegister correctly", async () => {
    // 1. Setup mock functions
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
      />
    );

    // 2. Target the inputs by their labels
    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const nameInput = screen.getByLabelText(/Name/i);
    const avatarInput = screen.getByLabelText(/Avatar URL/i);

    // 3. Simulate the user filling out the form
    fireEvent.change(emailInput, { target: { value: "test@example.com", name: "email" } });
    fireEvent.change(passwordInput, { target: { value: "securePassword123", name: "password" } });
    fireEvent.change(nameInput, { target: { value: "Jane Doe", name: "name" } });
    fireEvent.change(avatarInput, { target: { value: "https://avatar.com/jane.png", name: "avatar" } });

    // 4. Click the submit button (The button is usually in the ModalWithForm)
    const submitButton = screen.getByRole("button", { name: /Next/i });
    fireEvent.click(submitButton);

    // 5. Verification
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "securePassword123",
        name: "Jane Doe",
        avatar: "https://avatar.com/jane.png",
      });
    });

    // Check if it handles the cleanup
    expect(mockCloseModal).toHaveBeenCalled();
  });
});
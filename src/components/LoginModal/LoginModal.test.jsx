import { jest, test, expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "./LoginModal";
import "@testing-library/jest-dom";

test("displays error message when login fails", async () => {
  // Mocking a rejection to simulate a '401 Unauthorized' from the backend
  const mockOnSubmit = jest.fn(() =>
    Promise.reject(new Error("Invalid credentials")),
  );
  const mockHandleClose = jest.fn();

  // 1. RENDER
  render(
    <LoginModal
      isOpen={true}
      buttonText="Log In"
      onSubmitLogIn={mockOnSubmit}
      handleCloseModal={mockHandleClose}
    />,
  );

  // 2. FILL IN THE FORM
  // Note: Using a 12+ character password to match our backend Joi requirements
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@test.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), {
    target: { value: "securePassword123" },
  });

  // 3. SUBMIT
  // We look for the button with the text provided in props
  const submitBtn = screen.getByRole("button", { name: /Log In/i });
  fireEvent.click(submitBtn);

  // 4. WAIT FOR ERROR
  // findByText is asynchronous, which is perfect for waiting for the Promise rejection
  const errorMessage = await screen.findByText(/Invalid credentials/i);

  expect(errorMessage).toBeInTheDocument();
  // Ensure the modal didn't accidentally close on a failed attempt
  expect(mockHandleClose).not.toHaveBeenCalled();
});

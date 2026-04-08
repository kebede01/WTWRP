import { jest, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import LoginModal from "./LoginModal"; // <--- ENSURE THIS IS HERE

test("displays error message when login fails", async () => {
  const mockOnSubmit = jest.fn(() => Promise.reject(new Error("Invalid credentials")));
  const mockHandleClose = jest.fn();

  // 1. RENDER FIRST
  const { container } = render(
    <LoginModal 
      isOpen={true} 
      buttonText="Log In"
      onSubmitLogIn={mockOnSubmit} 
      handleCloseModal={mockHandleClose} 
    />
  );

  // 2. FILL IN THE FORM
  fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@test.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });

  // 3. FIND BUTTON BY CLASS (Since name is empty in the DOM)
  const submitBtn = container.querySelector(".modal__submit-btn");
  fireEvent.click(submitBtn);

  // 4. WAIT FOR ERROR
  const errorMessage = await screen.findByText(/Invalid credentials/i);
  expect(errorMessage).toBeInTheDocument();
  expect(mockHandleClose).not.toHaveBeenCalled();
});
import { jest, describe, test, expect } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddItemModal from "./AddItemModal";
import "@testing-library/jest-dom";

describe("AddItemModal", () => {
  test("submits the form with correct data when fields are filled", async () => {
    // 1. Setup mock functions
    const mockOnSubmit = jest.fn(() => Promise.resolve({ data: {} }));
    const mockHandleClose = jest.fn();

    render(
      <AddItemModal
        isOpen={true}
        title="Add Garment"
        buttonText="Add garment"
        // FIX: Prop name must be onSubmitAddItem to match your component
        onSubmitAddItem={mockOnSubmit}
        handleCloseModal={mockHandleClose}
        name="add-item"
      />,
    );

    // 2. Target the inputs
    const nameInput = screen.getByPlaceholderText(/Name/i);
    const imageInput = screen.getByPlaceholderText(/Image URL/i);
    const selectMenu = screen.getByLabelText(/Select the weather type/i);

    // 3. Simulate user typing
    fireEvent.change(nameInput, {
      target: { value: "Summer Shirt", name: "name" },
    });
    fireEvent.change(imageInput, {
      target: { value: "https://example.com/image.png", name: "image" },
    });
    fireEvent.change(selectMenu, { target: { value: "hot", name: "weather" } });

    // 4. Submit the form
    const submitButton = screen.getByRole("button", { name: /Add garment/i });
    fireEvent.click(submitButton);

    // 5. Verification
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "Summer Shirt",
        image: "https://example.com/image.png",
        weather: "hot",
      });
    });

    // Verify cleanup
    expect(mockHandleClose).toHaveBeenCalled();
  });
});

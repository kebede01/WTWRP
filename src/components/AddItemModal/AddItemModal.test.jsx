import { jest, test, expect } from '@jest/globals';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddItemModal from "./AddItemModal";

describe("AddItemModal", () => {
  test("submits the form with correct data when fields are filled", async () => {
    // 1. Create a mock function that returns a successful promise
    const mockOnSubmit = jest.fn(() => Promise.resolve({ data: {} }));
    const mockHandleClose = jest.fn();

    render(
      <AddItemModal
        isOpen={true}
        title="Add Garment"
        buttonText="Add garment"
        onSubmitAddItem={mockOnSubmit}
        handleCloseModal={mockHandleClose}
        name="add-item"
      />
    );

    // 2. Fill in the Name input
    const nameInput = screen.getByPlaceholderText(/Name/i);
    fireEvent.change(nameInput, { target: { value: "Summer Shirt", name: "name" } });

    // 3. Fill in the Image URL input
    const imageInput = screen.getByPlaceholderText(/Image URL/i);
    fireEvent.change(imageInput, { target: { value: "https://example.com/image.png", name: "image" } });

    // 4. Select the Weather type from the dropdown
    const selectMenu = screen.getByLabelText(/Select the weather type/i);
    fireEvent.change(selectMenu, { target: { value: "hot", name: "weather" } });

    // 5. Submit the form
    const submitButton = screen.getByRole("button", { name: /Add garment/i });
    fireEvent.click(submitButton);

    // 6. Assertions
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        name: "Summer Shirt",
        image: "https://example.com/image.png",
        weather: "hot",
      });
    });

    // Verify it tries to close the modal after success
    expect(mockHandleClose).toHaveBeenCalled();
  });
});
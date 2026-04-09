import { jest, test, expect, describe } from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileEditModal from "./ProfileEditModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "@testing-library/jest-dom";

describe("ProfileEditModal", () => {
  const mockUser = {
    name: "Original Name",
    avatar: "https://original-link.com",
    _id: "60d5ecb54e92f2001c82ecb3", // Consistency with backend ObjectID
  };

  // Mock must return a resolved Promise to simulate successful API call
  const mockOnProfileUpdate = jest.fn(() => Promise.resolve());
  const mockHandleCloseModal = jest.fn();

  const renderModal = (isOpen = true) => {
    return render(
      <CurrentUserContext.Provider value={{ currentUser: mockUser }}>
        <ProfileEditModal
          isOpen={isOpen}
          onProfileUpdate={mockOnProfileUpdate}
          handleCloseModal={mockHandleCloseModal}
          title="Change profile data"
          buttonText="Save changes"
          name="edit-profile"
        />
      </CurrentUserContext.Provider>,
    );
  };

  test("pre-fills form with current user data on open", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);
    const avatarInput = await screen.findByDisplayValue(mockUser.avatar);

    expect(nameInput).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
  });

  test("allows user to edit inputs", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);
    fireEvent.change(nameInput, { target: { value: "New Updated Name" } });
    expect(nameInput.value).toBe("New Updated Name");
  });

  test("calls onProfileUpdate with new data when submitted", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);

    fireEvent.change(nameInput, { target: { value: "New Name" } });

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    fireEvent.click(submitButton);

    // We use waitFor because the onSubmit handler is often async
    await waitFor(() => {
      expect(mockOnProfileUpdate).toHaveBeenCalledWith({
        name: "New Name",
        avatar: mockUser.avatar,
      });
    });
  });
});

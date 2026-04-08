import { jest, test, expect, describe } from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import ProfileEditModal from "./ProfileEditModal";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "@testing-library/jest-dom";

describe("ProfileEditModal", () => {
  const mockUser = {
    name: "Original Name",
    avatar: "https://original-link.com",
  };

  // FIX: mockOnProfileUpdate must return a resolved Promise 
  // so that .then() inside the component doesn't crash.
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
      </CurrentUserContext.Provider>
    );
  };

  test("pre-fills form with current user data on open", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);
    const avatarInput = await screen.findByDisplayValue(mockUser.avatar);

    expect(nameInput).toBeInTheDocument();
    expect(avatarInput).toBeInTheDocument();
  });

  test("allows user to edit inputs (is not locked)", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);
    fireEvent.change(nameInput, { target: { value: "New Updated Name" } });
    expect(nameInput.value).toBe("New Updated Name");
  });

  test("calls onProfileUpdate with new data when submitted", async () => {
    renderModal();
    const nameInput = await screen.findByDisplayValue(mockUser.name);
    
    fireEvent.change(nameInput, { target: { value: "New Name" } });
    
  
    // If you don't have a role, you can find the button and click it:
    const submitButton = screen.getByRole("button", { name: /save changes/i });
    
    fireEvent.click(submitButton);

    expect(mockOnProfileUpdate).toHaveBeenCalledWith({
      name: "New Name",
      avatar: mockUser.avatar, 
    });
  });
});
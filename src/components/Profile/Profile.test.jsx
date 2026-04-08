import { jest, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { MemoryRouter } from "react-router-dom";

test("calls logOut when the logout button is clicked", () => {
  const mockLogOut = jest.fn();
  const mockUser = { name: "Terrence", avatar: "" };

  render(
    /* 1. We need the Router because Sidebar or Profile might have Links */
    /* 2. We provide the context value that SideBar is looking for */
    <MemoryRouter>
      <CurrentUserContext.Provider
        value={{ currentUser: mockUser, isLoggedIn: true }}
      >
        <Profile
          logOut={mockLogOut}
          clothingItems={[]}
          handleOpenProfileUpdate={() => {}}
          handleActiveModal={() => {}}
          handlePreviewModal={() => {}}
        />
      </CurrentUserContext.Provider>
    </MemoryRouter>,
  );

  // Find and click the logout button
  const logoutButton = screen.getByText(/Log Out/i);
  fireEvent.click(logoutButton);

  // Success!
  expect(mockLogOut).toHaveBeenCalledTimes(1);
});

import { jest, test, expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "./Profile";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom"; // Essential for the 'toBeInTheDocument' matchers

test("calls logOut when the logout button is clicked", () => {
  const mockLogOut = jest.fn();

  // Consistency: Using a 24-char hex ID even in context mocks
  const mockUser = {
    name: "Terrence",
    avatar: "",
    _id: "60d5ecb54e92f2001c82ecb3",
  };

  render(
    <MemoryRouter>
      <CurrentUserContext.Provider
        value={{ currentUser: mockUser, isLoggedIn: true }}
      >
        <Profile
          logOut={mockLogOut}
          clothingItems={[]}
          handleOpenProfileUpdate={jest.fn()}
          handleActiveModal={jest.fn()}
          handlePreviewModal={jest.fn()}
          onCardLike={jest.fn()} // Added if your Profile renders cards
        />
      </CurrentUserContext.Provider>
    </MemoryRouter>,
  );

  // 1. Better Selector: getByRole is more resilient than getByText
  const logoutButton = screen.getByRole("button", { name: /Log Out/i });

  // 2. Execution
  fireEvent.click(logoutButton);

  // 3. Verification
  expect(mockLogOut).toHaveBeenCalledTimes(1);
});

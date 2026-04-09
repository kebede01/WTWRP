import { test, expect } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "@testing-library/jest-dom";

// Helper to render the component with a specific context value
const renderWithContext = (contextValue, initialEntries, anonymous = false) => {
  return render(
    <CurrentUserContext.Provider value={contextValue}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          {/* We define the landing spots for redirects */}
          <Route path="/login" element={<span>Login Page</span>} />
          <Route path="/" element={<span>Home Page</span>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute anonymous={anonymous}>
                <span>Protected Profile</span>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    </CurrentUserContext.Provider>,
  );
};

test("redirects guest to /login when accessing protected route", () => {
  // Scenario: Not logged in, trying to see the profile
  renderWithContext({ isLoggedIn: false, currentUser: {} }, ["/profile"]);
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  expect(screen.queryByText(/Protected Profile/i)).not.toBeInTheDocument();
});

test("allows logged-in user to access protected route", () => {
  // Scenario: Logged in with a valid mock user, accessing profile
  const mockUser = { _id: "60d5ecb54e92f2001c82ecb3", name: "Test User" };
  renderWithContext({ isLoggedIn: true, currentUser: mockUser }, ["/profile"]);

  expect(screen.getByText(/Protected Profile/i)).toBeInTheDocument();
});

test("redirects logged-in user to home when accessing anonymous-only route", () => {
  // Scenario: Logged in user tries to access a route marked 'anonymous' (like Login/Register)
  const mockUser = { _id: "60d5ecb54e92f2001c82ecb3" };
  renderWithContext(
    { isLoggedIn: true, currentUser: mockUser },
    ["/profile"],
    true,
  );

  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  expect(screen.queryByText(/Protected Profile/i)).not.toBeInTheDocument();
});

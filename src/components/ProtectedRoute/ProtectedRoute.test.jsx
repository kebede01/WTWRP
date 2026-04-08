import { jest, test, expect } from '@jest/globals';
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
    </CurrentUserContext.Provider>
  );
};

test("redirects guest to /login when accessing protected route", () => {
  renderWithContext({ isLoggedIn: false }, ["/profile"]);
  expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
});

test("allows logged-in user to access protected route", () => {
  renderWithContext({ isLoggedIn: true }, ["/profile"]);
  expect(screen.getByText(/Protected Profile/i)).toBeInTheDocument();
});

test("redirects logged-in user to home when accessing anonymous-only route", () => {
  // Scenario: Logged in user tries to access /profile with anonymous=true
  renderWithContext({ isLoggedIn: true }, ["/profile"], true);
  expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
});
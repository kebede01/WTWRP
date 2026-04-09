import { jest, test, expect } from "@jest/globals";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 1. MOCK EVERYTHING using the unstable ESM method
// This prevents Jest from injecting 'require' behind the scenes.

jest.unstable_mockModule("../../utils/constants", () => ({
  weatherOptions: [{ day: true, condition: "clear", url: "test-file-stub" }],
  defaultWeatherOptions: {
    day: { url: "test-day" },
    night: { url: "test-night" },
  },
  coordinates: { latitude: 0, longitude: 0 },
  APIkey: "test-key",
}));

jest.unstable_mockModule("../../utils/weatherApi", () => ({
  fetchWeatherData: jest.fn(() =>
    Promise.resolve({
      main: { temp: 293.15 },
      weather: [{ main: "Clear", icon: "01d" }],
      name: "Portland",
      sys: { sunrise: 1712496000, sunset: 1712542800 },
    }),
  ),
  filterWeatherData: jest.fn(() => ({
    city: "Portland",
    weather: "Clear",
    isDay: true,
    condition: "sunny",
    temp: { "°C": 20, "°F": 68 },
  })),
}));

jest.unstable_mockModule("../../utils/api.js", () => ({
  // Returning an empty array for a clean initial state
  getAllMyClothingItems: jest.fn(() => Promise.resolve([])),
  // Using a valid 24-character hex ID to match Joi validateItemId
  addClothingItem: jest.fn((data) =>
    Promise.resolve({
      ...data,
      _id: "60d5ecb54e92f2001c82ecb3",
    }),
  ),
  deleteClothingItem: jest.fn(() => Promise.resolve()),
}));

jest.unstable_mockModule("../../utils/auth.js", () => ({
  register: jest.fn(() =>
    Promise.resolve({
      data: { name: "Test", avatar: "test-url", email: "test@test.com" },
    }),
  ),
  // Cookie-based: Success doesn't need to return a token string to the frontend
  authorize: jest.fn(() =>
    Promise.resolve({ message: "Successfully logged in" }),
  ),
  getUserInfo: jest.fn(() =>
    Promise.resolve({
      data: {
        name: "Test User",
        avatar: "test-url",
        email: "test@test.com",
        _id: "60d5ecb54e92f2001c82ecb3",
      },
    }),
  ),
  signOut: jest.fn(() => Promise.resolve()),
  changeUserInfo: jest.fn((data) => Promise.resolve({ data })),
}));

jest.unstable_mockModule("../../utils/apiLikeDislike.js", () => ({
  apiItemLike: jest.fn(() =>
    Promise.resolve({ _id: "60d5ecb54e92f2001c82ecb3", likes: [] }),
  ),
  apiItemUnlike: jest.fn(() =>
    Promise.resolve({ _id: "60d5ecb54e92f2001c82ecb3", likes: [] }),
  ),
}));

// --- THE TESTS ---

test("renders the app and shows content after loading", async () => {
  // Use dynamic import for App to ensure it picks up the ESM mocks above
  const { default: App } = await import("./App");

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  // We check for the Add button which indicates the header/main content is ready
  await waitFor(
    () => {
      expect(screen.getByText(/\+ Add clothing/i)).toBeInTheDocument();
    },
    { timeout: 3000 },
  );
});

test("logout clears user state and redirects to home", async () => {
  const { default: App } = await import("./App");

  // Starting at /profile to ensure the Log Out button is rendered
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <App />
    </MemoryRouter>,
  );

  // findByRole handles the async appearance of the button after initial load
  const logoutBtn = await screen.findByRole("button", { name: /log out/i });
  fireEvent.click(logoutBtn);

  await waitFor(() => {
    // Check that the "Log Out" button is removed from DOM
    expect(
      screen.queryByRole("button", { name: /log out/i }),
    ).not.toBeInTheDocument();
    // Check that "Log In" button appears in the Header for guests
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
});

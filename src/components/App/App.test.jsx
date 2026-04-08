import { jest, test, expect } from '@jest/globals';
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

// 1. MOCK EVERYTHING using the unstable ESM method
// This prevents Jest from injecting 'require' behind the scenes.
// 1. Update this mock to include all missing exports
jest.unstable_mockModule('../../utils/constants', () => ({
  weatherOptions: [{ day: true, condition: "clear", url: "test-file-stub" }],
  defaultWeatherOptions: { day: { url: "test-day" }, night: { url: "test-night" } }, // Add this
  coordinates: { latitude: 0, longitude: 0 },
  APIkey: "test-key",
  // If you have any others like 'clothingItems', add them here as empty arrays/objects
}));

jest.unstable_mockModule("../../utils/weatherApi", () => ({
  fetchWeatherData: jest.fn(() => Promise.resolve({
    main: { temp: 293.15 },
    weather: [{ main: "Clear", icon: "01d" }],
    name: "Portland",
    sys: { sunrise: 1712496000, sunset: 1712542800 }
  })),
  filterWeatherData: jest.fn(() => ({
    city: "Portland", weather: "Clear", isDay: true, condition: "sunny", temp: { "°C": 20, "°F": 68 },
  })),
}));

jest.unstable_mockModule("../../utils/api.js", () => ({
  getAllMyClothingItems: jest.fn(() => Promise.resolve({ data: [] })),
  addClothingItem: jest.fn((data) => Promise.resolve({ data: { ...data, _id: "123" } })),
  deleteClothingItem: jest.fn(() => Promise.resolve()),
}));

jest.unstable_mockModule("../../utils/auth.js", () => ({
  register: jest.fn(() => Promise.resolve({ data: {} })),
  authorize: jest.fn(() => Promise.resolve({ data: "fake-token" })),
  getUserInfo: jest.fn(() => Promise.resolve({ 
    data: { name: "Test User", avatar: "test-url", email: "test@test.com" } 
  })),
  signOut: jest.fn(() => Promise.resolve()),
  changeUserInfo: jest.fn((data) => Promise.resolve({ data })),
}));

jest.unstable_mockModule("../../utils/apiLikeDislike.js", () => ({
  apiItemLike: jest.fn(() => Promise.resolve({ data: {} })),
  apiItemUnlike: jest.fn(() => Promise.resolve({ data: {} })),
}));

// --- THE TEST ---

test("renders the app and shows content after loading", async () => {
  // Use dynamic import for App to ensure it picks up the ESM mocks above
  const { default: App } = await import("./App");

  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/\+ Add clothing/i)).toBeInTheDocument();
  }, { timeout: 3000 });
});

test("logout clears user state and redirects to home", async () => {
  // 1. Load the App
  const { default: App } = await import("./App");
  
  // 2. Render App with a route that shows the Logout button (like /profile)
  render(
    <MemoryRouter initialEntries={["/profile"]}>
      <App />
    </MemoryRouter>
  );

  // 3. Find and click the Log Out button
  // Note: We use await waitFor because the App might be loading user data first
  const logoutBtn = await screen.findByRole("button", { name: /log out/i });
  fireEvent.click(logoutBtn);

  // 4. VERIFY: The user should now be redirected or see "Log In" instead of "Log Out"
  await waitFor(() => {
    // Check that the "Log Out" button is gone
    expect(screen.queryByRole("button", { name: /log out/i })).not.toBeInTheDocument();
    // Check that "Log In" is now visible (assuming it's in your header for guests)
    expect(screen.getByRole("button", { name: /log in/i })).toBeInTheDocument();
  });
});
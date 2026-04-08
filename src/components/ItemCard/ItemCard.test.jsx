import { jest, test, expect } from '@jest/globals';
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "@testing-library/jest-dom";

// Ensure the ID here matches what we use in the render function
const mockItem = {
  _id: "1",
  name: "Summer Dress",
  image: "test-url",
  likes: ["123"] // Using "123" to match our test user
};

const renderCard = (isLoggedIn, currentUserId) => {
  const mockHandlePreview = jest.fn();
  const mockHandleLike = jest.fn();

  render(
    <CurrentUserContext.Provider value={{ isLoggedIn, currentUser: { _id: currentUserId } }}>
      <ItemCard 
        item={mockItem} 
        handlePreviewModal={mockHandlePreview} 
        handleCardLikesDislikes={mockHandleLike} 
      />
    </CurrentUserContext.Provider>
  );

  return { mockHandlePreview, mockHandleLike };
};

test("renders the like button only when logged in", () => {
  // Test Case 1: Not logged in (Plan: No button)
  const { rerender } = render(
    <CurrentUserContext.Provider value={{ isLoggedIn: false }}>
      <ItemCard item={mockItem} />
    </CurrentUserContext.Provider>
  );
  expect(screen.queryByRole('button', { name: /like/i })).not.toBeInTheDocument();

  // Test Case 2: Logged in (Plan: Button exists)
  rerender(
    <CurrentUserContext.Provider value={{ isLoggedIn: true, currentUser: { _id: '123' } }}>
      <ItemCard item={mockItem} />
    </CurrentUserContext.Provider>
  );
  // Since mockItem.likes has "123", this should now correctly be "Unlike"
  expect(screen.getByRole('button', { name: /unlike/i })).toBeInTheDocument();
});

test("shows active like state if user already liked the item", () => {
  renderCard(true, "123");
  const likeBtn = screen.getByRole('button', { name: /unlike/i });
  expect(likeBtn).toHaveClass("card__like-button_liked");
});

test("triggers handlePreviewModal when clicking image", () => {
  const { mockHandlePreview } = renderCard(true, "456");
  const image = screen.getByAltText(/A photo of Summer Dress/i);
  
  fireEvent.click(image);
  expect(mockHandlePreview).toHaveBeenCalledWith(mockItem);
});

test("triggers handleCardLikesDislikes when clicking like button", () => {
  const { mockHandleLike } = renderCard(true, "456"); // User 456 hasn't liked it yet
  const likeBtn = screen.getByRole('button', { name: /like/i });
  
  fireEvent.click(likeBtn);
  expect(mockHandleLike).toHaveBeenCalledWith(mockItem, false); // false because isLiked was false
});
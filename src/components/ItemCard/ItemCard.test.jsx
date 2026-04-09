import { jest, test, expect } from "@jest/globals";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemCard from "./ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "@testing-library/jest-dom";

// Using valid 24-character hex IDs to align with our backend Joi/Mongoose gates
const MOCK_USER_ID = "60d5ecb54e92f2001c82ecb3";
const MOCK_OTHER_ID = "60d5ecb54e92f2001c82ecb4";

const mockItem = {
  _id: "60d5ecb54e92f2001c82ecb5",
  name: "Summer Dress",
  image: "test-url",
  likes: [MOCK_USER_ID], // This user has already liked the item
};

const renderCard = (isLoggedIn, currentUserId) => {
  const mockHandlePreview = jest.fn();
  const mockHandleLike = jest.fn();

  render(
    <CurrentUserContext.Provider
      value={{ isLoggedIn, currentUser: { _id: currentUserId } }}
    >
      <ItemCard
        item={mockItem}
        handlePreviewModal={mockHandlePreview}
        handleCardLikesDislikes={mockHandleLike}
      />
    </CurrentUserContext.Provider>,
  );

  return { mockHandlePreview, mockHandleLike };
};

test("renders the like button only when logged in", () => {
  // Test Case 1: Not logged in
  const { rerender } = render(
    <CurrentUserContext.Provider value={{ isLoggedIn: false }}>
      <ItemCard item={mockItem} />
    </CurrentUserContext.Provider>,
  );
  expect(
    screen.queryByRole("button", { name: /like/i }),
  ).not.toBeInTheDocument();

  // Test Case 2: Logged in
  rerender(
    <CurrentUserContext.Provider
      value={{ isLoggedIn: true, currentUser: { _id: MOCK_USER_ID } }}
    >
      <ItemCard item={mockItem} />
    </CurrentUserContext.Provider>,
  );
  // Since mockItem.likes contains MOCK_USER_ID, the button should show "Unlike"
  expect(screen.getByRole("button", { name: /unlike/i })).toBeInTheDocument();
});

test("shows active like state if user already liked the item", () => {
  renderCard(true, MOCK_USER_ID);
  const likeBtn = screen.getByRole("button", { name: /unlike/i });
  // Ensure your ItemCard component uses this exact class name for the liked state
  expect(likeBtn).toHaveClass("card__like-button_liked");
});

test("triggers handlePreviewModal when clicking image", () => {
  const { mockHandlePreview } = renderCard(true, MOCK_OTHER_ID);
  const image = screen.getByAltText(/A photo of Summer Dress/i);

  fireEvent.click(image);
  expect(mockHandlePreview).toHaveBeenCalledWith(mockItem);
});

test("triggers handleCardLikesDislikes when clicking like button", () => {
  const { mockHandleLike } = renderCard(true, MOCK_OTHER_ID); // Different user who hasn't liked it
  const likeBtn = screen.getByRole("button", { name: /like/i });

  fireEvent.click(likeBtn);
  // Expecting the handler to be called with the item and the 'isLiked' boolean (false)
  expect(mockHandleLike).toHaveBeenCalledWith(mockItem, false);
});

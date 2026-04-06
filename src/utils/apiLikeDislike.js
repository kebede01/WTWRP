import { handleResponse, headers, BASE_URL } from "./api";

export const apiItemLike = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "POST",
    headers,
    credentials: "include", // Sends the JWT cookie automatically
  });
  return handleResponse(response);
};

export const apiItemUnlike = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}/likes`, {
    method: "DELETE",
    headers,
    credentials: "include", // Sends the JWT cookie automatically
  });
  return handleResponse(response);
}
 
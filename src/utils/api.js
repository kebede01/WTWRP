const BASE_URL = import.meta.env.VITE_BASE_URL;
export const handleResponse = async (response) => {
  return response.ok
    ? await response.json()
    : Promise.reject(`Error: ${response.status}`);
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const getAllClothingItems = async () => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "GET",
    headers,
    credentials: "include", // Sends the JWT cookie automatically
  });
  return handleResponse(response);
};

export const addClothingItem = async ({ name, weather, image }) => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: headers,
    credentials: "include",
    body: JSON.stringify({ name, weather, image }),
  });
  return handleResponse(response);
};

export const getClothingItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "GET",
    headers,
    credentials: "include",
  });
  return handleResponse(response);
};

export const deleteClothingItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers,
    credentials: "include",
  });
  return handleResponse(response);
};

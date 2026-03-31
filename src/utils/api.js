
const BASE_URL = import.meta.env.VITE_BASE_URL ;
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
  const response = await fetch(`${BASE_URL}/items`, {headers});
  return handleResponse(response);
};
export const addClothingItem = async (itemData) => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

export const getClothingItem = async (itemId) => {
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {headers, method: "GET"});
  return handleResponse(response);
}

export const deleteClothingItem = async (itemId) => { 
  const response = await fetch(`${BASE_URL}/items/${itemId}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(response);
}

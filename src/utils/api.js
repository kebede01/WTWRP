const baseUrl = "http://localhost:3001";

const handleResponse = async (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Error: ${response.status}`);
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};
export const getAllClothingItems = async () => {
  const response = await fetch(`${baseUrl}/items`, {headers});
  return handleResponse(response);
};
export const addClothingItem = async (itemData) => {
  const response = await fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(itemData),
  });
  return handleResponse(response);
};

export const getClothingItem = async (itemId) => {
  const response = await fetch(`${baseUrl}/items/${itemId}`, {headers, method: "GET"});
  return handleResponse(response);
}

export const deleteClothingItem = async (itemId) => { 
  const response = await fetch(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    headers,
  });
  return handleResponse(response);
}

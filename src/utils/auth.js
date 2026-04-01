const BASE_URL = import.meta.env.VITE_BASE_URL;
import { handleResponse } from "./api.js";
export const register = ({ name, avatar, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  }).then(handleResponse);
};

export const authorize = ({ email, password }) => {
  return fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
};

// getContent accepts the token as an argument.
export const getUserInfo = (userId) => {
  // Send a GET request to /users/me
  return fetch(`${BASE_URL}/user/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      // Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);
};

export const changeUserInfo = (userId, { name, avatar }) => {
  return fetch(`${BASE_URL}/user/${userId}`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      // Specify an authorization header with an appropriately
      // formatted value.
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar}),
  }).then(handleResponse);
};















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
    credentials: "include", // CRITICAL: Allows cookies to be set
  }).then(handleResponse);
};

// getContent accepts the token as an argument.
export const getUserInfo = () => {
  // Send a GET request to /users/me
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include", // Sends the JWT cookie automatically
  }).then(handleResponse);
};

export const changeUserInfo = ({ name, avatar }) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar }),
    credentials: "include", // Sends the JWT cookie automatically
  }).then(handleResponse);
};

export const signOut = () => {
  return fetch(`${BASE_URL}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // Essential to send/receive cookies
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
};

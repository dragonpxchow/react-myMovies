import http from "./httpService";
import jwtDecode from "jwt-decode";
//import { apiUrl } from "../config.json";  use environment variable

const apiEndPoint = "/auth"; //apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt()); // fixing bi-directional dependencies

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndPoint, { email, password });
  localStorage.setItem(tokenKey, jwt); // localStorage available to all browser
}

export function loginWithJwt(jwt) {
  // for Registration Form
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    // authenticared user with valid jwt
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    // anonymous user
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// export as object
export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};

import http from "./httpService";
//import { apiUrl } from "../config.json";

const apiEndPoint = "/users"; //apiUrl + "/users";

export function register(user) {
  // create a new registration
  return http.post(apiEndPoint, {
    email: user.username,
    password: user.password,
    name: user.name,
  });
}

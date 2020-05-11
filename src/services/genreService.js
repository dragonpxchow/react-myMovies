import http from "./httpService";
//import config from "../common/config.json";
//import { apiUrl } from "../config.json";
//const apiEndPointGenres = "http://localhost:3900/api/genres";

export function getGenres() {
  // get genres with http response.data
  //return http.get("http://localhost:3900/api/genres");
  return http.get("/Genres");
}

//export getGenres = async () => {   // could not import
/*
export async function getGenres() {
  // get genres with http response.data
  const { data: genres } = await http.get(config.apiEndPointGenres);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>> 1");
  console.log(genres);
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>> 2");
  return genres.filter((g) => g.name);
}
*/

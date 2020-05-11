import http from "./httpService";
//import { apiUrl } from "../config.json";
//import { getGenres } from "./genreService";

function movieUrl(id) {
  //return apiUrl + "/movies/" + id;
  //return `${apiUrl}/movies/${id}`;
  return `/movies/${id}`;
}

export function getMovies() {
  // get movies with http response.data
  //return http.get(apiUrl + "/Movies");
  return http.get("/Movies");
}

export function getMovie(movieId) {
  //console.log("movieId >>>>>>>" + movieId);
  //return http.get(apiUrl + "/movies/" + movieId);
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
  if (movie._id) {
    // update it
    const body = { ...movie };
    delete body._id; // remove _id from movie object so that no found in request body and in url
    return http.put(movieUrl(movie._id), body);
  }

  // or create it
  //return http.post(apiUrl + "/movies", movie); // send back newly created data:post as response.data
  return http.post("/movies", movie);
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
  /* this is from array n fakeMovieService.js
  let movieInDb = movies.find((m) => m._id === id);
  movies.splice(movies.indexOf(movieInDb), 1);
  //console.log("Deleted " + movieInDb._id + ">>>>>" + movieInDb.title);
  return movieInDb;
  */
}

import React, { Component } from "react";
//import { getMovies } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";
//import Filtering from "./common/filtering";
import ListGoup from "./common/listGroup";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "", // controlled component, if set to null, React think that it change controlled to uncontrolled conponent
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    // perfect place to get data from services
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Gendres" }, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
    //this.setState({ movies: getMovies(), genres });

    /*
    const movies = getMovies();
    const genres = _.sortedUniq(movies.map(m => m.genre));
    this.setState({ movies, genres });
    */
  }

  handleDelete = async (movie) => {
    //console.log(movie);
    // delete from front end first
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== movie._id); // filter all movies except this movie to be deleted
    this.setState({ movies }); //this.setState({ movies: movies });  same variable name

    // delete from backend
    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error("This movie has already been deleted");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    console.log("liked is clicked", movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    // console.log(page);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    //console.log("genre >>>", genre);
    // note: searchQuery to "" because searchQuery is controlled component
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    //console.log(">>>>>>>>>");
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  getPageData = () => {
    const {
      currentPage,
      pageSize,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
    //console.log("rendered sortColumn.order >>>", sortColumn.order);
    const sorted = _.sortBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize); // get all movies for current page

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    //const { length: count } = this.state.movies;
    const { currentPage, pageSize, sortColumn } = this.state;
    const { user } = this.props;

    // "All Genres" has _id==1
    // if (count === 0) return <p>There are no movies in database</p>;
    const { totalCount, data: movies } = this.getPageData();
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGoup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              //textProperty={"name"} because using defaultProps
              //valueProperty={"_id"}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            {user && (
              <Link
                to="/movies/new"
                className="btn btn-primary"
                style={{ marginBottom: 20 }}
              >
                New Movie
              </Link>
            )}

            <p>Showing {totalCount} movies in the database</p>

            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />

            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;

import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
//import { saveMovie, getMovie } from "../services/fakeMovieService";
import { saveMovie, getMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
      /* will come back
      console.log("Validate when edting >>>>>>>> 1");
      Joi.validate(this.state.data, this.schema);
      console.log("Validate when edting >>>>>>>> 2");
      */
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/notFound");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = async () => {
    // NOTE: when editing, no fire here !!! even manuallu active Save button
    console.log("New movie is being Submitted");
    await saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    const { match } = this.props;
    return (
      <div className="container">
        <h1>Movie Form: {match.params.id}</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("New Save")}
          <button
            className="btn btn-primary"
            disabled={this.validate()}
            onClick={() => this.doSubmit}
          >
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default MovieForm;

/*
const MovieForm = ({ match, history }) => {
  return (
    <div>
      <h1>Movie Form: {match.params.id}</h1>

      <button
        className="btn btn-primary"
        onClick={() => history.push("/movies")}
      >
        Save
      </button>
    </div>
  );
};
export default MovieForm;
*/

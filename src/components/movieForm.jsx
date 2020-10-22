import React from "react";
import Form from "./common/form";
//import Joi from "joi-browser";
import Joi from "joi-full";

//import { saveMovie, getMovie } from "../services/fakeMovieService";
import { saveMovie, getMovie } from "../services/movieService";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import moment from "moment";
//import { SingleDatePicker } from "react-dates";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
      stockedOn: moment(),
      releasedOn: moment(),
    },
    genres: [],
    errors: {},
    calendarFocused: {
      stockedOn: false,
      releasedOn: false,
    },
  };

  schema = {
    _id: Joi.string(),
    country: Joi.string().label("Country"),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
    stockedOn: Joi.date().format("MM/DD/YYYY").required().label("Stocked On"),
    releasedOn: Joi.date().format("MM/DD/YYYY").required().label("Released On"),
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
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
    // here to set form mode
    this.setState({ readOnly: false });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      stockedOn: moment(movie.stockedOn),
      releasedOn: moment(movie.releasedOn),
    };
  }

  doSubmit = async () => {
    await saveMovie(this.state.data);

    this.props.history.push("/movies");
  };

  render() {
    //const { data, calendarFocused } = { ...this.state };
    return (
      <div className="container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit} readOnly={this.state.readOnly}>
          <div className="row">
            <div className="col-md-8">
              {this.renderInput("title", "Title", "Movie title")}
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              {this.renderSelect(
                "genreId",
                "Genre",
                "Select a genre",
                this.state.genres
              )}
            </div>
            <div className="col-md-4">
              {this.renderInput(
                "numberInStock",
                "Number in Stock",
                "Available in stock",
                "number"
              )}
            </div>
            <div className="col-md-4">
              {this.renderInput(
                "dailyRentalRate",
                "Rate",
                "Rating of favorite"
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              {this.renderSingleDatePicker(
                "stockedOn",
                "Stocked On",
                "Stocked Date"
              )}
            </div>
            <div className="col-md-4">
              {this.renderSingleDatePicker(
                "releasedOn",
                "Released On",
                "Released Date"
              )}
            </div>
          </div>

          {/*}
          <SingleDatePicker
            //date={this.state.stockedOn}
            //onDateChange={this.onDateChange}
            date={this.state.data.stockedOn}
            onDateChange={(date) => {
              data["stockedOn"] = date;
              this.setState({ data });
            }}
            focused={this.state.calendarFocused.stockedOn}
            //onFocusChange={this.onFocusChange}
            onFocusChange={(focused) => {
              //get the value (true/false) of focused object that contains { focused: false }
              const key = Object.keys(focused)[0];
              calendarFocused["stockedOn"] = focused[key];
              this.setState({ calendarFocused });
            }}
            numberOfMonths={1}
            isOutsideRange={() => false}
            id="stockedOn"
          />
          <SingleDatePicker
            date={this.state.data.releasedOn}
            onDateChange={(date) => {
              data["releasedOn"] = date;
              this.setState({ data });
            }}
            focused={this.state.calendarFocused.releasedOn}
            onFocusChange={(focused) => {
              //get the value (true/false) of focused object that contains { focused: false }
              const key = Object.keys(focused)[0];
              calendarFocused["releasedOn"] = focused[key];
              this.setState({ calendarFocused });
            }}
            numberOfMonths={1}
            isOutsideRange={() => false}
            id="releasedOn"
          />
          */}
          {this.renderButton("Save")}
          <button onClick={this.handleFormMode}>Toggle</button>
        </form>
      </div>
    );
  }
}

export default MovieForm;

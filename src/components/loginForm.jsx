import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./common/form";

//import { login } from "../services/authService";  // import as name function
import auth from "../services/authService"; // import as objecy

class LoginForm extends Form {
  state = { data: { username: "", password: "" }, errors: {} };
  //username = React.createRef(); // not recomend over use this

  /*  // use autoFocus in the field property
  componentDidMount() {
    this.username.current.focus();
  }
  */

  doSubmit = async () => {
    // call server
    try {
      console.log("Submit login page");
      const { data } = this.state;
      await auth.login(data.username, data.password);
      //console.log(jwt);
      // store json web token to chrome small db call local storage as key-value pair
      //localStorage.setItem("token", jwt); // localStorage available to all browser
      // direct to home page
      //this.props.history.push("/");
      // need to reload the home page to show current user
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data; // set error from server to username field
        this.setState({ errors });
      }
    }
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  /*
  validate = () => {
      // move to form.jsx
  }

  validateProperty = () => {
    // move to form.jxs
  }
  */

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div className="container">
        <h1>Login form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {/*
          <Input
            label={"Password"}
            name={"password"}
            value={data.password}
            error={errors.password}
            onChange={this.handleChange}
          ></Input>
          
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                value={data.password}
                onChange={this.handleChange}
                type="text"
                className="form-control"
              />
            </div>
            */}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;

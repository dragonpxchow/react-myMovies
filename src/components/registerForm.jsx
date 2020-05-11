import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = { data: { username: "", password: "", name: "" }, errors: {} };

  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  //async doSubmit() {
  doSubmit = async () => {
    try {
      console.log("Register form being Submitted");
      const response = await userService.register(this.state.data); // await for promise
      //console.log(response);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.history.push("/");
      // need to reload the home page to show current user after registration
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        // bad request
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1>Register Form (Need to add IsAdmin checkbox later</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;

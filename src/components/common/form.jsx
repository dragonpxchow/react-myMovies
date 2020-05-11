import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import Joi from "joi-browser";

class Form extends Component {
  state = { data: {}, errors: {} };

  validate = () => {
    // object restructing result.error
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log(error);   // validation error when editing, why !!
    if (!error) return;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }

    return errors;
    /*
        const errors = {};
        const { data } = this.state;
        if (data.username.trim() === "")
          errors.username = "Username is required";
        if (data.password.trim() === "")
          errors.password = "Password is required";
        return Object.keys(errors).length === 0 ? null : errors;
        */
  };

  validateProperty = ({ name, value }) => {
    // name , value is object restructing of e.curretnTarget
    // field validation
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // object restructing result.error
    const { error } = Joi.validate(obj, schema);
    //if (!error) return null;
    //return error.details[0].message;
    return error ? error.details[0].message : null;

    /*
        if (name === "username") {
          if (value.trim() === "") return "Username is required";
          // ...
        }
    
        if (name === "password") {
          if (value.trim() === "") return "Password is required";
          // ...
        }
        */
  };

  handleSubmit = (e) => {
    e.preventDefault(); // prevent re-submit the form for this event

    //const username = this.username.current.value;  another way to get field value
    const errors = this.validate();
    // console.log(errors);
    this.setState({ errors: errors || {} }); // if any errors, set errors other set {} empty object

    // if any error, stop to calling server
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errros };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
      // eg.  input.name === username
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    //data[e.currentTarget.name] = e.currentTarget.value; // use field name
    data[input.name] = input.value; // use field name
    this.setState({ data, errors });
  };

  renderInput(fieldName, fieldLabel, fieldType = "text") {
    // input field
    const { data, errors } = this.state;
    return (
      <Input
        type={fieldType}
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        onChange={this.handleChange}
        error={errors[fieldName]}
      ></Input>
    );
  }

  renderSelect(fieldName, fieldLabel, options) {
    // select field
    const { data, errors } = this.state;
    return (
      <Select
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        options={options}
        onChange={this.handleChange}
        error={errors[fieldName]}
      ></Select>
    );
  }

  renderButton(label) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  }
  /* no render any thing here
    render() { 
        return (  );
    }
    */
}

export default Form;

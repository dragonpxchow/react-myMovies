import React, { Component } from "react";
import Input from "./input";
import Select from "./select";
import { OneDatePicker } from "./datePicker";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    readOnly: "",
    data: {},
    errors: {},
  };

  validate = () => {
    // object restructing result.error
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    //console.log("Form Error(s): ", error); // validation error when editing, why !!
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

  handleFormMode = () => {
    console.log(">>>>>>>>>>>>>>>>>. change form mode");
    // https://stackoverflow.com/questions/46093596/change-readonly-attribute-of-input-element-reactjs
    //this.setState((prevState) => ({ readOnly: !prevState.readOnly }));
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

  validateSingleDate = (name, value) => {
    // name:  fieldName of date
    // value: date objec tof moment, must be a number of milliseconds or valid date string
    //.log("validateSingleDate", value);
    const obj = { [name]: value.format() };
    const schema = { [name]: this.schema[name] };
    // object restructing result.error
    const { error } = Joi.validate(obj, schema);
    //if (!error) return null;
    //return error.details[0].message;
    return error ? error.details[0].message : null;
  };

  onDateChange = (objDate, { fieldName }) => {
    // objDate is moment date object
    const errors = { ...this.state.errros };
    const errorMessage = this.validateSingleDate(fieldName, objDate);
    if (errorMessage) {
      errors[fieldName] = errorMessage;
    } else {
      //delete errors[input.name];
      delete errors[fieldName];
    }

    const data = { ...this.state.data };
    if (objDate) {
      data[fieldName] = objDate; // use field name
      this.setState({ data, errors });
    }
  };

  onFocusChange = (focused, { fieldName }) => {
    const calendarFocused = { ...this.state };
    //get the value (true/false) of focused object that contains { focused: false }
    const key = Object.keys(focused)[0];
    calendarFocused[fieldName] = focused[key];
    this.setState({ calendarFocused });
  };

  renderSingleDatePicker(fieldName, fieldLabel) {
    // single date picker
    const { data, calendarFocused, errors, readOnly } = this.state;
    //console.log ("field (" + fieldName + ")   >>> has date >>>" + moment(data[fieldName]).format("DD/MM/YYYY") )

    return (
      <OneDatePicker
        name={fieldName}
        label={fieldLabel}
        date={data[fieldName]}
        onDateChange={(date) => this.onDateChange(date, { fieldName })}
        focused={calendarFocused[fieldName]}
        onFocusChange={(focused) => this.onFocusChange(focused, { fieldName })}
        numberOfMonths={1}
        isOutsideRange={() => false}
        id={fieldName}
        readOnly
        error={errors[fieldName]}
      />
    );
  }

  renderInput(fieldName, fieldLabel, fieldType = "text") {
    // input field
    const { data, errors, readOnly } = this.state;
    return (
      <Input
        type={fieldType}
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        onChange={this.handleChange}
        readOnly={readOnly}
        error={errors[fieldName]}
      ></Input>
    );
  }

  renderSelect(fieldName, fieldLabel, options) {
    // select field
    const { data, errors, readOnly } = this.state;
    return (
      <Select
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        options={options}
        onChange={this.handleChange}
        readOnly={readOnly}
        error={errors[fieldName]}
      ></Select>
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
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

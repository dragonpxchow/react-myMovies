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
    if (!error) return;
    //console.log("Form Error(s): ", error);
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
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

  validateProperty = ({ name, value }) => {
    // name , value is object restructing of e.curretnTarget
    // field validation
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    // object restructing result.error
    const { error } = Joi.validate(obj, schema);
    //if (!error) return null;
    //return error.details[0].message;
    return error || "" ? error.details[0].message : null;
  };

  onInputChange = ({ currentTarget: input }) => {
    // input is e.currentTarget
    // eg.  input.name === username
    const errors = { ...this.state.errros };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) {
      errors[input.name] = errorMessage;
    } else {
      delete errors[input.name];
    }

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateSingleDate = (name, value) => {
    // name:  fieldName of date
    // value: date object of moment, must be a number of milliseconds or valid date string
    const obj = { [name]: value.format("MM/DD/YYYY") };
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
      delete errors[fieldName];
    }

    const data = { ...this.state.data };
    if (objDate) {
      data[fieldName] = objDate; // use field name
      this.setState({ data, errors });
      //this.setState({ company }, () => this.onValidCompanyInfo())
    }
  };

  onFocusChange = (focused, { fieldName }) => {
    const calendarFocused = { ...this.state };
    //get the value (true/false) of focused object that contains { focused: false }
    const key = Object.keys(focused)[0];
    calendarFocused[fieldName] = focused[key];
    this.setState({ calendarFocused });
  };

  renderSingleDatePicker(fieldName, fieldLabel, placeHolder) {
    // single date picker
    const { data, calendarFocused, errors, readOnly } = this.state;
    //console.log ("field (" + fieldName + ")   >>> has date >>>" + moment(data[fieldName]).format("DD/MM/YYYY") )

    return (
      <OneDatePicker
        placeholder={placeHolder}
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

  renderInput(fieldName, fieldLabel, placeHolder, fieldType = "text") {
    // input field
    const { data, errors, readOnly } = this.state;
    return (
      <Input
        placeholder={placeHolder}
        type={fieldType}
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        onChange={this.onInputChange}
        readOnly={readOnly}
        error={errors[fieldName]}
      ></Input>
    );
  }

  renderSelect(fieldName, fieldLabel, placeHolder, options) {
    // select field
    const { data, errors, readOnly } = this.state;
    return (
      <Select
        placeholder={placeHolder}
        name={fieldName}
        value={data[fieldName]}
        label={fieldLabel}
        options={options}
        onChange={this.onInputChange}
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
}

export default Form;

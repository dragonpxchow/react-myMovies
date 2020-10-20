import React from "react";
import { SingleDatePicker, DateRangePicker } from "react-dates";

// object restructuring of props and using rest operator to get the rest of properties
export const OneDatePicker = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br></br>
      <SingleDatePicker {...rest} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );

  /*  before refactoring
    return(
      <React.Fragment>
    <SingleDatePicker
      //date={this.state.data.createdAt}
      //onDateChange={date => {data["createdAt"]=date; this.setState({data})}} 
      //placeholder="Stock date"
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
    {errors[fieldName] && <div className="alert alert-danger">{errors[fieldName]}</div>}
    </React.Fragment>) 
    */
};

export const RangeDatePicker = ({ label, name, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <br></br>
      <DateRangePicker {...rest} id={name} />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

//export default OneDatePicker;
//export default RangeDatePicker

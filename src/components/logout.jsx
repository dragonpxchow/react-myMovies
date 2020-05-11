import { Component } from "react";
//import { logout } from "../services/authService";   import as named function
import auth from "../services/authService"; // import as object, pelase see authService,js

class Logout extends Component {
  //state = {  }   do not want any state
  componentDidMount() {
    //console.log(">>>>>>>>>>>>>>>>>>>>>. about to logout ");
    auth.logout();
    window.location = "/";
  }

  render() {
    return null;
  }
}

export default Logout;

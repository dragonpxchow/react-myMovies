//import Raven from "raven-js"; // to log uncaught exceptions.  eg. Unexpected - (network down, server down, db down, bug)

function init() {
  /*
  Raven.config("https://05323d37c9a947eba9daaaab1e6171a9@sentry.io/1249956", {
    release: 1 - 0 - 0,
    environment: "development-text",
  }).install();
  */
}

function log(error) {
  console.log("Error>>>", error);
  //Raven.captureException(error);
}

// export two methods as interface logging service
export default { init, log };

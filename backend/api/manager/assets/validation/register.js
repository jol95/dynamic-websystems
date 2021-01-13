const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {

  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  // email check
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
// password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
// firstname check
  if (Validator.isEmpty(data.firstname)) {
    errors.name = "First name field is required";
  }
// lastname check
  if (Validator.isEmpty(data.lastname)) {
    errors.name = "Last name field is required";
  }
// address check
  if (Validator.isEmpty(data.address)) {
    errors.name = "Address field is required";
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
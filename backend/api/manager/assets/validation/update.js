const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateInput(data) {

  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
  data.id = !isEmpty(data.id) ? data.id : "";

// Email checks
  if (Validator.isEmpty(data.id)) {
    errors.id = "Id field is required";
  } 
return {
    errors,
    isValid: isEmpty(errors)
  };
};
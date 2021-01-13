const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateUpdateInput(data) {

  let temp = "";
  let errors = {};

// Convert empty fields to an empty string so we can use validator functions
 temp = !isEmpty(data.ratio) ? data.ratio : "";

// ratio check
  if (! (Validator.isEmpty(temp))) {
    if (Validator.isFloat(data.ratio)) {
      errors.ratio = "Ratio needs to be a number";
    }
    if(!(0 <= data.ratio <= 1)){
      errors.ratio = "ratio need to be between 0 and 1.";
    }
  }

return {
    errors,
    isValid: isEmpty(errors)
  };
};
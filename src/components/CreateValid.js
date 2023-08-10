export const CreateValidation = (users) => {
  let error = {};
  if (users.name === "") {
    error.name = "Name should not be empty";
  }
  if (users.employee === "") {
    error.employee = "Employee should not be empty";
  }
  if (users.industry === "") {
    error.industry = "Industry should not be empty";
  }
  if (users.lineofbusiness === "") {
    error.lineofbusiness = "Line of Business should not be empty";
  }
  if (users.datadomain === "") {
    error.datadomain = "Data Domain should not be empty";
  }
  if (users.businessfunction === "") {
    error.businessfunction = "Business Function should not be empty";
  }
  if (users.region === "") {
    error.region = "Region should not be empty";
  }
  return error;
};

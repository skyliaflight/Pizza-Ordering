var mongoose = require('mongoose');

var schema = {
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  streetAddress: String,
  city: String,
  zipCode: String,
  password: String
};

module.exports = mongoose.model("Account", schema);

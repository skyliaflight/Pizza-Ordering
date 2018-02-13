var mongoose = require('mongoose');

var schema = {
  streetAddress: String,
  city: String,
  zipCode: String,
};

module.exports = mongoose.model("Address", schema);

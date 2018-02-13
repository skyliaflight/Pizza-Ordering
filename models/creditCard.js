var mongoose = require('mongoose');

var schema = {
  type: String,
  name: String,
  cardNumber: String,
  expirationDate: String,
  securityCode: String
};

module.exports = mongoose.model("CreditCard", schema);

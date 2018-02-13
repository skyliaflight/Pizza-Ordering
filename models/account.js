var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  mailingAddressId: String,
  billingAddressId: String,
  creditCardId: String,
  password: String
});

module.exports = mongoose.model("Account", schema);

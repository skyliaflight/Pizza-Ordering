var mongoose = require('mongoose');

var schema = {
  name: String,
  quantity: Number,
  unitPrice: Number,
  price: Number
};

module.exports = mongoose.model("CartItem", schema);

var mongoose = require('mongoose');

var schema = {
  totalItems: Number,
  totalPrice: Number,
  items: [{
    name: String,
    quantity: Number,
    unitPrice: Number,
    price: Number
  }]
};

module.exports = mongoose.model("Cart", schema);

var mongoose = require('mongoose');

var schema = {
  userId: String,
  itemId: String,
  quantity: Number,
  unitPrice: Number,
  date: String,
  fullfilled: Boolean
};

module.exports = mongoose.model("Order", schema);

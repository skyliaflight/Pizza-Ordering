var mongoose = require('mongoose');

var schema = {
    name: String,
    price: Number,
    photo: String,
  };

// Exporting it as a module so we can use require later.
module.exports = mongoose.model('MenuItem', schema);

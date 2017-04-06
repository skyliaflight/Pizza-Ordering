
// A function which generates increment and decrement controls.
var createQuantityControls = function() {
  var quantityControls = document.createElement("div");
  quantityControls.className = "inc-dec-input";

  var decrementButton = document.createElement("div");
  decrementButton.className = "decrement-btn";
  decrementButton.innerHTML = "-";
  quantityControls.appendChild(decrementButton);

  var quantityField = document.createElement("div");
  quantityField.className = "quantity-field";
  quantityField.innerHTML = "0";
  quantityControls.appendChild(quantityField);

  var incrementButton = document.createElement("div");
  incrementButton.className = "increment-btn";
  incrementButton.innerHTML = "+";
  quantityControls.appendChild(incrementButton);

  return quantityControls;

} // End of function for generating quantity control

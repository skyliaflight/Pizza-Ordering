
document.addEventListener("DOMContentLoaded", function(event) {
  var incrementButtons = document.querySelectorAll(".increment-btn");
  var decrementButtons = document.querySelectorAll(".decrement-btn");

  // Creates an event listener for the increment buttons.
  for (var i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener("click", function() {
      var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0];
      var quantity = Number(quantityField.innerHTML);
      quantity = quantity + 1;
      quantityField.innerHTML = String(quantity)
    })
  }

  // Creates an event listener for the decrement buttons.
  for (var i = 0; i < decrementButtons.length; i++) {
    decrementButtons[i].addEventListener("click", function() {
      var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0].getElementsByTagName("p")[0];
      var quantity = Number(quantityField.innerHTML);

      if (quantity > 0) {
        quantity = quantity - 1;
        quantityField.innerHTML = String(quantity)
      }
    })
  }

});

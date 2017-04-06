
document.addEventListener("DOMContentLoaded", function(event) {
  var incrementButtons = document.querySelectorAll(".increment-btn");
  var decrementButtons = document.querySelectorAll(".decrement-btn");

  for (var i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener("click", function() {
      alert("You clicked an increment button.");
    })
  }

  for (var i = 0; i < decrementButtons.length; i++) {
    decrementButtons[i].addEventListener("click", function() {
      alert("You clicked a decrement button.")
    })
  }


});

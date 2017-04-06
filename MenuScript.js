
document.addEventListener("DOMContentLoaded", function(event) {
  var incrementButtons = document.querySelectorAll(".increment-btn");

  for (var i = 0; i < incrementButtons.length; i++) {
    incrementButtons[i].addEventListener("click", function() {
      alert("You clicked the button.")
    })
  }



});

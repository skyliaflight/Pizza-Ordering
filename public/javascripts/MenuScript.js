
// Event listener for when the menu page loads
document.addEventListener("DOMContentLoaded", function(event) {
  loadLocalCartInfo();
  loadMenuFromServer();
  loadBasicUserInfo();

  // Generate the menu. This version pulls the menu items from
  // a database server at the given URL.
  $.get("http://localhost:3000/menu", function(response) {
    var menuItems = response;
    var menuArea = document.getElementsByTagName("body")[0].querySelector("#menu");
    var currentRow;

    // For each menu item in the database, add it to the menu space.
    for (var i = 0; i < menuItems.length; i++) {
      // If index i is even, then start a new row.
      if (i%2 === 0) {
        currentRow = document.createElement("div");
        currentRow.className = "row";
        menuArea.appendChild(currentRow);
      }

      currentRow.appendChild(createMenuEntry(menuItems[i]));
      menuKeys.push(menuItems[i]["_id"]);
      menu.push({ name: menuItems[i]["name"],
                  price: menuItems[i]["price"],
                  photo: menuItems[i]["photo"]});
    }

  }); // End of code for generating menu

  // Creates an event listener for the increment buttons.
  $('#menu').on('click', '.increment-btn', function(event) {
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var quantity = Number(quantityField.innerHTML);
    quantity = quantity + 1;
    quantityField.innerHTML = String(quantity);
  }); // End of code for incrementing quantity to add

  // Creates an event listener for the decrement buttons.
  $('#menu').on('click', '.decrement-btn', function(event) {
    var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
    var quantity = Number(quantityField.innerHTML);

    if (quantity > 0) {
      quantity = quantity - 1;
      quantityField.innerHTML = String(quantity);
    }
  }); // End of code for decrementing quantity to add

  // Responds when an "Add to Cart" button is clicked
  $('#menu').on('click', '.add-btn', function(event) {
      var item = menu[menuKeys.indexOf(this.id)];
      var addedQuantity = Number(this.parentNode.getElementsByClassName("quantity-field")[0].innerHTML);
      addCartItem(this.id, addedQuantity);
      $("#cart-btn").html("<h1>Cart (" + window.globalCart["totalItems"] + ")</h1>");
      openAlertBox("Added item(s) to the cart");
  });

}); // End of event listener

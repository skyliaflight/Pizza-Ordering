// Retrieves the menu items from a database and displays
// them on the webpage. Provides options for adding them
// to the cart in the globalUserInfo file.

// Generates a menu entry for a given object representing a menu item.
var createMenuEntry = function(item) {
  var entrySpace = document.createElement("div");
  entrySpace.className = "menu-item";

  var entryName = document.createElement("h1");
  entryName.className = "entry-name";
  entryName.innerHTML = item["name"];
  entrySpace.appendChild(entryName);

  var entryImage = document.createElement("img");
  entryImage.src = item["photo"];
  entrySpace.appendChild(entryImage);

  var price = document.createElement("h2");
  price.className = "price-tag";
  price.innerHTML = "$" + String(item["price"]);
  entrySpace.appendChild(price);

  entrySpace.appendChild(createQuantityControls());

  var addButton = document.createElement("div");
  addButton.className = "add-btn";
  addButton.innerHTML = "<h1>Add to Cart</h1>";
  entrySpace.appendChild(addButton);

  return entrySpace;
} // End of function for generating menu entry html code


// Event listener for when the menu page loads
document.addEventListener("DOMContentLoaded", function(event) {
    // Generate the menu. This version pulls the menu items from
    // a database server at the given URL. In the offline version,
    // the variable menuItems gets imported in the html code.
    $.get("http://thiman.me:1337/menu/Rachel", function(response) {
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

        var itemName = this.parentNode.getElementsByClassName("entry-name")[0].innerHTML;
        var addedQuantity = Number(this.parentNode.getElementsByClassName("quantity-field")[0].innerHTML);
        var itemPrice = this.parentNode.getElementsByClassName("price-tag")[0].innerHTML;
        itemPrice = Number(itemPrice.slice(1, itemPrice.length));

        // Update the quantity in the cart.
        if (addedQuantity > 0) {
          if (!cart.hasOwnProperty(itemName)) {
            cart[itemName] = {quantity: addedQuantity,
                              unitPrice: itemPrice,
                              price: addedQuantity*itemPrice,
                              updateQuantity: function(addition) {
                                this.quantity += addition;
                                this.price = this.quantity*this.unitPrice;
                              }};
          }
          else {
            cart[itemName].updateQuantity(addedQuantity);
          }

          /*for (var item in cart) {
            console.log(item);
            console.log(cart[item]["quantity"]);
            console.log(cart[item]["unitPrice"]);
            console.log(cart[item]["price"]);
          }*/

          // Update the total number of items.
          totalItems += addedQuantity;
          cartButton.getElementsByTagName("h1")[0].innerHTML = "Cart (" + String(totalItems) + ")";

        }
    }); // End of response for clicking an "Add to Cart" button

}); // End of event listener

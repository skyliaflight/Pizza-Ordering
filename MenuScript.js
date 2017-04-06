// Cart object contains menu item names paired with quantities.
var cart = {};


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
    var totalItems = 0;
    var cartButton = document.querySelector("#cart-btn");
    var incrementButtons = document.querySelectorAll(".increment-btn");
    var decrementButtons = document.querySelectorAll(".decrement-btn");
    var addToCartButtons = document.querySelectorAll(".add-btn");

    // Generate the menu if this is the home page
    // For some reason, the generated menus quantity controlers
    // do not respond even though they seem tohave the same html code.
    var menuArea = this.getElementsByTagName("body")[0].querySelector("#menu");
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

    // Creates an event listener for the increment buttons.
    for (var i = 0; i < incrementButtons.length; i++) {
        incrementButtons[i].addEventListener("click", function() {
            var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
            var quantity = Number(quantityField.innerHTML);
            quantity = quantity + 1;
            quantityField.innerHTML = String(quantity);
        })
    } // End of code for incrementing quantity to add

    // Creates an event listener for the decrement buttons.
    for (var i = 0; i < decrementButtons.length; i++) {
        decrementButtons[i].addEventListener("click", function() {
            var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
            var quantity = Number(quantityField.innerHTML);

            if (quantity > 0) {
                quantity = quantity - 1;
                quantityField.innerHTML = String(quantity);
            }
        })
    } // End of code for decrementing quantity to add

    // Responds when an "Add to Cart" button is clicked.
    for (var i = 0; i < addToCartButtons.length; i++) {
        addToCartButtons[i].addEventListener("click", function() {
            var itemName = this.parentNode.getElementsByClassName("entry-name")[0].innerHTML;
            var addedQuantity = Number(this.parentNode.getElementsByClassName("quantity-field")[0].innerHTML);

            // Update the quantity in the cart.
            if (addedQuantity > 0) {
              if (!cart.hasOwnProperty(itemName)) {
                cart[itemName] = addedQuantity;
                //console.log(cart[itemName]);
              }
              else {
                //console.log(cart[itemName]);
                cart[itemName] += addedQuantity;
                //console.log(cart[itemName]);
              }

              // Update the total number of items.
              totalItems += addedQuantity;
              cartButton.getElementsByTagName("h1")[0].innerHTML = "Cart (" + String(totalItems) + ")";

            }

        })
    } // End of response for adding item to cart

}); // End of event listener

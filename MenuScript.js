
// Array of menu items.
var menuItems = [
    {
        name: "Cheese",
        price: 4.00,
        photo: "http://tammybruce.com/wp-content/uploads/2015/08/pizza.png"
    },
    {
        name: "Pepperoni",
        price: 5.00,
        photo: "http://i3.tigernet.com/stories/15/football/pizza.jpg"
    },
    {
        name: "Mushroom",
        price: 3.00,
        photo: "http://static6.depositphotos.com/1004868/639/i/950/depositphotos_6399017-stock-photo-pizza-capricciosa.jpg"
    },
    {
        name: "Vegetarian Combo",
        price: 2.50,
        photo: "http://static7.depositphotos.com/1013693/755/i/950/depositphotos_7556189-stock-photo-pizza-white-background.jpg"
    }
];

// Cart object contains menu item names paired with quantities.
var cart = {};


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

}

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

  console.log(entrySpace);
}


document.addEventListener("DOMContentLoaded", function(event) {
    var totalItems = 0;
    var cartButton = document.querySelector("#cart-btn");
    var incrementButtons = document.querySelectorAll(".increment-btn");
    var decrementButtons = document.querySelectorAll(".decrement-btn");
    var addToCartButtons = document.querySelectorAll(".add-btn");

    createMenuEntry(menuItems[0]);

    // Creates an event listener for the increment buttons.
    for (var i = 0; i < incrementButtons.length; i++) {
        incrementButtons[i].addEventListener("click", function() {
            var quantityField = this.parentNode.getElementsByClassName("quantity-field")[0];
            var quantity = Number(quantityField.innerHTML);
            quantity = quantity + 1;
            quantityField.innerHTML = String(quantity);
        })
    }

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
    }

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
    }

});
